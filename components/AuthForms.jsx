'use client';

import { useEffect, useState } from 'react';
import { getSupabase } from '../lib/supabaseClient';

function Message({ status }) {
  if (!status?.text) return null;
  return <div className={`form-message ${status.type}`} style={{ display: 'block' }}>{status.text}</div>;
}

function SubmitButton({ busy, label, busyLabel }) {
  return (
    <button className="btn btn-primary" type="submit" disabled={busy} aria-busy={busy}>
      {busy ? (busyLabel || 'جاري المعالجة') : label}
      {busy && <span className="btn-spinner" aria-hidden="true" />}
    </button>
  );
}

export function SignupForm() {
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault();
    if (busy) return;
    const f = new FormData(e.currentTarget);
    const password = f.get('password');
    if (password.length < 6) {
      setStatus({ type: 'error', text: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل.' });
      return;
    }
    setBusy(true);
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase.auth.signUp({
        email: f.get('email'),
        password,
        options: {
          data: { full_name: f.get('fullName'), user_type: f.get('userType') },
          emailRedirectTo: `${location.origin}/account`
        }
      });
      if (error) throw error;
      if (data.session) {
        setStatus({ type: 'success', text: 'تم إنشاء الحساب بنجاح.' });
        setTimeout(() => location.href = '/account', 700);
      } else {
        setStatus({ type: 'success', text: 'تم إرسال رابط تأكيد إلى بريدك الإلكتروني.' });
        setBusy(false);
      }
    } catch (e) {
      setStatus({ type: 'error', text: e.message || 'تعذر إنشاء الحساب.' });
      setBusy(false);
    }
  }
  return (
    <form onSubmit={submit} className="form-grid">
      <div className="form-field full"><label><span className="lbl">الاسم الكامل</span><input name="fullName" required /></label></div>
      <div className="form-field full"><label><span className="lbl">البريد الإلكتروني</span><input name="email" type="email" required /></label></div>
      <div className="form-field full"><label><span className="lbl">كلمة المرور</span><input name="password" type="password" minLength={6} required /></label></div>
      <div className="form-field full"><label htmlFor="signup-userType">نوع الحساب</label><select id="signup-userType" name="userType"><option>صاحب مشروع</option><option>مهتم بالفرص</option><option>مستشار / وسيط</option></select></div>
      <Message status={status} />
      <div className="form-field full"><SubmitButton busy={busy} label="إنشاء الحساب" busyLabel="جاري الإنشاء" /></div>
    </form>
  );
}

export function LoginForm() {
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault();
    if (busy) return;
    const f = new FormData(e.currentTarget);
    setBusy(true);
    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.signInWithPassword({ email: f.get('email'), password: f.get('password') });
      if (error) throw error;
      setStatus({ type: 'success', text: 'تم تسجيل الدخول بنجاح.' });
      setTimeout(() => location.href = '/account', 600);
    } catch (e) {
      setStatus({ type: 'error', text: e.message || 'تعذر تسجيل الدخول.' });
      setBusy(false);
    }
  }
  return (
    <form onSubmit={submit} className="form-grid">
      <div className="form-field full"><label><span className="lbl">البريد الإلكتروني</span><input name="email" type="email" required /></label></div>
      <div className="form-field full"><label><span className="lbl">كلمة المرور</span><input name="password" type="password" required /></label></div>
      <Message status={status} />
      <div className="form-field full"><SubmitButton busy={busy} label="تسجيل الدخول" busyLabel="جاري الدخول" /></div>
    </form>
  );
}

export function ResetForm() {
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault();
    if (busy) return;
    const f = new FormData(e.currentTarget);
    setBusy(true);
    try {
      const supabase = getSupabase();
      const { error } = await supabase.auth.resetPasswordForEmail(f.get('email'), { redirectTo: `${location.origin}/account` });
      if (error) throw error;
      setStatus({ type: 'success', text: 'تم إرسال رابط إعادة التعيين إلى بريدك.' });
    } catch (e) {
      setStatus({ type: 'error', text: e.message || 'تعذر إرسال الرابط.' });
    } finally {
      setBusy(false);
    }
  }
  return (
    <form onSubmit={submit} className="form-grid">
      <div className="form-field full"><label><span className="lbl">البريد الإلكتروني</span><input name="email" type="email" required /></label></div>
      <Message status={status} />
      <div className="form-field full"><SubmitButton busy={busy} label="إرسال الرابط" busyLabel="جاري الإرسال" /></div>
    </form>
  );
}

