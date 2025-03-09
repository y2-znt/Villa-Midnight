# Villa Midnight 👻

![Villa Midnight](https://github.com/y2-znt/Villa-Midnight/blob/main/frontend/public/assets/metadata.png?raw=true)

## Présentation du Projet

Villa Midnight est une application web innovante permettant aux utilisateurs de découvrir et de créer des énigmes immersives. Conçue comme une plateforme interactive, elle offre une expérience unique où les passionnés d'énigmes peuvent partager leurs créations et relever des défis proposés par d'autres utilisateurs.

## Fonctionnalités Principales

- **Création et gestion d'énigmes personnalisées** : Interface intuitive pour concevoir des énigmes avec différents niveaux de difficulté, nombre de participants et durée estimée
- **Système d'authentification multi-méthodes** : Connexion via email/mot de passe ou Google OAuth
- **Gestion de profil utilisateur** : Personnalisation du profil avec avatar et suivi des énigmes créées
- **Interface responsive et moderne** : Design élégant adapté à tous les appareils (desktop, tablette, mobile)
- **Expérience utilisateur optimisée** : Animations fluides et notifications contextuelles

## Stack Technique

### Frontend

- **Next.js 15** avec **React 19** et **TypeScript** pour un développement robuste et performant
- **TailwindCSS 4** pour un design moderne et responsive
- **TanStack Query** pour la gestion efficace des requêtes API et du cache
- **React Hook Form** couplé à **Zod** pour la validation des formulaires
- **Shadcn UI** pour des composants accessibles et personnalisables
- **Motion** pour des animations fluides et élégantes
- **Sonner** pour des notifications toast élégantes

### Backend

- **Node.js** avec **Express** pour une API RESTful performante
- **TypeScript** pour la sécurité du typage et la maintenabilité du code
- **Prisma** comme ORM pour interagir avec la base de données PostgreSQL
- **JWT** et **Passport.js** pour l'authentification sécurisée et l'intégration OAuth
- **Cloudinary** pour la gestion des médias (images des énigmes et avatars)
- **Swagger** pour la documentation automatisée de l'API

### DevOps & Déploiement

- **Docker** pour la conteneurisation de l'application complète
- **PostgreSQL** pour le stockage relationnel des données
- **Git** pour le versioning du code

## Architecture du Projet

```
Villa-Midnight/
├── frontend/                # Application Next.js
│   ├── app/                 # Pages et routes de l'application
│   │   ├── (app)/           # Routes de l'application
│   │   └── (auth)/          # Routes d'authentification
│   ├── components/          # Composants réutilisables
│   ├── hooks/               # Hooks personnalisés
│   ├── context/             # Contextes React pour la gestion d'état
│   ├── lib/                 # Utilitaires et fonctions partagées
│   ├── schemas/             # Schémas de validation Zod
│   ├── types/               # Types TypeScript
│   └── ...
│
├── backend/                 # API Node.js/Express
│   ├── controllers/         # Contrôleurs de l'API
│   ├── routes/              # Routes de l'API
│   ├── middlewares/         # Middlewares personnalisés
│   ├── services/            # Services métier
│   ├── prisma/              # Modèles et migrations Prisma
│   ├── utils/               # Utilitaires partagés
│   └── ...
```

## Installation et Démarrage

### Prérequis

- Node.js (v20+)
- Docker et Docker Compose
- PostgreSQL

### Installation

1. Cloner le dépôt

```bash
git clone https://github.com/y2-znt/Villa-Midnight.git
cd Villa-Midnight
```

2. Configurer les variables d'environnement

```bash
cp .env.example .env
# Modifier les variables dans le fichier .env selon votre environnement
```

3. Lancer l'application avec Docker Compose

```bash
docker-compose up -d
```

4. Ou installer et démarrer le backend manuellement

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

5. Installer et démarrer le frontend manuellement

```bash
cd frontend
npm install
npm run dev
```

## Fonctionnalités Détaillées

### Gestion des Énigmes

- **Création d'énigmes** : Interface intuitive pour créer des énigmes avec titre, description, image, difficulté, nombre de participants et durée estimée
- **Modification et suppression** : Gestion complète du cycle de vie des énigmes créées
- **Visualisation détaillée** : Affichage immersif des énigmes avec toutes les informations pertinentes

### Gestion du Profil Utilisateur

- **Personnalisation** : Modification du nom d'utilisateur et de l'avatar
- **Suppression de compte** : Option de suppression de compte avec confirmation

### Système d'Authentification

- **Inscription** : Création de compte avec email et mot de passe
- **Connexion** : Authentification sécurisée
- **OAuth** : Connexion via Google
- **Protection des routes** : Accès restreint aux fonctionnalités nécessitant une authentification

## Optimisations Techniques

- **Mise en cache** : Stratégie de mise en cache optimisée avec TanStack Query v5
- **Architecture modulaire** : Organisation des composants par fonction pour une meilleure maintenabilité
- **Architecture Full Stack** : Conception et implémentation d'une application complète (frontend, backend, base de données)
- **Développement Frontend Moderne** : Utilisation des dernières fonctionnalités de React 19 et Next.js 15
- **TypeScript** : Typage strict et interfaces bien définies pour un code robuste et maintenable
- **API RESTful** : Conception d'une API robuste avec documentation Swagger
- **Base de Données Relationnelle** : Modélisation efficace avec Prisma et PostgreSQL

- **UI/UX Design** : Création d'interfaces utilisateur modernes, accessibles et performantes
- **DevOps** : Configuration de l'environnement de développement et de déploiement avec Docker
