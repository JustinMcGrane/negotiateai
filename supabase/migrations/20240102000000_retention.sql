alter table profiles
  add column if not exists last_checkin_at timestamptz,
  add column if not exists market_alert text,
  add column if not exists market_alert_role text,
  add column if not exists market_alert_updated_at timestamptz;
