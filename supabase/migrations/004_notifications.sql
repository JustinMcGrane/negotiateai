create table if not exists notifications (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid references workspaces(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  type text not null,
  title text not null,
  body text not null default '',
  read boolean not null default false,
  link text not null default '',
  created_at timestamptz not null default now()
);

alter table notifications enable row level security;

create policy "Users can view their own notifications"
  on notifications for select
  using (auth.uid() = user_id);

create policy "Users can update their own notifications"
  on notifications for update
  using (auth.uid() = user_id);

create policy "Service role can insert notifications"
  on notifications for insert
  with check (true);

create index notifications_user_id_idx on notifications(user_id);
create index notifications_workspace_id_idx on notifications(workspace_id);
create index notifications_created_at_idx on notifications(created_at desc);
