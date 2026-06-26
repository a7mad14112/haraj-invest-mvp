const items = [
  ['وصف مختصر وواضح', 'اشرح ماذا يفعل المشروع، من يخدم، ولماذا الفرصة مطروحة الآن.'],
  ['الأرقام الأساسية', 'اذكر القيمة المطلوبة، الإيرادات، الربح، أو مؤشرات التشغيل إن وجدت.'],
  ['نوع الفرصة', 'حدد هل المطلوب بيع، شراكة، تمويل، توسع، أو شريك تشغيلي.'],
  ['المستندات المتاحة', 'جهّز السجل، الرخص، القوائم، العقود، أو أي مستند داعم عند الحاجة.']
];

export default function ProjectSubmissionClarity() {
  return (
    <section className="project-submission-clarity-v108">
      <div className="project-submission-head-v108">
        <span className="eyebrow">قبل إضافة المشروع</span>
        <h2>اجعل مشروعك مفهومًا من أول قراءة</h2>
        <p>كلما كانت البيانات أوضح، زادت فرصة أن يفهم المهتمون طبيعة المشروع والخطوة المناسبة للمتابعة.</p>
      </div>

      <div className="project-submission-grid-v108">
        {items.map(([title, desc], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <b>{title}</b>
            <p>{desc}</p>
          </article>
        ))}
      </div>

      <div className="project-submission-note-v108">
        <b>ملاحظة مهمة:</b>
        <span>لا تشارك معلومات حساسة في الوصف العام. يمكن استخدام NDA لاحقًا قبل مشاركة القوائم أو العقود أو التفاصيل غير المناسبة للنشر.</span>
      </div>
    </section>
  );
}
