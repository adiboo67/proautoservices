-- Fonction pour désactiver RLS temporairement
CREATE OR REPLACE FUNCTION disable_rls()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  ALTER TABLE users DISABLE ROW LEVEL SECURITY;
END;
$$;

-- Fonction pour réactiver RLS
CREATE OR REPLACE FUNCTION enable_rls()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  ALTER TABLE users ENABLE ROW LEVEL SECURITY;
END;
$$;

-- Donner les permissions nécessaires
GRANT EXECUTE ON FUNCTION disable_rls() TO authenticated;
GRANT EXECUTE ON FUNCTION enable_rls() TO authenticated;
