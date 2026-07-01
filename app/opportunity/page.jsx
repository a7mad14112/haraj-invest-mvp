import Layout from '../../components/Layout';
import Link from 'next/link';

export const metadata = {
  title: 'تفاصيل الفرص — حراج إنڤست',
  description: 'صفحات تفاصيل الفرص في حراج إنڤست. تصفّح السوق لاختيار فرصة ومعرفة تفاصيلها.',
  robots: { index: false, follow: true }
};

export default function OpportunityIndex() {
  return (
    <Layout>
      <main className="page">
        <div className="wrap">
          <div className="card form-card">
            <span className="eyebrow">تفاصيل الفرص</span>
            <h1>اختر فرصة من السوق</h1>
            <p>صفحات التفاصيل أصبحت ديناميكية.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/marketplace">العودة للسوق</Link>
              <Link className="btn btn-secondary" href="/opportunity/cafe-riyadh">مثال</Link>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
