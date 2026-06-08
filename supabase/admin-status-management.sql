-- v2.7 Admin Status Management
-- شغّل هذا الملف في Supabase SQL Editor لتفعيل تحديث حالة الطلبات من لوحة الإدارة.

alter table public.project_submissions
  add column if not exists status text not null default 'new';

alter table public.interest_requests
  add column if not exists status text not null default 'new';

alter table public.nda_requests
  add column if not exists status text not null default 'new';

drop policy if exists "Admins can update project submission status" on public.project_submissions;
create policy "Admins can update project submission status"
on public.project_submissions
for update
to authenticated
using (
  (auth.jwt() ->> 'email') in ('ahmad.elshehri@gmail.com', 'ahmad.elshehri2@gmail.com')
)
with check (
  (auth.jwt() ->> 'email') in ('ahmad.elshehri@gmail.com', 'ahmad.elshehri2@gmail.com')
);

drop policy if exists "Admins can update interest request status" on public.interest_requests;
create policy "Admins can update interest request status"
on public.interest_requests
for update
to authenticated
using (
  (auth.jwt() ->> 'email') in ('ahmad.elshehri@gmail.com', 'ahmad.elshehri2@gmail.com')
)
with check (
  (auth.jwt() ->> 'email') in ('ahmad.elshehri@gmail.com', 'ahmad.elshehri2@gmail.com')
);

drop policy if exists "Admins can update nda request status" on public.nda_requests;
create policy "Admins can update nda request status"
on public.nda_requests
for update
to authenticated
using (
  (auth.jwt() ->> 'email') in ('ahmad.elshehri@gmail.com', 'ahmad.elshehri2@gmail.com')
)
with check (
  (auth.jwt() ->> 'email') in ('ahmad.elshehri@gmail.com', 'ahmad.elshehri2@gmail.com')
);
