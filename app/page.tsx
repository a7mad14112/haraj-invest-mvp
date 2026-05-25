import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  BarChart3,
  Building2,
  CheckCircle2,
  FileSearch,
  LockKeyhole,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  TrendingUp,
  UsersRound,
  WalletCards,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { categories } from "@/data/mock";
import { getApprovedProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const approved = (await getApprovedProjects()).slice(0, 3);

  return (
    <main>
      <Navbar />

      <section className="market-shell">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:py-24">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-black text-[#0B1324] shadow-sm">
              <ShieldCheck className="h-4 w-4 text-[#2563EB]" />
              Marketplace موثوق للفرص التجارية
            </div>

            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-[#0B1324] md:text-6xl">
              منصة رقمية لاكتشاف وقياس فرص المشاريع.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-9 text-slate-600">
              حراج انڤست يجمع أصحاب المشاريع والمستثمرين في تجربة رسمية ومنظمة لعرض فرص البيع والشراكة والاستثمار مع مؤشرات تساعد على المقارنة الأولية.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/projects"
                className="flex items-center justify-center gap-2 rounded-2xl bg-[#0B1324] px-6 py-4 text-sm font-black text-white hover:bg-[#111C33]"
              >
                استعرض الفرص
                <ArrowLeft className="h-4 w-4" />
              </Link>
              <Link
                href="/dashboard/projects/new"
                className="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-center text-sm font-black text-[#0B1324] hover:bg-slate-50"
              >
                أضف مشروعك
              </Link>
            </div>

            <div className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/5">
              <div className="grid gap-3 md:grid-cols-[1fr_180px_150px_auto]">
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4">
                  <Search className="h-5 w-5 text-slate-400" />
                  <input
                    placeholder="ابحث عن مشروع، قطاع، مدينة..."
                    className="w-full bg-transparent py-4 text-sm font-bold outline-none placeholder:text-slate-400"
                  />
                </div>
                <select className="rounded-2xl bg-slate-50 px-4 py-4 text-sm font-bold outline-none">
                  <option>كل المدن</option>
                  <option>الرياض</option>
                  <option>جدة</option>
                  <option>الدمام</option>
                </select>
                <select className="rounded-2xl bg-slate-50 px-4 py-4 text-sm font-bold outline-none">
                  <option>كل القطاعات</option>
                  <option>تقنية</option>
                  <option>مطاعم</option>
                </select>
                <Link href="/projects" className="rounded-2xl bg-[#2563EB] px-5 py-4 text-center text-sm font-black text-white">
                  بحث
                </Link>
              </div>
              <div className="mt-3 flex flex-wrap gap-2 px-1">
                {["فرص مميزة", "مشاريع مربحة", "شراكة", "بيع كامل", "تقنية"].map((tag) => (
                  <span key={tag} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="trust-card rounded-[2rem] p-5">
            <div className="dark-panel relative overflow-hidden rounded-[1.5rem] p-6 text-white">
              <div className="relative">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <div className="text-sm text-slate-300">فرصة مميزة</div>
                    <div className="mt-1 text-2xl font-black">مصنع قائم للمنتجات البلاستيكية</div>
                  </div>
                  <Building2 className="h-10 w-10 text-white" />
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <Info label="نوع الفرصة" value="شراكة تشغيلية" />
                  <Info label="المدينة" value="الدمام" />
                  <Info label="القيمة" value="1.2M ريال" />
                  <Info label="صافي الربح" value="420K ريال" />
                </div>

                <div className="mt-5 rounded-2xl bg-white p-4 text-slate-950">
                  <div className="mb-3 flex items-center gap-2 font-black">
                    <BadgeCheck className="h-5 w-5 text-emerald-600" />
                    تمت المراجعة مبدئيًا
                  </div>
                  <p className="text-sm leading-7 text-slate-600">
                    فرصة شراكة في مشروع قائم مع مؤشرات مالية واضحة وطلب اهتمام منظم.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { label: "مشروع وفرصة", value: "+120", icon: Building2 },
            { label: "قطاع تجاري", value: "+18", icon: TrendingUp },
            { label: "طلب اهتمام", value: "+430", icon: UsersRound },
            { label: "فرصة مراجعة", value: "+75", icon: BadgeCheck },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="trust-card rounded-[1.5rem] p-5">
                <Icon className="mb-4 h-6 w-6 text-[#2563EB]" />
                <div className="text-3xl font-black text-[#0B1324]">{item.value}</div>
                <div className="mt-1 text-sm font-bold text-slate-500">{item.label}</div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-[#0B1324]">استكشف حسب القطاع</h2>
            <p className="mt-2 text-slate-600">قطاعات منظمة تساعدك على الوصول إلى الفرصة المناسبة.</p>
          </div>
          <Link href="/projects" className="font-black text-[#2563EB] hover:underline">
            عرض كل القطاعات
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {categories.map((item) => (
            <div key={item.slug} className="trust-card rounded-[1.5rem] p-5 transition hover:-translate-y-1">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0B1324] text-lg font-black text-white">
                {item.name.slice(0, 1)}
              </div>
              <div className="font-black text-slate-950">{item.name}</div>
              <div className="mt-1 text-sm font-bold text-slate-500">{item.count} فرصة</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-[#0B1324]">فرص مختارة من السوق</h2>
            <p className="mt-2 text-slate-600">بطاقات واضحة تعرض أهم مؤشرات المشروع بسرعة.</p>
          </div>
          <Link href="/projects" className="rounded-2xl bg-[#0B1324] px-5 py-3 text-sm font-black text-white hover:bg-[#111C33]">
            تصفح كل الفرص
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {approved.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12">
        <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200 md:p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-[#0B1324]">رحلة المستخدم داخل المنصة</h2>
            <p className="mt-2 text-slate-600">من الاكتشاف إلى طلب الاهتمام بطريقة منظمة.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-4">
            {[
              { title: "ابحث وقارن", text: "استخدم البحث والفلاتر لاختيار الفرص الأقرب لك.", icon: SlidersHorizontal },
              { title: "راجع المؤشرات", text: "اطلع على السعر والإيراد والربح والمخاطر.", icon: BarChart3 },
              { title: "أرسل اهتمامك", text: "قدّم طلب اهتمام واضح بدل التواصل العشوائي.", icon: WalletCards },
              { title: "ابدأ الفحص", text: "انتقل للفحص النافي للجهالة قبل أي اتفاق.", icon: FileSearch },
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <Icon className="h-6 w-6 text-[#2563EB]" />
                    <span className="text-3xl font-black text-slate-200">0{idx + 1}</span>
                  </div>
                  <h3 className="text-lg font-black text-[#0B1324]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-[#0B1324] py-16 text-white">
        <div className="mx-auto max-w-7xl px-5">
          <h2 className="text-3xl font-black tracking-tight">تجربة سوق رقمية موثوقة</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {[
              { title: "بحث وفلاتر", text: "الوصول للفرص حسب القطاع والمدينة ونوع العرض.", icon: SlidersHorizontal },
              { title: "عرض منظم", text: "مؤشرات مالية واضحة وبطاقات سهلة المقارنة.", icon: FileSearch },
              { title: "طلبات اهتمام", text: "تواصل جاد ومنظم بدل العشوائية.", icon: UsersRound },
              { title: "ثقة وحماية", text: "مراجعة مبدئية وبلاغات وسياسات واضحة.", icon: LockKeyhole },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6">
                  <Icon className="mb-4 h-7 w-7 text-emerald-300" />
                  <h3 className="text-xl font-black">{item.title}</h3>
                  <p className="mt-3 leading-7 text-slate-300">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-5 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-black text-[#0B1324]">هل لديك مشروع قابل للبيع أو الشراكة؟</h2>
            <p className="mt-2 max-w-2xl leading-8 text-slate-600">
              أضف مشروعك الآن بصيغة منظمة تساعد المهتمين على فهم الفرصة بسرعة.
            </p>
          </div>
          <Link href="/dashboard/projects/new" className="rounded-2xl bg-[#0B1324] px-6 py-4 text-sm font-black text-white hover:bg-[#111C33]">
            أضف مشروعك الآن
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <div className="text-xs text-slate-300">{label}</div>
      <div className="mt-1 font-black">{value}</div>
    </div>
  );
}
