# Orialune

## Démarrage local

1. `npm install`
2. `npm run admin:setup` crée un mot de passe aléatoire dans `.env.local` si aucun n’existe. Ce fichier est privé et ignoré par Git. Vous pouvez y définir votre propre `ORYALUNE_ADMIN_PASSWORD` (12 caractères minimum, 256 maximum).
3. `npm run dev`
4. Ouvrir `/admin` et utiliser le mot de passe de `.env.local`. Après toute modification de ce fichier, redémarrer Vite.

Les demandes sont enregistrées côté serveur dans `.oryalune-data/` : fichiers privés, persistants après redémarrage, exclus de Git et du site généré. Ce dossier sert uniquement au développement local. Il n’est pas synchronisé avec Netlify. Ne pas héberger `dist/` seul : les formulaires nécessitent l’API.

## Parcours client et admin

- `/reservation` ou choix d’un service → préférences libres et facultatives → questionnaire → récapitulatif → demande enregistrée → `/contact`.
- En cas d’échec d’enregistrement, les réponses restent dans le formulaire et un bouton permet de réessayer. Un identifiant stable évite les doublons lors d’une nouvelle tentative.
- Aucun questionnaire n’est envoyé par e-mail et aucune réponse n’est placée dans un lien WhatsApp, une URL ou le stockage du navigateur.
- `/admin` : connexion, liste/recherche des demandes et lecture détaillée de toutes les réponses ; onglet pour modifier le nom, la présentation, le téléphone, WhatsApp, l’e-mail et les horaires de l’unique voyante.
- La page contact et le pied de page lisent les coordonnées enregistrées. Les numéros doivent inclure l’indicatif international. Les contacts vides sont masqués ; aucun numéro fictif n’est affiché par défaut.
- Les boutons e-mail/WhatsApp de la page contact permettent un contact volontaire avec la voyante ; ils ne transmettent jamais le questionnaire.

## Demandes de réservation

Le client choisit un service, remplit le questionnaire et peut indiquer librement une date, un horaire et une durée souhaités. Ces trois préférences sont facultatives. La date et l’heure se saisissent avec les champs calendrier/heure ; la durée reste libre (par exemple « 45 minutes »). Aucune disponibilité, durée fixe ou règle de préavis ne bloque l’envoi. La demande et les préférences sont enregistrées via `/api/consultations`, puis affichées dans **Admin → Demandes**. La confirmation indique la réception de la demande, sans confirmer automatiquement un rendez-vous.

Lorsqu’une date et une heure sont renseignées, `/api/slot-check` détecte les chevauchements avec les rendez-vous et les demandes déjà enregistrées, tous services confondus, sans exposer les coordonnées ni les réponses. La vérification se fait après la saisie puis toutes les 30 secondes, et à nouveau côté serveur lors de l’envoi. Un conflit déclenche une alerte mais ne bloque pas l’enregistrement de la demande. La durée est prise en compte si elle est exprimée en minutes (nombre seul ou suivi de « min » / « minutes ») ; sans durée interprétable, seule l’heure de départ est vérifiée. Les anciennes préférences rédigées sous forme de phrases ne peuvent pas être comparées automatiquement. Les demandes restent à confirmer par la voyante.

Le site propose des apparitions au défilement, des transitions de navigation, des lumières d’ambiance et des réactions au survol/clic. Les effets respectent la préférence système de réduction des animations.

Les anciennes réservations restent consultables dans l’administration. Les anciennes routes d’agenda sont conservées pour compatibilité ; le parcours actuel ne les utilise plus.

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
