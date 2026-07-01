import Layout from '../components/Layout';
import Hero from '../components/Hero';
import SampleOpportunityCard from '../components/SampleOpportunityCard';
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
    type: 'بيع نشاط',
    risk: 'متوسط',
    readiness: 'جاهز للتواصل',
    summary: 'مقهى عامل بموقع حيوي وقاعدة عملاء ثابتة، السبب: تفرّغ المالك لنشاط آخر.',
    value: '450,000 ريال',
    revenue: '780,000 ريال',
    profit: '180,000 ريال'
  },
  {
    slug: 'perfume-store',
    title: 'متجر إلكتروني متخصص في العطور',
    sector: 'تجارة إلكترونية',
    city: 'الرياض',
    type: 'بيع نشاط',
    risk: 'منخفض',
    readiness: 'قيد المراجعة',
    summary: 'متجر إلكتروني بهوية واضحة وقائمة عملاء متنامية، يبحث عن مشترٍ لتطوير العلامة.',
    value: '220,000 ريال',
    revenue: '420,000 ريال',
    profit: '95,000 ريال'
  },
  {
    slug: 'plastic-factory',
    title: 'مصنع صغير للمنتجات البلاستيكية',
    sector: 'صناعة',
    city: 'الدمام',
    type: 'فرصة استثمارية',
    risk: 'متوسط',
    readiness: 'جاهز للتواصل',
    summary: 'مصنع بطاقة إنتاجية قابلة للتوسعة وعقود توريد قائمة، يبحث عن ممول للتوسع.',
    value: '1,200,000 ريال',
    revenue: '2,400,000 ريال',
    profit: '420,000 ريال'
  },
  {
    slug: 'gym-jeddah',
    title: 'نادٍ رياضي مجهّز في جدة',
    sector: 'رياضة ولياقة',
    city: 'جدة',
    type: 'بيع نشاط',
    risk: 'متوسط',
    readiness: 'قيد المراجعة',
    summary: 'نادٍ مجهّز بالكامل باشتراكات شهرية مستقرة، في حي سكني عالي الكثافة.',
    value: '780,000 ريال',
    revenue: '1,150,000 ريال',
    profit: '240,000 ريال'
  },
  {
    slug: 'logistics-app',
    title: 'تطبيق خدمات لوجستية يبحث عن شريك ممول',
    sector: 'تقنية',
    city: 'الخبر',
    type: 'فرصة استثمارية',
    risk: 'مرتفع',
    readiness: 'مرحلة مبكرة',
    summary: 'تطبيق لربط المتاجر بمزوّدي التوصيل، بنموذج عمل مبدئي يحتاج رأس مال للنمو.',
    value: '2,000,000 ريال',
    revenue: '350,000 ريال',
    profit: '—'
  },
  {
    slug: 'dates-farm',
    title: 'مزرعة تمور منتجة مع شبكة توزيع',
    sector: 'زراعة وأغذية',
    city: 'القصيم',
    type: 'شراكة',
    risk: 'منخفض',
    readiness: 'جاهز للتواصل',
    summary: 'مزرعة منتجة بعلامة تجارية وشبكة توزيع، تبحث عن شريك لتوسعة خطوط التعبئة.',
    value: '1,500,000 ريال',
    revenue: '1,900,000 ريال',
    profit: '480,000 ريال'
  }
];

const howItWorks = [
  ['01', 'أرسل البيانات', 'أدخل معلومات المشروع الأساسية بطريقة مختصرة وواضحة.'],
  ['02', 'تُعرض الفرصة', 'نرتب البيانات لتصبح أسهل في القراءة والمقارنة.'],
  ['03', 'يبدأ التواصل', 'يرسل المهتم طلبه، ثم تبدأ المتابعة بين الأطراف.']
];

const homepageFaqsV53 = [
  ['كيف أبدأ؟', 'ابدأ بتصفح الفرص، أو أضف مشروعك، أو أرسل اهتمامك بفرصة محددة.']
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
        desc="اعرض مشروعك أو تصفح فرصًا تجارية منظمة، وابدأ التواصل المبدئي بكل سهولة."
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
            <p>تجمع المنصة بين العرض للمشاريع والفرص وبكونها مكانًا للتواصل بين المستثمرين المهتمين وأصحاب المشاريع، بخطوات منظمة ومسارات واضحة.</p>
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
            <span className="eyebrow">أمثلة توضيحية</span>
            <h2>كيف تبدو الفرص على المنصة</h2>
            <p className="lead">هذه أمثلة توضيحية لشكل عرض الفرص فقط، وليست فرصًا حقيقية. تصفّح السوق للاطلاع على الفرص المتاحة فعليًا.</p>
          </div>

          <div className="home-featured-grid home-featured-grid-teaser-v129">
            {featuredOpportunities.map((item) => (
              <SampleOpportunityCard item={item} key={item.slug} />
            ))}
          </div>

          <div className="home-section-action">
            <Link className="btn btn-primary" href="/marketplace">تصفّح الفرص المتاحة</Link>
          </div>
        </div>
      </section>

      <section className="section home-how-section">
        <div className="wrap">
          <div className="section-head center">
            <span className="eyebrow">كيف تعمل المنصة؟</span>
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
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">لماذا حراج إنڤست؟</span>
            <h2>واجهة منظمة لفرص تحتاج وضوحًا أكبر</h2>
            <p className="lead">نعرض المعلومات الأساسية بصورة مختصرة تساعد على الفهم والمتابعة.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/submit-project">أضف مشروعك</Link>
              <Link className="btn btn-secondary" href="/how-it-works">اعرف الطريقة</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section home-faq-section-v53">
        <div className="wrap">
          <div className="section-head center">
            <span className="eyebrow">أسئلة شائعة</span>
            <h2>إجابات مختصرة قبل أن تبدأ</h2>
            <p>سؤال سريع لتوضيح الخطوة الأولى — وتجد بقية الأسئلة في صفحة الأسئلة الشائعة.</p>
          </div>

          <div className="home-faq-grid-v53 home-faq-grid-single-v129">
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
