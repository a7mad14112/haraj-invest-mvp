import Layout from '../../components/Layout';
import { LoginForm } from '../../components/AuthForms';
import Link from 'next/link';

export const metadata = {
  title: 'الدخول — حراج إنڤست',
  description: 'الدخول إلى حساب حراج إنڤست.'
};

export default function Login() {
  return (
    <Layout>
      <main className="page auth-page-v45">
        <div className="wrap auth-layout-v45">
          <section className="auth-intro-v45">
            <span className="eyebrow">الدخول</span>
            <h1>ادخل إلى حسابك وتابع طلباتك</h1>
            <p>من حسابك يمكنك متابعة الطلبات والرجوع السريع إلى أهم مسارات المنصة.</p>

            <div className="auth-benefits-v45">
              <div><span>✓</span><b>متابعة الطلبات</b></div>
              <div><span>✓</span><b>روابط سريعة للفرص</b></div>
              <div><span>✓</span><b>تجربة منظمة</b></div>
            </div>
          </section>

          <section className="card form-card auth-form-shell-v45">
            <LoginForm />
            <div className="auth-alt-v45">
              <span>ليس لديك حساب؟</span>
              <Link href="/signup">إنشاء حساب جديد</Link>
            </div>
            <div className="auth-alt-v45">
              <span>نسيت كلمة المرور؟</span>
              <Link href="/reset-password">استعادة الحساب</Link>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
