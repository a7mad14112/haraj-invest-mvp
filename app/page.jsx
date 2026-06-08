import Layout from '../components/Layout';
import Hero from '../components/Hero';
import Link from 'next/link';

export const metadata = {
  title: 'حراج إنڤست — سوق منظم للفرص التجارية والمشاريع',
  description: 'حراج إنڤست منصة سعودية تنظّم عرض الفرص التجارية والمشاريع وتسهّل التواصل الأولي بين أصحاب المشاريع والمهتمين. تصفّح الفرص أو أضف مشروعك.',
  alternates: { canonical: '/' }
};

const brandSignalsV69 = [
  ['عرض منظم', 'بيانات أوضح للفرص'],
  ['تواصل مباشر', 'اهتمام وNDA ومتابعة'],
  ['هوية موثوقة', 'واجهة رسمية ومركّزة']
];

const proofItems = [
  ['المنصة', 'عرض وتواصل'],
  ['التركيز', 'فرص تجارية'],
  ['الدور', 'تنظيم البيانات'],
  ['الميزة', 'وضوح في العرض']
];

const homeMetricsV52 = [
  ['فرص منظمة', 'عرض أوضح للمشاريع والفرص'],
  ['مسارات مباشرة', 'اهتمام، NDA، إضافة مشروع'],
  ['تجربة رسمية', 'واجهة مناسبة للزائر وصاحب المشروع'],
  ['جاهزية للتوسع', 'قابلة للربط ببيانات حقيقية لاحقًا']
];

const conversionPathsV52 = [
  {
    title: 'أريد تصفح الفرص',
    desc: 'ابدأ من السوق، واستخدم الفلاتر للوصول إلى الفرصة المناسبة.',
    href: '/marketplace',
    cta: 'تصفح الفرص'
  },
  {
    title: 'أريد عرض مشروعي',
    desc: 'أرسل بيانات مشروعك عبر نموذج متعدد الخطوات ومنظم.',
    href: '/submit-project',
    cta: 'أضف مشروعك'
  },
  {
    title: 'أريد إرسال اهتمام',
    desc: 'أرسل اهتمامك بفرصة محددة أو اطلب السرية عند الحاجة.',
    href: '/contact',
    cta: 'أرسل اهتمامك'
  }
];

const audiences = [
  ['أصحاب المشاريع', 'اعرض مشروعك بطريقة أوضح، واجعل بياناته الأساسية جاهزة للمهتمين.'],
  ['المهتمون بالفرص', 'تصفح فرصًا منظمة حسب القطاع والمدينة ونوع الفرصة.'],
  ['الشركاء والمستثمرون', 'ابدأ تواصلًا أوليًا واضحًا قبل الدخول في التفاصيل.']
];

const featuredOpportunities = [
  {
    slug: 'cafe-riyadh',
    title: 'مقهى قائم في شمال الرياض',
    sector: 'مطاعم ومقاهي',
    city: 'الرياض',
    value: '450,000 ريال'
  },
  {
    slug: 'perfume-store',
    title: 'متجر إلكتروني متخصص في العطور',
    sector: 'تجارة إلكترونية',
    city: 'الرياض',
    value: '220,000 ريال'
  },
  {
    slug: 'plastic-factory',
    title: 'مصنع صغير للمنتجات البلاستيكية',
    sector: 'صناعة',
    city: 'الدمام',
    value: '1,200,000 ريال'
  }
];

const howItWorks = [
  ['01', 'أرسل البيانات', 'أدخل معلومات المشروع الأساسية بطريقة مختصرة وواضحة.'],
  ['02', 'تُعرض الفرصة', 'نرتب البيانات لتصبح أسهل في القراءة والمقارنة.'],
  ['03', 'يبدأ التواصل', 'يرسل المهتم طلبه، ثم تبدأ المتابعة بين الأطراف.']
];

const homepageFaqsV53 = [
  ['كيف أبدأ؟', 'ابدأ بتصفح الفرص، أو أضف مشروعك، أو أرسل اهتمامك بفرصة محددة.'],
  ['هل يمكنني حفظ الفرص؟', 'نعم، يمكنك حفظ الفرص داخل المتصفح والرجوع إليها من صفحة المحفوظة.'],
  ['متى أطلب NDA؟', 'عند الحاجة لتنظيم مشاركة معلومات أكثر تفصيلًا أو حساسية.']
];

const valueItems = [
  ['تنظيم أفضل', 'بدل تشتت البيانات والرسائل غير المكتملة، تظهر الفرص بصورة أكثر وضوحًا.'],
  ['تجربة أكثر ثقة', 'تصميم واضح ومسارات محددة تساعد الزائر على اتخاذ الخطوة المناسبة.'],
  ['تواصل أسرع', 'نماذج الاهتمام وطلب السرية تجعل المتابعة أكثر ترتيبًا.']
];

const paths = [
  ['تصفح الفرص', 'ابحث عن فرص تجارية منظمة.', '/marketplace'],
  ['أضف مشروعك', 'أرسل بيانات مشروعك للعرض الأولي.', '/submit-project'],
  ['أرسل اهتمامك', 'ابدأ تواصلًا واضحًا حول فرصة.', '/contact']
];

