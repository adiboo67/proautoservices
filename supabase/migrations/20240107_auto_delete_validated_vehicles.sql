-- Ajouter les colonnes pour suivre les dates
ALTER TABLE vehicles
ADD COLUMN IF NOT EXISTS validated_at TIMESTAMP,
ADD COLUMN IF NOT EXISTS pending_at TIMESTAMP;

-- Fonction pour mettre à jour les dates de statut
CREATE OR REPLACE FUNCTION update_status_dates()
RETURNS TRIGGER AS $$
BEGIN
    -- Si le statut passe à 'validated'
    IF NEW.status = 'validated' AND (OLD.status IS NULL OR OLD.status != 'validated') THEN
        NEW.validated_at = CURRENT_TIMESTAMP;
        NEW.pending_at = NULL;
    -- Si le statut passe à 'pending'
    ELSIF NEW.status = 'pending' AND (OLD.status IS NULL OR OLD.status != 'pending') THEN
        NEW.pending_at = CURRENT_TIMESTAMP;
        NEW.validated_at = NULL;
    -- Si le statut change vers autre chose
    ELSE
        NEW.validated_at = NULL;
        NEW.pending_at = NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Créer le déclencheur pour mettre à jour les dates
DROP TRIGGER IF EXISTS update_status_dates_trigger ON vehicles;
CREATE TRIGGER update_status_dates_trigger
    BEFORE UPDATE OF status ON vehicles
    FOR EACH ROW
    EXECUTE FUNCTION update_status_dates();

-- Fonction pour supprimer les vieux véhicules
CREATE OR REPLACE FUNCTION delete_old_vehicles() RETURNS void AS $$
DECLARE
    vehicle_record RECORD;
BEGIN
    -- Sélectionner les véhicules à supprimer (validés depuis 30 jours ou en attente depuis 60 jours)
    FOR vehicle_record IN 
        SELECT id, photos 
        FROM vehicles 
        WHERE (
            (status = 'validated' AND validated_at < CURRENT_TIMESTAMP - INTERVAL '30 days')
            OR 
            (status = 'pending' AND pending_at < CURRENT_TIMESTAMP - INTERVAL '60 days')
        )
    LOOP
        -- Supprimer les photos du storage si elles existent
        IF vehicle_record.photos IS NOT NULL AND array_length(vehicle_record.photos, 1) > 0 THEN
            PERFORM extensions.http_delete(
                'https://pjxtjkmqgkbisgfleaps.supabase.co/storage/v1/object/vehicles/' || photo
            ) FROM unnest(vehicle_record.photos) AS photo;
        END IF;
    END LOOP;

    -- Supprimer les véhicules validés depuis plus de 30 jours
    DELETE FROM vehicles 
    WHERE status = 'validated' 
    AND validated_at < CURRENT_TIMESTAMP - INTERVAL '30 days';

    -- Supprimer les véhicules en attente depuis plus de 60 jours
    DELETE FROM vehicles 
    WHERE status = 'pending' 
    AND pending_at < CURRENT_TIMESTAMP - INTERVAL '60 days';
END;
$$ LANGUAGE plpgsql;

-- Fonction pour le déclencheur de nettoyage quotidien
CREATE OR REPLACE FUNCTION check_and_delete_old_vehicles()
RETURNS trigger AS $$
BEGIN
    -- Si la dernière exécution était il y a plus de 24 heures ou n'a jamais eu lieu
    IF NOT EXISTS (
        SELECT 1 
        FROM vehicles 
        WHERE last_cleanup_date >= CURRENT_DATE
    ) THEN
        -- Exécute le nettoyage
        PERFORM delete_old_vehicles();
        
        -- Met à jour la date de dernière exécution sur le premier véhicule trouvé
        UPDATE vehicles 
        SET last_cleanup_date = CURRENT_DATE 
        WHERE id IN (SELECT id FROM vehicles LIMIT 1);
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Ajouter une colonne pour suivre la dernière date de nettoyage
ALTER TABLE vehicles 
ADD COLUMN IF NOT EXISTS last_cleanup_date DATE;

-- Supprimer le déclencheur de nettoyage s'il existe déjà
DROP TRIGGER IF EXISTS vehicles_cleanup_trigger ON vehicles;

-- Créer le déclencheur de nettoyage
CREATE TRIGGER vehicles_cleanup_trigger
    AFTER INSERT OR UPDATE ON vehicles
    FOR EACH STATEMENT
    EXECUTE FUNCTION check_and_delete_old_vehicles();

-- Mettre à jour les dates pour les véhicules existants
UPDATE vehicles 
SET validated_at = CURRENT_TIMESTAMP 
WHERE status = 'validated' 
AND validated_at IS NULL;

UPDATE vehicles 
SET pending_at = CURRENT_TIMESTAMP 
WHERE status = 'pending' 
AND pending_at IS NULL;
