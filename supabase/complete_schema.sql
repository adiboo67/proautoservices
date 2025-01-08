-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table des utilisateurs (extension de la table auth.users de Supabase)
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'secretary', 'mechanic')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table des véhicules
CREATE TABLE IF NOT EXISTS vehicles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  brand_model TEXT NOT NULL,
  mileage INTEGER,
  work_type TEXT,
  parts_supplies TEXT,
  entry_date DATE NOT NULL,
  exit_date DATE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'done', 'validated')),
  mechanic_id UUID REFERENCES users(id),
  observations TEXT,
  photos TEXT[],
  client_signature TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id)
);

-- Table des rendez-vous
CREATE TABLE IF NOT EXISTS appointments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  client_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  vehicle TEXT NOT NULL,
  service TEXT NOT NULL CHECK (service IN ('Vidange', 'Réparation', 'Dépannage', 'Diagnostic', 'Pneumatique', 'Climatisation', 'Autres')),
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES users(id),
  updated_by UUID REFERENCES users(id)
);

-- Trigger pour mettre à jour le timestamp updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Appliquer le trigger à toutes les tables
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_vehicles_updated_at
    BEFORE UPDATE ON vehicles
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at
    BEFORE UPDATE ON appointments
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS idx_vehicles_status ON vehicles(status);
CREATE INDEX IF NOT EXISTS idx_vehicles_mechanic ON vehicles(mechanic_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_dates ON vehicles(entry_date, exit_date);
CREATE INDEX IF NOT EXISTS idx_appointments_dates ON appointments(start_time, end_time);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

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

-- Activer RLS sur les tables vehicles et appointments
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Policies pour vehicles
CREATE POLICY "Les secrétaires peuvent tout voir et modifier"
ON vehicles FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'secretary'
  )
);

CREATE POLICY "Les mécaniciens peuvent voir leurs véhicules assignés"
ON vehicles FOR SELECT
USING (mechanic_id = auth.uid());

CREATE POLICY "Les mécaniciens peuvent modifier leurs véhicules assignés"
ON vehicles FOR UPDATE
USING (mechanic_id = auth.uid())
WITH CHECK (mechanic_id = auth.uid());

-- Policies pour appointments
CREATE POLICY "Les secrétaires peuvent gérer les rendez-vous"
ON appointments FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'secretary'
  )
);

CREATE POLICY "Les mécaniciens peuvent voir les rendez-vous"
ON appointments FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users WHERE id = auth.uid() AND role = 'mechanic'
  )
);

-- Storage policies pour les photos des véhicules
CREATE POLICY "Accès public en lecture pour les photos des véhicules"
ON storage.objects FOR SELECT
USING (bucket_id = 'vehicle-photos');

CREATE POLICY "Upload de photos pour les utilisateurs authentifiés"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'vehicle-photos' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Suppression de photos pour les utilisateurs authentifiés"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'vehicle-photos'
  AND auth.role() = 'authenticated'
);
