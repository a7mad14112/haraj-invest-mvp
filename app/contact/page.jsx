import { Suspense } from 'react';
import Layout from '../../components/Layout';
import FinalConversionAssurance from '../../components/FinalConversionAssurance';
import LeadQualityGuide from '../../components/LeadQualityGuide';
import ContactClient from './ContactClient';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'أرسل اهتمامك — حراج إنڤست',
  description: 'أرسل اهتمامك بفرصة تجارية في حراج إنڤست.'
};

export default function Contact() {
  return (
    <Layout>
      <main className="page contact-page-v45">
        <div className="wrap">
          <section className="conversion-hero-v45">
            <div>
              <span className="eyebrow">أرسل اهتمامك</span>
              <h1>ابدأ تواصلًا واضحًا حول فرصة مناسبة</h1>
              <p>اكتب نوع اهتمامك والبيانات الأساسية، وسنرتب الطلب ليسهل التعامل معه.</p>
            </div>

            <div className="conversion-hero-actions-v45">
              <Link className="btn btn-secondary" href="/marketplace">العودة للسوق</Link>
              <Link className="btn btn-secondary" href="/nda-request">طلب NDA</Link>
            </div>
          </section>

          <section className="conversion-layout-v45">
            <div className="card form-card conversion-form-card-v45">
              <Suspense fallback={<div className="card form-card">جاري تحميل النموذج...</div>}>
                <LeadQualityGuide />

          <ContactClient />
              </Suspense>
            </div>

            <aside className="conversion-side-v45">
              <div className="card conversion-side-card-v45">
                <h3>قبل الإرسال</h3>
                <div className="conversion-checklist-v45">
                  <div><span>1</span><b>حدد الفرصة أو نوع الاهتمام</b></div>
                  <div><span>2</span><b>اكتب بيانات تواصل صحيحة</b></div>
                  <div><span>3</span><b>أضف ملاحظة مختصرة وواضحة</b></div>
                </div>
              </div>

              <div className="card conversion-side-card-v45">
                <h3>مسار المتابعة</h3>
                <p>بعد إرسال الاهتمام، يمكن الانتقال إلى طلب السرية أو مشاركة تفاصيل إضافية حسب طبيعة الفرصة.</p>
              </div>
            </aside>
          </section>
        </div>
                <FinalConversionAssurance compact />
        </main>
    </Layout>
  );
}
