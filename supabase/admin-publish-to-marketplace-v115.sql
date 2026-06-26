-- =====================================================================
-- حراج إنڤست — v11.5 النشر من لوحة الإدارة إلى تصفح الفرص
-- شغّل هذا الملف في Supabase SQL Editor.
-- آمن لإعادة التشغيل.
-- =====================================================================

create extension if not exists "uuid-ossp";

-- 1) جدول الفرص المنشورة
create table if not exists public.opportunities (
  id uuid primary key default uuid_generate_v4(),
  slug text unique,
  title text not null,
  city text,
  sector text,
  opportunity_type text,
  asking_value text,
  revenue_estimate text,
  profit_estimate text,
  summary text,
  description text,
  verification_status text default 'مراجعة مبدئية',
  risk_level text default 'متوسط',
  readiness_status text default 'يحتاج فحص',
  strengths text[],
  risks text[],
  documents text[],
  provided_via text,
  source_submission_id uuid,
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

-- 2) ضمان وجود الأعمدة إذا كان الجدول موجودًا من قبل
alter table public.opportunities
  add column if not exists slug text;

alter table public.opportunities
  add column if not exists title text;

alter table public.opportunities
  add column if not exists city text;

alter table public.opportunities
  add column if not exists sector text;

alter table public.opportunities
  add column if not exists opportunity_type text;

alter table public.opportunities
  add column if not exists asking_value text;

alter table public.opportunities
  add column if not exists revenue_estimate text;

alter table public.opportunities
  add column if not exists profit_estimate text;

alter table public.opportunities
  add column if not exists summary text;

alter table public.opportunities
  add column if not exists description text;

alter table public.opportunities
  add column if not exists verification_status text default 'مراجعة مبدئية';

alter table public.opportunities
  add column if not exists risk_level text default 'متوسط';

alter table public.opportunities
  add column if not exists readiness_status text default 'يحتاج فحص';

alter table public.opportunities
  add column if not exists strengths text[];

alter table public.opportunities
  add column if not exists risks text[];

alter table public.opportunities
  add column if not exists documents text[];

alter table public.opportunities
  add column if not exists provided_via text;

alter table public.opportunities
  add column if not exists source_submission_id uuid;

alter table public.opportunities
  add column if not exists is_published boolean not null default false;

alter table public.opportunities
  add column if not exists created_at timestamptz not null default now();

-- 3) فهرس فريد للـ slug حتى يعمل upsert
create unique index if not exists opportunities_slug_unique_idx
on public.opportunities(slug);

-- 4) أعمدة تتبع النشر في جدول المشاريع المرسلة
alter table public.project_submissions
  add column if not exists marketplace_published boolean not null default false;

alter table public.project_submissions
  add column if not exists opportunity_slug text;

alter table public.project_submissions
  add column if not exists published_at timestamptz;

-- 5) RLS
alter table public.opportunities enable row level security;

-- 6) قراءة الفرص المنشورة للجميع
drop policy if exists "Anyone can read published opportunities" on public.opportunities;
create policy "Anyone can read published opportunities"
on public.opportunities
for select
to anon, authenticated
using (is_published = true);

-- 7) الإدارة تستطيع إضافة وتحديث الفرص
drop policy if exists "Admins can insert opportunities" on public.opportunities;
create policy "Admins can insert opportunities"
on public.opportunities
for insert
to authenticated
with check (
  (auth.jwt() ->> 'email') in ('ahmad.elshehri@gmail.com', 'ahmad.elshehri2@gmail.com')
);

drop policy if exists "Admins can update opportunities" on public.opportunities;
create policy "Admins can update opportunities"
on public.opportunities
for update
to authenticated
using (
  (auth.jwt() ->> 'email') in ('ahmad.elshehri@gmail.com', 'ahmad.elshehri2@gmail.com')
)
with check (
  (auth.jwt() ->> 'email') in ('ahmad.elshehri@gmail.com', 'ahmad.elshehri2@gmail.com')
);

-- 8) تأكد أن الإدارة تستطيع تحديث طلبات المشاريع لتسجيل النشر
drop policy if exists "Admins can update project submissions" on public.project_submissions;
create policy "Admins can update project submissions"
on public.project_submissions
for update
to authenticated
using (
  (auth.jwt() ->> 'email') in ('ahmad.elshehri@gmail.com', 'ahmad.elshehri2@gmail.com')
)
with check (
  (auth.jwt() ->> 'email') in ('ahmad.elshehri@gmail.com', 'ahmad.elshehri2@gmail.com')
);

-- 9) فهارس
create index if not exists idx_opportunities_is_published on public.opportunities(is_published);
create index if not exists idx_opportunities_created_at on public.opportunities(created_at);
create index if not exists idx_project_submissions_marketplace_published on public.project_submissions(marketplace_published);
