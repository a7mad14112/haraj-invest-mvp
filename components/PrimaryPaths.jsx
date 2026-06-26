import Link from 'next/link';

const paths = [
  ['تصفح الفرص', '/marketplace', 'ابدأ من السوق واستعرض الفرص المتاحة.'],
  ['أضف مشروعك', '/submit-project', 'اعرض مشروعك أو فرصتك بشكل منظم.'],
  ['أرسل اهتمامك', '/contact', 'اكتب طلب اهتمام واضح للمتابعة.'],
  ['طلب NDA', '/nda-request', 'استخدمه قبل مشاركة معلومات حساسة.']
];

export default function PrimaryPaths({ compact = false }) {
  return (
    <section className={`primary-paths-v84 ${compact ? 'compact' : ''}`}>
      <div className="primary-paths-head-v84">
        <span className="eyebrow">المسارات الأساسية</span>
        <h2>ابدأ من المسار المناسب لك</h2>
        <p>المنصة مبنية حول أربع خطوات واضحة: تصفح، عرض مشروع، إرسال اهتمام، أو طلب سرية.</p>
      </div>

      <div className="primary-paths-grid-v84">
        {paths.map(([title, href, desc]) => (
          <Link href={href} key={href}>
            <b>{title}</b>
            <span>{desc}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
