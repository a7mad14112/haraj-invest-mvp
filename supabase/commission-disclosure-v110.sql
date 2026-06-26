-- =====================================================================
-- حراج إنڤست — v11.0 إقرار عمولة النجاح
-- شغّل هذا الملف إذا لم تشغّل broker-submitter-fields-v109.sql بعد تحديث v11.0.
-- آمن لإعادة التشغيل.
-- =====================================================================

alter table public.project_submissions
  add column if not exists commission_acknowledged boolean not null default false;
