-- Run this in Supabase: Project > SQL Editor > New Query > paste > Run

create table messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  created_at timestamptz default now()
);

-- Turn on Row Level Security
alter table messages enable row level security;

-- Anyone can read messages
create policy "Public read access"
  on messages for select
  using (true);

-- Anyone can post a message (fine for a test app; you'd lock this down for anything real)
create policy "Public insert access"
  on messages for insert
  with check (true);
