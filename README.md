Comando per la build su container docker con database incluso:
- docker-compose -f docker-compose.yml -f docker-compose.mongo.yml up --build

Comando per la build su container docker senza database
- docker-compose up --build