-- v2.5 Supabase Account Requests
-- شغّل هذا الملف في Supabase SQL Editor بعد رفع النسخة.

alter table public.project_submissions
  add column if not exists user_id uuid references auth.users(id) on delete set null,
  add column if not exists user_email text;

alter table public.interest_requests
  add column if not exists user_id uuid references auth.users(id) on delete set null,
  add column if not exists user_email text;

alter table public.nda_requests
  add column if not exists user_id uuid references auth.users(id) on delete set null,
  add column if not exists user_email text;

create index if not exists idx_project_submissions_user_id on public.project_submissions(user_id);
create index if not exists idx_interest_requests_user_id on public.interest_requests(user_id);
create index if not exists idx_nda_requests_user_id on public.nda_requests(user_id);

drop policy if exists "Users can read own project submissions" on public.project_submissions;
create policy "Users can read own project submissions"
on public.project_submissions
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Users can read own interest requests" on public.interest_requests;
create policy "Users can read own interest requests"
on public.interest_requests
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Users can read own nda requests" on public.nda_requests;
create policy "Users can read own nda requests"
on public.nda_requests
for select
to authenticated
using (user_id = auth.uid());

-- ملاحظة:
-- أبقِ سياسات insert الحالية كما هي حتى يستطيع غير المسجلين إرسال الطلبات.
