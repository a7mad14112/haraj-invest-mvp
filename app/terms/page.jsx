import Layout from '../../components/Layout';
import PolicyQuickGuide from '../../components/PolicyQuickGuide';
import Link from 'next/link';

export const metadata = {
  title: 'الشروط والأحكام — حراج إنڤست',
  description: 'الشروط والأحكام العامة لاستخدام حراج إنڤست.'
};

export default function PolicyPage() {
  return (
    <Layout>
      <main className="page policy-page-v57">
        <div className="wrap">
          <section className="policy-hero-v57">
            <span className="eyebrow">الشروط والأحكام</span>
            <h1>قواعد استخدام المنصة</h1>
            <p>هذه الصفحة توضح المبادئ العامة لاستخدام حراج إنڤست، بما يساعد على جعل تجربة العرض والتواصل أكثر تنظيمًا.</p>
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
                <h3>استخدام المنصة</h3>
                <p>تستخدم المنصة لعرض الفرص التجارية والمشاريع وتسهيل التواصل الأولي بين الأطراف.</p>
              </article>
              <article className="policy-item-v57">
                <h3>صحة المعلومات</h3>
                <p>يتحمل مرسل البيانات مسؤولية دقة المعلومات التي يقدمها، ويجب تحديثها عند الحاجة.</p>
              </article>
              <article className="policy-item-v57">
                <h3>سلوك المستخدم</h3>
                <p>ينبغي استخدام المنصة بطريقة مهنية، وعدم إرسال معلومات مضللة أو غير مكتملة عمدًا.</p>
              </article>
              <article className="policy-item-v57">
                <h3>إضافة المشاريع</h3>
                <p>إرسال بيانات المشروع لا يعني قبولًا تلقائيًا أو نشرًا نهائيًا، وقد تتطلب بعض البيانات مراجعة أو استكمالًا.</p>
              </article>
              <article className="policy-item-v57">
                <h3>التواصل بين الأطراف</h3>
                <p>التواصل اللاحق بين الأطراف يتم وفق ما يتفقون عليه، مع أهمية مراجعة التفاصيل والمستندات قبل أي خطوة متقدمة.</p>
              </article>
              <article className="policy-item-v57">
                <h3>تعديل الخدمة</h3>
                <p>قد يتم تعديل خصائص المنصة أو تحسينها أو إيقاف بعض الميزات مؤقتًا لأغراض التطوير أو الصيانة.</p>
              </article>
            </div>
          </section>
        </div>
                <PolicyQuickGuide />
        
          <section className="policy-section commission-policy-v110">
            <h2>عمولة النجاح</h2>
            <p>
              قد تستحق حراج إنڤست عمولة نجاح بنسبة 5% من قيمة الصفقة. ويمكن استخدام صفحة <Link href="/commission">عمولة النجاح</Link> للاطلاع على الحاسبة التوضيحية عند إتمام أي اتفاق أو صفقة ناتجة عن تواصل بدأ من خلال المنصة، وذلك وفق الشروط والأحكام أو أي اتفاقية عمولة معتمدة بين الأطراف ذات العلاقة.
            </p>
            <p>
              لا تمثل المنصة ضمانًا لإتمام الصفقة أو تحقيق عائد، ولا تُعد المعلومات المعروضة توصية استثمارية. يجب على الأطراف إجراء الفحص المالي والقانوني والتشغيلي المستقل قبل أي التزام.
            </p>
          </section>

        </main>
    </Layout>
  );
}
