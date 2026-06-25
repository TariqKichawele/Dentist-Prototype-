-- practitioners
create table practitioners (
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

-- appointment_types (maps to booking funnel services)
create table appointment_types (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  duration_minutes int not null,
  description text,
  created_at timestamptz not null default now()
);

-- practitioner + service -> Calendly URL
create table practitioner_services (
  id uuid primary key default gen_random_uuid(),
  practitioner_id uuid not null references practitioners(id) on delete cascade,
  appointment_type_id uuid not null references appointment_types(id) on delete cascade,
  calendly_event_url text not null,
  calendly_event_type_uri text,
  unique (practitioner_id, appointment_type_id)
);

-- patients (guest identity by email; no auth required)
create table patients (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  first_name text,
  last_name text,
  phone text,
  created_at timestamptz not null default now()
);

-- appointments (webhook-synced source of truth)
create type appointment_status as enum ('scheduled', 'canceled');

create table appointments (
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

create index appointments_patient_email_idx on appointments (patient_email);
create index appointments_status_idx on appointments (status);
create index practitioner_services_event_type_uri_idx on practitioner_services (calendly_event_type_uri);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger appointments_updated_at
  before update on appointments
  for each row
  execute function set_updated_at();

-- RLS
alter table practitioners enable row level security;
alter table appointment_types enable row level security;
alter table practitioner_services enable row level security;
alter table patients enable row level security;
alter table appointments enable row level security;

create policy "Public read practitioners"
  on practitioners for select
  to anon, authenticated
  using (true);

create policy "Public read appointment_types"
  on appointment_types for select
  to anon, authenticated
  using (true);

create policy "Public read practitioner_services"
  on practitioner_services for select
  to anon, authenticated
  using (true);

-- patients and appointments: no public policies (webhook uses service role)
