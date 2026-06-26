'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getSupabase, whatsappNumber } from '../lib/supabaseClient';
import { getOrCreateConversation, sendMessage } from '../lib/conversations';

const HARAAJ_REQUESTS_STORAGE_KEY = 'haraj_invest_requests_v1';

function requestTypeLabel(table) {
  if (table === 'project_submissions') return 'إضافة مشروع';
  if (table === 'interest_requests') return 'طلب اهتمام';
  if (table === 'nda_requests') return 'طلب سرية';
  if (table === 'partner_requests') return 'طلب شراكة';
  if (table === 'investor_profiles') return 'ملف مستثمر';
  return 'طلب';
}

function saveLocalRequest(table, payload) {
  if (typeof window === 'undefined') return;

  try {
    const previous = JSON.parse(window.localStorage.getItem(HARAAJ_REQUESTS_STORAGE_KEY) || '[]');
    const request = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      table,
      type: requestTypeLabel(table),
      title:
        payload.project_name ||
        payload.opportunity_reference ||
        payload.interest_type ||
        payload.partnership_type ||
        payload.preferred_sector ||
        'طلب جديد',
      contactName: payload.contact_name || '',
      contactPhone: payload.contact_phone || '',
      message: payload.message || payload.notes || payload.details || '',
      sourcePage: payload.source_page || (typeof location !== 'undefined' ? location.pathname + location.search : ''),
      createdAt: new Date().toISOString()
    };

    const next = [request, ...previous].slice(0, 20);
    window.localStorage.setItem(HARAAJ_REQUESTS_STORAGE_KEY, JSON.stringify(next));
  } catch (error) {
    console.warn('Could not save local request preview:', error);
  }
}

async function getCurrentUserFields(client) {
  try {
    const { data } = await client.auth.getSession();
    const user = data?.session?.user;
    if (!user) return {};
    return {
      user_id: user.id,
      user_email: user.email || null
    };
  } catch {
    return {};
  }
}

function removeUserFields(payload) {
  const clean = { ...payload };
  delete clean.user_id;
  delete clean.user_email;
  return clean;
}

function isMissingUserColumnError(error) {
  const message = String(error?.message || '').toLowerCase();
  return message.includes('user_id') || message.includes('user_email') || message.includes('column');
}

function encodeWhatsApp(text) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
}

function Message({ status }) {
  if (!status?.text) return null;
  return <div className={`form-message ${status.type}`} style={{ display: 'block' }}>{status.text}</div>;
}

function SubmitButton({ busy, disabled, children }) {
  return (
    <button className="btn btn-primary" type="submit" disabled={busy || disabled} aria-busy={busy}>
      {busy ? 'جاري الإرسال' : children}
      {busy && <span className="btn-spinner" aria-hidden="true" />}
    </button>
  );
}

async function insertOrWhatsapp({ table, payload, text, setStatus, ok }) {
  const supabase = getSupabase();

  try {
    const userFields = await getCurrentUserFields(supabase);
    const payloadWithUser = { ...payload, ...userFields };

    let result = await supabase.from(table).insert(payloadWithUser);

    if (result.error && Object.keys(userFields).length > 0 && isMissingUserColumnError(result.error)) {
      result = await supabase.from(table).insert(removeUserFields(payloadWithUser));
    }

    if (result.error) throw result.error;

    saveLocalRequest(table, payloadWithUser);
    setStatus({ type: 'success', text: ok || 'تم حفظ الطلب بنجاح. يمكنك مراجعة الطلب من صفحة الحساب إن كانت مفعلة.' });
  } catch (e) {
    console.error(e);
    saveLocalRequest(table, payload);
    setStatus({
      type: 'warn',
      text: 'تعذر الحفظ في قاعدة البيانات مؤقتًا. لم يتم تحويلك إلى واتساب. تم حفظ نسخة محلية في هذا الجهاز، ويمكنك المحاولة لاحقًا. إذا تكررت المشكلة، تأكد من تشغيل SQL المطلوب أو تواصل معنا من صفحة التواصل.'
    });
  }
}

