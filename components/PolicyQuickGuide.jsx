import Link from 'next/link';

const items = [
  ['الخصوصية', '/privacy', 'كيف نتعامل مع البيانات الأساسية.'],
  ['الشروط', '/terms', 'قواعد استخدام المنصة والمسؤوليات.'],
  ['إخلاء المسؤولية', '/disclaimer', 'حدود دور المنصة والفحص المستقل.']
];

export default function PolicyQuickGuide() {
  return (
    <section className="policy-quick-guide-v85">
      <div>
        <span className="eyebrow">السياسات</span>
        <h2>اقرأ السياسات الأساسية قبل المتابعة</h2>
        <p>وضوح الشروط والخصوصية وإخلاء المسؤولية يساعد المستخدم على فهم حدود المنصة ومسؤوليته في التحقق.</p>
      </div>

      <div className="policy-quick-grid-v85">
        {items.map(([title, href, desc]) => (
          <Link href={href} key={href}>
            <b>{title}</b>
            <span>{desc}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
