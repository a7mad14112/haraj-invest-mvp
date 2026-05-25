"use client";

import { useState } from "react";
import { Building2, FileText, ImagePlus, LineChart, Send } from "lucide-react";
import { getSupabaseBrowser, isSupabaseConfigured } from "@/lib/supabase-browser";

function toNumber(value: string) {
  if (!value) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function makeSlug(title: string) {
  const basic = title
    .trim()
    .toLowerCase()
    .replace(/[\u064B-\u065F]/g, "")
    .replace(/[^\u0600-\u06FFa-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return `${basic || "project"}-${Date.now()}`;
}

export function NewProjectForm() {
  const [form, setForm] = useState({
    title: "",
    city: "",
    category: "",
    opportunityType: "",
    stage: "",
    askingPrice: "",
    annualRevenue: "",
    annualProfit: "",
    description: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  function update(name: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isSupabaseConfigured()) {
      setStatus("error");
      setMessage("لم يتم ضبط Supabase بعد. أضف مفاتيح Supabase في Vercel ثم أعد النشر.");
      return;
    }

    const supabase = getSupabaseBrowser();
    if (!supabase) return;

    setStatus("loading");
    setMessage("");

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      setStatus("error");
      setMessage("يجب تسجيل الدخول قبل إضافة مشروع.");
      return;
    }

    const payload = {
      owner_id: userData.user.id,
      title: form.title,
      slug: makeSlug(form.title),
      city: form.city,
      opportunity_type: form.opportunityType,
      project_stage: form.stage,
      asking_price: toNumber(form.askingPrice),
      annual_revenue: toNumber(form.annualRevenue),
      annual_profit: toNumber(form.annualProfit),
      short_description: form.description.slice(0, 220),
      description: form.description,
      status: "pending",
      is_featured: false,
      views_count: 0,
    };

    const { error } = await supabase.from("projects").insert(payload);

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("success");
    setMessage("تم إرسال المشروع للمراجعة. سيظهر في المنصة بعد موافقة الإدارة.");
    setForm({
      title: "",
      city: "",
      category: "",
      opportunityType: "",
      stage: "",
      askingPrice: "",
      annualRevenue: "",
      annualProfit: "",
      description: "",
    });
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <div className="mb-8 rounded-[2rem] bg-[#0B1324] p-8 text-white shadow-2xl shadow-slate-900/20">
        <div className="mb-4 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-black text-slate-200">
          إضافة فرصة جديدة
        </div>
        <h1 className="text-3xl font-black tracking-tight md:text-5xl">
          اعرض مشروعك بطريقة منظمة وموثوقة.
        </h1>
        <p className="mt-4 max-w-3xl leading-8 text-slate-300">
          كل فرصة تمر على مراجعة مبدئية قبل النشر. أدخل البيانات بوضوح لزيادة جودة الطلبات الواردة.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-6">
        <Step
          number="01"
          icon={<Building2 className="h-5 w-5" />}
          title="معلومات المشروع"
          description="بيانات أساسية تساعد المستخدم على فهم الفرصة بسرعة."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="عنوان المشروع" placeholder="مثال: مقهى قائم في شمال الرياض" value={form.title} onChange={(value) => update("title", value)} required />
            <Field label="المدينة" placeholder="الرياض" value={form.city} onChange={(value) => update("city", value)} required />
            <Field label="القطاع" placeholder="مطاعم ومقاهي" value={form.category} onChange={(value) => update("category", value)} />
            <Field label="نوع الفرصة" placeholder="بيع كامل / شراكة / استثمار" value={form.opportunityType} onChange={(value) => update("opportunityType", value)} required />
            <Field label="مرحلة المشروع" placeholder="قائم ويعمل / نموذج أولي / مربح" value={form.stage} onChange={(value) => update("stage", value)} />
          </div>
        </Step>

        <Step
          number="02"
          icon={<LineChart className="h-5 w-5" />}
          title="المؤشرات المالية"
          description="أرقام مختصرة لا تغني عن الفحص النافي للجهالة، لكنها تساعد على المقارنة الأولية."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="القيمة المطلوبة" placeholder="450000" value={form.askingPrice} onChange={(value) => update("askingPrice", value)} />
            <Field label="الإيرادات السنوية" placeholder="780000" value={form.annualRevenue} onChange={(value) => update("annualRevenue", value)} />
            <Field label="صافي الربح السنوي" placeholder="180000" value={form.annualProfit} onChange={(value) => update("annualProfit", value)} />
          </div>
        </Step>

        <Step
          number="03"
          icon={<FileText className="h-5 w-5" />}
          title="وصف الفرصة"
          description="اكتب وصفًا واضحًا: سبب البيع، نقاط القوة، المخاطر، وما يشمله العرض."
        >
          <textarea
            rows={8}
            value={form.description}
            onChange={(event) => update("description", event.target.value)}
            placeholder="اكتب وصف المشروع، سبب العرض، مزاياه، المخاطر، وما يشمله البيع أو الشراكة..."
            className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 leading-8 outline-none transition focus:border-[#0B1324] focus:bg-white"
            required
          />
        </Step>

        <Step
          number="04"
          icon={<ImagePlus className="h-5 w-5" />}
          title="الصور والملفات"
          description="رفع الملفات سيُربط لاحقًا مع Supabase Storage. في هذه النسخة يتم حفظ بيانات المشروع أولًا."
        >
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <ImagePlus className="mx-auto mb-3 h-8 w-8 text-slate-400" />
            <div className="font-black text-[#0B1324]">رفع الصور والملفات</div>
            <p className="mt-2 text-sm text-slate-500">سيتم تفعيل رفع الملفات في المرحلة التالية.</p>
          </div>
        </Step>

        {message && (
          <div
            className={`rounded-2xl p-4 text-sm font-bold leading-7 ${
              status === "error"
                ? "border border-red-200 bg-red-50 text-red-700"
                : "border border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            {message}
          </div>
        )}

        <button
          disabled={status === "loading"}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0B1324] px-6 py-4 text-sm font-black text-white hover:bg-[#111C33] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send className="h-4 w-4" />
          {status === "loading" ? "جاري الإرسال..." : "إرسال للمراجعة"}
        </button>
      </form>
    </section>
  );
}

function Step({
  number,
  icon,
  title,
  description,
  children,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0B1324] text-white">
          {icon}
        </div>
        <div>
          <div className="text-xs font-black text-blue-600">{number}</div>
          <h2 className="mt-1 text-2xl font-black text-[#0B1324]">{title}</h2>
          <p className="mt-2 leading-7 text-slate-500">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  placeholder,
  value,
  onChange,
  required = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-black text-slate-700">{label}</label>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0B1324] focus:bg-white"
      />
    </div>
  );
}
