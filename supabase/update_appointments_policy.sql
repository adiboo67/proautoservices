-- Mettre à jour la politique de sécurité pour les rendez-vous
DROP POLICY IF EXISTS "Les secrétaires peuvent gérer les rendez-vous" ON appointments;

CREATE POLICY "Les secrétaires et admins peuvent gérer les rendez-vous"
ON appointments FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users 
    WHERE id = auth.uid() 
    AND role IN ('secretary', 'admin')
  )
);
