# 🔐 LOGREGDEL

Application d'authentification Fullstack moderne développée avec **React**, **TypeScript**, **Symfony** et **PostgreSQL**.

---

# 🌐 Démonstration

🔗 [Accéder à LOGREGDEL](https://logregdel.vercel.app)

---

# 📋 Fonctionnalités

- Création de compte utilisateur
- Formulaire d'inscription en deux étapes
- Connexion sécurisée avec JWT
- Déconnexion
- Suppression de compte
- Validation des champs de formulaire
- Vérification de la complexité des mots de passe
- Gestion des messages d'erreur
- Interface responsive
- Communication Frontend ↔ Backend
- API REST Symfony
- Déploiement cloud

---

# 🔒 Sécurité

- Authentification par token JWT
- Hachage des mots de passe
- Configuration des accès CORS
- Confirmation du mot de passe
- Validation des mots de passe côté frontend

### Critères de validation des mots de passe

- 8 caractères minimum
- Au moins une majuscule
- Au moins une minuscule
- Au moins un chiffre
- Au moins un caractère spécial

---

# 🛠️ Stack technique

## Frontend

- React
- TypeScript
- Vite
- React Router DOM
- CSS

## Backend

- PHP
- Symfony
- Doctrine ORM
- LexikJWTAuthenticationBundle
- API REST
- Nelmio CORS

## Base de données

- PostgreSQL
- Supabase

## Déploiement

- Vercel (Frontend)
- Render (Backend)
- Docker (Conteneurisation du backend)
- Supabase (Base de données distante)

---

# 🏗️ Architecture du projet

```txt
Frontend React / TypeScript (Vercel)
                 ↓
          Requêtes HTTP / JSON
                 ↓
      API REST Symfony (Render)
                 ↓
            Doctrine ORM
                 ↓
        PostgreSQL (Supabase)
```

---

# 📱 Responsive Design

L'application dispose d'une interface adaptée aux différents supports :

- Ordinateurs
- Tablettes
- Smartphones

---

# 🎯 Objectifs du projet

Ce projet a été réalisé afin de mettre en pratique :

- Le développement d'une application Fullstack
- La conception d'une API REST
- La gestion de l'authentification
- La sécurisation des données utilisateurs
- L'intégration d'une base de données distante
- La conteneurisation avec Docker
- Le déploiement d'une application dans le cloud
- La conception d'interfaces responsives
