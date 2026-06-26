-- v2.6 Admin Review Panel
-- شغّل هذا الملف في Supabase SQL Editor لتفعيل قراءة الإدارة لكل الطلبات.

drop policy if exists "Admins can read all project submissions" on public.project_submissions;
create policy "Admins can read all project submissions"
on public.project_submissions
for select
to authenticated
using (
  (auth.jwt() ->> 'email') in ('ahmad.elshehri@gmail.com', 'ahmad.elshehri2@gmail.com')
);

drop policy if exists "Admins can read all interest requests" on public.interest_requests;
create policy "Admins can read all interest requests"
on public.interest_requests
for select
to authenticated
using (
  (auth.jwt() ->> 'email') in ('ahmad.elshehri@gmail.com', 'ahmad.elshehri2@gmail.com')
);

drop policy if exists "Admins can read all nda requests" on public.nda_requests;
create policy "Admins can read all nda requests"
on public.nda_requests
for select
to authenticated
using (
  (auth.jwt() ->> 'email') in ('ahmad.elshehri@gmail.com', 'ahmad.elshehri2@gmail.com')
);
