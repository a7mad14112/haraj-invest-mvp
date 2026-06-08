-- =====================================================================
-- حراج إنڤست — حقول توفّر الصور (الخطوة 3 في نموذج إضافة المشروع)
-- شغّل هذا الملف في Supabase SQL Editor.
-- آمن لإعادة التشغيل: يستخدم "add column if not exists".
-- ملاحظة: هذه الحقول للإفصاح فقط عن توفّر الصور — لا يتم رفع أي ملفات.
-- =====================================================================

alter table public.project_submissions
  add column if not exists has_media text;

alter table public.project_submissions
  add column if not exists media_types text;

alter table public.project_submissions
  add column if not exists media_note text;

-- لا تغيير في سياسات RLS. الإدخال العام يبقى كما هو.
