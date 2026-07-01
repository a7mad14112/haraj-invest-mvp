import Layout from '../../components/Layout';
import Link from 'next/link';

export const metadata = {
  title: 'الأسئلة الشائعة — حراج إنڤست',
  description: 'إجابات مختصرة عن طريقة استخدام حراج إنڤست، إضافة المشاريع، إرسال الاهتمام، وطلب NDA.'
};

const faqs = [
  {
    q: 'ما هو حراج إنڤست؟',
    a: 'حراج إنڤست منصة تساعد على تنظيم عرض الفرص التجارية والمشاريع وتسهيل التواصل الأولي بين أصحاب المشاريع والمهتمين.'
  },
  {
    q: 'كيف أضيف مشروعي؟',
    a: 'يمكنك الدخول إلى صفحة أضف مشروعك وتعبئة النموذج متعدد الخطوات: بيانات المشروع، الأرقام الأساسية، بيانات التواصل، ثم المراجعة والإرسال.'
  },
  {
    q: 'كيف أرسل اهتمامي بفرصة؟',
    a: 'افتح صفحة الفرصة من السوق، ثم اضغط أرسل اهتمامك. يمكنك توضيح نوع الاهتمام والقدرة المالية وبيانات التواصل.'
  },
  {
    q: 'ما فائدة طلب NDA؟',
    a: 'طلب NDA يستخدم عندما تكون هناك حاجة لتنظيم مشاركة معلومات أكثر تفصيلًا أو حساسية بين الأطراف.'
  },
  {
    q: 'هل أحتاج حسابًا لاستخدام الموقع؟',
    a: 'يمكنك تصفح الصفحات العامة، لكن الحساب يساعدك على متابعة طلباتك والوصول إلى لوحة حسابك بشكل أفضل.'
  },
  {
    q: 'أين أجد الفرص المحفوظة؟',
    a: 'يمكنك حفظ الفرص من السوق أو صفحة تفاصيل الفرصة، ثم الرجوع إليها من صفحة المحفوظة.'
  }
];

export default function FAQPage() {
  return (
    <Layout>
      <main className="page faq-page-v53">
        <div className="wrap">
          <section className="faq-hero-v53">
            <span className="eyebrow">الأسئلة الشائعة</span>
            <h1>إجابات سريعة قبل أن تبدأ</h1>
            <p>هذه الصفحة تختصر أهم الأسئلة حول استخدام حراج إنڤست، إضافة المشاريع، وإرسال الاهتمام.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/marketplace">تصفح الفرص</Link>
              <Link className="btn btn-secondary" href="/submit-project">أضف مشروعك</Link>
            </div>
          </section>

          <section className="faq-grid-v53">
            {faqs.map((item, index) => (
              <article className="card faq-card-v53" key={item.q}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.q}</h3>
                <p>{item.a}</p>
              </article>
            ))}
          </section>

          <section className="faq-cta-v53">
            <div>
              <h2>لم تجد إجابتك؟</h2>
              <p>أرسل لنا استفسارك وسنساعدك في تحديد المسار المناسب.</p>
            </div>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/contact">تواصل معنا</Link>
              <Link className="btn btn-secondary" href="/how-it-works">كيف تعمل المنصة؟</Link>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
