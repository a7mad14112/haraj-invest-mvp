import Layout from '../../components/Layout';
import PolicyQuickGuide from '../../components/PolicyQuickGuide';
import Link from 'next/link';

export const metadata = {
  title: 'سياسة الخصوصية — حراج إنڤست',
  description: 'سياسة الخصوصية في حراج إنڤست.'
};

export default function PolicyPage() {
  return (
    <Layout>
      <main className="page policy-page-v57">
        <div className="wrap">
          <section className="policy-hero-v57">
            <span className="eyebrow">سياسة الخصوصية</span>
            <h1>كيف نتعامل مع بياناتك؟</h1>
            <p>نحرص على عرض سياسة الخصوصية بلغة واضحة تساعدك على فهم نوع البيانات التي قد يتم طلبها عند استخدام المنصة.</p>
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
                <h3>البيانات التي تقدمها</h3>
                <p>قد نطلب بيانات مثل الاسم، رقم الجوال، البريد الإلكتروني، نوع الاهتمام، أو بيانات المشروع عند استخدام النماذج.</p>
              </article>
              <article className="policy-item-v57">
                <h3>الغرض من البيانات</h3>
                <p>تستخدم البيانات لتنظيم الطلبات، تسهيل التواصل الأولي، وتحسين تجربة المستخدم داخل المنصة.</p>
              </article>
              <article className="policy-item-v57">
                <h3>بيانات الحساب</h3>
                <p>عند إنشاء حساب، يتم استخدام بيانات الدخول لإتاحة الوصول إلى حسابك ومتابعة الطلبات المرتبطة به.</p>
              </article>
              <article className="policy-item-v57">
                <h3>مشاركة البيانات</h3>
                <p>لا يتم عرض بيانات التواصل العامة للزوار. مشاركة التفاصيل تتم بحسب طبيعة الطلب ومسار التواصل المناسب.</p>
              </article>
              <article className="policy-item-v57">
                <h3>الحفظ المحلي</h3>
                <p>بعض الميزات مثل حفظ الفرص قد تستخدم التخزين المحلي في المتصفح حتى تتمكن من الرجوع إليها لاحقًا.</p>
              </article>
              <article className="policy-item-v57">
                <h3>التحديثات</h3>
                <p>قد يتم تحديث هذه السياسة مع تطور المنصة، ويُنصح بمراجعتها من وقت لآخر.</p>
              </article>
            </div>
          </section>
        </div>
                <PolicyQuickGuide />
        </main>
    </Layout>
  );
}
