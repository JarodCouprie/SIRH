# Bienvue sur SIRH

## Participants

- Jarod Couprie
- Ethan Collignon
- Théo Roblin

## Démarrage du projet

Pour démarrer le projet et créer les différents conteneurs dont l'application a besoin, il faut utiliser la commande
suivante
> Attention cependant, le dossier contient des variables d'environnement qu'il sera nécessaire de prendre en
> compte lors de la première initialisation. Ce projet ne contient que des variables d'environnement de développement et
> ne sont en aucun cas à prendre telles quelles pour mettre l'application en phase de production.

### Développement

```bash
docker compose -f ./docker-compose.dev.yml -p sirh-dev up -d
```

### Production

```bash
docker compose -f ./docker-compose.yml -p sirh up -d
```

