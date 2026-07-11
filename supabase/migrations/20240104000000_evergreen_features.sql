-- Compensation history journal
create table if not exists comp_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade not null,
  date date not null,
  base integer not null,
  bonus integer,
  equity_value integer,
  type text not null default 'salary',
  notes text,
  created_at timestamptz default now()
);

alter table comp_history enable row level security;

create policy "users can manage own comp history"
  on comp_history for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Job applications tracker (idempotent)
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

do $$ begin
  if not exists (
    select 1 from pg_policies
    where tablename = 'job_applications' and policyname = 'users can manage own applications'
  ) then
    create policy "users can manage own applications"
      on job_applications for all
      using (auth.uid() = user_id)
      with check (auth.uid() = user_id);
  end if;
end $$;

-- Profile columns for new features
alter table profiles
  add column if not exists current_role text,
  add column if not exists location text,
  add column if not exists checkin_emails boolean default true,
  add column if not exists market_alert_emails boolean default true,
  add column if not exists stripe_customer_id text,
  add column if not exists last_checkin_at timestamptz,
  add column if not exists last_checkin_sent_at timestamptz,
  add column if not exists last_prep_date date,
  add column if not exists prep_streak integer default 0;
