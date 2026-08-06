alter table profiles
  add column if not exists onboarding_role text,
  add column if not exists onboarding_goal text,
  add column if not exists onboarding_situation text,
  add column if not exists onboarding_experience text,
  add column if not exists onboarding_completed boolean default false;
