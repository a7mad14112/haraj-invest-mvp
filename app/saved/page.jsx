import Layout from '../../components/Layout';
import SavedClient from './SavedClient';

export const metadata = {
  title: 'الفرص المحفوظة — حراج إنڤست',
  description: 'قائمة الفرص المحفوظة محليًا في حراج إنڤست.'
};

export default function SavedPage() {
  return (
    <Layout>
      <main className="page saved-page-v51">
        <div className="wrap">
          <SavedClient />
        </div>
      </main>
    </Layout>
  );
}
