# Bienvue sur SIRH

## Participants

- Jarod Couprie
- Ethan Collignon
- Théo Roblin

## Démarrage du projet

Pour démarrer le projet et créer les différents conteneurs dont l'application a besoin, il faut utiliser la commande
suivante

### Développement

```bash
docker compose -f ./docker-compose.dev.yml -p sirh-dev up -d
```

### Production

```bash
docker compose -f ./docker-compose.yml -p sirh up -d
```

