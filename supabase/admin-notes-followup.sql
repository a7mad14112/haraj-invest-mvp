-- v2.8 Admin Notes & Follow-up
-- شغّل هذا الملف في Supabase SQL Editor لإضافة الملاحظات الداخلية وتاريخ المتابعة.

alter table public.project_submissions
  add column if not exists internal_notes text,
  add column if not exists follow_up_at date;

alter table public.interest_requests
  add column if not exists internal_notes text,
  add column if not exists follow_up_at date;

alter table public.nda_requests
  add column if not exists internal_notes text,
  add column if not exists follow_up_at date;

-- تأكيد صلاحية التحديث للإدارة فقط.

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
