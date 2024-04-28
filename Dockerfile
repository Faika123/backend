# Utilisation de l'image MySQL officielle comme base
FROM mysql:latest

# Copie du fichier contenant le schéma de base de données dans le conteneur
COPY pfe1.sql /docker-entrypoint-pfe1db.d/

# Définition de l'utilisateur et du groupe pour les fichiers copiés

# Définition des variables d'environnement pour l'authentification de base
ENV MYSQL_ROOT_PASSWORD=""
ENV MYSQL_DATABASE=pfe1

# Exposition du port MySQL (optionnel, si vous souhaitez mapper le port dans le conteneur)
EXPOSE 3306

# Exécution du script d'initialisation lors du démarrage du conteneur
#ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["mysqld"]
