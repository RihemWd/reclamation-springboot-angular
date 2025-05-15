# Système de gestion des réclamations

## Description du projet
Ce projet est une application web complète permettant la gestion des réclamations clients, développée avec Spring Boot (Back-end) et Angular (Front-end). Elle permet d’enregistrer, suivre, traiter et analyser les réclamations, tout en gérant les clients et les agents du service après-vente (SAV).

## Fonctionnalités principales
- CRUD sur les clients, agents SAV, réclamations et suivis
- Enregistrement et suivi des réclamations clients
- Affectation des réclamations aux agents SAV
- Génération de rapports de satisfaction et statistiques

## Technologies utilisées
- **Back-end** : Java 17+, Spring Boot, Spring Data JPA, Lombok, MySQL
- **Front-end** : Angular (à venir)
- **Outils** : Maven, Docker, PlantUML (pour la conception)

## Structure du projet
- `backend/` : code source Spring Boot (API REST, entités, services, contrôleurs)
- `README.md` : ce fichier

## Installation et exécution
### Prérequis
- Java 17 ou supérieur
- MySQL (base de données `reclamations` créée, accès root)
- Maven ou Maven Daemon (`mvnd`)

### Lancer le back-end
1. Cloner le repository et se placer dans le dossier `backend` :
   ```sh
   cd backend
   mvnd spring-boot:run
   ```
2. L’API REST sera disponible sur `http://localhost:8080`

### Configuration de la base de données
Le fichier `src/main/resources/application.properties` contient la configuration MySQL :
```
spring.datasource.url=jdbc:mysql://localhost:3306/reclamations
spring.datasource.username=root
spring.datasource.password=
```

## Documentation de l’API
- Les endpoints sont accessibles sous `/api/clients`, `/api/reclamations`, `/api/agentsav`, `/api/suivis`.
- Voir le fichier `CONCEPTION.md` pour les cas d’utilisation et la structure des entités.

## Déploiement Docker (à venir)
Un fichier `docker-compose.yml` sera ajouté pour faciliter le déploiement de l’application et de la base de données.

## Auteur
Projet réalisé par Rihem Wadaa.