export function ProjectForm() {
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    submitter_type: 'صاحب المشروع',
    broker_name: '',
    broker_authorization: 'مفوّض بالعرض من صاحب المشروع',
    broker_authorization_confirmed: false,
    commission_acknowledged: false,
    project_name: '',
    city: '',
    sector: '',
    opportunity_type: 'بيع كامل',
    asking_value: '',
    annual_revenue: '',
    annual_profit: '',
    assets_summary: '',
    project_status: 'قائم',
    description: '',
    has_media: '',
    media_types: [],
    media_note: '',
    contact_name: '',
    contact_phone: '',
    contact_email: ''
  });

  const isBroker = formData.submitter_type === 'وسيط مفوّض';

  const steps = [
    { id: 1, title: 'بيانات المشروع' },
    { id: 2, title: 'الأرقام الأساسية' },
    { id: 3, title: 'توفّر الصور والمستندات' },
    { id: 4, title: 'التواصل' },
    { id: 5, title: 'المراجعة' }
  ];

  function updateField(name, value) {
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function requiredFieldsForStep(currentStep) {
    if (currentStep === 1) {
      const base = ['project_name', 'city', 'sector'];
      return isBroker ? [...base, 'broker_name'] : base;
    }
    if (currentStep === 2) return ['asking_value'];
    if (currentStep === 3) return ['has_media'];
    if (currentStep === 4) return ['contact_name', 'contact_phone'];
    return [];
  }

  function toggleMediaType(value) {
    setFormData((current) => {
      const set = new Set(current.media_types);
      if (set.has(value)) set.delete(value); else set.add(value);
      return { ...current, media_types: Array.from(set) };
    });
  }

  function canContinue() {
    const baseOk = requiredFieldsForStep(step).every((field) => String(formData[field] || '').trim().length > 0);
    if (!baseOk) return false;
    if (step === 1 && isBroker && !formData.broker_authorization_confirmed) return false;
    if (step === steps.length && !formData.commission_acknowledged) return false;
    return true;
  }

  function nextStep() {
    if (!canContinue()) {
      setStatus({ type: 'warn', text: isBroker && step === 1 && !formData.broker_authorization_confirmed ? 'يجب تأكيد إقرار التفويض قبل المتابعة.' : step === 3 && !formData.has_media ? 'اختر حالة توفّر الصور والمستندات قبل المتابعة.' : 'أكمل الحقول الأساسية قبل المتابعة.' });
      return;
    }

    setStatus(null);
    setStep((current) => Math.min(current + 1, 5));
  }

  function prevStep() {
    setStatus(null);
    setStep((current) => Math.max(current - 1, 1));
  }

  async function submit(e) {
    e.preventDefault();
    if (busy) return;

    setStatus(null);

    if (!formData.commission_acknowledged) {
      setStatus({ type: 'warn', text: 'يجب تأكيد إقرار عمولة النجاح قبل الإرسال.' });
      return;
    }

    setStatus({ type: 'info', text: 'جاري إرسال المشروع... لا تغلق الصفحة.' });

    const payload = {
      submitter_type: formData.submitter_type,
      broker_name: isBroker ? formData.broker_name : null,
      broker_authorization: isBroker ? formData.broker_authorization : null,
      broker_authorization_confirmed: isBroker ? formData.broker_authorization_confirmed : false,
      project_name: formData.project_name,
      city: formData.city,
      sector: formData.sector,
      opportunity_type: formData.opportunity_type,
      asking_value: formData.asking_value,
      annual_revenue: formData.annual_revenue,
      annual_profit: formData.annual_profit,
      assets_summary: formData.assets_summary,
      project_status: formData.project_status,
      description: formData.description,
      has_media: formData.has_media,
      media_types: formData.has_media !== 'لا تتوفر حاليًا' ? formData.media_types.join('، ') : '',
      media_note: formData.media_note,
      commission_acknowledged: formData.commission_acknowledged,
      contact_name: formData.contact_name,
      contact_phone: formData.contact_phone,
      contact_email: formData.contact_email,
      source_page: location.pathname + location.search,
      status: 'new'
    };

    const submitterLine = isBroker
      ? `\nمقدّم الطلب: وسيط مفوّض\nجهة الوساطة: ${formData.broker_name}\nصفة التفويض: ${formData.broker_authorization}\nإقرار التفويض: ${formData.broker_authorization_confirmed ? 'نعم' : 'لا'}`
      : `\nمقدّم الطلب: صاحب المشروع`;

    const text = `إضافة مشروع في حراج إنڤست${submitterLine}\n\nالمشروع: ${payload.project_name}\nالمدينة: ${payload.city}\nالقطاع: ${payload.sector}\nنوع الفرصة: ${payload.opportunity_type}\nالقيمة المطلوبة: ${payload.asking_value}\nالإيرادات السنوية: ${payload.annual_revenue || '-'}\nالربح السنوي: ${payload.annual_profit || '-'}\nحالة المشروع: ${payload.project_status}\nالأصول/الموجودات: ${payload.assets_summary || '-'}\nالوصف: ${payload.description || '-'}\nتوفّر الصور: ${payload.has_media}${payload.media_types ? ' (' + payload.media_types + ')' : ''}${payload.media_note ? '\nملاحظة الصور: ' + payload.media_note : ''}\n\nالاسم: ${payload.contact_name}\nالجوال: ${payload.contact_phone}\nالبريد: ${payload.contact_email || '-'}`;

    setBusy(true);
    try {
    await insertOrWhatsapp({
      table: 'project_submissions',
      payload,
      text,
      setStatus,
      ok: 'تم إرسال مشروعك بنجاح.'
    });
    } finally {
      setBusy(false);
    }
  }

  const summaryRows = [
    ['مقدّم الطلب', formData.submitter_type],
    ...(isBroker ? [['جهة الوساطة', formData.broker_name], ['صفة التفويض', formData.broker_authorization], ['إقرار التفويض', formData.broker_authorization_confirmed ? 'نعم' : 'لا']] : []),
      ['إقرار عمولة النجاح', formData.commission_acknowledged ? 'نعم' : 'لا'],
    ['اسم المشروع', formData.project_name],
    ['المدينة', formData.city],
    ['القطاع', formData.sector],
    ['نوع الفرصة', formData.opportunity_type],
    ['القيمة المطلوبة', formData.asking_value],
    ['الإيرادات السنوية', formData.annual_revenue],
    ['الربح السنوي', formData.annual_profit],
    ['حالة المشروع', formData.project_status],
    ['توفّر الصور', formData.has_media === 'لا تتوفر حاليًا' ? formData.has_media : `${formData.has_media}${formData.media_types.length ? ' — ' + formData.media_types.join('، ') : ''}`],
    ['الاسم', formData.contact_name],
    ['الجوال', formData.contact_phone],
    ['البريد', formData.contact_email]
  ];

  return (
    <>
    <div className="project-submit-helper-v76">املأ البيانات الأساسية بوضوح. يمكنك إرسال المشروع حتى لو كانت بعض الأرقام تقديرية، بشرط توضيح ذلك في الملاحظات.</div>
    <form onSubmit={submit} className="project-wizard-v43">
      <div className="wizard-progress-v43">
        {steps.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`wizard-step-v43 ${step === item.id ? 'active' : ''} ${step > item.id ? 'done' : ''}`}
            onClick={() => item.id < step && setStep(item.id)}
          >
            <span>{item.id}</span>
            <b>{item.title}</b>
          </button>
        ))}
      </div>

      <Message status={status} />

      {step === 1 && (
        <section className="wizard-panel-v43">
          <div className="wizard-panel-head-v43">
            <span className="eyebrow">الخطوة 1</span>
            <h2>بيانات المشروع</h2>
            <p>اكتب المعلومات الأساسية التي تساعد على فهم الفرصة بسرعة.</p>
          </div>

          <div className="form-grid">
            <div className="form-field full">
              <label htmlFor="pf-submitter-type">تقدّم هذه الفرصة بصفتك</label>
              <select id="pf-submitter-type" value={formData.submitter_type} onChange={(e) => updateField('submitter_type', e.target.value)}>
                <option>صاحب المشروع</option>
                <option>وسيط مفوّض</option>
              </select>
            </div>

            {isBroker && (
              <>
                <div className="form-field full">
                  <div className="info-note compact-note">
                    بصفتك وسيطًا، تُقر بأنك مخوّل بعرض هذه الفرصة نيابة عن صاحبها. المنصة تنظم عرض الفرصة وتسهل التواصل الأولي، وقد تستحق عمولة نجاح عند إتمام صفقة ناتجة عن التواصل عبرها وفق الشروط المعتمدة.
                  </div>
                </div>
                <div className="form-field"><label><span className="lbl">اسم جهة الوساطة</span><input value={formData.broker_name} onChange={(e) => updateField('broker_name', e.target.value)} placeholder="اسمك أو اسم المكتب/الشركة" required /></label></div>
                <div className="form-field">
                  <label htmlFor="pf-broker-authorization">صفة التفويض</label>
                  <select id="pf-broker-authorization" value={formData.broker_authorization} onChange={(e) => updateField('broker_authorization', e.target.value)}>
                    <option>مفوّض بالعرض من صاحب المشروع</option>
                    <option>وكالة أو تفويض موثّق</option>
                    <option>اتفاق وساطة قائم</option>
                  </select>
                </div>

                <div className="form-field full">
                  <label className="checkbox-line-v109">
                    <input
                      type="checkbox"
                      checked={formData.broker_authorization_confirmed}
                      onChange={(e) => updateField('broker_authorization_confirmed', e.target.checked)}
                      required
                    />
                    <span>أقر بأن لدي تفويضًا من صاحب المشروع لعرض هذه الفرصة، وأنني أتحمل مسؤولية صحة هذه الصفة. كما أفهم أن حراج إنڤست ينظم عرض الفرص ويسهل التواصل، وقد يستحق عمولة نجاح بنسبة 5% عند إتمام صفقة ناتجة عن التواصل عبر المنصة وفق الشروط المعتمدة.</span>
                  </label>
                </div>
              </>
            )}

            <div className="form-field"><label><span className="lbl">اسم المشروع</span><input value={formData.project_name} onChange={(e) => updateField('project_name', e.target.value)} required /></label></div>
            <div className="form-field"><label><span className="lbl">المدينة</span><input value={formData.city} onChange={(e) => updateField('city', e.target.value)} required /></label></div>
            <div className="form-field"><label><span className="lbl">القطاع</span><input value={formData.sector} onChange={(e) => updateField('sector', e.target.value)} required /></label></div>
            <div className="form-field">
              <label htmlFor="pf-opportunity-type">نوع الفرصة</label>
              <select id="pf-opportunity-type" value={formData.opportunity_type} onChange={(e) => updateField('opportunity_type', e.target.value)}>
                <option>بيع كامل</option>
                <option>شراكة</option>
                <option>تمويل توسع</option>
                <option>تخارج جزئي</option>
                <option>امتياز تجاري</option>
              </select>
            </div>
            <div className="form-field full">
              <label htmlFor="pf-description">وصف مختصر</label>
              <textarea id="pf-description" value={formData.description} onChange={(e) => updateField('description', e.target.value)} placeholder="اكتب وصفًا مختصرًا عن المشروع، نشاطه، وموقعه." />
            </div>
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="wizard-panel-v43">
          <div className="wizard-panel-head-v43">
            <span className="eyebrow">الخطوة 2</span>
            <h2>الأرقام الأساسية</h2>
            <p>أدخل أرقامًا أولية تساعد على قراءة المشروع. يمكن استكمال التفاصيل لاحقًا.</p>
          </div>

          <div className="form-grid">
            <div className="form-field"><label><span className="lbl">القيمة المطلوبة</span><input value={formData.asking_value} onChange={(e) => updateField('asking_value', e.target.value)} placeholder="مثال: 450,000 ريال" required /></label></div>
            <div className="form-field"><label><span className="lbl">الإيرادات السنوية</span><input value={formData.annual_revenue} onChange={(e) => updateField('annual_revenue', e.target.value)} placeholder="اختياري" /></label></div>
            <div className="form-field"><label><span className="lbl">الربح السنوي</span><input value={formData.annual_profit} onChange={(e) => updateField('annual_profit', e.target.value)} placeholder="اختياري" /></label></div>
            <div className="form-field">
              <label htmlFor="pf-project-status">حالة المشروع</label>
              <select id="pf-project-status" value={formData.project_status} onChange={(e) => updateField('project_status', e.target.value)}>
                <option>قائم</option>
                <option>قيد التشغيل</option>
                <option>جاهز للإطلاق</option>
                <option>فكرة قابلة للتنفيذ</option>
                <option>يحتاج تطوير</option>
              </select>
            </div>
            <div className="form-field full">
              <label htmlFor="pf-assets-summary">الأصول أو الموجودات</label>
              <textarea id="pf-assets-summary" value={formData.assets_summary} onChange={(e) => updateField('assets_summary', e.target.value)} placeholder="مثال: معدات، عقود، مخزون، موقع، تراخيص..." />
            </div>
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="wizard-panel-v43">
          <div className="wizard-panel-head-v43">
            <span className="eyebrow">الخطوة 3</span>
            <h2>توفّر الصور والمستندات</h2>
            <p>لا حاجة لرفع ملفات الآن. أخبرنا فقط بما هو متاح، وسنطلبه عند جدّية المهتم.</p>
          </div>

          <div className="form-grid">
            <div className="form-field full">
              <label htmlFor="pf-has-media">هل تتوفر صور للمشروع؟</label>
              <select id="pf-has-media" value={formData.has_media} onChange={(e) => updateField('has_media', e.target.value)} required>
                <option value="">اختر الحالة</option>
                <option>نعم</option>
                <option>سأوفّرها لاحقًا</option>
                <option>لا تتوفر حاليًا</option>
              </select>
            </div>

            {formData.has_media !== 'لا تتوفر حاليًا' && (
              <div className="form-field full">
                <label>ما المتاح؟ (اختر ما ينطبق)</label>
                <div className="media-options-v111">
                  {['صور للموقع', 'صور للمنتجات', 'مخطط أو تصميم', 'مستندات ورخص', 'فيديو'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className={`media-chip-v111 ${formData.media_types.includes(opt) ? 'is-on' : ''}`}
                      onClick={() => toggleMediaType(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="form-field full">
              <label htmlFor="pf-media-note">ملاحظة (اختياري)</label>
              <textarea id="pf-media-note" value={formData.media_note} onChange={(e) => updateField('media_note', e.target.value)} placeholder="مثال: تتوفر صور حديثة للموقع وعقد الإيجار، أرسلها عند الطلب." />
            </div>

            <div className="form-field full">
              <div className="info-note compact-note">
                ملاحظة خصوصية: أي صور أو مستندات تشاركها لاحقًا قد تُعرض ضمن الفرصة. لا ترسل بيانات شخصية أو حساسة قبل تنظيم السرية.
              </div>
            </div>
          </div>
        </section>
      )}

      {step === 4 && (
        <section className="wizard-panel-v43">
          <div className="wizard-panel-head-v43">
            <span className="eyebrow">الخطوة 4</span>
            <h2>بيانات التواصل</h2>
            <p>هذه البيانات تستخدم للتواصل والمتابعة حول المشروع.</p>
          </div>

          <div className="form-grid">
            <div className="form-field"><label><span className="lbl">الاسم</span><input value={formData.contact_name} onChange={(e) => updateField('contact_name', e.target.value)} required /></label></div>
            <div className="form-field"><label><span className="lbl">رقم الجوال</span><input value={formData.contact_phone} onChange={(e) => updateField('contact_phone', e.target.value)} required /></label></div>
            <div className="form-field full"><label><span className="lbl">البريد الإلكتروني</span><input type="email" value={formData.contact_email} onChange={(e) => updateField('contact_email', e.target.value)} placeholder="اختياري" /></label></div>
          </div>
        </section>
      )}

      {step === 5 && (
        <section className="wizard-panel-v43">
          <div className="wizard-panel-head-v43">
            <span className="eyebrow">الخطوة 5</span>
            <h2>مراجعة وإرسال</h2>
            <p>راجع البيانات قبل إرسال المشروع.</p>
          </div>

          <div className="wizard-summary-v43">
            {summaryRows.map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <b>{value || '-'}</b>
              </div>
            ))}
          </div>

          <div className="wizard-description-review-v43">
            <h3>الوصف</h3>
            <p>{formData.description || 'لم يتم إضافة وصف.'}</p>
          </div>
        </section>
      )}


      {step === 5 && (
        <div className="commission-acknowledgment-v112">
          <label>
            <input
              type="checkbox"
              checked={formData.commission_acknowledged}
              onChange={(e) => updateField('commission_acknowledged', e.target.checked)}
              required
            />
            <span>
              أقر بأنني اطلعت على آلية عمل حراج إنڤست، وأفهم أن المنصة تنظّم عرض الفرص وتسهّل التواصل بين الأطراف، وقد تستحق عمولة نجاح بنسبة 5% عند إتمام صفقة ناتجة عن التواصل عبر المنصة وفق الشروط المعتمدة.
            </span>
          </label>
        </div>
      )}

      {step === 5 && (
        <div className="project-submit-bottom-message-v114">
          <Message status={status} />
        </div>
      )}

      <div className="wizard-actions-v43">
        {step > 1 && <button className="btn btn-secondary" type="button" onClick={prevStep}>السابق</button>}
        {step < 5 && <button className="btn btn-primary" type="button" onClick={nextStep}>التالي</button>}
        {step === 5 && (
          <SubmitButton busy={busy}>إرسال المشروع</SubmitButton>
        )}
      </div>
    </form>
    </>
  );
}

export function InterestForm({ compact = false, opportunityContext = null }) {
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);
  const [session, setSession] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const supabase = getSupabase();
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data?.session || null);
      setAuthChecked(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      if (active) setSession(s);
    });
    return () => {
      active = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

  async function submit(e) {
    e.preventDefault();
    if (busy) return;

    // المرحلة 1: تسجيل الدخول إجباري — لا إرسال بلا حساب (لتوثيق التواصل وحماية العمولة)
    if (!session) {
      setStatus({ type: 'error', text: 'يلزم تسجيل الدخول قبل إرسال طلب اهتمام، لتوثيق التواصل عبر المنصة.' });
      return;
    }

    const form = e.currentTarget;
    const f = new FormData(form);
    const payload = Object.fromEntries(f.entries());
    const opportunityLine = opportunityContext ? `\nالفرصة محل الاهتمام: ${opportunityContext.title}` : '';

    const dbPayload = {
      contact_name: payload.name,
      contact_phone: payload.phone,
      interest_type: payload.interest,
      financial_capacity: payload.capacity,
      message: opportunityContext ? `[${opportunityContext.title}] ${payload.message}` : payload.message,
      source_page: location.pathname + location.search,
      status: 'new'
    };

    const text = `طلب اهتمام في حراج إنڤست${opportunityLine}\n\nالاسم: ${payload.name}\nالجوال: ${payload.phone}\nنوع الاهتمام: ${payload.interest}\nالقدرة المالية: ${payload.capacity}\n\nالرسالة: ${payload.message}`;

    setBusy(true);
    try {
      await insertOrWhatsapp({
        table: 'interest_requests',
        payload: dbPayload,
        text,
        setStatus,
        ok: 'تم إرسال اهتمامك بنجاح. سنراجع الطلب وننتقل للخطوة المناسبة.'
      });

      // المرحلة 2: أنشئ محادثة موثّقة وابدأها برسالة المهتم الأولى
      try {
        const conv = await getOrCreateConversation({
          opportunityId: opportunityContext?.slug || opportunityContext?.id || null,
          opportunityTitle: opportunityContext?.title || 'فرصة عامة',
        });
        const firstMsg = `طلب اهتمام:\nنوع الاهتمام: ${payload.interest}\nالقدرة المالية: ${payload.capacity}\n\n${payload.message || ''}`.trim();
        await sendMessage({ conversationId: conv.id, body: firstMsg });
        setStatus({
          type: 'success',
          text: 'تم إرسال اهتمامك وبدء محادثة موثّقة. تابع التواصل من صفحة "محادثاتي".'
        });
      } catch (convErr) {
        // لو فشل إنشاء المحادثة، الطلب نفسه نجح — لا نُفشل العملية
        console.error('conversation creation failed', convErr);
      }

      form.reset();
    } finally {
      setBusy(false);
    }
  }

  // بوّابة المرحلة 1: إن لم يكن مسجّلًا، اعرض نداء الدخول بدل النموذج
  if (authChecked && !session) {
    const next = typeof window !== 'undefined' ? location.pathname + location.search : '/';
    return (
      <div className="interest-auth-gate-v137">
        <div className="info-note">
          لإرسال طلب اهتمام، يلزم تسجيل الدخول أولًا. هذا يضمن توثيق التواصل عبر المنصة
          وحفظ حقوق جميع الأطراف.
        </div>
        <div className="interest-auth-actions-v137">
          <Link className="btn btn-primary" href={`/login?next=${encodeURIComponent(next)}`}>
            تسجيل الدخول
          </Link>
          <Link className="btn btn-secondary" href={`/signup?next=${encodeURIComponent(next)}`}>
            إنشاء حساب جديد
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="form-grid form-grid-v62">
      {opportunityContext && (
        <div className="form-field full">
          <div className="info-note compact-note">
            الفرصة محل الاهتمام: <b>{opportunityContext.title}</b>
          </div>
        </div>
      )}

      <div className="form-field">
        <label htmlFor="if-name">الاسم</label>
        <input id="if-name" name="name" autoComplete="name" placeholder="اكتب اسمك" required />
      </div>

      <div className="form-field">
        <label htmlFor="if-phone">رقم الجوال</label>
        <input id="if-phone" name="phone" inputMode="tel" autoComplete="tel" placeholder="05xxxxxxxx" required />
      </div>

      <div className="form-field">
        <label htmlFor="if-interest">نوع الاهتمام</label>
        <select id="if-interest" name="interest">
          <option>شراء كامل</option>
          <option>شراكة</option>
          <option>استثمار</option>
          <option>استفسار أولي</option>
          <option>طلب NDA</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="if-capacity">القدرة المالية</label>
        <select id="if-capacity" name="capacity">
          <option>أفضل عدم الإفصاح</option>
          <option>100 - 500 ألف</option>
          <option>500 ألف - مليون</option>
          <option>أكثر من مليون</option>
        </select>
      </div>

      <div className="form-field full">
        <label htmlFor="if-message">الرسالة</label>
        <textarea id="if-message" name="message" placeholder="مثال: مهتم بالشراكة في فرصة تشغيلية بالرياض وأرغب بمراجعة التفاصيل بعد NDA." required />
        <small className="form-helper-v62">اذكر نوع الاهتمام، سبب الاهتمام، والخطوة التي تتوقعها بعد الإرسال.</small>
      </div>

      <Message status={status} />

      <div className="form-field full">
        <SubmitButton busy={busy}>إرسال الطلب</SubmitButton>
      </div>
    </form>
  );
}

export function NdaForm({ opportunityContext = null }) {
  const [status, setStatus] = useState(null);
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (busy) return;

    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    const opportunityLine = opportunityContext ? `\nالفرصة محل طلب السرية: ${opportunityContext.title}` : '';

    const dbPayload = {
      contact_name: payload.name,
      contact_phone: payload.phone,
      requester_role: payload.role,
      opportunity_reference: opportunityContext ? opportunityContext.title : payload.opportunity,
      notes: opportunityContext ? `[${opportunityContext.title}] ${payload.notes || ''}` : payload.notes,
      source_page: location.pathname + location.search,
      status: 'new'
    };

    const text = `طلب NDA في حراج إنڤست${opportunityLine}\n\nالاسم: ${payload.name}\nالجوال: ${payload.phone}\nالصفة: ${payload.role}\nالفرصة/القطاع: ${opportunityContext ? opportunityContext.title : payload.opportunity}\nملاحظات: ${payload.notes || ''}`;

    setBusy(true);
    try {
      await insertOrWhatsapp({
        table: 'nda_requests',
        payload: dbPayload,
        text,
        setStatus,
        ok: 'تم إرسال طلب السرية بنجاح. سنراجع الطلب ونحدد الخطوة التالية.'
      });

      form.reset();
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="form-grid form-grid-v62">
      {opportunityContext && (
        <div className="form-field full">
          <div className="info-note compact-note">
            الفرصة محل طلب السرية: <b>{opportunityContext.title}</b>
          </div>
        </div>
      )}

      <div className="form-field">
        <label htmlFor="nda-name">الاسم</label>
        <input id="nda-name" name="name" autoComplete="name" placeholder="اكتب اسمك" required />
      </div>

      <div className="form-field">
        <label htmlFor="nda-phone">رقم الجوال</label>
        <input id="nda-phone" name="phone" inputMode="tel" autoComplete="tel" placeholder="05xxxxxxxx" required />
      </div>

      <div className="form-field">
        <label htmlFor="nda-role">الصفة</label>
        <select id="nda-role" name="role">
          <option>صاحب مشروع</option>
          <option>مهتم بالفرص</option>
          <option>مستشار</option>
        </select>
      </div>

      <div className="form-field">
        <label htmlFor="nda-opportunity">الفرصة أو القطاع</label>
        <input id="nda-opportunity" name="opportunity" defaultValue={opportunityContext ? opportunityContext.title : ''} readOnly={Boolean(opportunityContext)} placeholder="مثال: مقهى قائم في الرياض" />
      </div>

      <div className="form-field full">
        <label htmlFor="nda-notes">ملاحظات</label>
        <textarea id="nda-notes" name="notes" placeholder="مثال: أرغب بمراجعة القوائم المالية والعقود بعد تنظيم السرية." />
        <small className="form-helper-v62">اذكر نوع المعلومات المطلوبة بعد NDA مثل القوائم المالية، العقود، الرخص، أو بيانات التشغيل.</small>
      </div>

      <Message status={status} />

      <div className="form-field full">
        <SubmitButton busy={busy}>إرسال طلب السرية</SubmitButton>
      </div>
    </form>
  );
}

