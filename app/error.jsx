'use client';

import Link from 'next/link';

export default function Error({ reset }) {
  return (
    <main className="page system-page-v79">
      <div className="wrap">
        <section className="system-card-v79">
          <span className="eyebrow">تعذر تحميل الصفحة</span>
          <h1>حدث خطأ مؤقت</h1>
          <p>جرّب إعادة المحاولة، أو ارجع للصفحة الرئيسية إذا استمرت المشكلة.</p>
          <div className="system-actions-v79">
            <button className="btn btn-primary" onClick={() => reset()}>إعادة المحاولة</button>
            <Link className="btn btn-secondary" href="/">الصفحة الرئيسية</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
