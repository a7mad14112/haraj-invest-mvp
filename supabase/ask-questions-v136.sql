-- ========================================================
-- حراج إنڤست — جدول الأسئلة والأجوبة المُدارة (v135)
-- شغّل هذا الملف في Supabase: SQL Editor → New query → Run
-- ========================================================

create table if not exists public.questions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- ما يرسله الزائر
  name text,                         -- اسم اختياري للسائل
  question text not null,            -- نص السؤال

  -- ما تضيفه أنت من لوحة الإدارة
  answer text,                       -- الإجابة (تُكتب لاحقًا)
  answered_at timestamptz,           -- وقت الإجابة

  -- الحالة والإشراف
  status text not null default 'pending',   -- pending | published | rejected
  is_published boolean not null default false,
  category text,                     -- تصنيف اختياري
  priority text default 'normal',    -- normal | high

  -- بيانات تقنية للإشراف (غير ظاهرة للعامة)
  contact text                       -- بريد/جوال اختياري للرد المباشر
);

-- فهرس لعرض الأسئلة المنشورة بسرعة
create index if not exists questions_published_idx
  on public.questions (is_published, answered_at desc);

-- ========================================================
-- سياسات RLS (أمن الصفوف)
-- ========================================================
alter table public.questions enable row level security;

-- 1) أي زائر يستطيع إرسال سؤال (insert فقط)
drop policy if exists "anyone_can_submit_question" on public.questions;
create policy "anyone_can_submit_question"
  on public.questions
  for insert
  to anon, authenticated
  with check (true);

-- 2) الجميع يستطيع قراءة الأسئلة المنشورة فقط
drop policy if exists "public_can_read_published" on public.questions;
create policy "public_can_read_published"
  on public.questions
  for select
  to anon, authenticated
  using (is_published = true);

-- ملاحظة: التعديل والحذف والاطلاع على الأسئلة المعلّقة (pending)
-- يتم عبر لوحة الإدارة باستخدام مفتاح الخدمة (service role) الذي يتجاوز RLS،
-- أو عبر سياسة إضافية لحساب إداري إن رغبت لاحقًا.
