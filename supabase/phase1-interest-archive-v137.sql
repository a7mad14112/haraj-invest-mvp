-- المرحلة 1: أرشفة طلبات الاهتمام بهوية المرسِل
-- شغّله في Supabase → SQL Editor
alter table public.interest_requests
  add column if not exists user_id uuid,
  add column if not exists user_email text;

create index if not exists interest_requests_user_idx
  on public.interest_requests (user_id, created_at desc);
