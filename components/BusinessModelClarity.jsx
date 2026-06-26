import Link from 'next/link';

const items = [
  ['لأصحاب المشاريع', 'عرض المشروع بشكل منظم يزيد وضوحه أمام المهتمين ويختصر الأسئلة الأولية المتكررة.'],
  ['للمهتمين بالفرص', 'تصفح منظم، حفظ ومشاركة، طلب اهتمام، وطلب NDA عند الحاجة لبيانات أعمق.'],
  ['للمنصة', 'تنظيم الطلبات، تحسين جودة التواصل، وبناء تدفق فرص أوضح يمكن تطويره لاحقًا تجاريًا.']
];

const revenuePaths = [
  ['خدمات عرض مميزة', 'إبراز مشاريع مختارة وفق ضوابط واضحة.'],
  ['اشتراكات أدوات', 'لوحات متابعة أو مزايا إضافية لأصحاب المشاريع والمهتمين.'],
  ['خدمات مساندة', 'تنسيق NDA، تجهيز ملف فرصة، أو دعم أولي في تنظيم البيانات.']
];

export default function BusinessModelClarity({ compact = false }) {
  return (
    <section className={`business-model-v81 ${compact ? 'compact' : ''}`}>
      <div className="business-model-head-v81">
        <span className="eyebrow">نموذج العمل</span>
        <h2>منصة تربط العرض الجاد بالاهتمام المنظم</h2>
        <p>القيمة الأساسية ليست في كثرة القوائم، بل في جعل الفرصة مفهومة، قابلة للمراجعة، وسهلة المتابعة.</p>
      </div>

      <div className="business-model-grid-v81">
        {items.map(([title, desc]) => (
          <article key={title}>
            <b>{title}</b>
            <span>{desc}</span>
          </article>
        ))}
      </div>

      {!compact && (
        <div className="business-model-revenue-v81">
          <div>
            <h3>مسارات دخل مستقبلية محتملة</h3>
            <p>هذه المسارات يمكن تفعيلها تدريجيًا بعد إثبات الطلب وجودة الاستخدام.</p>
          </div>
          <div className="business-model-revenue-grid-v81">
            {revenuePaths.map(([title, desc]) => (
              <div key={title}>
                <b>{title}</b>
                <span>{desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="business-model-actions-v81">
        <Link className="btn btn-primary" href="/submit-project">أضف مشروعك</Link>
        <Link className="btn btn-secondary" href="/marketplace">تصفح الفرص</Link>
      </div>
    </section>
  );
}
