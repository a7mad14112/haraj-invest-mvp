import Link from 'next/link';

const points = [
  ['ابدأ بدون تعقيد', 'تصفح الفرص أو أضف مشروعك من المسار المناسب.'],
  ['اتخذ خطوة أولى فقط', 'إرسال الاهتمام لا يعني التزامًا نهائيًا.'],
  ['استخدم NDA عند الحاجة', 'اطلب السرية قبل مشاركة معلومات تفصيلية أو حساسة.']
];

export default function FinalConversionAssurance({ compact = false }) {
  return (
    <section className={`final-assurance-v89 ${compact ? 'compact' : ''}`}>
      <div className="final-assurance-head-v89">
        <span className="eyebrow">خطوة أولى منظمة</span>
        <h2>لا تحتاج إلى قرار نهائي الآن</h2>
        <p>ابدأ بخطوة بسيطة: تصفح، احفظ، شارك، أرسل اهتمامك، أو اطلب NDA عندما تحتاج تفاصيل أعمق.</p>
      </div>

      <div className="final-assurance-grid-v89">
        {points.map(([title, desc]) => (
          <div key={title}>
            <b>{title}</b>
            <span>{desc}</span>
          </div>
        ))}
      </div>

      {!compact && (
        <div className="final-assurance-actions-v89">
          <Link className="btn btn-primary" href="/marketplace">تصفح الفرص</Link>
          <Link className="btn btn-secondary" href="/submit-project">أضف مشروعك</Link>
          <Link className="btn btn-secondary" href="/contact">أرسل اهتمامك</Link>
        </div>
      )}
    </section>
  );
}
