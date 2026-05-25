export function formatSAR(value: number | null | undefined) {
  if (value === null || value === undefined) return "غير محدد";
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDateArabic(value: string | null | undefined) {
  if (!value) return "غير محدد";

  return new Intl.DateTimeFormat("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

export function statusLabel(status: string) {
  const labels: Record<string, string> = {
    draft: "مسودة",
    pending: "قيد المراجعة",
    approved: "منشور",
    rejected: "مرفوض",
    closed: "مغلق",
    new: "جديدة",
    in_progress: "قيد المعالجة",
    resolved: "تم الحل",
    reviewed: "تمت المراجعة",
  };
  return labels[status] || status;
}
