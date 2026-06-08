import Layout from '../../components/Layout';
import Link from 'next/link';

export const metadata = {
  title: 'الثقة والتحقق — حراج إنڤست',
  description: 'تعرف على طريقة تنظيم بيانات الفرص ومستويات التحقق في حراج إنڤست.'
};

const trustItems = [
  ['بيانات أساسية', 'اسم الفرصة، المدينة، القطاع، نوع الفرصة، والقيمة التقريبية.'],
  ['مراجعة مبدئية', 'ترتيب البيانات واكتشاف النواقص قبل عرضها بشكل أفضل.'],
  ['مستندات داعمة', 'يمكن طلب مستندات مثل السجل التجاري، الرخص، أو البيانات المالية عند الحاجة.']
];

export default function Verification() {
  return (
    <Layout>
      <main className="page trust-page-v46">
        <div className="wrap">
          <section className="trust-hero-v46">
            <span className="eyebrow">الثقة والتحقق</span>
            <h1>وضوح أكبر في قراءة بيانات الفرص</h1>
            <p>
              نرتب البيانات الأساسية ونوضح مستوى جاهزيتها، حتى يكون التواصل الأولي مبنيًا على معلومات أوضح.
            </p>
          </section>

          <section className="trust-grid-v46">
            {trustItems.map(([title, desc]) => (
              <div className="card trust-card-v46" key={title}>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </section>

          <section className="card trust-wide-v46">
            <span className="eyebrow">مهم</span>
            <h2>التحقق عملية تدريجية</h2>
            <p>
              بعض الفرص قد تبدأ ببيانات أولية فقط، ثم تتحسن جودة المعلومات مع إضافة مستندات أو تفاصيل تشغيلية ومالية لاحقًا.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/marketplace">تصفح الفرص</Link>
              <Link className="btn btn-secondary" href="/contact">تواصل معنا</Link>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
