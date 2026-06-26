const guideItems = [
  ['نوع الاهتمام', 'شراء، شراكة، تمويل، استفسار أولي، أو طلب معلومات إضافية.'],
  ['القدرة المالية', 'نطاق تقريبي يساعد على توجيه الطلب للطرف المناسب.'],
  ['سبب الاهتمام', 'لماذا هذه الفرصة أو هذا القطاع مناسب لك؟'],
  ['الخطوة المطلوبة', 'هل تريد اتصالًا؟ NDA؟ مستندات؟ اجتماعًا أوليًا؟']
];

export default function LeadQualityGuide() {
  return (
    <section className="lead-quality-guide-v77">
      <div className="lead-quality-head-v77">
        <span className="eyebrow">طلب اهتمام أقوى</span>
        <h2>اكتب طلبًا يساعد على المتابعة الجادة</h2>
        <p>الطلب الواضح يختصر الوقت ويجعل الطرف الآخر يعرف هل هناك جدية وتوافق مبدئي.</p>
      </div>

      <div className="lead-quality-grid-v77">
        {guideItems.map(([title, desc]) => (
          <div key={title}>
            <b>{title}</b>
            <span>{desc}</span>
          </div>
        ))}
      </div>

      <div className="lead-quality-example-v77">
        <b>مثال مختصر:</b>
        <span>أنا مهتم بالشراكة في فرصة تشغيلية في قطاع المقاهي بالرياض، وأرغب بمراجعة البيانات المالية بعد NDA إذا كانت الأرقام الأولية مناسبة.</span>
      </div>
    </section>
  );
}
