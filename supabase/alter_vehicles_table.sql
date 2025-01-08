-- Modifier les contraintes de la table vehicles
ALTER TABLE vehicles 
  ALTER COLUMN mileage DROP NOT NULL,
  ALTER COLUMN work_description DROP NOT NULL,
  ALTER COLUMN exit_date DROP NOT NULL,
  ALTER COLUMN status SET DEFAULT 'pending';

-- Mettre à jour la contrainte de vérification du statut
ALTER TABLE vehicles 
  DROP CONSTRAINT IF EXISTS vehicles_status_check,
  ADD CONSTRAINT vehicles_status_check 
    CHECK (status IN ('pending', 'in_progress', 'done', 'validated'));
