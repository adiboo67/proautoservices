-- Drop existing table
DROP TABLE IF EXISTS vehicles CASCADE;

-- Recreate vehicles table with updated schema
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

-- Recreate indexes
CREATE INDEX IF NOT EXISTS idx_vehicles_status ON vehicles(status);
CREATE INDEX IF NOT EXISTS idx_vehicles_mechanic ON vehicles(mechanic_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_dates ON vehicles(entry_date, exit_date);

-- Enable RLS
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

-- Recreate policies
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
