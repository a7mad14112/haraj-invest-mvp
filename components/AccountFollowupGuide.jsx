import Link from 'next/link';

const items = [
  ['طلب جديد', 'تم استلام الطلب ويحتاج مراجعة أولية.'],
  ['قيد المراجعة', 'يتم فحص البيانات وتحديد الخطوة التالية.'],
  ['بحاجة لاستكمال', 'قد نحتاج منك بيانات إضافية أو توضيحًا.'],
  ['مكتمل أو مغلق', 'تم اتخاذ إجراء أو إغلاق المتابعة.']
];

export default function AccountFollowupGuide() {
  return (
    <section className="account-followup-guide-v75">
      <div>
        <span className="eyebrow">متابعة الطلبات</span>
        <h2>كيف تقرأ حالة طلبك؟</h2>
        <p>هذه الإرشادات تساعدك على فهم المرحلة الحالية، وما إذا كنت بحاجة لاتخاذ خطوة إضافية.</p>
      </div>

      <div className="account-followup-grid-v75">
        {items.map(([title, desc]) => (
          <div key={title}>
            <b>{title}</b>
            <span>{desc}</span>
          </div>
        ))}
      </div>

      <div className="account-followup-actions-v75">
        <Link className="btn btn-primary" href="/marketplace">تصفح الفرص</Link>
        <Link className="btn btn-secondary" href="/contact">إرسال اهتمام جديد</Link>
      </div>
    </section>
  );
}
