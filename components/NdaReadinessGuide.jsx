import Link from 'next/link';

const ndaItems = [
  ['متى تطلب NDA؟', 'عندما تحتاج إلى بيانات مالية تفصيلية، مستندات داخلية، عقود، أو معلومات غير مناسبة للعرض العام.'],
  ['ما قبل NDA', 'يكفي غالبًا الاطلاع على وصف الفرصة، القطاع، المدينة، القيمة التقريبية، ومؤشرات أولية.'],
  ['ما بعد NDA', 'يمكن الانتقال إلى مستندات أعمق مثل القوائم المالية، العقود، الرخص، الالتزامات، وبيانات التشغيل.'],
  ['الهدف', 'تنظيم مشاركة المعلومات الحساسة دون تعطيل التواصل الأولي أو كشف تفاصيل مبكرة.']
];

export default function NdaReadinessGuide() {
  return (
    <section className="nda-guide-v78">
      <div className="nda-guide-head-v78">
        <span className="eyebrow">طلب السرية</span>
        <h2>متى يكون NDA مناسبًا؟</h2>
        <p>طلب السرية ليس خطوة شكلية؛ يستخدم عندما تصبح المعلومات المطلوبة أكثر تفصيلًا وحساسية.</p>
      </div>

      <div className="nda-guide-grid-v78">
        {ndaItems.map(([title, desc]) => (
          <div key={title}>
            <b>{title}</b>
            <span>{desc}</span>
          </div>
        ))}
      </div>

      <div className="nda-guide-note-v78">
        <b>قاعدة عملية:</b>
        <span>ابدأ باهتمام واضح. اطلب NDA عندما تحتاج بيانات لا ينبغي مشاركتها قبل تنظيم السرية.</span>
      </div>

      <div className="nda-guide-actions-v78">
        <Link className="btn btn-secondary" href="/contact">أرسل اهتمامك أولًا</Link>
        <Link className="btn btn-secondary" href="/faq">الأسئلة الشائعة</Link>
      </div>
    </section>
  );
}
