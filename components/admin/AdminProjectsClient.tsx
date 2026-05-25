"use client";

import { useEffect, useState } from "react";
import { projects as mockProjects } from "@/data/mock";
import { getSupabaseBrowser, isSupabaseConfigured } from "@/lib/supabase-browser";
import { formatSAR, statusLabel } from "@/lib/format";

function mapProject(row: any) {
  return {
    id: row.id,
    title: row.title,
    city: row.city,
    type: row.opportunity_type,
    askingPrice: row.asking_price,
    annualRevenue: row.annual_revenue,
    annualProfit: row.annual_profit,
    status: row.status,
    description: row.short_description || row.description,
  };
}

export function AdminProjectsClient() {
  const [items, setItems] = useState<any[]>(mockProjects);
  const [message, setMessage] = useState("");

  async function loadProjects() {
    if (!isSupabaseConfigured()) {
      setItems(mockProjects);
      setMessage("Supabase غير مضبوط. يتم عرض بيانات تجريبية.");
      return;
    }

    const supabase = getSupabaseBrowser();
    if (!supabase) return;

    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setMessage(error.message);
      setItems(mockProjects);
      return;
    }

    setItems((data || []).map(mapProject));
    setMessage("");
  }

  async function updateStatus(id: string, status: string) {
    if (!isSupabaseConfigured()) {
      setMessage("لا يمكن تحديث الحالة قبل ربط Supabase.");
      return;
    }

    const supabase = getSupabaseBrowser();
    if (!supabase) return;

    const { error } = await supabase
      .from("projects")
      .update({ status })
      .eq("id", id);

    if (error) {
      setMessage(error.message);
      return;
    }

    await loadProjects();
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div className="grid gap-6">
      {message && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-7 text-amber-800">
          {message}
        </div>
      )}

      {items.map((project) => (
        <article key={project.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700">
            {statusLabel(project.status)}
          </span>
          <h2 className="mt-3 text-2xl font-black text-[#0B1324]">{project.title}</h2>
          <p className="mt-2 text-slate-600">
            {project.city || "غير محدد"} — {formatSAR(project.askingPrice)}
          </p>
          <p className="mt-4 leading-8 text-slate-600">{project.description}</p>

          <div className="mt-5 grid gap-3 md:grid-cols-4">
            <button
              onClick={() => updateStatus(project.id, "approved")}
              className="rounded-2xl bg-emerald-600 px-4 py-3 text-sm font-black text-white"
            >
              قبول ونشر
            </button>
            <button
              onClick={() => updateStatus(project.id, "rejected")}
              className="rounded-2xl bg-red-600 px-4 py-3 text-sm font-black text-white"
            >
              رفض
            </button>
            <button
              onClick={() => updateStatus(project.id, "pending")}
              className="rounded-2xl bg-blue-600 px-4 py-3 text-sm font-black text-white"
            >
              قيد المراجعة
            </button>
            <button
              onClick={() => updateStatus(project.id, "closed")}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm font-black"
            >
              إغلاق
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
