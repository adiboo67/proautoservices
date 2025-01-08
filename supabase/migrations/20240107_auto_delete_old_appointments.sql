-- Création de la fonction pour supprimer les anciens rendez-vous
CREATE OR REPLACE FUNCTION delete_old_appointments() RETURNS void AS $$
BEGIN
  -- Supprime les rendez-vous qui ont plus de 10 jours
  DELETE FROM appointments 
  WHERE date < CURRENT_DATE - INTERVAL '10 days';
END;
$$ LANGUAGE plpgsql;

-- Création d'une fonction pour le déclencheur qui vérifie et supprime les anciens rendez-vous
CREATE OR REPLACE FUNCTION check_and_delete_old_appointments()
RETURNS trigger AS $$
BEGIN
  -- Appelle la fonction de suppression
  PERFORM delete_old_appointments();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Supprime le déclencheur s'il existe déjà
DROP TRIGGER IF EXISTS auto_delete_old_appointments ON appointments;

-- Création du déclencheur qui s'exécute après chaque insertion ou mise à jour
CREATE TRIGGER auto_delete_old_appointments
  AFTER INSERT OR UPDATE ON appointments
  FOR EACH STATEMENT
  EXECUTE FUNCTION check_and_delete_old_appointments();

-- Création d'un déclencheur qui s'exécute chaque jour
CREATE OR REPLACE FUNCTION daily_cleanup_check()
RETURNS trigger AS $$
BEGIN
  -- Si la dernière exécution était il y a plus de 24 heures ou n'a jamais eu lieu
  IF NOT EXISTS (
    SELECT 1 
    FROM appointments 
    WHERE last_cleanup_date >= CURRENT_DATE
  ) THEN
    -- Exécute le nettoyage
    PERFORM delete_old_appointments();
    
    -- Met à jour la date de dernière exécution
    UPDATE appointments 
    SET last_cleanup_date = CURRENT_DATE 
    WHERE id = (SELECT id FROM appointments LIMIT 1);
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Ajoute une colonne pour suivre la dernière date de nettoyage
ALTER TABLE appointments 
ADD COLUMN IF NOT EXISTS last_cleanup_date DATE;

-- Supprime le déclencheur de nettoyage quotidien s'il existe
DROP TRIGGER IF EXISTS daily_cleanup ON appointments;

-- Crée le déclencheur de nettoyage quotidien
CREATE TRIGGER daily_cleanup
  BEFORE INSERT OR UPDATE ON appointments
  FOR EACH STATEMENT
  EXECUTE FUNCTION daily_cleanup_check();
