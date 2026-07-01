-- =====================================================================
-- حراج إنفست — v10.9 حقول مقدّم الفرصة: صاحب المشروع / وسيط مفوّض
-- شغّل هذا الملف في Supabase SQL Editor.
-- آمن لإعادة التشغيل: يستخدم add column if not exists.
-- =====================================================================

-- 1) حقول مقدّم الطلب في جدول طلبات المشاريع
alter table public.project_submissions
  add column if not exists submitter_type text not null default 'صاحب المشروع';

alter table public.project_submissions
  add column if not exists broker_name text;

alter table public.project_submissions
  add column if not exists broker_authorization text;

alter table public.project_submissions
  add column if not exists broker_authorization_confirmed boolean not null default false;

-- 2) علامة اختيارية في جدول الفرص المنشورة لإظهار شارة "عبر وسيط"
do $$
begin
  if exists (
    select 1 from information_schema.tables
    where table_schema = 'public' and table_name = 'opportunities'
  ) then
    execute 'alter table public.opportunities add column if not exists provided_via text';
  end if;
end $$;

-- ملاحظة:
-- لا يكفي أن تكون الفرصة مرسلة عبر وسيط حتى تظهر الشارة في صفحة الفرصة.
-- يجب عند نشرها في جدول opportunities ضبط provided_via = 'وسيط مفوّض'.


-- v11.0 — إقرار عمولة النجاح
alter table public.project_submissions
  add column if not exists commission_acknowledged boolean not null default false;
