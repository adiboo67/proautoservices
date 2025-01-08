-- Fonction pour créer un véhicule avec gestion des dates
CREATE OR REPLACE FUNCTION create_vehicle(
  p_client_name TEXT,
  p_address TEXT,
  p_phone TEXT,
  p_brand_model TEXT,
  p_mileage INTEGER,
  p_work_type TEXT,
  p_parts_supplies TEXT,
  p_entry_date TEXT,
  p_exit_date TEXT,
  p_status TEXT,
  p_observations TEXT,
  p_photos TEXT[],
  p_client_signature TEXT,
  p_created_by UUID
)
RETURNS SETOF vehicles
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_entry_date DATE;
  v_exit_date DATE;
BEGIN
  -- Convertir et valider les dates
  BEGIN
    v_entry_date := TO_DATE(p_entry_date, 'YYYY-MM-DD');
    v_exit_date := TO_DATE(p_exit_date, 'YYYY-MM-DD');
  EXCEPTION WHEN OTHERS THEN
    RAISE EXCEPTION 'Date invalide: entry_date=%, exit_date=%', p_entry_date, p_exit_date;
  END;

  -- Insérer le véhicule
  RETURN QUERY
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
    observations,
    photos,
    client_signature,
    created_by,
    updated_by
  ) VALUES (
    p_client_name,
    p_address,
    p_phone,
    p_brand_model,
    p_mileage,
    p_work_type,
    p_parts_supplies,
    v_entry_date,
    v_exit_date,
    p_status,
    p_observations,
    p_photos,
    p_client_signature,
    p_created_by,
    p_created_by
  )
  RETURNING *;
END;
$$;
