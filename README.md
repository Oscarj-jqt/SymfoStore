# Gestion des Produits - Product API

Ce projet est une application permettant de gérer un catalogue de produits et leurs catégories via une API RESTful. Elle inclut des fonctionnalités comme la gestion des accès, la validation des données et l’authentification sécurisée via JWT. Le backend est développé en **PHP avec Symfony**, et la base de données utilisée est **MySQL**. Le frontend utilise **React** pour l'affichage des données et **Redux** pour la gestion de l'état.

![demo page](/symfostore_cap.png)

## Description des Choix Techniques

### Backend - PHP avec Symfony & MySQL
* **Symfony** est utilisé pour développer une API REST robuste et gérer les opérations backend.
* **MySQL** est utilisé pour stocker toutes les données liées aux produits et catégories.
* **Composer** est utilisé pour gérer les dépendances et structurer le projet.

### Gestion des Authentifications et Permissions
* **LexikJWTAuthenticationBundle** permet la gestion des tokens JWT pour sécuriser l'API.
* **Rôles et permissions** sont mis en place pour restreindre les accès selon les profils (Admin, Utilisateur).
* **Validation des données** est réalisée côté backend pour assurer la conformité des entrées utilisateur.

### Frontend - React & Redux
* **React** est utilisé pour construire l'interface utilisateur dynamique.
* **Redux** est employé pour la gestion de l'état global de l'application, notamment pour gérer la liste des produits et les erreurs.
* **AJAX avec `fetch`** est utilisé pour récupérer, ajouter, modifier et supprimer les produits depuis l'API backend, offrant ainsi une expérience utilisateur fluide sans rechargement de page.
* **Gestion des tokens JWT** via Redux pour assurer la sécurité des appels API, notamment pour l'authentification et l'autorisation des actions.

### Fonctionnalités Principales
* **Gestion des produits** : Création, modification, suppression et affichage des produits via AJAX.
* **Authentification sécurisée** avec JWT pour restreindre certaines actions, telles que l'ajout ou la suppression de produits, aux administrateurs uniquement.
* **Gestion des relations** entre produits et catégories.
* **Validation des données** côté backend pour assurer l'intégrité des informations stockées.
* **Gestion de l'état avec Redux** pour maintenir l'état global de l'application, permettant de gérer la liste des produits et les erreurs de manière centralisée.


## Prérequis

Avant de démarrer le projet, assure-toi d'avoir installé les éléments suivants :

* **PHP** 8.1 ou supérieur
* **Composer** pour gérer les dépendances
* **Symfony CLI** pour exécuter l’application
* **MySQL** 8.0 ou supérieur
* **Postman** (optionnel, pour tester l’API)

## Instructions pour l'installation

### Cloner le projet
```bash
git clone https://github.com/Oscarj-jqt/SymfoStore
cd symfostore
