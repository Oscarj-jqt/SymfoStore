# Gestion des Produits - Product API

Ce projet est une application permettant de gérer un catalogue de produits et leurs catégories via une API RESTful. Elle inclut des fonctionnalités comme la gestion des accès, la validation des données et l’authentification sécurisée via JWT. Le backend est développé en **PHP avec Symfony**, et la base de données utilisée est **MySQL**.

![demo page](/symfostore_cap.png)

## Description des Choix Techniques

### Backend - PHP avec Symfony & MySQL
* **Symfony** est utilisé pour développer une API REST robuste et gérer les opérations backend.
* **MySQL** est utilisé pour stocker toutes les données liées aux produits et catégories.
* **Doctrine ORM** est employé pour interagir avec la base de données et simplifier les opérations CRUD.
* **Composer** est utilisé pour gérer les dépendances et structurer le projet.

### Gestion des Authentifications et Permissions
* **LexikJWTAuthenticationBundle** permet la gestion des tokens JWT pour sécuriser l'API.
* **Rôles et permissions** sont mis en place pour restreindre les accès selon les profils (Admin, Utilisateur).
* **Validation des données** pour assurer la conformité des entrées utilisateur.
* **Tests avec PHPUnit** pour garantir la stabilité et le bon fonctionnement de l’API.

## Fonctionnalités Principales
* **Gestion des produits** : Création, modification, suppression et affichage des produits.
* **Gestion des catégories** : Création, modification, suppression et affichage des catégories.
* **Authentification sécurisée** avec JWT pour restreindre certaines actions.
* **Gestion des relations** entre produits et catégories.
* **Validation des données** pour assurer l'intégrité des informations stockées.
* **Tests unitaires et fonctionnels** pour valider le comportement de l’API.

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
