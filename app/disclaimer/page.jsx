import Layout from '../../components/Layout';
import PolicyQuickGuide from '../../components/PolicyQuickGuide';
import Link from 'next/link';

export const metadata = {
  title: 'إخلاء المسؤولية — حراج إنڤست',
  description: 'إخلاء المسؤولية الخاص باستخدام حراج إنڤست.'
};

export default function PolicyPage() {
  return (
    <Layout>
      <main className="page policy-page-v57">
        <div className="wrap">
          <section className="policy-hero-v57">
            <span className="eyebrow">إخلاء المسؤولية</span>
            <h1>حدود دور حراج إنڤست</h1>
            <p>توضح هذه الصفحة أن دور المنصة يتركز على تنظيم عرض البيانات وتسهيل التواصل الأولي، مع بقاء قرارات المستخدمين ومسؤولياتهم قائمة.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/contact">تواصل معنا</Link>
              <Link className="btn btn-secondary" href="/">الصفحة الرئيسية</Link>
            </div>
          </section>

          <section className="policy-layout-v57">
            <aside className="policy-side-v57">
              <div className="card policy-side-card-v57">
                <h3>صفحات مهمة</h3>
                <div className="policy-side-links-v57">
                  <Link href="/privacy">الخصوصية</Link>
                  <Link href="/terms">الشروط</Link>
                  <Link href="/disclaimer">إخلاء المسؤولية</Link>
                  <Link href="/faq">الأسئلة الشائعة</Link>
                </div>
              </div>
            </aside>

            <div className="policy-content-v57">
              <article className="policy-item-v57">
                <h3>طبيعة الدور</h3>
                <p>حراج إنڤست منصة عرض وتنظيم وتواصل أولي، وليست طرفًا في الصفقات أو الاتفاقات التي قد تتم بين المستخدمين.</p>
              </article>
              <article className="policy-item-v57">
                <h3>المعلومات المعروضة</h3>
                <p>المعلومات المعروضة تعتمد على البيانات المقدمة من أصحاب الفرص أو مصادرها، وقد تحتاج إلى مراجعة واستكمال.</p>
              </article>
              <article className="policy-item-v57">
                <h3>الفحص المستقل</h3>
                <p>ينبغي على الأطراف إجراء الفحص المستقل والمراجعة القانونية والمالية والتشغيلية قبل أي اتفاق.</p>
              </article>
              <article className="policy-item-v57">
                <h3>القرارات النهائية</h3>
                <p>أي قرار متعلق بالتواصل أو التفاوض أو الشراكة أو الشراء أو البيع هو مسؤولية الأطراف المعنية.</p>
              </article>
              <article className="policy-item-v57">
                <h3>المستندات والسرية</h3>
                <p>قد تكون بعض المعلومات أو المستندات مناسبة للمشاركة بعد ترتيب السرية أو اتفاق واضح بين الأطراف.</p>
              </article>
              <article className="policy-item-v57">
                <h3>التطوير المستمر</h3>
                <p>قد تتطور صياغة الصفحات والسياسات مع تطور المنصة وتجربة المستخدم.</p>
              </article>
            </div>
          </section>
        </div>
                <PolicyQuickGuide />
        
          <section className="policy-section commission-policy-v110">
            <h2>حدود دور المنصة وعمولة النجاح</h2>
            <p>
              تقوم حراج إنڤست بتنظيم عرض الفرص وتسهيل التواصل الأولي بين الأطراف. وقد تستحق المنصة عمولة نجاح بنسبة 5% عند إتمام صفقة ناتجة عن تواصل بدأ من خلالها، وفق الشروط أو اتفاقية العمولة المعتمدة.
            </p>
            <p>
              لا يُعد عرض الفرصة توصية استثمارية أو ضمانًا لإتمام الصفقة أو تحقيق عائد، ويظل الفحص المستقل مسؤولية الأطراف قبل أي قرار.
            </p>
          </section>

        </main>
    </Layout>
  );
}
