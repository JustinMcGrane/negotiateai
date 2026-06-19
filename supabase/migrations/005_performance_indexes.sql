-- Performance indexes on workspace_id for all high-traffic tables
create index if not exists idx_tasks_workspace_id on tasks(workspace_id);
create index if not exists idx_posts_workspace_id on posts(workspace_id);
create index if not exists idx_posts_workspace_date on posts(workspace_id, date);
create index if not exists idx_payments_workspace_id on payments(workspace_id);
create index if not exists idx_payments_workspace_status on payments(workspace_id, status);
create index if not exists idx_payments_workspace_created on payments(workspace_id, created_at);
create index if not exists idx_brand_deals_workspace_id on brand_deals(workspace_id);
create index if not exists idx_brand_deals_workspace_status on brand_deals(workspace_id, status, created_at);
create index if not exists idx_team_members_workspace_id on team_members(workspace_id);
create index if not exists idx_lessons_workspace_id on lessons(workspace_id);
create index if not exists idx_activity_log_workspace_id on activity_log(workspace_id);
create index if not exists idx_notifications_workspace_id on notifications(workspace_id);
create index if not exists idx_notifications_workspace_read on notifications(workspace_id, read);
