LOGREGDEL

Application Fullstack d’authentification développée avec :

Frontend : React + TypeScript + Vite
Backend : Symfony API
Base de données : PostgreSQL (Supabase)
Déploiement :
Front : Vercel
Back : Render
Aperçu du projet

LOGREGDEL est une application d’authentification moderne permettant :

l’inscription d’utilisateurs,
la connexion sécurisée,
la gestion JWT,
la communication Front ↔ API Symfony,
l’utilisation d’une base PostgreSQL distante.

Le projet a été réalisé dans un objectif d’apprentissage Fullstack moderne avec React et Symfony.

Stack technique
Frontend
React
TypeScript
Vite
React Router DOM
Fetch API
Backend
Symfony
Doctrine ORM
LexikJWTAuthenticationBundle
NelmioCorsBundle
Base de données
PostgreSQL
Supabase
Fonctionnalités
Création de compte
Connexion utilisateur
JWT Authentication
Hash des mots de passe
API REST Symfony
Communication Front / Back
Déploiement Cloud
Architecture
Frontend React (Vercel)
↓
API Symfony (Render)
↓
PostgreSQL Supabase
Installation locale
Frontend
npm install
npm run dev
Backend Symfony
composer install
symfony server:start
Variables d’environnement
Frontend

Créer un .env :

VITE_API_URL=http://localhost:8000
Backend Symfony

Créer un .env.local :

DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/postgres"
JWT_PASSPHRASE=YOUR_PASSPHRASE
Déploiement
Front

Déployé sur :

Vercel

Back

Déployé sur :

Render

Base de données

Hébergée sur :

Supabase

Objectifs pédagogiques

Ce projet m’a permis de travailler :

l’architecture Fullstack,
React avec TypeScript,
Symfony API,
PostgreSQL,
JWT Authentication,
le déploiement cloud,
la communication API REST,
la gestion CORS,
la configuration d’environnements de production.
Auteur

Jean-Emmanuel Gallo
