'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Logo from './Logo';
import { getSupabase } from '../lib/supabaseClient';

const navLinks = [
  ['/marketplace', 'الفرص'],
  ['/submit-project', 'أضف مشروعك'],
  ['/how-it-works', 'كيف تعمل؟'],
  ['/contact', 'أرسل اهتمامك']
];

const mobilePrimaryLinks = [
  ['/marketplace', 'تصفح الفرص', 'استكشف الفرص التجارية المتاحة'],
  ['/submit-project', 'أضف مشروعك', 'أرسل بيانات مشروعك بخطوات واضحة'],
  ['/contact', 'أرسل اهتمامك', 'ابدأ تواصلًا أوليًا'],
  ['/nda-request', 'طلب NDA', 'اطلب السرية قبل مشاركة التفاصيل']
];

function isActive(pathname, href) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const [session, setSession] = useState(null);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data }) => setSession(data.session || null));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => setSession(newSession));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  function close() {
    setOpen(false);
  }

  return (
    <header className="site-header site-header-v47">
      <div className="wrap nav nav-v47">
        <Logo />

        <nav className="nav-links nav-links-v47" aria-label="روابط رئيسية">
          {navLinks.map(([href, label]) => (
            <Link
              href={href}
              key={href}
              className={isActive(pathname, href) ? 'active' : ''}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions nav-actions-v47">
          {session ? (
            <>
              <span className="nav-session-chip-v47">متصل</span>
              <Link className="btn btn-secondary" href="/account">حسابي</Link>
              <Link className="btn btn-primary" href="/submit-project">أضف مشروعك</Link>
            </>
          ) : (
            <>
              <Link className="btn btn-secondary" href="/login">الدخول</Link>
              <Link className="btn btn-primary" href="/signup">حساب جديد</Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="nav-toggle nav-toggle-v47"
          aria-label={open ? 'إغلاق القائمة' : 'فتح القائمة'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`nav-toggle-bars ${open ? 'is-open' : ''}`} aria-hidden="true">
            <i></i><i></i><i></i>
          </span>
        </button>
      </div>

      <div className={`nav-drawer nav-drawer-v47 ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <button type="button" className="nav-drawer-backdrop" aria-label="إغلاق" onClick={close} />
        <div className="nav-drawer-panel nav-drawer-panel-v47" role="dialog" aria-label="القائمة">
          <div className="drawer-head-v47">
            <Logo />
            <button type="button" className="drawer-close-v47" onClick={close} aria-label="إغلاق">×</button>
          </div>

          <div className="drawer-section-v47">
            <span>ابدأ بسرعة</span>
            <div className="drawer-primary-grid-v47">
              {mobilePrimaryLinks.map(([href, title, desc]) => (
                <Link href={href} key={href} onClick={close}>
                  <b>{title}</b>
                  <small>{desc}</small>
                </Link>
              ))}
            </div>
          </div>

          <div className="drawer-section-v47">
            <span>روابط المنصة</span>
            <nav className="nav-drawer-links nav-drawer-links-v47">
              {navLinks.map(([href, label]) => (
                <Link
                  href={href}
                  key={href}
                  onClick={close}
                  className={isActive(pathname, href) ? 'active' : ''}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="nav-drawer-actions nav-drawer-actions-v47">
            {session ? (
              <>
                <Link className="btn btn-secondary" href="/account" onClick={close}>حسابي</Link>
                <Link className="btn btn-primary" href="/submit-project" onClick={close}>أضف مشروعك</Link>
              </>
            ) : (
              <>
                <Link className="btn btn-secondary" href="/login" onClick={close}>الدخول</Link>
                <Link className="btn btn-primary" href="/signup" onClick={close}>حساب جديد</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
