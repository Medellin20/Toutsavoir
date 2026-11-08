# Oryalune

## Démarrage local

1. `npm install`
2. `npm run admin:setup` crée un mot de passe aléatoire dans `.env.local` si aucun n’existe. Ce fichier est privé et ignoré par Git. Vous pouvez y définir votre propre `ORYALUNE_ADMIN_PASSWORD` (12 caractères minimum, 256 maximum).
3. `npm run dev`
4. Ouvrir `/admin` et utiliser le mot de passe de `.env.local`. Après toute modification de ce fichier, redémarrer Vite.

Les demandes sont enregistrées côté serveur dans `.oryalune-data/` : fichiers privés, persistants après redémarrage, exclus de Git et du site généré. Ce dossier sert uniquement au développement local. Il n’est pas synchronisé avec Netlify. Ne pas héberger `dist/` seul : les formulaires nécessitent l’API.

## Parcours client et admin

- `/reservation` ou choix d’un service → durée et créneau disponible → questionnaire → récapitulatif → réservation serveur confirmée → `/contact`.
- En cas d’échec d’enregistrement, les réponses restent dans le formulaire et un bouton permet de réessayer. Un identifiant stable évite les doublons lors d’une nouvelle tentative.
- Aucun questionnaire n’est envoyé par e-mail et aucune réponse n’est placée dans un lien WhatsApp, une URL ou le stockage du navigateur.
- `/admin` : connexion, liste/recherche des demandes et lecture détaillée de toutes les réponses ; onglet pour modifier le nom, la présentation, le téléphone, WhatsApp, l’e-mail et les horaires de l’unique voyante.
- La page contact et le pied de page lisent les coordonnées enregistrées. Les numéros doivent inclure l’indicatif international. Les contacts vides sont masqués ; aucun numéro fictif n’est affiché par défaut.
- Les boutons e-mail/WhatsApp de la page contact permettent un contact volontaire avec la voyante ; ils ne transmettent jamais le questionnaire.

## Réservations

Dans `/admin` → **Disponibilités**, définir une heure de début, une heure de fin et une durée (15, 30 ou 60 minutes). Ces horaires se répètent automatiquement tous les jours sur les 30 prochains jours et sont modifiables. Par défaut : 09:00–17:00, séances de 30 minutes. L’interrupteur permet de suspendre les nouvelles réservations. Les anciennes publications par date sont remplacées par cet horaire commun.

Les rendez-vous existants sont conservés lors d’une modification. Tout créneau qui chevauche un rendez-vous est masqué, même si les heures de début ou la durée changent. Le serveur contrôle à nouveau la disponibilité et les horaires lors de la confirmation. Les réservations s’affichent dans **Demandes**. Aucun e-mail automatique n’est envoyé ; l’annulation ou le déplacement d’un rendez-vous ne sont pas inclus.

Chaque minute occupée est protégée par une création exclusive côté stockage, commune à tous les services et toutes les durées. Une erreur de stockage conserve les verrous acquis pour éviter de proposer un rendez-vous incertain ; une nouvelle tentative identique peut terminer l’enregistrement. Une interruption définitive peut nécessiter de nettoyer ces verrous côté stockage après vérification. Le questionnaire et le rendez-vous sont conservés dans un même enregistrement privé.

## Avis et suggestions

La page `/avis`, accessible depuis le menu, le pied de page et les témoignages, permet de laisser un avis noté de 1 à 5 ou une suggestion. Le nom ou pseudonyme et le message sont obligatoires ; l’e-mail est facultatif. Les messages sont conservés côté serveur et lisibles uniquement dans l’onglet « Avis et suggestions » de l’admin. Ils ne sont pas publiés automatiquement. Les tentatives d’envoi utilisent un identifiant stable pour éviter les doublons et une panne ne produit pas de confirmation de sauvegarde.

## Hébergement Netlify

Le dépôt contient `netlify.toml` et une Function `/api/*`. Netlify Blobs fournit le stockage persistant des demandes, du profil et des sessions. Les données ne sont pas intégrées aux fichiers publics et restent disponibles entre les déploiements. Le magasin est propre au site Netlify ; ne pas déployer des aperçus non fiables dans un site contenant de vraies demandes, car le magasin est partagé entre contextes de déploiement du même site.

1. Dans Netlify, configurer la variable **serveur** `ORYALUNE_ADMIN_PASSWORD`, de 12 à 256 caractères, pour les Functions. Ne jamais la préfixer avec `VITE_`.
2. Déployer le dépôt avec la commande `npm run build` et le dossier `dist` (définis dans `netlify.toml`). Les Functions utilisent l’accès automatique au magasin Netlify Blobs du site ; aucun token de stockage ne doit être ajouté dans le navigateur.
3. Ouvrir `/admin`, se connecter et renseigner les contacts réels de la voyante.
4. Soumettre une demande de test depuis un autre navigateur, vérifier son apparition dans l’admin et la mise à jour des coordonnées sur la page contact.

En production, le cookie de session est HttpOnly, Secure et SameSite=Strict ; les sessions expirent après huit heures et la déconnexion les révoque côté serveur. Changer le mot de passe invalide les sessions précédentes. Après cinq échecs de connexion par adresse IP sur quinze minutes, les essais sont temporairement bloqués. Les routes de lecture des demandes et d’édition du profil exigent une session valide. Le serveur contrôle les champs, le service et les choix autorisés indépendamment du navigateur.

## Vérifications

- `npm run typecheck` : application, serveur et Function.
- `npm run test:api` : stockage, droits d’accès, validation, authentification, modification des contacts et déconnexion.
- `npm run build` : bundle public de production. Les secrets et le dossier de données local en sont exclus.

L’exécution locale ne prouve pas le déploiement ou l’accès au magasin hébergé : vérifier séparément sur le site Netlify.
