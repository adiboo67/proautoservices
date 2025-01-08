-- Supprimer toutes les politiques existantes de la table users
DROP POLICY IF EXISTS "Permettre l'insertion publique pour le premier admin" ON users;
DROP POLICY IF EXISTS "Les utilisateurs authentifiés peuvent voir tous les utilisateurs" ON users;
DROP POLICY IF EXISTS "Seuls les admins peuvent modifier les utilisateurs" ON users;
DROP POLICY IF EXISTS "Seuls les admins peuvent supprimer les utilisateurs" ON users;

-- Politique de base pour permettre à tous les utilisateurs authentifiés de lire leurs propres données
CREATE POLICY "Users can read their own data"
ON users FOR SELECT
USING (auth.uid() = id);

-- Politique pour permettre la création du premier admin
CREATE POLICY "Allow first admin creation"
ON users FOR INSERT
WITH CHECK (
  NOT EXISTS (
    SELECT 1 FROM users
    WHERE role = 'admin'
  )
);

-- Politique pour permettre aux admins de tout faire
CREATE POLICY "Admins can do everything"
ON users FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role = 'admin'
  )
);

-- Révoquer tous les privilèges existants
REVOKE ALL ON users FROM anon, authenticated;

-- Accorder les privilèges nécessaires
GRANT SELECT ON users TO anon, authenticated;
GRANT INSERT ON users TO anon, authenticated;
GRANT UPDATE ON users TO authenticated;
GRANT DELETE ON users TO authenticated;

-- Réactiver RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
