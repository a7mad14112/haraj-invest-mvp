'use client';

import { useEffect, useState } from 'react';
import { getSupabase } from '../lib/supabaseClient';

function getStatusLabelV75(status) {
  const value = String(status || 'new').toLowerCase();
  if (value.includes('review') || value.includes('progress')) return 'قيد المراجعة';
  if (value.includes('need') || value.includes('pending')) return 'بحاجة لاستكمال';
  if (value.includes('closed') || value.includes('done') || value.includes('completed')) return 'مكتمل';
  if (value.includes('rejected')) return 'مغلق';
  return 'طلب جديد';
}

function getStatusClassV75(status) {
  const value = String(status || 'new').toLowerCase();
  if (value.includes('review') || value.includes('progress')) return 'review';
  if (value.includes('need') || value.includes('pending')) return 'pending';
  if (value.includes('closed') || value.includes('done') || value.includes('completed')) return 'done';
  if (value.includes('rejected')) return 'closed';
  return 'new';
}

const STORAGE_KEY = 'haraj_invest_requests_v1';

function normalizeDbRequest(table, row) {
  const typeMap = {
    project_submissions: 'إضافة مشروع',
    interest_requests: 'طلب اهتمام',
    nda_requests: 'طلب سرية'
  };

  return {
    id: `${table}-${row.id}`,
    type: typeMap[table] || 'طلب',
    title:
      row.project_name ||
      row.opportunity_reference ||
      row.interest_type ||
      'طلب جديد',
    contactPhone: row.contact_phone || '',
    sourcePage: row.source_page || '',
    createdAt: row.created_at || new Date().toISOString(),
    source: 'Supabase'
  };
}

function loadLocalRequests() {
  try {
    const stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(stored)
      ? stored.map((item) => ({
          id: item.id || `${Date.now()}-${Math.random()}`,
          type: item.type || 'طلب',
          title: item.title || 'طلب محفوظ',
          contactPhone: item.contactPhone || '',
          sourcePage: item.sourcePage || '',
          createdAt: item.createdAt || new Date().toISOString(),
          source: 'هذا الجهاز'
        }))
      : [];
  } catch {
    return [];
  }
}

export default function MyRequestsBox() {
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('جاري تحميل الطلبات...');
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    async function load() {
      const localRequests = loadLocalRequests();

      try {
        const supabase = getSupabase();
        const { data } = await supabase.auth.getSession();
        const user = data?.session?.user;

        if (!user?.id) {
          setRequests(localRequests);
          setStatus('سجّل دخولك لربط الطلبات بحسابك. تظهر هنا الطلبات المحفوظة على هذا الجهاز فقط.');
          setLoading(false);
          return;
        }

        const tables = ['project_submissions', 'interest_requests', 'nda_requests'];

        const results = await Promise.allSettled(
          tables.map(async (table) => {
            const { data, error } = await supabase
              .from(table)
              .select('*')
              .eq('user_id', user.id)
              .order('created_at', { ascending: false })
              .limit(10);

            if (error) throw error;
            return (data || []).map((row) => normalizeDbRequest(table, row));
          })
        );

        const dbRequests = results
          .filter((result) => result.status === 'fulfilled')
          .flatMap((result) => result.value);

        const hasRejected = results.some((result) => result.status === 'rejected');

        const merged = [...dbRequests, ...localRequests]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 12);

        setRequests(merged);

        if (dbRequests.length > 0) {
          setStatus('هذه آخر طلباتك المرتبطة بحسابك.');
        } else if (hasRejected) {
          setStatus('لم أستطع قراءة طلبات Supabase. تأكد من تشغيل ملف SQL الخاص بربط الطلبات.');
        } else {
          setStatus('لا توجد طلبات مرتبطة بحسابك في Supabase حتى الآن.');
        }
      } catch {
        setRequests(localRequests);
        setStatus('تعذر قراءة الطلبات من Supabase. تظهر الطلبات المحفوظة على هذا الجهاز فقط.');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  function clearLocal() {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      setRequests((current) => current.filter((item) => item.source === 'Supabase'));
    } catch {
      setRequests([]);
    }
  }

  return (
    <section className="account-requests-section account-requests-force-visible">
      <div className="account-section-head">
        <div>
          <h3>طلباتي</h3>
          <p>{loading ? 'جاري تحميل الطلبات...' : status}</p>
        </div>
        {requests.some((item) => item.source === 'هذا الجهاز') && (
          <button className="btn btn-secondary" type="button" onClick={clearLocal}>مسح المحلي</button>
        )}
      </div>

      {requests.length > 0 ? (
        <div className="account-request-list">
          {requests.map((request) => (
            <div className="account-request-item" key={request.id}>
              <div>
                <span>{request.type} · {request.source}</span>
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
          <p>أرسل طلب اهتمام، طلب سرية، أو أضف مشروعًا. بعدها سيظهر الطلب هنا.</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="/contact">أرسل اهتمامك</a>
            <a className="btn btn-secondary" href="/submit-project">أضف مشروعك</a>
          </div>
        </div>
      )}
    </section>
  );
}
