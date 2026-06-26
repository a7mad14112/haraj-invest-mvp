import Layout from '../../components/Layout';
import { SignupForm } from '../../components/AuthForms';
import Link from 'next/link';

export const metadata = {
  title: 'حساب جديد — حراج إنڤست',
  description: 'إنشاء حساب جديد في حراج إنڤست.'
};

export default function Signup() {
  return (
    <Layout>
      <main className="page auth-page-v45">
        <div className="wrap auth-layout-v45">
          <section className="auth-intro-v45">
            <span className="eyebrow">حساب جديد</span>
            <h1>أنشئ حسابك وابدأ بخطوة أوضح</h1>
            <p>الحساب يساعدك على تنظيم الطلبات والرجوع إلى مسارات المنصة بسهولة.</p>

            <div className="auth-benefits-v45">
              <div><span>✓</span><b>إرسال طلبات الاهتمام</b></div>
              <div><span>✓</span><b>إضافة المشاريع</b></div>
              <div><span>✓</span><b>متابعة طلباتي</b></div>
            </div>
          </section>

          <section className="card form-card auth-form-shell-v45">
            <SignupForm />
            <div className="auth-alt-v45">
              <span>لديك حساب؟</span>
              <Link href="/login">الدخول</Link>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
