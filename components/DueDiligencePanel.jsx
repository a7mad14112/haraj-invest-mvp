export default function DueDiligencePanel({ opportunity }) {
  const checks = [
    ['البيانات المالية', opportunity?.revenue && opportunity?.profit ? 'متوفرة مبدئيًا' : 'تحتاج استكمال'],
    ['المستندات', opportunity?.documents?.length ? `${opportunity.documents.length} عناصر مقترحة` : 'تحتاج مراجعة'],
    ['مستوى الجاهزية', opportunity?.readiness || 'غير محدد'],
    ['مستوى المخاطر', opportunity?.risk || 'متوسط']
  ];

  return (
    <section className="card due-diligence-panel-v72">
      <div className="due-diligence-head-v72">
        <span className="eyebrow">فحص أولي</span>
        <h2>مؤشرات العناية الواجبة قبل المتابعة</h2>
        <p>هذه المؤشرات لا تغني عن الفحص المهني، لكنها تساعدك على معرفة ما يجب مراجعته قبل أي خطوة متقدمة.</p>
      </div>

      <div className="due-diligence-grid-v72">
        {checks.map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <b>{value}</b>
          </div>
        ))}
      </div>

      <div className="due-diligence-note-v72">
        <b>الخطوة العملية:</b>
        <span>ابدأ بطلب اهتمام أو NDA، ثم اطلب المستندات الأساسية وراجعها ماليًا وقانونيًا وتشغيليًا.</span>
      </div>
    </section>
  );
}
