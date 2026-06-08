import Layout from '../../components/Layout';
import { ResetForm } from '../../components/AuthForms';
import Link from 'next/link';

export const metadata = {
  title: 'استعادة كلمة المرور — حراج إنڤست',
  description: 'استعادة كلمة المرور لحساب حراج إنڤست.'
};

export default function ResetPassword() {
  return (
    <Layout>
      <main className="page auth-page-v45">
        <div className="wrap auth-layout-v45">
          <section className="auth-intro-v45">
            <span className="eyebrow">استعادة الحساب</span>
            <h1>استعد الوصول إلى حسابك</h1>
            <p>أدخل بريدك الإلكتروني وسنرسل لك تعليمات استعادة الدخول.</p>
          </section>

          <section className="card form-card auth-form-shell-v45">
            <ResetForm />
            <div className="auth-alt-v45">
              <span>تذكرت كلمة المرور؟</span>
              <Link href="/login">العودة للدخول</Link>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
