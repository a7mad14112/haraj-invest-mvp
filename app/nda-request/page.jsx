import { Suspense } from 'react';
import Layout from '../../components/Layout';
import FinalConversionAssurance from '../../components/FinalConversionAssurance';
import NdaReadinessGuide from '../../components/NdaReadinessGuide';
import NdaRequestClient from './NdaRequestClient';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'طلب NDA — حراج إنڤست',
  description: 'طلب اتفاقية سرية قبل مشاركة تفاصيل فرصة تجارية.'
};

export default function NdaRequest() {
  return (
    <Layout>
      <main className="page contact-page-v45">
        <div className="wrap">
          <section className="conversion-hero-v45 nda-hero-v45">
            <div>
              <span className="eyebrow">طلب السرية</span>
              <h1>اطلب السرية قبل الدخول في تفاصيل أكثر حساسية</h1>
              <p>استخدم هذا الطلب عندما تحتاج إلى ترتيب مرحلة مشاركة المعلومات التفصيلية.</p>
            </div>

            <div className="conversion-hero-actions-v45">
              <Link className="btn btn-secondary" href="/marketplace">تصفح الفرص</Link>
              <Link className="btn btn-secondary" href="/contact">أرسل اهتمامك</Link>
            </div>
          </section>

          <section className="conversion-layout-v45">
            <div className="card form-card conversion-form-card-v45">
              <Suspense fallback={<div className="card form-card">جاري تحميل النموذج...</div>}>
                <NdaReadinessGuide />

          <NdaRequestClient />
              </Suspense>
            </div>

            <aside className="conversion-side-v45">
              <div className="card conversion-side-card-v45">
                <h3>متى تستخدم NDA؟</h3>
                <div className="conversion-checklist-v45">
                  <div><span>1</span><b>قبل مشاركة أرقام تفصيلية</b></div>
                  <div><span>2</span><b>قبل الاطلاع على مستندات حساسة</b></div>
                  <div><span>3</span><b>قبل الدخول في نقاشات متقدمة</b></div>
                </div>
              </div>

              <div className="card conversion-side-card-v45">
                <h3>خطوة منظمة</h3>
                <p>طلب السرية يساعد على جعل التواصل أكثر ترتيبًا عندما تكون البيانات التالية حساسة أو تفصيلية.</p>
              </div>
            </aside>
          </section>
        </div>
                <FinalConversionAssurance compact />
        </main>
    </Layout>
  );
}
