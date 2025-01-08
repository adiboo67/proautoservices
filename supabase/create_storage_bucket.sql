-- Création du bucket pour les photos de véhicules
insert into storage.buckets (id, name, public)
values ('vehicles', 'vehicles', true);

-- Politique pour permettre à tout le monde de lire les fichiers
create policy "Fichiers publiquement accessibles"
on storage.objects for select
using ( bucket_id = 'vehicles' );

-- Politique pour permettre aux utilisateurs authentifiés de télécharger des fichiers
create policy "Les utilisateurs authentifiés peuvent télécharger"
on storage.objects for insert
with check (
  bucket_id = 'vehicles'
  and auth.role() = 'authenticated'
);

-- Politique pour permettre aux utilisateurs authentifiés de supprimer leurs fichiers
create policy "Les utilisateurs authentifiés peuvent supprimer"
on storage.objects for delete
using (
  bucket_id = 'vehicles'
  and auth.role() = 'authenticated'
);
