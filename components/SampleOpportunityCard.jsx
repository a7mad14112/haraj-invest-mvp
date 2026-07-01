// بطاقة "مثال توضيحي" — تطابق تصميم بطاقة السوق (Teaser) بصريًا،
// لكنها للعرض فقط: تحمل وسم "مثال" وبلا أزرار تفاعلية، حفاظًا على الشفافية.

function riskClass(risk) {
  if (risk === 'منخفض') return 'risk-low';
  if (risk === 'مرتفع') return 'risk-high';
  return 'risk-medium';
}

function readinessClass(value) {
  if (String(value).includes('جاهز') || String(value).includes('مكتمل')) return 'ready';
  if (String(value).includes('تطوير') || String(value).includes('مبكرة')) return 'early';
  return 'review';
}

function formatAmount(value) {
  if (value === null || value === undefined) return '—';
  const raw = String(value).trim();
  if (!raw || raw === '—' || raw === '-') return '—';
  const digits = raw.replace(/[^\d]/g, '');
  if (!digits) return raw;
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '،');
}

function Amount({ value }) {
  const formatted = formatAmount(value);
  const isNumeric = /\d/.test(formatted);
  return (
    <>
      {formatted}
      {isNumeric && <i className="opp-teaser-unit-v129">ر.س</i>}
    </>
  );
}

export default function SampleOpportunityCard({ item }) {
  const isReady = String(item.readiness || '').includes('جاهز') || String(item.readiness || '').includes('مكتمل');

  const heroLabel = String(item.type || '').includes('استثمار') || String(item.type || '').includes('تمويل')
    ? 'التمويل المطلوب'
    : String(item.type || '').includes('شراكة')
      ? 'حصة الشراكة'
      : 'القيمة المطلوبة';

  return (
    <article className="card opp-card marketplace-card-v41 marketplace-card-v116 opp-teaser-v129 opp-teaser-sample-v129">
      <span className="home-sample-badge-v129">مثال توضيحي</span>

      <div className="marketplace-card-banner marketplace-card-banner-v116">
        <span className="marketplace-sector-pill">{item.sector}</span>
        <span className={`market-risk ${riskClass(item.risk)}`}>{item.risk}</span>
      </div>

      <div className="marketplace-card-main marketplace-card-main-v116">
        <span className="opp-teaser-type-v129">{item.type}</span>

        <div className="marketplace-title-row">
          <h3>{item.title}</h3>
          {isReady && <span className="marketplace-featured-badge">جاهز</span>}
        </div>

        <p>{item.summary}</p>

        <div className="marketplace-mini-tags">
          <span>{item.city}</span>
          <span className={readinessClass(item.readiness)}>{item.readiness}</span>
        </div>
      </div>

      <div className="opp-teaser-hero-v129">
        <span className="opp-teaser-hero-label-v129">{heroLabel}</span>
        <b className="opp-teaser-hero-value-v129"><Amount value={item.value} /></b>
        <div className="opp-teaser-secondary-v129">
          <span>الإيرادات: <b><Amount value={item.revenue} /></b></span>
          <span>الربح: <b><Amount value={item.profit} /></b></span>
        </div>
      </div>
    </article>
  );
}
