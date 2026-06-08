import Layout from '../../components/Layout';
import AdminPanel from './AdminPanel';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'لوحة الإدارة — حراج إنڤست',
  description: 'لوحة مراجعة طلبات حراج إنڤست.'
};

export default function AdminPage() {
  return (
    <Layout>
      <main className="page admin-page">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Admin</span>
            <h1>لوحة الإدارة</h1>
            <p className="lead">مراجعة مختصرة للطلبات والمشاريع المرسلة.</p>
          </div>
          <AdminPanel />
        </div>
      </main>
    </Layout>
  );
}
