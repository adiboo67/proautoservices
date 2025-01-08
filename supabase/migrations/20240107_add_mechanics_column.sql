-- Drop existing mechanics column if it exists
ALTER TABLE vehicles 
DROP COLUMN IF EXISTS mechanics;

-- Add mechanics column as integer array
ALTER TABLE vehicles 
ADD COLUMN mechanics integer[] DEFAULT '{}';

-- Create a function to validate mechanics ids
CREATE OR REPLACE FUNCTION validate_mechanics_ids()
RETURNS TRIGGER AS $function$
BEGIN
  -- Check if any mechanic id in the array doesn't exist in mechanics table
  IF EXISTS (
    SELECT 1 
    FROM unnest(NEW.mechanics) AS mechanic_id
    LEFT JOIN mechanics ON mechanics.id = mechanic_id
    WHERE mechanics.id IS NULL
  ) THEN
    RAISE EXCEPTION 'Invalid mechanic ID found in mechanics array';
  END IF;
  RETURN NEW;
END;
$function$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS validate_mechanics_ids_trigger ON vehicles;

-- Create trigger to validate mechanics ids before insert or update
CREATE TRIGGER validate_mechanics_ids_trigger
  BEFORE INSERT OR UPDATE ON vehicles
  FOR EACH ROW
  EXECUTE FUNCTION validate_mechanics_ids();