export default function Home() {
  return (
    <Layout home>
      <Hero
        eyebrow="حراج إنڤست"
        title="سوق للفرص التجارية والمشاريع"
        desc="اعرض مشروعك أو تصفح فرصًا تجارية منظمة، وابدأ التواصل الأولي بوضوح."
        primary={{ href: '/marketplace', label: 'تصفح الفرص' }}
        secondary={{ href: '/submit-project', label: 'أضف مشروعك' }}
      />

      <section className="section home-proof-section home-proof-v38">
        <div className="wrap">
          <div className="home-proof-grid">
            {proofItems.map(([label, value]) => (
              <div className="home-proof-card" key={label}>
                <span>{label}</span>
                <b>{value}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-metrics-section-v52">
        <div className="wrap">
          <div className="home-metrics-panel-v52">
            <div className="home-metrics-copy-v52">
              <span className="eyebrow">منصة أوضح</span>
              <h2>واجهة مصممة لتقليل العشوائية في عرض الفرص</h2>
              <p>التركيز ليس على كثرة الكلام، بل على ترتيب البيانات ومسارات التواصل حتى يعرف الزائر ما الخطوة التالية.</p>
            </div>

            <div className="home-metrics-grid-v52">
              {homeMetricsV52.map(([title, desc]) => (
                <div key={title}>
                  <b>{title}</b>
                  <span>{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section home-conversion-paths-v52">
        <div className="wrap">
          <div className="section-head center">
            <span className="eyebrow">اختر مسارك</span>
            <h2>اختر الخطوة المناسبة لك</h2>
            <p>ابدأ من المسار الأقرب لك: تصفح، إضافة مشروع، أو تواصل أولي.</p>
          </div>

          <div className="home-conversion-grid-v52">
            {conversionPathsV52.map((item) => (
              <Link className="home-conversion-card-v52" href={item.href} key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
                <span>{item.cta}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-brand-strip-v69" aria-label="مؤشرات حراج إنڤست">
        <div className="wrap">
          <div className="home-brand-strip-inner-v69">
            {brandSignalsV69.map(([title, desc]) => (
              <div key={title}>
                <b>{title}</b>
                <span>{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-audience-section">
        <div className="wrap">
          <div className="section-head center">
            <span className="eyebrow">لمن المنصة؟</span>
            <h2>مصممة لأطراف الفرصة التجارية</h2>
            <p>تجمع المنصة بين العرض المنظم والتواصل الأولي، حتى تكون الخطوة التالية أوضح.</p>
          </div>

          <div className="grid-3">
            {audiences.map(([title, desc], index) => (
              <div className="card home-audience-card" key={title}>
                <div className="home-card-number">{index + 1}</div>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-featured-section">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">فرص مختارة</span>
            <h2>نماذج من الفرص المتاحة</h2>
            <p className="lead">ابدأ من السوق، وقارن بين الفرص حسب القطاع والمدينة والقيمة.</p>
          </div>

          <div className="home-featured-grid">
            {featuredOpportunities.map((item) => (
              <article className="card home-featured-card" key={item.slug}>
                <div className="home-featured-top">
                  <span>{item.sector}</span>
                  <b>{item.city}</b>
                </div>
                <h3>{item.title}</h3>
                <div className="home-featured-meta">
                  <span>القيمة</span>
                  <strong>{item.value}</strong>
                </div>
                <div className="hero-actions">
                  <Link className="btn btn-primary" href={`/opportunity/${item.slug}`}>عرض التفاصيل</Link>
                  <Link className="btn btn-secondary" href={`/contact?opportunity=${item.slug}`}>اهتمام</Link>
                </div>
              </article>
            ))}
          </div>

          <div className="home-section-action">
            <Link className="btn btn-secondary" href="/marketplace">عرض كل الفرص</Link>
          </div>
        </div>
      </section>

      <section className="section home-how-section">
        <div className="wrap">
          <div className="section-head center">
            <span className="eyebrow">كيف تعمل؟</span>
            <h2>مسار بسيط وواضح</h2>
            <p>من عرض البيانات إلى بدء التواصل، كل خطوة مصممة لتقليل العشوائية.</p>
          </div>

          <div className="home-timeline">
            {howItWorks.map(([num, title, desc]) => (
              <div className="home-timeline-item" key={title}>
                <div className="home-timeline-num">{num}</div>
                <div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-value-section">
        <div className="wrap grid-2">
          <div className="section-head">
            <span className="eyebrow">لماذا حراج إنڤست؟</span>
            <h2>واجهة منظمة لفرص تحتاج وضوحًا أكبر</h2>
            <p className="lead">نعرض المعلومات الأساسية بصورة مختصرة تساعد على الفهم والمتابعة.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/submit-project">أضف مشروعك</Link>
              <Link className="btn btn-secondary" href="/how-it-works">اعرف الطريقة</Link>
            </div>
          </div>

          <div className="home-value-list">
            {valueItems.map(([title, desc]) => (
              <div className="card home-value-card" key={title}>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-faq-section-v53">
        <div className="wrap">
          <div className="section-head center">
            <span className="eyebrow">أسئلة شائعة</span>
            <h2>إجابات مختصرة قبل أن تبدأ</h2>
            <p>جمعنا الأسئلة الأكثر تكرارًا حتى تكون الخطوة التالية أوضح.</p>
          </div>

          <div className="home-faq-grid-v53">
            {homepageFaqsV53.map(([q, a]) => (
              <div className="card home-faq-card-v53" key={q}>
                <h3>{q}</h3>
                <p>{a}</p>
              </div>
            ))}
          </div>

          <div className="home-section-action">
            <Link className="btn btn-secondary" href="/faq">عرض كل الأسئلة</Link>
          </div>
        </div>
      </section>

      <section className="section home-final-cta">
        <div className="wrap">
          <div className="home-final-box home-final-box-v38">
            <span className="eyebrow">ابدأ الآن</span>
            <h2>ابدأ من المسار الأنسب لك</h2>
            <p>اختر بين تصفح الفرص، إضافة مشروع، أو إرسال اهتمام أولي بخطوة مباشرة.</p>

            <div className="home-paths-mini">
              {paths.map(([title, desc, href]) => (
                <Link className="home-mini-path" href={href} key={title}>
                  <b>{title}</b>
                  <span>{desc}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
