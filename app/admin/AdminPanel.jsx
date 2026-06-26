'use client';

import { useEffect, useMemo, useState } from 'react';
import { getSupabase } from '../../lib/supabaseClient';

const ADMIN_EMAILS = [
  'ahmad.elshehri@gmail.com',
  'ahmad.elshehri2@gmail.com'
];

const STATUS_OPTIONS = [
  { value: 'all', label: 'كل الحالات' },
  { value: 'new', label: 'جديد' },
  { value: 'reviewing', label: 'قيد المراجعة' },
  { value: 'contacted', label: 'تم التواصل' },
  { value: 'closed', label: 'مغلق' }
];

const FOLLOWUP_OPTIONS = [
  { value: 'all', label: 'كل المتابعات' },
  { value: 'overdue', label: 'متأخرة' },
  { value: 'today', label: 'اليوم' },
  { value: 'upcoming', label: 'قادمة' },
  { value: 'none', label: 'بدون متابعة' }
];

const PRIORITY_OPTIONS = [
  { value: 'all', label: 'كل الأولويات' },
  { value: 'low', label: 'منخفضة' },
  { value: 'normal', label: 'عادية' },
  { value: 'high', label: 'عالية' },
  { value: 'urgent', label: 'عاجلة' }
];

const UPDATE_STATUS_OPTIONS = STATUS_OPTIONS.filter((item) => item.value !== 'all');
const UPDATE_PRIORITY_OPTIONS = PRIORITY_OPTIONS.filter((item) => item.value !== 'all');

const TABLES = [
  {
    key: 'interest_requests',
    label: 'طلبات الاهتمام',
    titleField: 'interest_type',
    columns: ['contact_name', 'contact_phone', 'interest_type', 'financial_capacity', 'message', 'source_page']
  },
  {
    key: 'nda_requests',
    label: 'طلبات السرية',
    titleField: 'opportunity_reference',
    columns: ['contact_name', 'contact_phone', 'requester_role', 'opportunity_reference', 'notes', 'source_page']
  },
  {
    key: 'project_submissions',
    label: 'المشاريع المرسلة',
    titleField: 'project_name',
    columns: ['project_name', 'city', 'sector', 'opportunity_type', 'asking_value', 'submitter_type', 'has_media', 'marketplace_published', 'opportunity_slug', 'contact_name', 'contact_phone']
  },
  {
    key: 'questions',
    label: 'الأسئلة الواردة',
    titleField: 'question',
    columns: ['name', 'question', 'answer', 'is_published', 'category', 'contact', 'created_at']
  },
  {
    key: 'conversations',
    label: 'المحادثات',
    titleField: 'opportunity_title',
    columns: ['opportunity_title', 'interested_email', 'status', 'last_message_preview', 'last_message_at', 'created_at']
  },
  {
    key: 'messages',
    label: 'الرسائل',
    titleField: 'body',
    columns: ['conversation_id', 'sender_role', 'body', 'body_raw', 'was_masked', 'created_at']
  }
];

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function followupState(value) {
  if (!value) return 'none';
  const today = todayISO();
  if (value < today) return 'overdue';
  if (value === today) return 'today';
  return 'upcoming';
}

function followupLabel(value) {
  const state = followupState(value);
  if (state === 'overdue') return 'متأخرة';
  if (state === 'today') return 'اليوم';
  if (state === 'upcoming') return 'قادمة';
  return 'بدون متابعة';
}

function followupClass(value) {
  const state = followupState(value);
  if (state === 'overdue') return 'followup-overdue';
  if (state === 'today') return 'followup-today';
  if (state === 'upcoming') return 'followup-upcoming';
  return 'followup-none';
}

function fmtDate(value) {
  if (!value) return '-';
  try {
    return new Date(value).toLocaleDateString('ar-SA');
  } catch {
    return '-';
  }
}

function valueOf(row, field) {
  const value = row?.[field];
  if (value === null || value === undefined || value === '') return '-';
  return String(value);
}

function statusLabel(value) {
  return UPDATE_STATUS_OPTIONS.find((item) => item.value === value)?.label || 'جديد';
}

function statusClass(value) {
  if (value === 'reviewing') return 'status-reviewing';
  if (value === 'contacted') return 'status-contacted';
  if (value === 'closed') return 'status-closed';
  return 'status-new';
}

