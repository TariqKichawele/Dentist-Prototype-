-- Stores funnel selections before Calendly completes so webhooks can link appointments.
create table booking_intents (
  email text primary key,
  practitioner_id uuid not null references practitioners(id) on delete cascade,
  appointment_type_id uuid not null references appointment_types(id) on delete cascade,
  insurance text not null,
  updated_at timestamptz not null default now()
);

alter table booking_intents enable row level security;

-- No public policies: written via service role from the booking API.
