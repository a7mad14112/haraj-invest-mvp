import Layout from '../../components/Layout';
import Link from 'next/link';

export const metadata = {
  title: 'عن حراج إنڤست — سوق للفرص التجارية والمشاريع',
  description: 'تعرف على حراج إنڤست، منصة لتنظيم عرض الفرص التجارية والمشاريع وتسهيل التواصل الأولي.'
};

const values = [
  ['وضوح', 'نعرض المعلومات الأساسية بطريقة أسهل للقراءة والمقارنة.'],
  ['تنظيم', 'نجعل مسار عرض المشروع والتواصل الأولي أكثر ترتيبًا.'],
  ['ثقة', 'نركز على تجربة رسمية وواضحة تحترم وقت صاحب المشروع والمهتم.']
];

export default function About() {
  return (
    <Layout>
      <main className="page trust-page-v46">
        <div className="wrap">
          <section className="trust-hero-v46">
            <span className="eyebrow">عن المنصة</span>
            <h1>حراج إنڤست ينظم عرض الفرص التجارية والمشاريع</h1>
            <p>
              المنصة تساعد أصحاب المشاريع والمهتمين على بدء تواصل أولي أكثر وضوحًا، من خلال عرض منظم للبيانات الأساسية ومسارات مباشرة للمتابعة.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/marketplace">تصفح الفرص</Link>
              <Link className="btn btn-secondary" href="/submit-project">أضف مشروعك</Link>
            </div>
          </section>

          <section className="trust-grid-v46">
            {values.map(([title, desc]) => (
              <div className="card trust-card-v46" key={title}>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </section>

          <section className="card trust-wide-v46">
            <span className="eyebrow">الفكرة</span>
            <h2>من عرض عشوائي إلى تجربة منظمة</h2>
            <p>
              كثير من الفرص التجارية تُعرض بطريقة غير مكتملة أو متفرقة. حراج إنڤست يحاول ترتيب هذه الخطوة الأولى: بيانات مختصرة، تصنيف واضح، ونماذج تواصل تساعد على بدء النقاش.
            </p>
          </section>
        </div>
      </main>
    </Layout>
  );
}