function priorityLabel(value) {
  return UPDATE_PRIORITY_OPTIONS.find((item) => item.value === value)?.label || 'عادية';
}

function priorityClass(value) {
  if (value === 'urgent') return 'priority-urgent';
  if (value === 'high') return 'priority-high';
  if (value === 'low') return 'priority-low';
  return 'priority-normal';
}

function searchableText(row) {
  return Object.values(row || {}).join(' ').toLowerCase();
}

function csvEscape(value) {
  const raw = value === null || value === undefined ? '' : String(value);
  return `"${raw.replaceAll('"', '""')}"`;
}

function downloadCsv(filename, rows, columns) {
  const header = columns.map(csvEscape).join(',');
  const body = rows.map((row) => columns.map((column) => csvEscape(row[column])).join(',')).join('\n');
  const csv = '\uFEFF' + [header, body].filter(Boolean).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function normalizePhone(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('966')) return digits;
  if (digits.startsWith('05')) return `966${digits.slice(1)}`;
  if (digits.startsWith('5')) return `966${digits}`;
  return digits;
}

function getContactPhone(row) {
  return normalizePhone(row.contact_phone || row.phone || '');
}

function adminWhatsAppUrl(row, title) {
  const phone = getContactPhone(row);
  const message = `مرحبًا، معك فريق حراج إنڤست بخصوص طلبك: ${title}. نرغب في المتابعة معك.`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function copyAdminSummary(row, title) {
  const summary = [
    `الطلب: ${title}`,
    `الاسم: ${row.contact_name || '-'}`,
    `الجوال: ${row.contact_phone || '-'}`,
    `الحالة: ${statusLabel(row.status || 'new')}`,
    `الأولوية: ${priorityLabel(row.priority || 'normal')}`,
    `تاريخ المتابعة: ${row.follow_up_at || '-'}`,
    `ملاحظات: ${row.internal_notes || '-'}`
  ].join('\n');

  if (navigator?.clipboard?.writeText) {
    navigator.clipboard.writeText(summary);
  }
}

function sortRows(rows) {
  const priorityWeight = { urgent: 0, high: 1, normal: 2, low: 3 };
  const followupWeight = { overdue: 0, today: 1, upcoming: 2, none: 3 };

  return [...rows].sort((a, b) => {
    const pDiff = (priorityWeight[a.priority || 'normal'] ?? 2) - (priorityWeight[b.priority || 'normal'] ?? 2);
    if (pDiff !== 0) return pDiff;

    const fDiff = followupWeight[followupState(a.follow_up_at)] - followupWeight[followupState(b.follow_up_at)];
    if (fDiff !== 0) return fDiff;

    if (a.follow_up_at && b.follow_up_at) {
      return String(a.follow_up_at).localeCompare(String(b.follow_up_at));
    }

    return new Date(b.created_at || 0) - new Date(a.created_at || 0);
  });
}

function groupRowsByStatus(rows) {
  return UPDATE_STATUS_OPTIONS.map((status) => ({
    ...status,
    rows: rows.filter((row) => (row.status || 'new') === status.value)
  }));
}

function compactText(value, fallback = '') {
  const text = String(value || '').trim();
  return text || fallback;
}

function shortenText(value, limit = 240) {
  const text = compactText(value, '');
  if (!text) return '';
  return text.length > limit ? `${text.slice(0, limit - 1)}…` : text;
}

function createOpportunityPayloadFromSubmission(row) {
  const slug = row.opportunity_slug || `project-${String(row.id || Date.now()).slice(0, 8)}`;
  const description = compactText(row.description || row.details, 'فرصة تجارية تحتاج إلى مراجعة مستقلة قبل أي متابعة.');
  const revenue = compactText(row.annual_revenue || row.revenue_estimate, 'غير معلن');
  const profit = compactText(row.annual_profit || row.profit_estimate, 'غير معلن');
  const mediaStatus = compactText(row.has_media, '');

  return {
    slug,
    title: compactText(row.project_name, 'فرصة بدون عنوان'),
    city: compactText(row.city, 'غير محدد'),
    sector: compactText(row.sector, 'غير محدد'),
    opportunity_type: compactText(row.opportunity_type, 'غير محدد'),
    asking_value: compactText(row.asking_value, 'غير معلن'),
    revenue_estimate: revenue,
    profit_estimate: profit,
    summary: shortenText(description || row.project_name, 240),
    description,
    verification_status: 'مراجعة مبدئية',
    risk_level: 'متوسط',
    readiness_status: mediaStatus === 'نعم' ? 'جاهز للتواصل' : 'يحتاج استكمال',
    strengths: [
      'بيانات أولية متاحة',
      row.project_status ? `حالة المشروع: ${row.project_status}` : 'قابل للمراجعة',
      mediaStatus ? `المواد الداعمة: ${mediaStatus}` : 'يحتاج فحصًا مستقلًا'
    ].filter(Boolean),
    risks: [
      'فحص الأرقام',
      'مراجعة المستندات',
      'التحقق من الالتزامات'
    ],
    documents: [
      mediaStatus ? `توفّر الصور والمستندات: ${mediaStatus}` : 'السجل أو الرخص',
      row.media_types ? `نوع المواد: ${Array.isArray(row.media_types) ? row.media_types.join('، ') : row.media_types}` : 'بيانات مالية عند الجدية',
      row.media_note ? `ملاحظة المواد: ${row.media_note}` : 'مستندات داعمة عند الحاجة'
    ].filter(Boolean),
    provided_via: row.submitter_type === 'وسيط مفوّض' ? 'وسيط مفوّض' : null,
    source_submission_id: row.id || null,
    is_published: true
  };
}

export default function AdminPanel() {
  const [session, setSession] = useState(null);
  const [activeTable, setActiveTable] = useState('interest_requests');
  const [records, setRecords] = useState({});
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('جاري تحميل البيانات...');
  const [updatingId, setUpdatingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [followupFilter, setFollowupFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [editingNotes, setEditingNotes] = useState({});
  const [viewMode, setViewMode] = useState('list');

  const activeConfig = useMemo(
    () => TABLES.find((table) => table.key === activeTable) || TABLES[0],
    [activeTable]
  );

  const isAdmin = Boolean(session?.user?.email && ADMIN_EMAILS.includes(session.user.email));

  useEffect(() => {
    async function boot() {
      const supabase = getSupabase();
      const { data } = await supabase.auth.getSession();
      const currentSession = data.session || null;
      setSession(currentSession);

      if (!currentSession) {
        setStatus('يجب تسجيل الدخول أولًا.');
        setLoading(false);
        return;
      }

      if (!ADMIN_EMAILS.includes(currentSession.user.email)) {
        setStatus('هذا الحساب لا يملك صلاحية الإدارة.');
        setLoading(false);
        return;
      }

      try {
        const nextRecords = {};

        for (const table of TABLES) {
          const { data: rows, error } = await supabase
            .from(table.key)
            .select('*')
            .order('created_at', { ascending: false })
            .limit(50);

          if (error) throw error;
          nextRecords[table.key] = rows || [];
        }

        setRecords(nextRecords);
        setStatus('تم تحميل الطلبات بنجاح.');
      } catch (error) {
        console.error(error);
        setStatus('تعذر تحميل الطلبات. تأكد من تشغيل ملفات SQL الخاصة بلوحة الإدارة في Supabase.');
      } finally {
        setLoading(false);
      }
    }

    boot();
  }, []);

  function patchRecord(tableKey, rowId, patch) {
    setRecords((current) => ({
      ...current,
      [tableKey]: (current[tableKey] || []).map((row) =>
        row.id === rowId ? { ...row, ...patch } : row
      )
    }));
  }

  async function updateRecord(tableKey, rowId, patch, successMessage) {
    setUpdatingId(`${tableKey}-${rowId}`);
    setStatus('جاري تحديث الطلب...');

    try {
      const supabase = getSupabase();

      const { error } = await supabase
        .from(tableKey)
        .update(patch)
        .eq('id', rowId);

      if (error) throw error;

      patchRecord(tableKey, rowId, patch);
      setStatus(successMessage || 'تم التحديث بنجاح.');
    } catch (error) {
      console.error(error);
      setStatus('تعذر التحديث. تأكد من تشغيل ملف SQL الخاص بالإدارة.');
    } finally {
      setUpdatingId(null);
    }
  }

  function updateRecordStatus(tableKey, rowId, nextStatus) {
    return updateRecord(tableKey, rowId, { status: nextStatus }, 'تم تحديث الحالة بنجاح.');
  }

  function updateRecordPriority(tableKey, rowId, nextPriority) {
    return updateRecord(tableKey, rowId, { priority: nextPriority }, 'تم تحديث الأولوية بنجاح.');
  }

  function saveInternalNotes(tableKey, rowId) {
    const key = `${tableKey}-${rowId}`;
    const notes = editingNotes[key] ?? '';
    return updateRecord(tableKey, rowId, { internal_notes: notes }, 'تم حفظ الملاحظات الداخلية.');
  }

  function updateFollowUpDate(tableKey, rowId, value) {
    return updateRecord(tableKey, rowId, { follow_up_at: value || null }, 'تم تحديث تاريخ المتابعة.');
  }

  const currentRows = records[activeConfig.key] || [];

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase();

    const filtered = currentRows.filter((row) => {
      const rowStatus = row.status || 'new';
      const rowFollowupState = followupState(row.follow_up_at);
      const rowPriority = row.priority || 'normal';
      const matchesStatus = statusFilter === 'all' || rowStatus === statusFilter;
      const matchesFollowup = followupFilter === 'all' || rowFollowupState === followupFilter;
      const matchesPriority = priorityFilter === 'all' || rowPriority === priorityFilter;
      const matchesSearch = !q || searchableText(row).includes(q);
      return matchesStatus && matchesFollowup && matchesPriority && matchesSearch;
    });

    return sortRows(filtered);
  }, [currentRows, search, statusFilter, followupFilter, priorityFilter]);

  const totalCount = TABLES.reduce((sum, table) => sum + (records[table.key]?.length || 0), 0);
  const boardGroups = useMemo(() => groupRowsByStatus(filteredRows), [filteredRows]);

  const statusMetrics = useMemo(() => {
    const metrics = { new: 0, reviewing: 0, contacted: 0, closed: 0 };
    currentRows.forEach((row) => {
      const rowStatus = row.status || 'new';
      if (metrics[rowStatus] !== undefined) metrics[rowStatus] += 1;
    });
    return metrics;
  }, [currentRows]);

  const followupMetrics = useMemo(() => {
    const metrics = { overdue: 0, today: 0, upcoming: 0, none: 0 };
    currentRows.forEach((row) => {
      metrics[followupState(row.follow_up_at)] += 1;
    });
    return metrics;
  }, [currentRows]);

  const priorityMetrics = useMemo(() => {
    const metrics = { urgent: 0, high: 0, normal: 0, low: 0 };
    currentRows.forEach((row) => {
      const rowPriority = row.priority || 'normal';
      if (metrics[rowPriority] !== undefined) metrics[rowPriority] += 1;
    });
    return metrics;
  }, [currentRows]);


  async function publishProjectSubmission(row) {
    if (!row?.id) return;

    const title = valueOf(row, 'project_name');
    const confirmed = window.confirm(`نشر "${title}" في تصفح الفرص؟`);
    if (!confirmed) return;

    setUpdatingId(`${activeConfig.key}-${row.id}`);
    setStatus('جاري نشر المشروع في تصفح الفرص...');

    try {
      const supabase = getSupabase();
      const payload = createOpportunityPayloadFromSubmission(row);

      const { error } = await supabase
        .from('opportunities')
        .upsert(payload, { onConflict: 'slug' });

      if (error) throw error;

      const patch = {
        marketplace_published: true,
        opportunity_slug: payload.slug,
        published_at: new Date().toISOString()
      };

      const { error: updateError } = await supabase
        .from('project_submissions')
        .update(patch)
        .eq('id', row.id);

      if (updateError) throw updateError;

      patchRecord('project_submissions', row.id, patch);
      setStatus('تم نشر المشروع في تصفح الفرص بنجاح.');
    } catch (error) {
      console.error(error);
      setStatus('تعذر نشر المشروع. تأكد من تشغيل SQL v11.5 وسياسات opportunities في Supabase.');
    } finally {
      setUpdatingId(null);
    }
  }

  function exportCurrentRows() {
    const columns = [
      'id',
      'created_at',
      'status',
      'priority',
      'follow_up_at',
      'internal_notes',
      ...activeConfig.columns
    ];

    downloadCsv(`${activeConfig.key}-${new Date().toISOString().slice(0, 10)}.csv`, filteredRows, columns);
  }

  if (loading) return <div className="card admin-card">جاري تحميل لوحة الإدارة...</div>;

  if (!session) {
    return (
      <div className="card admin-card">
        <h2>تسجيل الدخول مطلوب</h2>
        <p>{status}</p>
        <a className="btn btn-primary" href="/login">الدخول</a>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="card admin-card">
        <h2>غير مصرح</h2>
        <p>{status}</p>
        <p>البريد الحالي: {session.user.email}</p>
        <a className="btn btn-secondary" href="/account">العودة للحساب</a>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-summary-grid">
        <div className="admin-summary-card">
          <span>إجمالي العناصر</span>
          <b>{totalCount}</b>
        </div>
        {TABLES.map((table) => (
          <button
            className={`admin-summary-card admin-tab ${activeTable === table.key ? 'active' : ''}`}
            key={table.key}
            type="button"
            onClick={() => {
              setActiveTable(table.key);
              setStatusFilter('all');
              setFollowupFilter('all');
              setPriorityFilter('all');
              setSearch('');
            }}
          >
            <span>{table.label}</span>
            <b>{records[table.key]?.length || 0}</b>
          </button>
        ))}
      </div>

      <div className="admin-metrics-grid">
        {UPDATE_STATUS_OPTIONS.map((item) => (
          <button key={item.value} type="button" className={`admin-metric-card ${statusFilter === item.value ? 'active' : ''}`} onClick={() => setStatusFilter(item.value)}>
            <span>{item.label}</span>
            <b>{statusMetrics[item.value] || 0}</b>
          </button>
        ))}
      </div>

      <div className="admin-followup-grid">
        <button type="button" className={`admin-followup-card danger ${followupFilter === 'overdue' ? 'active' : ''}`} onClick={() => setFollowupFilter('overdue')}>
          <span>متأخرة</span><b>{followupMetrics.overdue}</b>
        </button>
        <button type="button" className={`admin-followup-card warning ${followupFilter === 'today' ? 'active' : ''}`} onClick={() => setFollowupFilter('today')}>
          <span>اليوم</span><b>{followupMetrics.today}</b>
        </button>
        <button type="button" className={`admin-followup-card success ${followupFilter === 'upcoming' ? 'active' : ''}`} onClick={() => setFollowupFilter('upcoming')}>
          <span>قادمة</span><b>{followupMetrics.upcoming}</b>
        </button>
        <button type="button" className={`admin-followup-card muted ${followupFilter === 'none' ? 'active' : ''}`} onClick={() => setFollowupFilter('none')}>
          <span>بدون متابعة</span><b>{followupMetrics.none}</b>
        </button>
      </div>

      <div className="admin-priority-grid">
        <button type="button" className={`admin-priority-card priority-urgent-card ${priorityFilter === 'urgent' ? 'active' : ''}`} onClick={() => setPriorityFilter('urgent')}>
          <span>عاجلة</span><b>{priorityMetrics.urgent}</b>
        </button>
        <button type="button" className={`admin-priority-card priority-high-card ${priorityFilter === 'high' ? 'active' : ''}`} onClick={() => setPriorityFilter('high')}>
          <span>عالية</span><b>{priorityMetrics.high}</b>
        </button>
        <button type="button" className={`admin-priority-card priority-normal-card ${priorityFilter === 'normal' ? 'active' : ''}`} onClick={() => setPriorityFilter('normal')}>
          <span>عادية</span><b>{priorityMetrics.normal}</b>
        </button>
        <button type="button" className={`admin-priority-card priority-low-card ${priorityFilter === 'low' ? 'active' : ''}`} onClick={() => setPriorityFilter('low')}>
          <span>منخفضة</span><b>{priorityMetrics.low}</b>
        </button>
      </div>

      <div className="info-note admin-status-note">{status}</div>

      <section className="admin-filter-panel admin-filter-panel-v33">
        <div className="form-field">
          <label>بحث</label>
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ابحث بالاسم، الجوال، الرسالة، أو المشروع" />
        </div>

        <div className="form-field">
          <label>الحالة</label>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            {STATUS_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>

        <div className="form-field">
          <label>المتابعة</label>
          <select value={followupFilter} onChange={(event) => setFollowupFilter(event.target.value)}>
            {FOLLOWUP_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>

        <div className="form-field">
          <label>الأولوية</label>
          <select value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value)}>
            {PRIORITY_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>

        <div className="admin-filter-stat">
          <span>النتائج</span>
          <b>{filteredRows.length}</b>
        </div>
      </section>

      <section className="admin-table-card">
        <div className="admin-table-head">
          <div>
            <h2>{activeConfig.label}</h2>
            <p>الأولوية العالية والمتابعات المتأخرة تظهر أولًا تلقائيًا.</p>
          </div>
          <div className="admin-table-actions">
            <button className="btn btn-secondary" type="button" onClick={() => setViewMode(viewMode === 'list' ? 'board' : 'list')}>
              {viewMode === 'list' ? 'عرض اللوحة' : 'عرض القائمة'}
            </button>
            <button className="btn btn-secondary" type="button" onClick={exportCurrentRows} disabled={filteredRows.length === 0}>تصدير CSV</button>
            <a className="btn btn-secondary" href="/account">حسابي</a>
          </div>
        </div>

        {filteredRows.length > 0 ? (
          viewMode === 'board' ? (
            <div className="admin-kanban-board">
              {boardGroups.map((group) => (
                <section className="admin-kanban-column" key={group.value}>
                  <div className="admin-kanban-head">
                    <span>{group.label}</span>
                    <b>{group.rows.length}</b>
                  </div>
                  <div className="admin-kanban-list">
                    {group.rows.length > 0 ? group.rows.map((row) => {
                      const rowStatus = row.status || 'new';
                      const rowPriority = row.priority || 'normal';
                      const title = valueOf(row, activeConfig.titleField);

                      return (
                        <article className="admin-kanban-card" key={row.id}>
                          <div className="admin-record-pills">
                            <div className={`admin-status-pill ${statusClass(rowStatus)}`}>{statusLabel(rowStatus)}</div>
                            <div className={`admin-priority-pill ${priorityClass(rowPriority)}`}>{priorityLabel(rowPriority)}</div>
                          </div>
                          <h3>{title}</h3>
                          <p>{valueOf(row, 'contact_name')} · {valueOf(row, 'contact_phone')}</p>
                          <small>متابعة: {row.follow_up_at || '-'}</small>
                          <div className="admin-kanban-actions">
                            <select value={rowStatus} onChange={(event) => updateRecordStatus(activeConfig.key, row.id, event.target.value)}>
                              {UPDATE_STATUS_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                            </select>
                            <select value={rowPriority} onChange={(event) => updateRecordPriority(activeConfig.key, row.id, event.target.value)}>
                              {UPDATE_PRIORITY_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                            </select>
                          </div>
                          {activeConfig.key === 'project_submissions' && (
                            row.marketplace_published ? (
                              <button className="btn btn-secondary admin-kanban-publish" type="button" onClick={() => publishProjectSubmission(row)}>إعادة النشر / تحديث</button>
                            ) : (
                              <button className="btn btn-primary admin-kanban-publish" type="button" onClick={() => publishProjectSubmission(row)}>نشر في تصفح الفرص</button>
                            )
                          )}
                        </article>
                      );
                    }) : <div className="admin-kanban-empty">لا توجد طلبات</div>}
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="admin-record-list">
              {filteredRows.map((row) => {
                const rowStatus = row.status || 'new';
                const rowPriority = row.priority || 'normal';
                const rowKey = `${activeConfig.key}-${row.id}`;
                const isUpdating = updatingId === rowKey;
                const noteValue = editingNotes[rowKey] ?? row.internal_notes ?? '';
                const title = valueOf(row, activeConfig.titleField);

                return (
                  <article className="admin-record admin-record-v28" key={row.id}>
                    <div className="admin-record-main">
                      <span>{fmtDate(row.created_at)}</span>

                      <div className="admin-record-pills">
                        <div className={`admin-status-pill ${statusClass(rowStatus)}`}>{statusLabel(rowStatus)}</div>
                        <div className={`admin-followup-pill ${followupClass(row.follow_up_at)}`}>{followupLabel(row.follow_up_at)}</div>
                        <div className={`admin-priority-pill ${priorityClass(rowPriority)}`}>{priorityLabel(rowPriority)}</div>
                      </div>

                      <h3>{title}</h3>
                      <p>{valueOf(row, 'message') !== '-' ? valueOf(row, 'message') : valueOf(row, 'details') !== '-' ? valueOf(row, 'details') : valueOf(row, 'notes')}</p>

                      {getContactPhone(row) && (
                        <div className="admin-communication-actions">
                          <a className="btn btn-secondary" href={`tel:+${getContactPhone(row)}`}>اتصال</a>
                          <a className="btn btn-green" href={adminWhatsAppUrl(row, title)} target="_blank" rel="noreferrer">واتساب</a>
                          <button className="btn btn-secondary" type="button" onClick={() => copyAdminSummary(row, title)}>نسخ ملخص</button>
                        </div>
                      )}

                      {activeConfig.key === 'project_submissions' && (
                        <div className="admin-publish-control">
                          {row.marketplace_published ? (
                            <div className="admin-publish-state">
                              <span className="admin-publish-badge">منشور في تصفح الفرص</span>
                              {row.opportunity_slug && (
                                <a className="btn btn-secondary" href={`/opportunity/${row.opportunity_slug}`} target="_blank" rel="noreferrer">عرض الفرصة</a>
                              )}
                              <button className="btn btn-secondary" type="button" disabled={isUpdating} onClick={() => publishProjectSubmission(row)}>إعادة النشر / تحديث</button>
                            </div>
                          ) : (
                            <button className="btn btn-primary" type="button" disabled={isUpdating} onClick={() => publishProjectSubmission(row)}>نشر في تصفح الفرص</button>
                          )}
                        </div>
                      )}

                      <div className="admin-status-control">
                        <label>الحالة</label>
                        <select value={rowStatus} disabled={isUpdating} onChange={(event) => updateRecordStatus(activeConfig.key, row.id, event.target.value)}>
                          {UPDATE_STATUS_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                        </select>
                      </div>

                      <div className="admin-status-control">
                        <label>الأولوية</label>
                        <select value={rowPriority} disabled={isUpdating} onChange={(event) => updateRecordPriority(activeConfig.key, row.id, event.target.value)}>
                          {UPDATE_PRIORITY_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                        </select>
                      </div>

                      <div className="admin-status-control">
                        <label>تاريخ المتابعة</label>
                        <input type="date" value={row.follow_up_at || ''} disabled={isUpdating} onChange={(event) => updateFollowUpDate(activeConfig.key, row.id, event.target.value)} />
                      </div>

                      <div className="admin-notes-box">
                        <label>ملاحظات داخلية</label>
                        <textarea
                          value={noteValue}
                          disabled={isUpdating}
                          placeholder="مثال: تم الاتصال، يحتاج متابعة، طلب مستندات..."
                          onChange={(event) => setEditingNotes((current) => ({ ...current, [rowKey]: event.target.value }))}
                        />
                        <button className="btn btn-secondary" type="button" disabled={isUpdating} onClick={() => saveInternalNotes(activeConfig.key, row.id)}>حفظ الملاحظة</button>
                      </div>
                    </div>

                    <div className="admin-record-details">
                      {activeConfig.columns.map((column) => (
                        <div key={column}>
                          <span>{column}</span>
                          <b>{valueOf(row, column)}</b>
                        </div>
                      ))}
                      <div><span>priority</span><b>{priorityLabel(rowPriority)}</b></div>
                      <div><span>follow_up_at</span><b>{row.follow_up_at || '-'}</b></div>
                      <div><span>internal_notes</span><b>{row.internal_notes || '-'}</b></div>
                    </div>
                  </article>
                );
              })}
            </div>
          )
        ) : (
          <div className="account-empty-requests">
            <h4>لا توجد نتائج</h4>
            <p>غيّر الفلاتر أو امسح البحث لعرض السجلات.</p>
          </div>
        )}
      </section>
    </div>
  );
}
