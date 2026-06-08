import Link from 'next/link';

const steps = [
  ['حدد نوع اهتمامك', 'شراء كامل، شراكة، تمويل، توسع، أو استفسار أولي.'],
  ['اختر نطاقك', 'المدينة، القطاع، الجاهزية، ومستوى المخاطر المقبول.'],
  ['راجع التفاصيل', 'القيمة، الإيرادات، الربح، المستندات، ونقاط المراجعة.'],
  ['اتخذ خطوة أولى', 'احفظ الفرصة، شاركها، أرسل اهتمامك، أو اطلب NDA.']
];

export default function InvestorDecisionPath({ compact = false }) {
  return (
    <section className={`investor-path-v82 ${compact ? 'compact' : ''}`}>
      <div className="investor-path-head-v82">
        <span className="eyebrow">مسار المهتم</span>
        <h2>من التصفح إلى قرار متابعة واضح</h2>
        <p>المستثمر أو المهتم لا يحتاج كل التفاصيل منذ البداية؛ يحتاج مسارًا واضحًا يساعده على معرفة الخطوة التالية.</p>
      </div>

      <div className="investor-path-grid-v82">
        {steps.map(([title, desc], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <b>{title}</b>
            <p>{desc}</p>
          </article>
        ))}
      </div>

      {!compact && (
        <div className="investor-path-actions-v82">
          <Link className="btn btn-primary" href="/marketplace">ابدأ من السوق</Link>
          <Link className="btn btn-secondary" href="/contact">أرسل اهتمامك</Link>
        </div>
      )}
    </section>
  );
}
