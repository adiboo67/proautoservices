-- Supprimer la table vehicles existante
DROP TABLE IF EXISTS vehicles CASCADE;

-- Créer la nouvelle table vehicles
CREATE TABLE vehicles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  -- Informations client
  client_name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  
  -- Informations véhicule
  brand_model TEXT NOT NULL,
  registration_number TEXT,
  mileage INTEGER,
  
  -- Informations intervention
  work_type TEXT NOT NULL,
  parts_supplies TEXT,
  entry_date TEXT NOT NULL,
  exit_date TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'done', 'validated')),
  
  -- Observations et photos
  observations TEXT,
  photos TEXT[] DEFAULT ARRAY[]::TEXT[],
  
  -- Signature client
  client_signature TEXT,
  
  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id),
  mechanic_ids UUID[] DEFAULT ARRAY[]::UUID[]
);

-- Recréer les policies
CREATE POLICY "Les secrétaires peuvent tout faire" ON vehicles
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'secretary'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'secretary'
  )
);

CREATE POLICY "Les mécaniciens peuvent voir et modifier" ON vehicles
FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'mechanic'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid()
    AND users.role = 'mechanic'
  )
);

-- Enable RLS
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- Créer un trigger pour mettre à jour updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_vehicles_updated_at
    BEFORE UPDATE ON vehicles
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
