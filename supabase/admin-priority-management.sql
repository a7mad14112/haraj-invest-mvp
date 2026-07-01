-- v3.3 Admin Priority Management
-- شغّل هذا الملف في Supabase SQL Editor لإضافة أولوية الطلبات.

alter table public.project_submissions
  add column if not exists priority text not null default 'normal';

alter table public.interest_requests
  add column if not exists priority text not null default 'normal';

alter table public.nda_requests
  add column if not exists priority text not null default 'normal';

-- تعتمد صلاحية التحديث على سياسات الإدارة المضافة سابقًا في v2.7/v2.8.
-- إذا لم تكن قد شغّلت سياسات التحديث، شغّل ملفات SQL السابقة أولًا.
