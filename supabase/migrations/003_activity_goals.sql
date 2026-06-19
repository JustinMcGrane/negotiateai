-- Activity log
create table if not exists activity_log (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  actor_name text not null default '',
  action text not null default '',
  entity_type text not null default '',
  entity_label text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists activity_log_workspace_idx
  on activity_log(workspace_id, created_at desc);

alter table activity_log enable row level security;

create policy "workspace members can manage activity_log"
  on activity_log for all
  using (workspace_id in (select workspace_id from users where id = auth.uid()));

-- Goals (one per workspace per month)
create table if not exists goals (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  month smallint not null,
  year smallint not null,
  revenue_target numeric(12,2) not null default 0,
  created_at timestamptz not null default now(),
  unique(workspace_id, month, year)
);

alter table goals enable row level security;

create policy "workspace members can manage goals"
  on goals for all
  using (workspace_id in (select workspace_id from users where id = auth.uid()));
