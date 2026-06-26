-- Run this once in Supabase Dashboard → SQL Editor if `npm run db:push` is not available.
-- Idempotent: safe to re-run (uses ON CONFLICT).

-- practitioners
create table if not exists practitioners (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  specialty text,
  bio text,
  image_url text,
  role text,
  credentials text[] default '{}',
  created_at timestamptz not null default now()
);

create table if not exists appointment_types (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  duration_minutes int not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists practitioner_services (
  id uuid primary key default gen_random_uuid(),
  practitioner_id uuid not null references practitioners(id) on delete cascade,
  appointment_type_id uuid not null references appointment_types(id) on delete cascade,
  calendly_event_url text not null,
  calendly_event_type_uri text,
  unique (practitioner_id, appointment_type_id)
);

create table if not exists patients (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  first_name text,
  last_name text,
  phone text,
  created_at timestamptz not null default now()
);

create table if not exists booking_intents (
  email text primary key,
  practitioner_id uuid not null references practitioners(id) on delete cascade,
  appointment_type_id uuid not null references appointment_types(id) on delete cascade,
  insurance text not null,
  updated_at timestamptz not null default now()
);

do $$ begin
  create type appointment_status as enum ('scheduled', 'canceled');
exception when duplicate_object then null;
end $$;

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid references patients(id) on delete set null,
  practitioner_id uuid references practitioners(id) on delete set null,
  appointment_type_id uuid references appointment_types(id) on delete set null,
  calendly_uuid text not null unique,
  calendly_event_uri text,
  status appointment_status not null default 'scheduled',
  start_time timestamptz not null,
  end_time timestamptz not null,
  patient_email text not null,
  patient_name text,
  insurance text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table practitioners enable row level security;
alter table appointment_types enable row level security;
alter table practitioner_services enable row level security;
alter table patients enable row level security;
alter table booking_intents enable row level security;
alter table appointments enable row level security;

drop policy if exists "Public read practitioners" on practitioners;
create policy "Public read practitioners"
  on practitioners for select to anon, authenticated using (true);

drop policy if exists "Public read appointment_types" on appointment_types;
create policy "Public read appointment_types"
  on appointment_types for select to anon, authenticated using (true);

drop policy if exists "Public read practitioner_services" on practitioner_services;
create policy "Public read practitioner_services"
  on practitioner_services for select to anon, authenticated using (true);

-- Then run the contents of supabase/seed.sql in the same SQL Editor session.
