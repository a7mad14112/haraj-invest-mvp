// مصدر واحد لتنسيق المبالغ في كل الموقع.
// يستخرج الأرقام من أي قيمة (نص بفاصلة إنجليزية، أو "ريال"، أو رقم خام من Supabase)
// ويعيدها بفواصل عربية، ويزيل أي وحدة عملة ملحقة.

export function formatAmount(value) {
  if (value === null || value === undefined) return '—';
  const raw = String(value).trim();
  if (!raw || raw === '—' || raw === '-') return '—';
  const digits = raw.replace(/[^\d]/g, '');
  if (!digits) return raw; // قيمة غير رقمية (مثل "عند الطلب") تُعرض كما هي.
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, '،');
}

// هل القيمة المنسّقة رقمية (لتقرير إظهار وحدة "ر.س")؟
export function isNumericAmount(value) {
  return /\d/.test(formatAmount(value));
}
