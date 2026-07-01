'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import SaveOpportunityButton from '../../../components/SaveOpportunityButton';
import ShareOpportunityButton from '../../../components/ShareOpportunityButton';
import OpportunityStickyCTA from '../../../components/OpportunityStickyCTA';
import OpportunityStructuredData from '../../../components/OpportunityStructuredData';
import DueDiligencePanel from '../../../components/DueDiligencePanel';
import DealFlowSteps from '../../../components/DealFlowSteps';
import OpportunityPremiumSummary from '../../../components/OpportunityPremiumSummary';
import { getSupabase } from '../../../lib/supabaseClient';
import { fallbackOpportunities, normalizeOpportunity } from '../../../lib/opportunityFallback';


function normalizeDetail(row) {
  const item = normalizeOpportunity(row || {});
  return {
    ...item,
    slug: item.slug || row?.slug || row?.id,
    strengths: item.strengths || row?.strengths || ['نموذج قائم', 'بيانات أولية متاحة', 'قابلية تنظيم العرض'],
    risks: item.risks || row?.risks || ['مراجعة الأرقام', 'فحص الالتزامات', 'التأكد من المستندات'],
    documents: item.documents || row?.documents || ['السجل التجاري', 'الرخص', 'بيانات مالية', 'قائمة الأصول إن وجدت'],
    description: item.description || row?.description || item.summary || 'فرصة تجارية منظمة تحتاج إلى مراجعة مستقلة قبل أي خطوة نهائية.',
    verification: item.verification || row?.verification_status || 'مراجعة مبدئية',
    readiness: item.readiness || row?.readiness_status || 'يحتاج فحص',
    risk: item.risk || row?.risk_level || 'متوسط',
    provided_via: item.provided_via || row?.provided_via || row?.submitter_type || null
  };
}

function findFallback(slug) {
  return fallbackOpportunities.map(normalizeDetail).find((item) => item.slug === slug || item.id === slug);
}

function riskClass(risk) {
  if (risk === 'منخفض') return 'risk-low';
  if (risk === 'مرتفع') return 'risk-high';
  return 'risk-medium';
}

// تنسيق القيم: أرقام بفواصل عربية، وإزالة كلمة "ريال".
function formatAmount(value) {
  if (value === null || value === undefined) return '—';
  const raw = String(value).trim();
  if (!raw || raw === '—' || raw === '-') return '—';
  const digits = raw.replace(/[^\d]/g, '');
  if (!digits) return raw;
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '،');
}

// عرض القيمة مع وحدة "ر.س" فقط إذا كانت رقمية.
function AmountWithUnit({ value }) {
  const formatted = formatAmount(value);
  const isNumeric = /\d/.test(formatted);
  return (
    <>
      {formatted}
      {isNumeric && <i className="opp-detail-unit-v129">ر.س</i>}
    </>
  );
}

