import Layout from '../../components/Layout';
import MessagesClient from './MessagesClient';

export const metadata = {
  title: 'محادثاتي — حراج إنڤست',
  description: 'محادثاتك حول الفرص عبر منصة حراج إنڤست.',
  alternates: { canonical: '/messages' },
};

export default function MessagesPage() {
  return (
    <Layout>
      <main className="page messages-page-v138">
        <div className="wrap">
          <MessagesClient />
        </div>
      </main>
    </Layout>
  );
}
