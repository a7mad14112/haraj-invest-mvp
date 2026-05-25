import { projects as mockProjects } from "@/data/mock";
import { getSupabaseServer } from "@/lib/supabase-server";

function normalizeNumber(value: unknown) {
  if (value === null || value === undefined) return null;
  const numberValue = Number(value);
  return Number.isFinite(numberValue) ? numberValue : null;
}

function mapProject(row: any) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.categories?.name_ar || row.category_name || "غير مصنف",
    city: row.city || "غير محدد",
    type: row.opportunity_type || "غير محدد",
    stage: row.project_stage || "غير محدد",
    askingPrice: normalizeNumber(row.asking_price),
    annualRevenue: normalizeNumber(row.annual_revenue),
    annualProfit: normalizeNumber(row.annual_profit),
    status: row.status || "pending",
    featured: Boolean(row.is_featured),
    verified: Boolean(row.is_verified),
    views: row.views_count || 0,
    riskLevel: row.risk_level || "متوسط",
    growthPotential: row.growth_potential || "جيد",
    healthScore: row.health_score || 70,
    payback: row.payback_period || "غير محدد",
    margin: row.profit_margin || "غير محدد",
    trustFlags: row.trust_flags || ["مراجعة مبدئية"],
    description: row.short_description || row.description || "",
    details: row.description || row.short_description || "",
    strengths: row.strengths || [],
    risks: row.risks || [],
    includes: row.includes || [],
  };
}

export async function getApprovedProjects() {
  const supabase = getSupabaseServer();

  if (!supabase) {
    return mockProjects.filter((project) => project.status === "approved");
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*, categories(name_ar, slug)")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (error || !data || data.length === 0) {
    return mockProjects.filter((project) => project.status === "approved");
  }

  return data.map(mapProject);
}

export async function getProjectBySlug(slug: string) {
  const supabase = getSupabaseServer();

  if (!supabase) {
    return mockProjects.find(
      (project) => project.slug === slug && project.status === "approved"
    );
  }

  const { data, error } = await supabase
    .from("projects")
    .select("*, categories(name_ar, slug)")
    .eq("slug", slug)
    .eq("status", "approved")
    .single();

  if (error || !data) {
    return mockProjects.find(
      (project) => project.slug === slug && project.status === "approved"
    );
  }

  return mapProject(data);
}
