# ProAutoServices - Gestion des fiches véhicules

## Configuration initiale

1. Installer les dépendances :
```bash
npm install
```

2. Configurer les variables d'environnement :
- Copier le fichier `.env.local.example` en `.env.local`
- Remplir les variables avec vos informations Supabase

3. Créer la base de données :
- Exécuter le script SQL dans `supabase/complete_schema.sql` dans votre projet Supabase

4. Créer un compte administrateur :
```bash
# Utilisez l'API suivante pour créer un compte admin
# POST http://localhost:3000/api/create-admin
```

Identifiants par défaut :
- Email : admin@proautoservices.com
- Mot de passe : admin123456

## Démarrage

```bash
npm run dev
```

L'application sera disponible sur http://localhost:3000

## Fonctionnalités

- Gestion des utilisateurs (Admin)
- Gestion des fiches véhicules (Secrétaire)
- Gestion des rendez-vous (Secrétaire)
- Suivi des travaux (Mécanicien)
- Upload de photos
- Signature électronique
