import Link from "next/link";
import { ArrowLeft, BadgeCheck, Eye, Handshake, MapPin, ShieldCheck, TrendingUp } from "lucide-react";
import { formatSAR } from "@/lib/format";

export function ProjectCard({ project }: { project: any }) {
  const score = project.healthScore ?? 70;

  return (
    <article className="group overflow-hidden rounded-[1.85rem] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/10">
      <div className="relative h-52 bg-[#0B1324] p-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(37,99,235,.38),transparent_25%),radial-gradient(circle_at_85%_20%,rgba(16,185,129,.28),transparent_25%)]" />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <div className="rounded-2xl bg-white/10 px-3 py-2 text-xs font-black text-white backdrop-blur">
              {project.category}
            </div>
            {project.featured && (
              <span className="rounded-2xl bg-[#10B981] px-3 py-2 text-xs font-black text-white">
                مميز
              </span>
            )}
          </div>

          <div className="grid grid-cols-[1fr_auto] gap-3">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-4 text-white backdrop-blur">
              <div className="text-xs text-slate-300">القيمة المطلوبة</div>
              <div className="mt-1 text-xl font-black">{formatSAR(project.askingPrice)}</div>
            </div>
            <div className="flex h-full w-20 flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/10 text-white backdrop-blur">
              <div className="text-xs text-slate-300">Score</div>
              <div className="text-2xl font-black">{score}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
            <BadgeCheck className="h-4 w-4" />
            مراجعة مبدئية
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">
            <TrendingUp className="h-4 w-4" />
            نمو {project.growthPotential || "جيد"}
          </span>
        </div>

        <h3 className="text-xl font-black leading-8 text-slate-950 group-hover:text-[#0B1324]">
          {project.title}
        </h3>

        <p className="mt-3 line-clamp-2 text-sm leading-7 text-slate-600">
          {project.description}
        </p>

        <div className="mt-5 grid gap-3 text-sm font-bold text-slate-700">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-slate-400" />
            {project.city}
          </div>
          <div className="flex items-center gap-2">
            <Handshake className="h-4 w-4 text-slate-400" />
            {project.type}
          </div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-slate-400" />
            {project.views} مشاهدة
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <Metric label="الإيرادات" value={formatSAR(project.annualRevenue)} />
          <Metric label="الربح" value={formatSAR(project.annualProfit)} />
          <Metric label="الاسترداد" value={project.payback || "غير محدد"} />
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {(project.trustFlags || ["مراجعة مبدئية"]).slice(0, 3).map((flag: string) => (
            <span key={flag} className="inline-flex items-center gap-1 rounded-full bg-slate-50 px-3 py-1 text-xs font-black text-slate-600">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
              {flag}
            </span>
          ))}
        </div>

        <Link
          href={`/projects/${project.slug}`}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0B1324] px-4 py-3 text-sm font-black text-white hover:bg-[#111C33]"
        >
          عرض الفرصة
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3 text-center">
      <div className="text-[11px] font-black text-slate-500">{label}</div>
      <div className="mt-1 truncate text-xs font-black text-[#0B1324]">{value}</div>
    </div>
  );
}
