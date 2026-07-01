import Link from 'next/link';

const steps = [
  ['راجع الملخص', 'ابدأ بالقطاع، المدينة، نوع الفرصة، والأرقام الأساسية.'],
  ['حدد سبب اهتمامك', 'هل تريد شراء، شراكة، تمويل، توسع، أم استفسار أولي؟'],
  ['أرسل اهتمامًا واضحًا', 'اكتب ما الذي أعجبك وما الخطوة التي تريدها بعد ذلك.'],
  ['اطلب NDA عند الحاجة', 'استخدم NDA فقط إذا احتجت معلومات حساسة مثل القوائم أو العقود.']
];

export default function OpportunityDecisionGuide({ slug }) {
  const contactHref = slug ? `/contact?opportunity=${encodeURIComponent(slug)}` : '/contact';
  const ndaHref = slug ? `/nda-request?opportunity=${encodeURIComponent(slug)}` : '/nda-request';

  return (
    <section className="opportunity-decision-v107">
      <div className="opportunity-decision-head-v107">
        <span className="eyebrow">قبل المتابعة</span>
        <h2>كيف تقرر الخطوة التالية؟</h2>
        <p>لا تحتاج إلى قرار نهائي الآن. ابدأ بخطوة واضحة تساعد الطرف الآخر على فهم اهتمامك.</p>
      </div>

      <div className="opportunity-decision-grid-v107">
        {steps.map(([title, desc], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <b>{title}</b>
            <p>{desc}</p>
          </article>
        ))}
      </div>

      <div className="opportunity-decision-actions-v107">
        <Link className="btn btn-primary" href={contactHref}>أرسل اهتمامًا واضحًا</Link>
        <Link className="btn btn-secondary" href={ndaHref}>طلب NDA عند الحاجة</Link>
      </div>
    </section>
  );
}
