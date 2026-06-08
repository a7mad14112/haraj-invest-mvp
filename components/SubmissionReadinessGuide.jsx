import Link from 'next/link';

const readiness = [
  ['وصف واضح', 'ما هو المشروع؟ وما المشكلة أو الفرصة التي يخدمها؟'],
  ['أرقام أساسية', 'القيمة المطلوبة، الإيرادات، الربح، أو مؤشرات تشغيلية إن وجدت.'],
  ['مستندات داعمة', 'السجل، الرخص، العروض، العقود، أو أي مستند يساعد على الفهم.'],
  ['هدف محدد', 'بيع، شراكة، تمويل، توسع، أو بحث عن مستثمر استراتيجي.']
];

export default function SubmissionReadinessGuide() {
  return (
    <section className="submission-guide-v76">
      <div className="submission-guide-head-v76">
        <span className="eyebrow">قبل الإرسال</span>
        <h2>اجعل مشروعك أوضح للمهتمين</h2>
        <p>كلما كانت البيانات أكثر تنظيمًا، زادت فرصة فهم المشروع والانتقال إلى تواصل جاد.</p>
      </div>

      <div className="submission-guide-grid-v76">
        {readiness.map(([title, desc]) => (
          <div key={title}>
            <b>{title}</b>
            <span>{desc}</span>
          </div>
        ))}
      </div>

      <div className="submission-guide-note-v76">
        <b>نصيحة عملية:</b>
        <span>اكتب المعلومات كما لو أن الطرف الآخر سيقرر هل يطلب تفاصيل إضافية خلال دقيقة واحدة.</span>
      </div>

      <div className="submission-guide-actions-v76">
        <Link className="btn btn-secondary" href="/how-it-works">كيف تعمل المنصة؟</Link>
        <Link className="btn btn-secondary" href="/faq">الأسئلة الشائعة</Link>
      </div>
    </section>
  );
}