function ListCard({ title, items, tone = 'default' }) {
  return (
    <div className={`card opp-detail-list-card ${tone}`}>
      <h3>{title}</h3>
      <div className="opp-detail-list">
        {(items || []).map((value) => (
          <div key={value}>
            <span aria-hidden="true">✓</span>
            <b>{value}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

// شريط حالة الفرصة (Verification Pipeline) — مستوحى من أسلوب العرض الاحترافي.
function OpportunityStatusBar({ item }) {
  const stages = ['مراجعة مبدئية', 'فحص المستندات', 'جاهزة للتواصل'];

  const ready = String(item.readiness || '');
  const verification = String(item.verification || '');
  let current = 0;
  if (ready.includes('جاهز') || ready.includes('مكتمل')) current = 2;
  else if (verification.includes('مستندات') || verification.includes('فحص') || ready.includes('فحص')) current = 1;
  else current = 0;

  return (
    <section className="opp-status-bar-v129" aria-label="حالة الفرصة">
      {stages.map((label, index) => {
        const state = index < current ? 'done' : index === current ? 'active' : 'upcoming';
        return (
          <div key={label} className={`opp-status-step-v129 ${state}`}>
            <span className="opp-status-dot-v129" aria-hidden="true">{index < current ? '✓' : index + 1}</span>
            <b>{label}</b>
            {index < stages.length - 1 && <i className="opp-status-line-v129" aria-hidden="true" />}
          </div>
        );
      })}
    </section>
  );
}

export default function OpportunityDetailClient({ slug }) {
  const [item, setItem] = useState(findFallback(slug) || null);
  const [source, setSource] = useState(item ? 'fallback' : 'loading');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);

      try {
        const supabase = getSupabase();
        const { data, error } = await supabase
          .from('opportunities')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .maybeSingle();

        if (error) throw error;

        if (!cancelled && data) {
          setItem(normalizeDetail(data));
          setSource('supabase');
        }

        if (!cancelled && !data) {
          const fallback = findFallback(slug);
          setItem(fallback || null);
          setSource(fallback ? 'fallback-empty' : 'not-found');
        }
      } catch (error) {
        console.warn('Using fallback opportunity:', error);
        if (!cancelled) {
          const fallback = findFallback(slug);
          setItem(fallback || null);
          setSource(fallback ? 'fallback-error' : 'not-found');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const quickFacts = useMemo(() => {
    if (!item) return [];
    return [
      ['المدينة', item.city],
      ['القطاع', item.sector],
      ['نوع الفرصة', item.type],
      ['الجاهزية', item.readiness],
      ['التحقق', item.verification],
      ['المخاطر', item.risk]
    ];
  }, [item]);

  if (!item && !loading) {
    return (
      <main className="page opportunity-detail-page-v42">
        <div className="wrap">
          <section className="card opp-not-found-v42">
            <span className="eyebrow">غير متاحة</span>
            <h1>الفرصة غير موجودة</h1>
            <p>قد تكون غير منشورة أو تم تغيير الرابط.</p>
            <Link className="btn btn-primary" href="/marketplace">العودة للسوق</Link>
          </section>
        </div>
</main>
    );
  }

  if (!item) {
    return (
      <main className="page opportunity-detail-page-v42">
        <div className="wrap">
          <section className="card opp-not-found-v42">جاري تحميل تفاصيل الفرصة...</section>
        </div>
      </main>
    );
  }

  return (
    <main className="page opportunity-detail-page-v42">
      <OpportunityStructuredData opportunity={item} />

      <div className="wrap">
        <section className="opp-detail-hero-v42">
          <div className="opp-detail-hero-main">
            <div className="opp-detail-breadcrumbs">
              <Link href="/marketplace">الفرص</Link>
              <span>/</span>
              <b>{item.sector}</b>
            </div>

            <div className="opp-detail-labels">
              <span className="eyebrow">{item.sector}</span>
              <span className={`market-risk ${riskClass(item.risk)}`}>{item.risk}</span>
              <span className="opp-readiness-pill">{item.readiness}</span>
              {item.provided_via === 'وسيط مفوّض' && (
                <span className="opp-broker-pill" title="مقدّمة عبر وسيط مفوّض">عبر وسيط</span>
              )}
            </div>

            <h1>{item.title}</h1>
            <p>{item.description}</p>

            <div className="opp-detail-actions">
              <Link className="btn btn-primary" href={`/contact?opportunity=${item.slug}`}>أرسل اهتمامك</Link>
              <Link className="btn btn-secondary" href={`/nda-request?opportunity=${item.slug}`}>طلب NDA</Link>
              <SaveOpportunityButton opportunity={item} />
              <ShareOpportunityButton opportunity={item} />
              <Link className="btn btn-secondary" href="/marketplace">العودة للسوق</Link>
            </div>
          </div>

          <aside className="opp-detail-side-card">
            <span>ملخص الفرصة</span>
            <div className="opp-main-value">
              <small>القيمة المطلوبة</small>
              <b><AmountWithUnit value={item.value} /></b>
            </div>
            <div className="opp-side-mini-grid">
              <div><small>الإيرادات</small><b><AmountWithUnit value={item.revenue} /></b></div>
              <div><small>الربح</small><b><AmountWithUnit value={item.profit} /></b></div>
            </div>
            <div className="opp-source-note-v42">
              {source === 'supabase' && 'البيانات معروضة من قاعدة البيانات.'}
              {source === 'fallback-empty' && 'لم يتم العثور على الفرصة في قاعدة البيانات، لذلك تظهر بيانات تجريبية.'}
              {source === 'fallback-error' && 'تعذر الاتصال بقاعدة البيانات، لذلك تظهر بيانات تجريبية.'}
              {source === 'fallback' && 'جاري التحقق من مصدر البيانات...'}
            </div>
          </aside>
        </section>

        <OpportunityStatusBar item={item} />

        <section className="opp-kpi-grid-v42">
          <div><span>القيمة</span><b><AmountWithUnit value={item.value} /></b></div>
          <div><span>الإيرادات</span><b><AmountWithUnit value={item.revenue} /></b></div>
          <div><span>الربح</span><b><AmountWithUnit value={item.profit} /></b></div>
          <div><span>مستوى المخاطر</span><b>{item.risk}</b></div>
        </section>

        <OpportunityPremiumSummary opportunity={item} />

        <section className="opp-detail-layout-v42">
          <div className="opp-detail-main-col">
            <div className="card opp-executive-summary-v42">
              <span className="eyebrow">ملخص تنفيذي</span>
              <h2>نظرة أولية على الفرصة</h2>
              <p>{item.summary || item.description}</p>

              <div className="opp-facts-grid-v42">
                {quickFacts.map(([label, value]) => (
                  <div key={label}>
                    <span>{label}</span>
                    <b>{value || '-'}</b>
                  </div>
                ))}
              </div>
            </div>

            <DueDiligencePanel opportunity={item} />

            <DealFlowSteps opportunitySlug={item.slug} />

            <div className="grid-2 opp-lists-grid-v42">
              <ListCard title="نقاط قوة" items={item.strengths} tone="strength" />
              <ListCard title="ما يحتاج مراجعة" items={item.risks} tone="review" />
            </div>

            <div className="card opp-process-card-v42">
              <span className="eyebrow">الخطوة التالية</span>
              <h2>كيف تبدأ المتابعة؟</h2>
              <div className="opp-process-steps">
                <div><span>01</span><b>أرسل اهتمامك</b><p>حدد نوع اهتمامك والقدرة المالية والرسالة.</p></div>
                <div><span>02</span><b>اطلب السرية</b><p>استخدم NDA إذا كانت المعلومات التالية أكثر حساسية.</p></div>
                <div><span>03</span><b>ابدأ الفحص</b><p>راجع البيانات والمستندات قبل أي اتفاق.</p></div>
              </div>
            </div>
          </div>

          <aside className="opp-detail-sidebar-v42">
            <ListCard title="مستندات مطلوبة" items={item.documents} />

            <div className="card opp-contact-card-v42">
              <h3>مهتم بهذه الفرصة؟</h3>
              <p>ابدأ بطلب اهتمام واضح، ثم انتقل للمتابعة المناسبة.</p>
              <div className="opp-sidebar-actions-v42">
                <Link className="btn btn-primary" href={`/contact?opportunity=${item.slug}`}>أرسل اهتمامك</Link>
                <Link className="btn btn-secondary" href={`/nda-request?opportunity=${item.slug}`}>طلب NDA</Link>
                <SaveOpportunityButton opportunity={item} />
                <ShareOpportunityButton opportunity={item} />
              </div>
            </div>
          </aside>
        </section>
      </div>

      <div className="wrap">
        <div className="commission-disclosure-v110">
          إرسال الاهتمام لا يُعد التزامًا نهائيًا. وقد تخضع أي صفقة تتم نتيجة التواصل عبر المنصة لعمولة نجاح بنسبة 5% وفق الشروط المعتمدة. <a className="commission-link-v111" href="/commission">احسب العمولة</a>
        </div>
      </div>

      <div className="wrap">
        <div className="opp-advice-disclaimer-v118">
          المعلومات المعروضة أولية ولأغراض التعريف فقط، ولا تُعد توصية استثمارية أو ضمانًا لإتمام الصفقة أو تحقيق عائد. الفحص المالي والقانوني والتشغيلي المستقل مسؤولية الأطراف قبل أي التزام. <a href="/disclaimer">إخلاء المسؤولية الكامل</a>
        </div>
      </div>


      <OpportunityStickyCTA opportunity={item} />
    </main>
  );
}
