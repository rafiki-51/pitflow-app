-- PitFlow RLS policies
-- Reference only. Do not execute until reviewed.
-- No hard delete policies included.
--
-- Important bootstrap note:
-- The first administrator profile must be created manually before relying on
-- these RLS policies, otherwise no authenticated user will be able to perform
-- admin-only inserts or updates.

-- Helpers

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'administrador'
      and deleted_at is null
  );
$$;

create or replace function public.is_mechanic()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'mecanico'
      and deleted_at is null
  );
$$;

create or replace function public.is_customer()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'cliente'
      and deleted_at is null
  );
$$;

create or replace function public.current_customer_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id
  from public.customers
  where profile_id = auth.uid()
    and deleted_at is null
  limit 1;
$$;

-- Enable RLS

alter table public.profiles enable row level security;
alter table public.customers enable row level security;
alter table public.vehicles enable row level security;
alter table public.work_orders enable row level security;
alter table public.work_order_comments enable row level security;
alter table public.work_order_photos enable row level security;

-- profiles

create policy "profiles_select_policy"
on public.profiles
for select
using (
  deleted_at is null
  and (
    public.is_admin()
    or id = auth.uid()
  )
);

create policy "profiles_insert_admin_policy"
on public.profiles
for insert
with check (
  public.is_admin()
);

create policy "profiles_update_admin_policy"
on public.profiles
for update
using (
  public.is_admin()
)
with check (
  public.is_admin()
);

-- customers

create policy "customers_select_policy"
on public.customers
for select
using (
  deleted_at is null
  and (
    public.is_admin()
    or profile_id = auth.uid()
    or exists (
      select 1
      from public.work_orders
      where work_orders.customer_id = customers.id
        and work_orders.assigned_mechanic_id = auth.uid()
        and work_orders.deleted_at is null
    )
  )
);

create policy "customers_insert_admin_policy"
on public.customers
for insert
with check (
  public.is_admin()
);

create policy "customers_update_admin_policy"
on public.customers
for update
using (
  public.is_admin()
)
with check (
  public.is_admin()
);

-- vehicles

create policy "vehicles_select_policy"
on public.vehicles
for select
using (
  deleted_at is null
  and (
    public.is_admin()
    or customer_id = public.current_customer_id()
    or exists (
      select 1
      from public.work_orders
      where work_orders.vehicle_id = vehicles.id
        and work_orders.assigned_mechanic_id = auth.uid()
        and work_orders.deleted_at is null
    )
  )
);

create policy "vehicles_insert_admin_policy"
on public.vehicles
for insert
with check (
  public.is_admin()
);

create policy "vehicles_update_admin_policy"
on public.vehicles
for update
using (
  public.is_admin()
)
with check (
  public.is_admin()
);

-- work_orders

create policy "work_orders_select_policy"
on public.work_orders
for select
using (
  deleted_at is null
  and (
    public.is_admin()
    or assigned_mechanic_id = auth.uid()
    or customer_id = public.current_customer_id()
  )
);

create policy "work_orders_insert_admin_policy"
on public.work_orders
for insert
with check (
  public.is_admin()
);

create policy "work_orders_update_policy"
on public.work_orders
for update
using (
  public.is_admin()
  or (
    public.is_mechanic()
    and assigned_mechanic_id = auth.uid()
    and deleted_at is null
  )
)
with check (
  public.is_admin()
  or (
    public.is_mechanic()
    and assigned_mechanic_id = auth.uid()
    and deleted_at is null
  )
);

-- work_order_comments

create policy "work_order_comments_select_policy"
on public.work_order_comments
for select
using (
  deleted_at is null
  and (
    public.is_admin()
    or exists (
      select 1
      from public.work_orders
      where work_orders.id = work_order_comments.work_order_id
        and work_orders.assigned_mechanic_id = auth.uid()
        and work_orders.deleted_at is null
    )
    or (
      visibility = 'customer'
      and exists (
        select 1
        from public.work_orders
        where work_orders.id = work_order_comments.work_order_id
          and work_orders.customer_id = public.current_customer_id()
          and work_orders.deleted_at is null
      )
    )
  )
);

create policy "work_order_comments_insert_policy"
on public.work_order_comments
for insert
with check (
  public.is_admin()
  or (
    public.is_mechanic()
    and author_id = auth.uid()
    and exists (
      select 1
      from public.work_orders
      where work_orders.id = work_order_comments.work_order_id
        and work_orders.assigned_mechanic_id = auth.uid()
        and work_orders.deleted_at is null
    )
  )
);

create policy "work_order_comments_update_policy"
on public.work_order_comments
for update
using (
  public.is_admin()
  or (
    public.is_mechanic()
    and author_id = auth.uid()
    and deleted_at is null
  )
)
with check (
  public.is_admin()
  or (
    public.is_mechanic()
    and author_id = auth.uid()
    and deleted_at is null
  )
);

-- work_order_photos

create policy "work_order_photos_select_policy"
on public.work_order_photos
for select
using (
  deleted_at is null
  and (
    public.is_admin()
    or exists (
      select 1
      from public.work_orders
      where work_orders.id = work_order_photos.work_order_id
        and work_orders.assigned_mechanic_id = auth.uid()
        and work_orders.deleted_at is null
    )
    or (
      visibility = 'customer'
      and exists (
        select 1
        from public.work_orders
        where work_orders.id = work_order_photos.work_order_id
          and work_orders.customer_id = public.current_customer_id()
          and work_orders.deleted_at is null
      )
    )
  )
);

create policy "work_order_photos_insert_policy"
on public.work_order_photos
for insert
with check (
  public.is_admin()
  or (
    public.is_mechanic()
    and uploaded_by = auth.uid()
    and exists (
      select 1
      from public.work_orders
      where work_orders.id = work_order_photos.work_order_id
        and work_orders.assigned_mechanic_id = auth.uid()
        and work_orders.deleted_at is null
    )
  )
);

create policy "work_order_photos_update_policy"
on public.work_order_photos
for update
using (
  public.is_admin()
  or (
    public.is_mechanic()
    and uploaded_by = auth.uid()
    and deleted_at is null
  )
)
with check (
  public.is_admin()
  or (
    public.is_mechanic()
    and uploaded_by = auth.uid()
    and deleted_at is null
  )
);
