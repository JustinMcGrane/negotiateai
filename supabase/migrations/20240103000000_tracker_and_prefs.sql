-- Job applications table for persistent tracker
create table if not exists job_applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade not null,
  company text not null,
  title text not null,
  url text,
  status text not null default 'saved',
  salary text,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table job_applications enable row level security;

create policy "Users can manage own applications"
  on job_applications for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Email preferences on profiles
alter table profiles
  add column if not exists checkin_emails boolean default true,
  add column if not exists market_alert_emails boolean default true,
  add column if not exists stripe_customer_id text;

-- Index for faster webhook lookups
create index if not exists profiles_stripe_customer_id_idx on profiles(stripe_customer_id);
