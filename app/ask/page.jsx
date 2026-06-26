import Layout from '../../components/Layout';
import AskClient from './AskClient';

export const metadata = {
  title: 'اسأل — حراج إنڤست',
  description:
    'اطرح سؤالك حول الفرص التجارية والاستثمار وعرض المشاريع، وتصفّح إجابات منشورة على أسئلة شائعة من المجتمع.',
  alternates: { canonical: '/ask' },
};

export default function AskPage() {
  return (
    <Layout>
      <main className="page ask-page-v135">
        <div className="wrap">
          <section className="ask-hero-v135">
            <span className="eyebrow">اسأل</span>
            <h1>أسئلة وأجوبة حول الفرص والاستثمار</h1>
            <p>
              اطرح سؤالك وسنراجعه وننشر الإجابة إن كان مفيدًا للجميع. تصفّح أدناه
              إجابات على أسئلة سابقة.
            </p>
          </section>

          <AskClient />
        </div>
      </main>
    </Layout>
  );
}
