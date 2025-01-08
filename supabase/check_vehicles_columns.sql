-- Afficher toutes les colonnes de la table vehicles
SELECT 
    column_name, 
    data_type, 
    is_nullable,
    column_default,
    character_maximum_length
FROM information_schema.columns 
WHERE table_name = 'vehicles'
ORDER BY ordinal_position;
