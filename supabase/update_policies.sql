-- Supprimer les anciennes politiques
DROP POLICY IF EXISTS "Les utilisateurs peuvent voir leur propre profil" ON users;
DROP POLICY IF EXISTS "Les admins peuvent tout voir et modifier" ON users;
DROP POLICY IF EXISTS "Permettre l'insertion publique pour le premier admin" ON users;
DROP POLICY IF EXISTS "Les utilisateurs authentifiés peuvent voir tous les utilisateurs" ON users;
DROP POLICY IF EXISTS "Seuls les admins peuvent modifier les utilisateurs" ON users;
DROP POLICY IF EXISTS "Seuls les admins peuvent supprimer les utilisateurs" ON users;

-- Activer RLS sur la table users
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Politique par défaut pour permettre l'insertion du premier admin
CREATE POLICY "Permettre l'insertion publique pour le premier admin"
ON users FOR INSERT
WITH CHECK (
  NOT EXISTS (SELECT 1 FROM users)  -- Permet l'insertion seulement si la table est vide
  OR (
    auth.role() = 'authenticated' 
    AND EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  )
);

-- Politique de lecture pour les utilisateurs authentifiés
CREATE POLICY "Les utilisateurs authentifiés peuvent voir tous les utilisateurs"
ON users FOR SELECT
USING (auth.role() = 'authenticated');

-- Politique de mise à jour pour les admins
CREATE POLICY "Seuls les admins peuvent modifier les utilisateurs"
ON users FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);

-- Politique de suppression pour les admins
CREATE POLICY "Seuls les admins peuvent supprimer les utilisateurs"
ON users FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND role = 'admin'
  )
);

-- Drop existing tables if they exist
drop table if exists vehicles;
drop table if exists mechanics;

-- Create mechanics table
create table mechanics (
  id serial primary key,
  name text not null,
  user_id uuid unique references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on mechanics
alter table mechanics enable row level security;

-- Drop any existing policies
drop policy if exists "mechanics_policy" on mechanics;

-- Create separate policies for mechanics
create policy "mechanics_select_policy"
  on mechanics
  for select
  to authenticated
  using (true);

create policy "mechanics_insert_policy"
  on mechanics
  for insert
  to authenticated
  with check (true);

create policy "mechanics_update_policy"
  on mechanics
  for update
  to authenticated
  using (auth.jwt() ->> 'role' in ('admin', 'secretary'));

create policy "mechanics_delete_policy"
  on mechanics
  for delete
  to authenticated
  using (auth.jwt() ->> 'role' in ('admin', 'secretary'));

-- Grant access to authenticated users
grant all on mechanics to authenticated;
grant usage, select on sequence mechanics_id_seq to authenticated;

-- Create vehicles table with all required fields
create table vehicles (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Client information
  client_name text not null,
  client_address text not null,
  phone text not null,
  client_signature text,
  
  -- Vehicle information
  brand_model text not null,
  mileage integer not null,
  
  -- Service information
  work_description text not null,
  parts_supplies text,
  mechanic_observations text,
  entry_date date not null,
  exit_date date,
  mechanic_id integer references mechanics(id),
  
  -- Photos (array of 4 URLs)
  photos text[] default array[]::text[],
  
  -- Status (en_attente, en_cours, fait, valide)
  status text not null default 'en_attente' check (status in ('en_attente', 'en_cours', 'fait', 'valide'))
);

-- Enable RLS on vehicles
alter table vehicles enable row level security;

-- Drop any existing policies
drop policy if exists "vehicles_admin_secretary_policy" on vehicles;
drop policy if exists "vehicles_mechanic_policy" on vehicles;
drop policy if exists "vehicles_mechanic_update_policy" on vehicles;

-- Create policies for vehicles
create policy "vehicles_admin_secretary_policy"
  on vehicles
  for all
  using (
    auth.jwt() ->> 'role' in ('admin', 'secretary')
  )
  with check (
    auth.jwt() ->> 'role' in ('admin', 'secretary')
  );

create policy "vehicles_mechanic_policy"
  on vehicles
  for select
  using (
    auth.jwt() ->> 'role' = 'mechanic'
    and mechanic_id = (
      select id from mechanics 
      where user_id = auth.uid()
      limit 1
    )
  );

create policy "vehicles_mechanic_update_policy"
  on vehicles
  for update
  using (
    auth.jwt() ->> 'role' = 'mechanic'
    and mechanic_id = (
      select id from mechanics 
      where user_id = auth.uid()
      limit 1
    )
  )
  with check (
    auth.jwt() ->> 'role' = 'mechanic'
    and mechanic_id = (
      select id from mechanics 
      where user_id = auth.uid()
      limit 1
    )
  );

-- Grant access to authenticated users
grant all on vehicles to authenticated;

-- Create updated_at trigger
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Add triggers for updated_at
create trigger update_mechanics_updated_at
  before update on mechanics
  for each row
  execute function update_updated_at_column();

create trigger update_vehicles_updated_at
  before update on vehicles
  for each row
  execute function update_updated_at_column();

-- Create indexes for common queries
create index vehicles_status_idx on vehicles(status);
create index vehicles_mechanic_id_idx on vehicles(mechanic_id);
create index vehicles_entry_date_idx on vehicles(entry_date);
create index mechanics_user_id_idx on mechanics(user_id);
