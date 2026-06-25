create table if not exists usage_tracking (
  user_id uuid references auth.users(id) on delete cascade,
  feature text not null,
  period text not null,
  count integer not null default 0,
  primary key (user_id, feature, period)
);

create table if not exists sarah_memory (
  user_id uuid primary key references auth.users(id) on delete cascade,
  context jsonb not null default '{}',
  updated_at timestamptz not null default now()
);