export function AccountBox() {
  const [state, setState] = useState({ loading: true, session: null });
  const [requests, setRequests] = useState([]);
  const [dbStatus, setDbStatus] = useState('loading');

  function normalizeDbRequest(table, row) {
    const typeMap = {
      project_submissions: 'إضافة مشروع',
      interest_requests: 'طلب اهتمام',
      nda_requests: 'طلب سرية'
    };

    return {
      id: `${table}-${row.id}`,
      table,
      type: typeMap[table] || 'طلب',
      title:
        row.project_name ||
        row.opportunity_reference ||
        row.interest_type ||
        'طلب جديد',
      contactName: row.contact_name || '',
      contactPhone: row.contact_phone || '',
      message: row.message || row.notes || row.details || '',
      sourcePage: row.source_page || '',
      createdAt: row.created_at || new Date().toISOString(),
      source: 'supabase'
    };
  }

  function loadLocalRequests() {
    try {
      const stored = JSON.parse(window.localStorage.getItem('haraj_invest_requests_v1') || '[]');
      return Array.isArray(stored) ? stored.map((item) => ({ ...item, source: item.source || 'local' })) : [];
    } catch {
      return [];
    }
  }

  async function loadSupabaseRequests(supabase, userId) {
    const tables = ['project_submissions', 'interest_requests', 'nda_requests'];

    const results = await Promise.allSettled(
      tables.map(async (table) => {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) throw error;
        return (data || []).map((row) => normalizeDbRequest(table, row));
      })
    );

    const fulfilled = results
      .filter((result) => result.status === 'fulfilled')
      .flatMap((result) => result.value);

    const rejected = results.some((result) => result.status === 'rejected');

    return { requests: fulfilled, rejected };
  }

  useEffect(() => {
    async function boot() {
      const supabase = getSupabase();
      const { data } = await supabase.auth.getSession();
      const session = data.session || null;
      const localRequests = loadLocalRequests();

      setState({ loading: false, session });

      if (!session?.user?.id) {
        setRequests(localRequests);
        setDbStatus('no-user');
        return;
      }

      try {
        const { requests: dbRequests, rejected } = await loadSupabaseRequests(supabase, session.user.id);
        const merged = [...dbRequests, ...localRequests]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 12);

        setRequests(merged);
        setDbStatus(rejected ? 'partial' : 'connected');
      } catch {
        setRequests(localRequests);
        setDbStatus('fallback');
      }
    }

    boot();
  }, []);

  async function logout() {
    await getSupabase().auth.signOut();
    location.href = '/login';
  }

  function clearRequests() {
    try {
      window.localStorage.removeItem('haraj_invest_requests_v1');
      setRequests((current) => current.filter((request) => request.source === 'supabase'));
    } catch {
      setRequests([]);
    }
  }

  if (state.loading) {
    return <div className="form-message warn" style={{ display: 'block' }}>جاري تحميل الحساب...</div>;
  }

  if (!state.session) {
    return (
      <div className="account-dashboard-empty">
        <div className="form-message warn" style={{ display: 'block' }}>
          لم يتم تسجيل الدخول.
        </div>
        <div className="hero-actions">
          <a className="btn btn-primary" href="/login">الدخول</a>
          <a className="btn btn-secondary" href="/signup">حساب جديد</a>
        </div>
      </div>
    );
  }

  const user = state.session.user;
  const meta = user.user_metadata || {};
  const displayName = meta.full_name || 'مستخدم حراج إنڤست';
  const userType = meta.user_type || 'غير محدد';

  const recentRequests = requests.slice(0, 6);
  const hasLocalRequests = requests.some((request) => request.source === 'local');

  return (
    <div className="account-dashboard">
      <div className="account-hero">
        <div>
          <span className="eyebrow">حسابك</span>
          <h2>مرحبًا، {displayName}</h2>
          <p>هذه لوحة حساب مختصرة. يمكنك إضافة مشروع، تصفح الفرص، ومراجعة آخر طلباتك.</p>
        </div>
        <div className="account-status-badge">
          <span>الحالة</span>
          <b>نشط</b>
        </div>
      </div>

      <div className="account-grid">
        <div className="account-row"><span>البريد</span><b>{user.email || '-'}</b></div>
        <div className="account-row"><span>الاسم</span><b>{displayName}</b></div>
        <div className="account-row"><span>نوع الحساب</span><b>{userType}</b></div>
        <div className="account-row"><span>آخر دخول</span><b>{new Date().toLocaleDateString('ar-SA')}</b></div>
      </div>

      <section className="account-quick-actions">
        <h3>روابط سريعة</h3>
        <div className="account-actions-grid">
          <a className="account-action-card" href="/submit-project">
            <span>01</span>
            <b>أضف مشروعك</b>
            <small>أرسل بيانات مشروعك للعرض الأولي.</small>
          </a>

          <a className="account-action-card" href="/marketplace">
            <span>02</span>
            <b>تصفح الفرص</b>
            <small>ابحث عن فرص حسب المدينة والقطاع.</small>
          </a>

          <a className="account-action-card" href="/contact">
            <span>03</span>
            <b>أرسل اهتمامك</b>
            <small>تواصل بوضوح حول فرصة معينة.</small>
          </a>

          <a className="account-action-card" href="/nda-request">
            <span>04</span>
            <b>طلب السرية</b>
            <small>اطلب NDA قبل مشاركة تفاصيل حساسة.</small>
          </a>
        </div>
      </section>

      <section className="account-requests-section">
        <div className="account-section-head">
          <div>
            <h3>طلباتي</h3>
            <p>
              {dbStatus === 'connected' && 'هذه الطلبات مرتبطة بحسابك في Supabase.'}
              {dbStatus === 'partial' && 'تم عرض بعض الطلبات من Supabase وبعضها من هذا الجهاز.'}
              {dbStatus === 'fallback' && 'تعذر جلب الطلبات من Supabase، لذلك تظهر الطلبات المحفوظة على هذا الجهاز.'}
              {dbStatus === 'no-user' && 'سجّل دخولك لربط الطلبات بحسابك.'}
              {dbStatus === 'loading' && 'جاري تحميل الطلبات...'}
            </p>
          </div>
          {hasLocalRequests && (
            <button className="btn btn-secondary" type="button" onClick={clearRequests}>مسح المحلي</button>
          )}
        </div>

        {recentRequests.length > 0 ? (
          <div className="account-request-list">
            {recentRequests.map((request) => (
              <div className="account-request-item" key={request.id}>
                <div>
                  <span>{request.type} · {request.source === 'supabase' ? 'Supabase' : 'هذا الجهاز'}</span>
                  <b>{request.title}</b>
                  <small>{request.contactPhone || request.sourcePage || 'طلب محفوظ'}</small>
                </div>
                <time>{new Date(request.createdAt).toLocaleDateString('ar-SA')}</time>
              </div>
            ))}
          </div>
        ) : (
          <div className="account-empty-requests">
            <h4>لا توجد طلبات حتى الآن</h4>
            <p>عندما ترسل طلب اهتمام، طلب سرية، أو تضيف مشروعًا، سيظهر هنا.</p>
          </div>
        )}
      </section>

      <section className="account-next-section">
        <div className="card">
          <h3>ربط الحساب</h3>
          <p>الطلبات الجديدة أثناء تسجيل الدخول سيتم ربطها بحسابك عبر Supabase عند تفعيل الأعمدة والسياسات.</p>
        </div>

        <div className="card">
          <h3>نصيحة سريعة</h3>
          <p>قبل إرسال أي فرصة، جهّز وصفًا مختصرًا، المدينة، القطاع، القيمة المطلوبة، والأرقام الأساسية.</p>
        </div>
      </section>

      <div className="hero-actions account-logout-row">
        <button className="btn btn-danger" onClick={logout}>تسجيل الخروج</button>
      </div>
    </div>
  );
}
