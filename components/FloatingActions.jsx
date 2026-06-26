'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const hiddenPrefixes = ['/admin'];

export default function FloatingActions() {
  const pathname = usePathname() || '/';
  const hidden = hiddenPrefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

  if (hidden) return null;

  return (
    <>
      <div className="floating-actions-v49" aria-label="إجراءات سريعة">
        <Link className="floating-mini-v49" href="/contact" aria-label="أرسل اهتمامك">
          اهتمام
        </Link>
      </div>

      <div className="mobile-bottom-cta-v49" aria-label="إجراءات سريعة للجوال">
        <Link href="/marketplace">
          <b>تصفح الفرص</b>
          <span>السوق</span>
        </Link>
        <Link href="/submit-project">
          <b>أضف مشروعك</b>
          <span>ابدأ</span>
        </Link>
      </div>
    </>
  );
}
