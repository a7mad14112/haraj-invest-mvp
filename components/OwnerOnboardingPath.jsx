import Link from 'next/link';

const steps = [
  ['جهّز الوصف', 'اشرح المشروع، القطاع، المدينة، نموذج العمل، وسبب طرح الفرصة.'],
  ['رتّب الأرقام', 'اكتب القيمة المطلوبة، الإيرادات، الربح، أو مؤشرات تشغيلية تقديرية بوضوح.'],
  ['حدد نوع العرض', 'بيع، شراكة، استثمار، توسع، أو بحث عن شريك استراتيجي.'],
  ['استعد للمتابعة', 'جهّز المستندات الأساسية التي يمكن مشاركتها لاحقًا بعد NDA عند الحاجة.']
];

export default function OwnerOnboardingPath({ compact = false }) {
  return (
    <section className={`owner-path-v83 ${compact ? 'compact' : ''}`}>
      <div className="owner-path-head-v83">
        <span className="eyebrow">مسار صاحب المشروع</span>
        <h2>من فكرة غير مرتبة إلى فرصة قابلة للفهم</h2>
        <p>الفرصة الجيدة لا تكفي وحدها. طريقة عرضها وتنظيم أرقامها ومرفقاتها هي ما يجعلها قابلة للمتابعة.</p>
      </div>

      <div className="owner-path-grid-v83">
        {steps.map(([title, desc], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <b>{title}</b>
            <p>{desc}</p>
          </article>
        ))}
      </div>

      {!compact && (
        <div className="owner-path-actions-v83">
          <Link className="btn btn-primary" href="/submit-project">ابدأ إضافة مشروعك</Link>
          <Link className="btn btn-secondary" href="/how-it-works">كيف تعمل المنصة؟</Link>
        </div>
      )}
    </section>
  );
}
