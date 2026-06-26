import Link from 'next/link';

const steps = [
  {
    n: '01',
    title: 'إبداء الاهتمام',
    desc: 'يبدأ المستخدم برسالة مختصرة توضّح نوع الاهتمام، القدرة المالية، وطبيعة المتابعة المطلوبة.'
  },
  {
    n: '02',
    title: 'تنظيم السرية',
    desc: 'إذا كانت البيانات حساسة، يتم طلب NDA قبل مشاركة أي تفاصيل أعمق أو مستندات داعمة.'
  },
  {
    n: '03',
    title: 'الفحص الأولي',
    desc: 'تتم مراجعة البيانات المالية، الرخص، الالتزامات، الجاهزية، والمخاطر قبل أي خطوة متقدمة.'
  },
  {
    n: '04',
    title: 'التواصل المنظم',
    desc: 'بعد وضوح الجدية، ينتقل الطرفان إلى تواصل أكثر تحديدًا حول المستندات والخطوات التالية.'
  }
];

export default function DealFlowSteps({ compact = false, opportunitySlug = '' }) {
  return (
    <section className={`deal-flow-v73 ${compact ? 'compact' : ''}`}>
      <div className="deal-flow-head-v73">
        <span className="eyebrow">مسار التعامل</span>
        <h2>ماذا يحدث بعد إرسال الاهتمام؟</h2>
        <p>وضوح المسار يقلل التردد ويجعل الانتقال من التصفح إلى المتابعة أكثر تنظيمًا.</p>
      </div>

      <div className="deal-flow-grid-v73">
        {steps.map((step) => (
          <div className="deal-flow-step-v73" key={step.n}>
            <span>{step.n}</span>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>

      {!compact && (
        <div className="deal-flow-actions-v73">
          <Link className="btn btn-primary" href={opportunitySlug ? `/contact?opportunity=${opportunitySlug}` : '/contact'}>
            أرسل اهتمامك
          </Link>
          <Link className="btn btn-secondary" href={opportunitySlug ? `/nda-request?opportunity=${opportunitySlug}` : '/nda-request'}>
            طلب NDA
          </Link>
        </div>
      )}
    </section>
  );
}
