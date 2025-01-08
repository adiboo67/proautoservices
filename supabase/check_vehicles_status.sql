-- Vérifier les véhicules et leurs statuts
SELECT id, client_name, status, mechanic_ids
FROM vehicles
WHERE status = 'in_progress';
