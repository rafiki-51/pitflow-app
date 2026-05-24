-- PitFlow MVP database schema
-- Reference only. Do not execute until reviewed.
-- No RLS policies included.
-- No storage buckets included.

create extension if not exists "pgcrypto";

-- updated_at helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('administrador', 'mecanico', 'cliente')),
  full_name text not null,
  phone text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz null
);

create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

-- customers
create table public.customers (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid null references public.profiles(id) on delete set null,
  full_name text not null,
  email text null,
  phone text null,
  notes text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz null
);

create trigger set_customers_updated_at
before update on public.customers
for each row
execute function public.set_updated_at();

-- vehicles
create table public.vehicles (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete restrict,
  plate text not null,
  brand text null,
  model text null,
  year integer null,
  vin text null,
  color text null,
  mileage integer null,
  notes text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz null
);

create trigger set_vehicles_updated_at
before update on public.vehicles
for each row
execute function public.set_updated_at();

-- work_orders
create table public.work_orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete restrict,
  vehicle_id uuid not null references public.vehicles(id) on delete restrict,
  assigned_mechanic_id uuid null references public.profiles(id) on delete set null,
  status text not null default 'recibida' check (
    status in (
      'recibida',
      'diagnostico',
      'en_progreso',
      'esperando_repuestos',
      'lista',
      'entregada',
      'cancelada'
    )
  ),
  priority text not null default 'media' check (
    priority in ('baja', 'media', 'alta', 'urgente')
  ),
  title text not null,
  description text null,
  diagnosis text null,
  started_at timestamptz null,
  completed_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz null
);

create trigger set_work_orders_updated_at
before update on public.work_orders
for each row
execute function public.set_updated_at();

-- work_order_comments
create table public.work_order_comments (
  id uuid primary key default gen_random_uuid(),
  work_order_id uuid not null references public.work_orders(id) on delete cascade,
  author_id uuid null references public.profiles(id) on delete set null,
  body text not null,
  visibility text not null default 'internal' check (
    visibility in ('internal', 'customer')
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz null
);

create trigger set_work_order_comments_updated_at
before update on public.work_order_comments
for each row
execute function public.set_updated_at();

-- work_order_photos
create table public.work_order_photos (
  id uuid primary key default gen_random_uuid(),
  work_order_id uuid not null references public.work_orders(id) on delete cascade,
  uploaded_by uuid null references public.profiles(id) on delete set null,
  storage_path text not null,
  caption text null,
  visibility text not null default 'internal' check (
    visibility in ('internal', 'customer')
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz null
);

create trigger set_work_order_photos_updated_at
before update on public.work_order_photos
for each row
execute function public.set_updated_at();

-- Basic indexes

create index profiles_role_idx
on public.profiles(role)
where deleted_at is null;

create index customers_profile_id_idx
on public.customers(profile_id)
where deleted_at is null;

create index customers_email_idx
on public.customers(email)
where deleted_at is null and email is not null;

create index vehicles_customer_id_idx
on public.vehicles(customer_id)
where deleted_at is null;

create index vehicles_plate_idx
on public.vehicles(plate)
where deleted_at is null;

create index work_orders_customer_id_idx
on public.work_orders(customer_id)
where deleted_at is null;

create index work_orders_vehicle_id_idx
on public.work_orders(vehicle_id)
where deleted_at is null;

create index work_orders_assigned_mechanic_id_idx
on public.work_orders(assigned_mechanic_id)
where deleted_at is null;

create index work_orders_status_idx
on public.work_orders(status)
where deleted_at is null;

create index work_orders_priority_idx
on public.work_orders(priority)
where deleted_at is null;

create index work_order_comments_work_order_id_idx
on public.work_order_comments(work_order_id)
where deleted_at is null;

create index work_order_comments_author_id_idx
on public.work_order_comments(author_id)
where deleted_at is null;

create index work_order_photos_work_order_id_idx
on public.work_order_photos(work_order_id)
where deleted_at is null;

create index work_order_photos_uploaded_by_idx
on public.work_order_photos(uploaded_by)
where deleted_at is null;
