import Link from 'next/link';
import Logo from './Logo';

const groups = [
  {
    title: 'المسارات الأساسية',
    links: [
      ['تصفح الفرص', '/marketplace'],
      ['أضف مشروعك', '/submit-project'],
      ['أرسل اهتمامك', '/contact'],
      ['طلب NDA', '/nda-request']
    ]
  },
  {
    title: 'عن المنصة',
    links: [
      ['كيف تعمل المنصة؟', '/how-it-works'],
      ['عن المنصة', '/about'],
      ['المدونة', '/blog'],
      ['اسأل', '/ask'],
      ['الثقة', '/verification'],
      ['الأسئلة الشائعة', '/faq'],
      ['الفرص المحفوظة', '/saved']
    ]
  },
  {
    title: 'الحساب',
    links: [
      ['الدخول', '/login'],
      ['حساب جديد', '/signup'],
      ['حسابي', '/account']
    ]
  },
  {
    title: 'السياسات',
    links: [
      ['الخصوصية', '/privacy'],
      ['الشروط', '/terms'],
      ['إخلاء المسؤولية', '/disclaimer'],
      ['عمولة النجاح', '/commission'],
      ['واتساب', 'https://wa.me/966535808411']
    ]
  }
];

export default function Footer() {
  return (
    <footer className="site-footer footer-v85">
      <div className="wrap footer-top footer-top-v85">
        <div className="footer-brand footer-brand-v63">
          <div className="footer-brand-inner-v63">
            <Logo />
            <p>منصة لتنظيم عرض الفرص التجارية والمشاريع وتسهيل التواصل الأولي بين أصحاب المشاريع والمهتمين.</p>
          </div>
        </div>
      </div>

      <div className="wrap footer-nav-horizontal footer-nav-v85">
        {groups.map((group) => (
          <div className="footer-link-group-v85" key={group.title}>
            <h4>{group.title}</h4>
            <div className="footer-link-row footer-link-row-v85">
              {group.links.map(([label, href]) => (
                <Link key={href} href={href}>{label}</Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="wrap footer-bottom footer-bottom-v85">
        <span>© {new Date().getFullYear()} حراج إنڤست. جميع الحقوق محفوظة.</span>
        <span>منصة تنظيم عرض وتواصل أولي وليست بديلًا عن الفحص المهني المستقل.</span>
      </div>
    </footer>
  );
}
