import Layout from '../../components/Layout';
import Link from 'next/link';
import DealFlowSteps from '../../components/DealFlowSteps';
import PrimaryPaths from '../../components/PrimaryPaths';
import BusinessModelClarity from '../../components/BusinessModelClarity';

export const metadata = {
  title: 'كيف تعمل المنصة؟ — حراج إنڤست',
  description: 'تعرف على طريقة عمل حراج إنڤست ومسار التعامل من عرض الفرصة إلى إرسال الاهتمام وطلب السرية.'
};

const paths = [
  ['صاحب مشروع', 'أضف مشروعك ببيانات واضحة، ثم يتم تنظيمه للعرض والمتابعة.'],
  ['مهتم بفرصة', 'تصفح السوق، احفظ الفرص، شاركها، ثم أرسل اهتمامك.'],
  ['طلب سرية', 'استخدم طلب NDA عندما تحتاج إلى مشاركة معلومات أعمق.']
];

export default function HowItWorksPage() {
  return (
    <Layout>
      <main className="page how-page-v73">
        <div className="wrap">
          <section className="how-hero-v73">
            <span className="eyebrow">كيف تعمل المنصة؟</span>
            <h1>مسار واضح من عرض الفرصة إلى المتابعة</h1>
            <p>حراج إنڤست لا يهدف إلى زيادة التعقيد، بل إلى تنظيم عرض الفرص وتسهيل التواصل الأولي بطريقة أكثر وضوحًا.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/marketplace">تصفح الفرص</Link>
              <Link className="btn btn-secondary" href="/submit-project">أضف مشروعك</Link>
            </div>
          </section>

          <section className="how-paths-v73">
            {paths.map(([title, desc]) => (
              <article className="card how-path-card-v73" key={title}>
                <h3>{title}</h3>
                <p>{desc}</p>
              </article>
            ))}
          </section>

          <PrimaryPaths />

          <BusinessModelClarity />

          <DealFlowSteps />

          <section className="how-cta-v73">
            <div>
              <h2>ابدأ من الخطوة المناسبة لك</h2>
              <p>سواء كنت تريد تصفح فرصة، عرض مشروع، أو طلب سرية، المسار واضح ومباشر.</p>
            </div>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/contact">أرسل اهتمامك</Link>
              <Link className="btn btn-secondary" href="/nda-request">طلب NDA</Link>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
