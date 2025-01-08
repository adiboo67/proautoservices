-- Examiner en détail les fiches en cours
SELECT 
    id,
    client_name,
    status,
    mechanic_ids,
    mechanic_ids IS NULL as is_mechanic_ids_null,
    ARRAY_LENGTH(mechanic_ids, 1) as mechanic_ids_length,
    pg_typeof(mechanic_ids) as mechanic_ids_type
FROM vehicles 
WHERE status = 'in_progress';
