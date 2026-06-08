import Layout from '../../components/Layout';
import { ProjectForm } from '../../components/Forms';

export const metadata = {
  title: 'أضف مشروعك — حراج إنڤست',
  description: 'أرسل بيانات مشروعك للعرض الأولي في حراج إنڤست.'
};

export default function SubmitProject() {
  return (
    <Layout>
      <main className="page submit-project-page-v43">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">أضف مشروعك</span>
            <h1>أرسل بيانات مشروعك بخطوات واضحة</h1>
            <p className="lead">نموذج مختصر بخمس خطوات. لا تشارك معلومات حساسة في الوصف العام — يمكن استخدام NDA لاحقًا.</p>
          </div>

          <div className="card form-card project-form-card-v43">
            <ProjectForm />
          </div>
        </div>
      </main>
    </Layout>
  );
}
