import { Filter, Search, SlidersHorizontal } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { categories } from "@/data/mock";
import { getApprovedProjects } from "@/lib/projects";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const approved = await getApprovedProjects();

  return (
    <main>
      <Navbar />

      <section className="market-shell py-14">
        <div className="mx-auto max-w-7xl px-5">
          <div className="mb-3 text-sm font-black text-[#2563EB]">Marketplace الفرص</div>
          <h1 className="text-4xl font-black tracking-tight text-[#0B1324] md:text-5xl">
            تصفح الفرص التجارية والاستثمارية
          </h1>
          <p className="mt-4 max-w-2xl leading-8 text-slate-600">
            ابحث وقارن بين المشاريع حسب القطاع، المدينة، نوع العرض، والمؤشرات المالية.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-10 lg:grid-cols-[310px_1fr]">
        <aside className="h-fit rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-28">
          <div className="mb-5 flex items-center gap-2 font-black text-[#0B1324]">
            <Filter className="h-5 w-5" />
            الفلاتر
          </div>
          <div className="grid gap-4">
            <FilterSelect label="القطاع" options={["كل القطاعات", ...categories.map((c) => c.name)]} />
            <FilterSelect label="المدينة" options={["كل المدن", "الرياض", "جدة", "الدمام"]} />
            <FilterSelect label="نوع العرض" options={["كل الأنواع", "بيع كامل", "شراكة", "استثمار"]} />
            <FilterSelect label="مستوى المخاطر" options={["كل المستويات", "منخفض", "متوسط", "مرتفع"]} />
            <button className="rounded-2xl bg-[#0B1324] px-5 py-3 text-sm font-black text-white">
              تطبيق الفلاتر
            </button>
          </div>
        </aside>

        <div>
          <div className="mb-6 rounded-[1.75rem] border border-slate-200 bg-white p-4 shadow-sm">
            <div className="grid gap-3 md:grid-cols-[1fr_auto]">
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                  placeholder="ابحث باسم المشروع، المدينة، القطاع..."
                  className="w-full bg-transparent py-4 text-sm font-bold outline-none"
                />
              </div>
              <button className="flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-4 text-sm font-black text-[#0B1324]">
                <SlidersHorizontal className="h-4 w-4" />
                ترتيب حسب الأحدث
              </button>
            </div>
          </div>

          <div className="mb-5 flex items-center justify-between">
            <div className="font-black text-[#0B1324]">{approved.length} فرص منشورة</div>
            <div className="text-sm font-bold text-slate-500">النتائج المعروضة بيانات تجريبية للـ MVP</div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {approved.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function FilterSelect({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-slate-700">{label}</label>
      <select className="w-full rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold outline-none">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}
