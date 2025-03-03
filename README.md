# La Villa Midnight 👻

![Villa Midnight](https://github.com/y2-znt/Villa-Midnight/blob/main/frontend/public/assets/villa-midnight.png?raw=true)

## Présentation du Projet

Villa Midnight est une application web innovante permettant aux utilisateurs de découvrir et de créer des énigmes immersives. Conçue comme une plateforme interactive, elle offre une expérience unique où les passionnés d'énigmes peuvent partager leurs créations et relever des défis proposés par d'autres utilisateurs.

## Fonctionnalités Principales

- **Création d'énigmes personnalisées** : Interface intuitive pour concevoir des énigmes avec différents niveaux de difficulté
- **Système d'authentification sécurisé** : Connexion via email/mot de passe ou Google OAuth
- **Gestion de profil utilisateur** : Personnalisation du profil avec avatar et suivi des énigmes créées
- **Expérience responsive** : Interface adaptée à tous les appareils (desktop, tablette, mobile)

## Stack Technique

### Frontend

- **React 18** avec **TypeScript** pour un développement robuste et typé
- **Vite** comme outil de build ultra-rapide
- **TailwindCSS** pour un design moderne et responsive
- **React Hook Form** couplé à **Zod** pour la validation des formulaires
- **Shadcn UI** pour des composants accessibles et personnalisables

### Backend

- **Node.js** avec **Express** pour une API RESTful performante
- **TypeScript** pour la sécurité du typage
- **Prisma** comme ORM pour interagir avec la base de données
- **PostgreSQL** pour le stockage des données
- **JWT** pour l'authentification sécurisée
- **Passport.js** pour l'intégration OAuth
- **Cloudinary** pour la gestion des médias
- **Swagger** pour la documentation de l'API

### DevOps & Déploiement

- **Docker** pour la base de données
- **Vercel** pour le déploiement du frontend
- **Git** pour le versioning du code

## Architecture du Projet

Le projet suit une architecture moderne et modulaire :

```
Villa-Midnight/
├── frontend/           # Application React (SPA)
│   ├── src/
│   │   ├── components/ # Composants réutilisables
│   │   ├── pages/      # Pages de l'application
│   │   ├── context/    # Contextes React pour la gestion d'état
│   │   ├── hooks/      # Hooks personnalisés
│   │   ├── api/        # Services d'API
│   │   └── ...
│   └── ...
├── backend/            # API Node.js/Express
│   ├── controllers/    # Contrôleurs de l'API
│   ├── routes/         # Routes de l'API
│   ├── middlewares/    # Middlewares personnalisés
│   ├── services/       # Services métier
│   ├── prisma/         # Modèles et migrations Prisma
│   └── ...
└── ...
```

## Installation et Démarrage

### Prérequis

- Node.js (v18+)
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

3. Lancer la base de données avec Docker

```bash
docker-compose up -d
```

4. Installer et démarrer le backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

5. Installer et démarrer le frontend

```bash
cd frontend
npm install
npm run dev
```

## 🌟 Démonstration des Compétences

Ce projet démontre plusieurs compétences techniques avancées :

- **Architecture Full Stack** : Conception et implémentation d'une application complète (frontend, backend, base de données)
- **Développement Frontend Moderne** : Utilisation des dernières fonctionnalités de React avec une approche composant-driven
- **API RESTful** : Conception d'une API robuste avec documentation Swagger
- **Sécurité** : Implémentation de mécanismes d'authentification et d'autorisation
- **Base de Données** : Modélisation et gestion efficace avec Prisma et PostgreSQL
- **UI/UX** : Création d'interfaces utilisateur modernes et accessibles
