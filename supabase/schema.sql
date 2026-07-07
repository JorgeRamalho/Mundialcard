-- MundialCard — Schema PostgreSQL (Supabase)
-- Execute no SQL Editor do projeto Supabase: https://supabase.com/dashboard

-- ---------------------------------------------------------------------------
-- Tipos e extensões
-- ---------------------------------------------------------------------------
create extension if not exists "pgcrypto";

create type public.user_role as enum ('client', 'partner', 'admin', 'operator');

-- ---------------------------------------------------------------------------
-- Perfis (vinculado ao auth.users)
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role public.user_role not null default 'client',
  full_name text,
  phone text,
  city text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Planos
-- ---------------------------------------------------------------------------
create table if not exists public.plans (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  price_monthly numeric(10, 2) not null default 0,
  tier_order int not null default 0,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Parceiros B2B
-- ---------------------------------------------------------------------------
create table if not exists public.partners (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles (id) on delete set null,
  company_name text not null,
  contact_name text,
  region text,
  referral_code text not null unique,
  commission_rate numeric(5, 2) not null default 10,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Leads (cupom / landing)
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  nascimento date,
  cidade text,
  telefone text,
  email text,
  endereco text,
  coupon text not null unique,
  source text not null default 'site',
  partner_id uuid references public.partners (id) on delete set null,
  status text not null default 'interesse',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Clientes
-- ---------------------------------------------------------------------------
create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles (id) on delete set null,
  full_name text not null,
  cpf text,
  email text,
  phone text,
  birth_date date,
  address text,
  city text,
  state text,
  zip_code text,
  plan_id uuid references public.plans (id) on delete set null,
  partner_id uuid references public.partners (id) on delete set null,
  status text not null default 'ativo',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Agendamentos (telemedicina)
-- ---------------------------------------------------------------------------
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles (id) on delete set null,
  client_id uuid references public.clients (id) on delete set null,
  specialty text not null,
  appointment_date date not null,
  appointment_time time not null,
  notes text,
  status text not null default 'agendado',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Funil B2B (pipeline do parceiro)
-- ---------------------------------------------------------------------------
create table if not exists public.partner_pipeline (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.partners (id) on delete cascade,
  company_name text not null,
  stage text not null,
  plan_name text,
  status text not null default 'em_andamento',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Avaliações de atendimento
-- ---------------------------------------------------------------------------
create table if not exists public.support_ratings (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles (id) on delete set null,
  channel text not null,
  score int not null check (score between 1 and 5),
  comment text,
  context text,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Sessões Dr. Digital (triagem)
-- ---------------------------------------------------------------------------
create table if not exists public.triage_sessions (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles (id) on delete set null,
  external_id text,
  payload jsonb not null default '{}',
  result jsonb not null default '{}',
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Índices
-- ---------------------------------------------------------------------------
create index if not exists idx_leads_created_at on public.leads (created_at desc);
create index if not exists idx_leads_status on public.leads (status);
create index if not exists idx_clients_status on public.clients (status);
create index if not exists idx_appointments_date on public.appointments (appointment_date);
create index if not exists idx_partner_pipeline_partner on public.partner_pipeline (partner_id);

-- ---------------------------------------------------------------------------
-- Trigger: perfil ao cadastrar usuário
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    coalesce((new.raw_user_meta_data->>'role')::public.user_role, 'client')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- Funções auxiliares (RLS)
-- ---------------------------------------------------------------------------
create or replace function public.is_staff()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin', 'operator')
  );
$$;

create or replace function public.is_partner()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'partner'
  );
$$;

create or replace function public.current_partner_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select p.id from public.partners p
  where p.profile_id = auth.uid()
  limit 1;
$$;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.plans enable row level security;
alter table public.partners enable row level security;
alter table public.leads enable row level security;
alter table public.clients enable row level security;
alter table public.appointments enable row level security;
alter table public.partner_pipeline enable row level security;
alter table public.support_ratings enable row level security;
alter table public.triage_sessions enable row level security;

-- profiles
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id or public.is_staff());

create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id);

-- plans (leitura pública)
create policy "plans_select_all" on public.plans
  for select using (true);

create policy "plans_staff_all" on public.plans
  for all using (public.is_staff());

-- leads
create policy "leads_insert_public" on public.leads
  for insert with check (true);

create policy "leads_select_staff" on public.leads
  for select using (public.is_staff());

create policy "leads_select_partner" on public.leads
  for select using (
    public.is_partner() and partner_id = public.current_partner_id()
  );

-- clients
create policy "clients_select_staff" on public.clients
  for select using (public.is_staff());

create policy "clients_select_own" on public.clients
  for select using (profile_id = auth.uid());

create policy "clients_staff_all" on public.clients
  for all using (public.is_staff());

-- partners
create policy "partners_select_staff" on public.partners
  for select using (public.is_staff());

create policy "partners_select_own" on public.partners
  for select using (profile_id = auth.uid());

-- appointments
create policy "appointments_insert_auth" on public.appointments
  for insert with check (auth.uid() is not null);

create policy "appointments_select_own" on public.appointments
  for select using (profile_id = auth.uid() or public.is_staff());

-- partner_pipeline
create policy "pipeline_select_staff" on public.partner_pipeline
  for select using (public.is_staff());

create policy "pipeline_select_partner" on public.partner_pipeline
  for select using (partner_id = public.current_partner_id());

-- support_ratings
create policy "ratings_insert_auth" on public.support_ratings
  for insert with check (auth.uid() is not null or profile_id is null);

create policy "ratings_select_staff" on public.support_ratings
  for select using (public.is_staff());

-- triage_sessions
create policy "triage_insert_auth" on public.triage_sessions
  for insert with check (auth.uid() is not null or profile_id is null);

create policy "triage_select_own" on public.triage_sessions
  for select using (profile_id = auth.uid() or public.is_staff());

-- ---------------------------------------------------------------------------
-- View: dashboard KPIs (staff)
-- ---------------------------------------------------------------------------
create or replace view public.dashboard_kpis as
select
  (select count(*)::int from public.clients where status = 'ativo') as clientes_ativos,
  (select count(*)::int from public.leads
    where created_at >= date_trunc('month', now())) as leads_mes,
  (select count(*)::int from public.support_ratings
    where created_at >= now() - interval '7 days' and score <= 3) as tickets_abertos,
  (select count(*)::int from public.appointments
    where status = 'agendado' and appointment_date >= current_date) as consultas_agendadas;

grant select on public.dashboard_kpis to authenticated, anon;
