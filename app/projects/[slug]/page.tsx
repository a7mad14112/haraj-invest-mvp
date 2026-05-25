import { notFound } from "next/navigation";
import { AlertTriangle, BadgeCheck, Building2, CalendarDays, CheckCircle2, Eye, Handshake, MapPin, ShieldCheck, Wallet } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { getProjectBySlug } from "@/lib/projects";
import { formatSAR } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ProjectDetailsPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  if (!project) notFound();

  return (
    <main>
      <Navbar />

      <section className="market-shell py-12">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 lg:grid-cols-[1fr_390px]">
          <div>
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-white px-3 py-1 text-sm font-black text-[#0B1324] shadow-sm">
                {project.category}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-sm font-black text-emerald-700">
                <BadgeCheck className="h-4 w-4" />
                مراجعة مبدئية
              </span>
              <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-black text-blue-700">
                Score {project.healthScore || 70}
              </span>
            </div>

            <h1 className="text-4xl font-black leading-tight tracking-tight text-[#0B1324] md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-9 text-slate-600">
              {project.description}
            </p>
          </div>

          <aside className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5">
            <div className="mb-5 flex items-center gap-3">
              <div className="rounded-2xl bg-[#0B1324] p-3 text-white">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-black text-slate-500">القيمة المطلوبة</div>
                <div className="text-2xl font-black text-[#0B1324]">{formatSAR(project.askingPrice)}</div>
              </div>
            </div>

            <div className="grid gap-4 text-sm font-bold text-slate-700">
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-slate-400" />{project.city}</div>
              <div className="flex items-center gap-2"><Handshake className="h-4 w-4 text-slate-400" />{project.type}</div>
              <div className="flex items-center gap-2"><Wallet className="h-4 w-4 text-slate-400" />{formatSAR(project.askingPrice)}</div>
              <div className="flex items-center gap-2"><Eye className="h-4 w-4 text-slate-400" />{project.views + 1} مشاهدة</div>
              <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4 text-slate-400" />2026</div>
            </div>

            <button className="mt-6 w-full rounded-2xl bg-[#0B1324] px-5 py-4 text-sm font-black text-white hover:bg-[#111C33]">
              إرسال طلب اهتمام
            </button>
            <button className="mt-4 w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 hover:bg-slate-50">
              الإبلاغ عن المشروع
            </button>
          </aside>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 lg:grid-cols-[1fr_340px]">
        <div className="grid gap-6">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-[#0B1324]">المؤشرات الرئيسية</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-4">
              <Info label="مرحلة المشروع" value={project.stage} />
              <Info label="الإيرادات السنوية" value={formatSAR(project.annualRevenue)} />
              <Info label="صافي الربح السنوي" value={formatSAR(project.annualProfit)} />
              <Info label="فترة الاسترداد" value={project.payback || "غير محدد"} />
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-black text-[#0B1324]">الوصف التفصيلي</h2>
            <p className="mt-4 leading-9 text-slate-600">{project.details}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <ListBlock title="نقاط القوة" items={project.strengths || []} />
            <ListBlock title="المخاطر" items={project.risks || []} />
            <ListBlock title="يشمل العرض" items={project.includes || []} />
          </div>

          <div className="rounded-[1.75rem] border border-blue-100 bg-blue-50 p-6">
            <div className="mb-2 flex items-center gap-2 font-black text-[#0B1324]">
              <AlertTriangle className="h-5 w-5 text-[#2563EB]" />
              تنبيه مهم
            </div>
            <p className="leading-8 text-slate-700">
              المعلومات مقدمة من صاحب المشروع. يجب على المهتم إجراء الفحص النافي للجهالة والاستعانة بمختصين قبل أي اتفاق.
            </p>
          </div>
        </div>

        <aside className="grid h-fit gap-6">
          <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-black text-[#0B1324]">حالة الثقة</h3>
            <div className="mt-5 grid gap-3">
              {(project.trustFlags || ["بيانات أساسية مكتملة", "تمت المراجعة مبدئيًا", "قابل لاستقبال طلبات اهتمام"]).map((item: string) => (
                <div key={item} className="flex items-center gap-2 rounded-2xl bg-slate-50 p-4 text-sm font-black text-slate-700">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-slate-200 bg-[#0B1324] p-6 text-white shadow-sm">
            <h3 className="text-xl font-black">قبل التواصل</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              جهّز أسئلتك حول الإيرادات، المصاريف، العقود، الالتزامات، وأسباب البيع أو الشراكة.
            </p>
          </div>
        </aside>
      </section>

      <Footer />
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">
      <div className="text-sm font-black text-slate-500">{label}</div>
      <div className="mt-2 text-lg font-black text-[#0B1324]">{value}</div>
    </div>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-xl font-black text-[#0B1324]">{title}</h3>
      <div className="grid gap-3">
        {items.length > 0 ? items.map((item) => (
          <div key={item} className="flex items-start gap-2 text-sm font-bold leading-7 text-slate-600">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-600" />
            {item}
          </div>
        )) : (
          <p className="text-sm text-slate-500">لا توجد بيانات مضافة.</p>
        )}
      </div>
    </div>
  );
}
