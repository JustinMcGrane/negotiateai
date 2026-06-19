create table if not exists brand_deals (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  brand_name text not null default '',
  offer_amount numeric(12,2) not null default 0,
  status text not null default 'pending' check (status in ('pending', 'negotiating', 'accepted', 'rejected')),
  deadline date null,
  notes text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists brand_deals_workspace_id_idx on brand_deals(workspace_id);

alter table brand_deals enable row level security;

create policy "workspace members can manage brand_deals"
  on brand_deals for all
  using (workspace_id in (select workspace_id from users where id = auth.uid()));
