-- ========================================================
-- المرحلة 2: نظام المحادثات الداخلي (المهتم ↔ الأدمن)
-- حراج إنڤست — v138
-- شغّل هذا الملف في Supabase → SQL Editor → Run
-- ========================================================

-- ---------- جدول المحادثات ----------
create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- الفرصة محل التواصل
  opportunity_id text,                  -- معرّف/slug الفرصة (قد يكون نصيًا)
  opportunity_title text,               -- نسخة ثابتة من العنوان (تبقى للأرشيف)

  -- الأطراف
  interested_user uuid not null,        -- المهتم (مسجّل دخول) — يطابق auth.uid()
  interested_email text,                -- بريده (للأرشيف والمراسلة)

  -- الحالة
  status text not null default 'open',  -- open | agreed | closed
  handled_by_admin boolean not null default true,  -- في هذه المرحلة: الأدمن وسيط دائمًا

  -- آخر رسالة (لعرض سريع في القوائم)
  last_message_at timestamptz,
  last_message_preview text
);

create index if not exists conversations_user_idx
  on public.conversations (interested_user, updated_at desc);

-- ---------- جدول الرسائل ----------
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  conversation_id uuid not null references public.conversations(id) on delete cascade,

  sender_user uuid not null,            -- من أرسل (auth.uid())
  sender_role text not null,            -- interested | admin

  body text not null,                   -- النص بعد الحجب (يراه الطرفان)
  body_raw text,                        -- النص الأصلي (للأدمن فقط — دليل محاولة الالتفاف)
  was_masked boolean not null default false
);

create index if not exists messages_conversation_idx
  on public.messages (conversation_id, created_at asc);

-- ========================================================
-- سياسات RLS
-- ========================================================
alter table public.conversations enable row level security;
alter table public.messages enable row level security;

-- ----- conversations -----
-- المهتم ينشئ محادثاته فقط
drop policy if exists "user_creates_own_conversation" on public.conversations;
create policy "user_creates_own_conversation"
  on public.conversations for insert
  to authenticated
  with check (interested_user = auth.uid());

-- المهتم يقرأ محادثاته فقط
drop policy if exists "user_reads_own_conversation" on public.conversations;
create policy "user_reads_own_conversation"
  on public.conversations for select
  to authenticated
  using (interested_user = auth.uid());

-- المهتم يحدّث محادثته (لتحديث آخر رسالة)
drop policy if exists "user_updates_own_conversation" on public.conversations;
create policy "user_updates_own_conversation"
  on public.conversations for update
  to authenticated
  using (interested_user = auth.uid())
  with check (interested_user = auth.uid());

-- ----- messages -----
-- المهتم يرسل رسائل في محادثاته فقط، وبدور interested
drop policy if exists "user_sends_message" on public.messages;
create policy "user_sends_message"
  on public.messages for insert
  to authenticated
  with check (
    sender_user = auth.uid()
    and exists (
      select 1 from public.conversations c
      where c.id = conversation_id
        and c.interested_user = auth.uid()
    )
  );

-- المهتم يقرأ رسائل محادثاته فقط
drop policy if exists "user_reads_messages" on public.messages;
create policy "user_reads_messages"
  on public.messages for select
  to authenticated
  using (
    exists (
      select 1 from public.conversations c
      where c.id = conversation_id
        and c.interested_user = auth.uid()
    )
  );

-- ملاحظة مهمة:
-- ردود الأدمن وقراءته لكل المحادثات تتم عبر مفتاح الخدمة (service role)
-- الذي يتجاوز RLS، من لوحة الإدارة أو من Supabase مباشرة.
-- body_raw لا يُعرض للمهتم في الواجهة (نختار body فقط في الاستعلامات العامة).
