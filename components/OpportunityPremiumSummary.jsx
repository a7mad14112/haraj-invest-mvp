export default function OpportunityPremiumSummary({ opportunity }) {
  if (!opportunity) return null;

  const metrics = [
    ['القيمة المطلوبة', opportunity.value || 'غير معلن'],
    ['الإيرادات', opportunity.revenue || 'غير معلن'],
    ['الربح', opportunity.profit || 'غير معلن'],
    ['المدينة', opportunity.city || 'غير محدد']
  ];

  return (
    <section className="opp-premium-summary-v74">
      <div className="opp-premium-copy-v74">
        <span className="eyebrow">قراءة سريعة</span>
        <h2>ملخص يساعدك على اتخاذ خطوة أولى منظمة</h2>
        <p>
          راجع القيمة، الإيرادات، الربح، الجاهزية، والمخاطر قبل إرسال الاهتمام أو طلب السرية.
        </p>
      </div>

      <div className="opp-premium-metrics-v74">
        {metrics.map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <b>{value}</b>
          </div>
        ))}
      </div>
    </section>
  );
}
