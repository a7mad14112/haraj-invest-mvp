import Layout from '../../components/Layout';
import AccountFollowupGuide from '../../components/AccountFollowupGuide';
import { AccountBox } from '../../components/AuthForms';
import MyRequestsBox from '../../components/MyRequestsBox';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'حسابي — حراج إنڤست',
  description: 'لوحة حساب المستخدم في حراج إنڤست.'
};

const accountActions = [
  ['تصفح الفرص', 'ابحث عن فرص تجارية منظمة.', '/marketplace'],
  ['أضف مشروعك', 'أرسل بيانات مشروعك بخطوات واضحة.', '/submit-project'],
  ['أرسل اهتمامك', 'ابدأ تواصلًا أوليًا حول فرصة.', '/contact'],
  ['طلب NDA', 'اطلب السرية قبل مشاركة التفاصيل.', '/nda-request']
];

const accountTips = [
  ['جهّز بياناتك', 'اكتب وصفًا مختصرًا للفرصة أو نوع الاهتمام.'],
  ['راجع الأرقام', 'القيمة، الإيرادات، والربح تساعد على فهم المشروع.'],
  ['تابع طلباتك', 'راجع قسم طلباتي لمعرفة آخر ما أرسلته.']
];

export default function Account() {
  return (
    <Layout>
      <main className="page account-page account-page-v44">
        <div className="wrap">
          <section className="account-intro-v44">
            <div>
              <span className="eyebrow">حسابي</span>
              <h1>لوحة حسابك في حراج إنڤست</h1>
              <p>مساحة مختصرة لمتابعة طلباتك والوصول السريع إلى أهم مسارات المنصة.</p>
            </div>

            <div className="account-intro-actions-v44">
              <Link className="btn btn-primary" href="/marketplace">تصفح الفرص</Link>
              <Link className="btn btn-secondary" href="/submit-project">أضف مشروعك</Link>
            </div>
          </section>

          <section className="account-dashboard-grid-v44">
            <div className="account-main-v44">
              <AccountBox />
            </div>

            <aside className="account-side-v44">
              <div className="card account-side-card-v44">
                <h3>روابط سريعة</h3>
                <div className="account-side-links-v44">
                  {accountActions.map(([title, desc, href]) => (
                    <Link href={href} key={title}>
                      <b>{title}</b>
                      <span>{desc}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="card account-side-card-v44">
                <h3>نصائح مختصرة</h3>
                <div className="account-tip-list-v44">
                  {accountTips.map(([title, desc], index) => (
                    <div key={title}>
                      <span>{index + 1}</span>
                      <div>
                        <b>{title}</b>
                        <small>{desc}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>
          </section>

          <section className="account-requests-wrap-v44">
            <AccountFollowupGuide />

          <MyRequestsBox />
          </section>
        </div>
      </main>
    </Layout>
  );
}
