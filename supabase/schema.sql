-- حراج انڤست — Supabase MVP Schema
-- شغّل الملف داخل Supabase SQL Editor.

create extension if not exists "uuid-ossp";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text unique,
  phone text,
  city text,
  user_type text not null default 'user' check (user_type in ('user','owner','investor','admin')),
  bio text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  name_ar text not null,
  name_en text,
  slug text unique not null,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  category_id uuid references public.categories(id) on delete set null,
  title text not null,
  slug text unique not null,
  short_description text,
  description text,
  city text,
  opportunity_type text,
  project_stage text,
  asking_price numeric,
  annual_revenue numeric,
  annual_profit numeric,
  reason_for_listing text,
  status text not null default 'pending' check (status in ('draft','pending','approved','rejected','closed')),
  is_featured boolean not null default false,
  is_verified boolean not null default false,
  views_count integer not null default 0,
  risk_level text,
  growth_potential text,
  health_score integer default 70,
  payback_period text,
  profit_margin text,
  trust_flags text[] default array['مراجعة مبدئية'],
  strengths text[] default array[]::text[],
  risks text[] default array[]::text[],
  includes text[] default array[]::text[],
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.interests (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid not null references public.projects(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  owner_id uuid not null references public.profiles(id) on delete cascade,
  interest_type text,
  financial_capacity text,
  message text,
  status text not null default 'pending' check (status in ('pending','accepted','rejected','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(project_id, sender_id)
);

create table if not exists public.reports (
  id uuid primary key default uuid_generate_v4(),
  reporter_id uuid references public.profiles(id) on delete set null,
  project_id uuid references public.projects(id) on delete cascade,
  reason text not null,
  details text,
  status text not null default 'pending' check (status in ('pending','reviewed','dismissed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  body text,
  type text not null default 'general',
  link_url text,
  is_read boolean not null default false,
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create table if not exists public.contact_messages (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text,
  subject text not null,
  message text not null,
  status text not null default 'new' check (status in ('new','in_progress','resolved','closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and user_type = 'admin'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, user_type)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email,
    'user'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.categories enable row level security;
alter table public.projects enable row level security;
alter table public.interests enable row level security;
alter table public.reports enable row level security;
alter table public.notifications enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "Anyone can view active categories" on public.categories;
drop policy if exists "Admins can manage categories" on public.categories;
create policy "Anyone can view active categories" on public.categories for select using (is_active = true);
create policy "Admins can manage categories" on public.categories for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Users can view own profile" on public.profiles;
drop policy if exists "Users can update own profile" on public.profiles;
drop policy if exists "Admins can view all profiles" on public.profiles;
drop policy if exists "Admins can update profiles" on public.profiles;
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id) with check (auth.uid() = id);
create policy "Admins can view all profiles" on public.profiles for select using (public.is_admin());
create policy "Admins can update profiles" on public.profiles for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Anyone can view approved projects" on public.projects;
drop policy if exists "Owners can view own projects" on public.projects;
drop policy if exists "Owners can insert own projects" on public.projects;
drop policy if exists "Owners can update own projects" on public.projects;
drop policy if exists "Admins can manage projects" on public.projects;
create policy "Anyone can view approved projects" on public.projects for select using (status = 'approved');
create policy "Owners can view own projects" on public.projects for select using (auth.uid() = owner_id);
create policy "Owners can insert own projects" on public.projects for insert with check (auth.uid() = owner_id);
create policy "Owners can update own projects" on public.projects for update using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "Admins can manage projects" on public.projects for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Users can send interests" on public.interests;
drop policy if exists "Users can view related interests" on public.interests;
drop policy if exists "Owners can update related interests" on public.interests;
create policy "Users can send interests" on public.interests for insert with check (auth.uid() = sender_id);
create policy "Users can view related interests" on public.interests for select using (auth.uid() = sender_id or auth.uid() = owner_id or public.is_admin());
create policy "Owners can update related interests" on public.interests for update using (auth.uid() = owner_id or public.is_admin()) with check (auth.uid() = owner_id or public.is_admin());

drop policy if exists "Users can create reports" on public.reports;
drop policy if exists "Users can view own reports" on public.reports;
drop policy if exists "Admins can manage reports" on public.reports;
create policy "Users can create reports" on public.reports for insert with check (auth.uid() = reporter_id or reporter_id is null);
create policy "Users can view own reports" on public.reports for select using (auth.uid() = reporter_id);
create policy "Admins can manage reports" on public.reports for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Users can view own notifications" on public.notifications;
drop policy if exists "Users can update own notifications" on public.notifications;
create policy "Users can view own notifications" on public.notifications for select using (auth.uid() = user_id);
create policy "Users can update own notifications" on public.notifications for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "Anyone can create contact messages" on public.contact_messages;
drop policy if exists "Users can view own contact messages" on public.contact_messages;
drop policy if exists "Admins can manage contact messages" on public.contact_messages;
create policy "Anyone can create contact messages" on public.contact_messages for insert with check (true);
create policy "Users can view own contact messages" on public.contact_messages for select using (auth.uid() = user_id);
create policy "Admins can manage contact messages" on public.contact_messages for all using (public.is_admin()) with check (public.is_admin());

insert into public.categories (name_ar, name_en, slug, description, is_active)
values
  ('تقنية', 'Technology', 'technology', 'مشاريع تقنية وبرمجية ومنصات رقمية', true),
  ('مطاعم ومقاهي', 'Restaurants & Cafes', 'restaurants-cafes', 'مطاعم ومقاهي وخدمات ضيافة', true),
  ('تجارة إلكترونية', 'E-commerce', 'ecommerce', 'متاجر إلكترونية وقنوات بيع رقمية', true),
  ('صناعة', 'Manufacturing', 'manufacturing', 'مشاريع صناعية وإنتاجية', true)
on conflict (slug) do nothing;
