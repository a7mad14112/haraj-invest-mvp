import Link from 'next/link';

export default function MobileQuickActions() {
  return (
    <nav className="mobile-quick-actions-v86" aria-label="إجراءات سريعة">
      <Link href="/marketplace">
        <span>تصفح</span>
        <b>الفرص</b>
      </Link>
      <Link href="/submit-project">
        <span>أضف</span>
        <b>مشروع</b>
      </Link>
      <Link href="/contact">
        <span>أرسل</span>
        <b>اهتمام</b>
      </Link>
      <Link href="/account">
        <span>تابع</span>
        <b>حسابي</b>
      </Link>
    </nav>
  );
}
