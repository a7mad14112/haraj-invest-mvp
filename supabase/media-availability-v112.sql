-- =====================================================================
-- حراج إنڤست — v11.2 توفّر الصور والمستندات + إقرار العمولة
-- شغّل هذا الملف في Supabase SQL Editor.
-- آمن لإعادة التشغيل.
-- لا يوجد رفع ملفات؛ الحقول فقط لتوضيح التوفر.
-- =====================================================================

alter table public.project_submissions
  add column if not exists has_media text;

alter table public.project_submissions
  add column if not exists media_types text;

alter table public.project_submissions
  add column if not exists media_note text;

alter table public.project_submissions
  add column if not exists commission_acknowledged boolean not null default false;
