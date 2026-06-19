-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Workspaces
CREATE TABLE workspaces (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'My Workspace',
  channel_name TEXT NOT NULL DEFAULT 'My Channel',
  owner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User profiles
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Creator',
  email TEXT,
  workspace_id UUID REFERENCES workspaces(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team members
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  role TEXT DEFAULT 'Team Member',
  rate DECIMAL DEFAULT 0,
  rate_type TEXT DEFAULT 'per hour',
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'invited')),
  color TEXT DEFAULT '#6558D3',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tasks
CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  assignee_id UUID REFERENCES team_members(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'todo' CHECK (status IN ('todo', 'in-progress', 'done')),
  priority TEXT DEFAULT 'medium' CHECK (priority IN ('high', 'medium', 'low')),
  due_date DATE,
  platform TEXT,
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Posts (content calendar)
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  date DATE,
  platform TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'idea')),
  assignee_id UUID REFERENCES team_members(id) ON DELETE SET NULL,
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  team_member_id UUID REFERENCES team_members(id) ON DELETE SET NULL,
  amount DECIMAL NOT NULL,
  description TEXT DEFAULT '',
  status TEXT DEFAULT 'due' CHECK (status IN ('due', 'paid')),
  date DATE,
  notes TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lessons (development)
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workspace_id UUID REFERENCES workspaces(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  type TEXT DEFAULT 'instruction' CHECK (type IN ('instruction', 'learning')),
  category TEXT DEFAULT 'Content',
  body TEXT DEFAULT '',
  assignee_ids UUID[] DEFAULT '{}',
  due_date DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS policies
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

-- Workspaces: owners can do everything
CREATE POLICY "workspace_owner" ON workspaces
  FOR ALL USING (owner_id = auth.uid());

-- Users: own profile
CREATE POLICY "user_self" ON users
  FOR ALL USING (id = auth.uid());

-- Team members: workspace members
CREATE POLICY "team_workspace" ON team_members
  FOR ALL USING (
    workspace_id IN (
      SELECT workspace_id FROM users WHERE id = auth.uid()
    )
  );

-- Tasks: workspace members
CREATE POLICY "tasks_workspace" ON tasks
  FOR ALL USING (
    workspace_id IN (
      SELECT workspace_id FROM users WHERE id = auth.uid()
    )
  );

-- Posts: workspace members
CREATE POLICY "posts_workspace" ON posts
  FOR ALL USING (
    workspace_id IN (
      SELECT workspace_id FROM users WHERE id = auth.uid()
    )
  );

-- Payments: workspace members
CREATE POLICY "payments_workspace" ON payments
  FOR ALL USING (
    workspace_id IN (
      SELECT workspace_id FROM users WHERE id = auth.uid()
    )
  );

-- Lessons: workspace members
CREATE POLICY "lessons_workspace" ON lessons
  FOR ALL USING (
    workspace_id IN (
      SELECT workspace_id FROM users WHERE id = auth.uid()
    )
  );

-- Auto-create workspace + user profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  new_workspace_id UUID;
BEGIN
  INSERT INTO workspaces (name, channel_name, owner_id)
  VALUES ('My Workspace', 'My Channel', NEW.id)
  RETURNING id INTO new_workspace_id;

  INSERT INTO users (id, name, email, workspace_id)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    new_workspace_id
  );

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
