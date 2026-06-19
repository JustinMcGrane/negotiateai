-- NegotiateAI schema

create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  name text,
  plan text not null default 'free',
  sessions_used integer not null default 0,
  tools_used text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade not null,
  role text,
  offer text,
  target text,
  persona_id text,
  persona_name text,
  difficulty text,
  overall_score integer,
  confidence_score integer,
  tactics_score integer,
  outcome text,
  email_draft text,
  strengths text[],
  improvements text[],
  created_at timestamptz not null default now()
);

create table if not exists tool_uses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade not null,
  tool_id text not null,
  input_summary text,
  output_summary text,
  created_at timestamptz not null default now()
);

-- RLS
alter table profiles enable row level security;
alter table sessions enable row level security;
alter table tool_uses enable row level security;

create policy "Users own profile" on profiles for all using (auth.uid() = id);
create policy "Users own sessions" on sessions for all using (auth.uid() = user_id);
create policy "Users own tool_uses" on tool_uses for all using (auth.uid() = user_id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, name)
  values (new.id, new.email, new.raw_user_meta_data->>'name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Helper function to increment sessions
create or replace function increment_sessions_used(user_id uuid)
returns void language plpgsql security definer as $$
begin
  update profiles set sessions_used = sessions_used + 1 where id = user_id;
end;
$$;
