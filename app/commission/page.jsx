import Layout from '../../components/Layout';
import CommissionCalculator from '../../components/CommissionCalculator';
import Link from 'next/link';

export const metadata = {
  title: 'عمولة النجاح | حراج إنڤست',
  description: 'تعرف على عمولة النجاح في حراج إنڤست ومتى تستحق وكيف يتم احتساب 5% من قيمة الصفقة.'
};

const cases = [
  ['متى تستحق؟', 'عند إتمام صفقة أو اتفاق ناتج عن تواصل بدأ من خلال المنصة، وفق الشروط أو اتفاقية العمولة المعتمدة.'],
  ['متى لا تستحق؟', 'لا تستحق بمجرد التصفح أو إرسال اهتمام أولي دون إتمام صفقة أو اتفاق.'],
  ['هل هي ضمان؟', 'لا. العمولة لا تعني ضمان الصفقة أو العائد، ولا تعد المعلومات المعروضة توصية استثمارية.'],
  ['من يتحملها؟', 'يتم تحديد الطرف المسؤول عن السداد في الشروط أو اتفاقية العمولة أو الترتيب المعتمد بين الأطراف.']
];

export default function CommissionPage() {
  return (
    <Layout>
      <main id="main-content" className="page-shell commission-page-v111">
        <section className="page-hero commission-hero-v111">
          <div>
            <span className="eyebrow">عمولة النجاح</span>
            <h1>وضوح العمولة قبل أي صفقة</h1>
            <p>
              حراج إنڤست ينظم عرض الفرص ويسهل التواصل بين الأطراف، وقد يستحق عمولة نجاح بنسبة 5% عند إتمام صفقة ناتجة عن التواصل عبر المنصة.
            </p>
          </div>
        </section>

        <CommissionCalculator />

        <section className="commission-rules-v111">
          {cases.map(([title, desc]) => (
            <article key={title}>
              <b>{title}</b>
              <p>{desc}</p>
            </article>
          ))}
        </section>

        <section className="commission-clarity-v111">
          <h2>إرسال الاهتمام ليس التزامًا نهائيًا</h2>
          <p>
            إرسال الاهتمام أو طلب NDA خطوة أولية لتنظيم التواصل. لا تنشأ عمولة النجاح إلا عند إتمام صفقة أو اتفاق ناتج عن ذلك التواصل وفق الشروط المعتمدة.
          </p>
          <div className="commission-actions-v111">
            <Link className="btn btn-primary" href="/marketplace">تصفح الفرص</Link>
            <Link className="btn btn-secondary" href="/submit-project">أضف مشروعك</Link>
            <Link className="btn btn-secondary" href="/terms">قراءة الشروط</Link>
          </div>
        </section>
      </main>
    </Layout>
  );
}
