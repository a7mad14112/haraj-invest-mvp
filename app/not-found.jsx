import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="page system-page-v79">
      <div className="wrap">
        <section className="system-card-v79">
          <span className="eyebrow">404</span>
          <h1>الصفحة غير موجودة</h1>
          <p>قد يكون الرابط غير صحيح أو تم تغيير الصفحة. يمكنك العودة للرئيسية أو تصفح الفرص.</p>
          <div className="system-actions-v79">
            <Link className="btn btn-primary" href="/">الصفحة الرئيسية</Link>
            <Link className="btn btn-secondary" href="/marketplace">تصفح الفرص</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
