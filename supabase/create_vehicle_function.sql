-- Fonction pour créer un véhicule avec gestion des dates
CREATE OR REPLACE FUNCTION create_vehicle(
  client_name TEXT,
  address TEXT,
  phone TEXT,
  brand_model TEXT,
  mileage INTEGER,
  work_type TEXT,
  parts_supplies TEXT,
  entry_date TEXT,
  exit_date TEXT,
  status TEXT,
  mechanic_id UUID,
  observations TEXT,
  photos TEXT[],
  client_signature TEXT,
  created_by UUID,
  updated_by UUID
) RETURNS vehicles AS $$
DECLARE
  new_vehicle vehicles;
BEGIN
  INSERT INTO vehicles (
    client_name,
    address,
    phone,
    brand_model,
    mileage,
    work_type,
    parts_supplies,
    entry_date,
    exit_date,
    status,
    mechanic_id,
    observations,
    photos,
    client_signature,
    created_by,
    updated_by
  ) VALUES (
    client_name,
    address,
    phone,
    brand_model,
    mileage,
    work_type,
    parts_supplies,
    entry_date::DATE,
    exit_date::DATE,
    status,
    mechanic_id,
    observations,
    photos,
    client_signature,
    created_by,
    updated_by
  )
  RETURNING * INTO new_vehicle;
  
  RETURN new_vehicle;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
