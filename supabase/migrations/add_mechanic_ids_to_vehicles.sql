-- Ajouter la colonne mechanic_ids comme un tableau de UUID
ALTER TABLE vehicles
ADD COLUMN mechanic_ids UUID[] DEFAULT '{}';

-- Ajouter un index GIN pour améliorer les performances des recherches
CREATE INDEX idx_vehicles_mechanic_ids ON vehicles USING GIN (mechanic_ids);

-- Mettre à jour la table pour initialiser les mechanic_ids comme un tableau vide si NULL
UPDATE vehicles
SET mechanic_ids = '{}'
WHERE mechanic_ids IS NULL;
