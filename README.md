Comando per la build su container docker con database incluso:
- docker-compose -f docker-compose.yml -f docker-compose.mongo.yml up --build

Comando per la build su container docker senza database:
- docker-compose up --build


route api:
- - studenti
- // GET /studente/all - Ottiene tutti gli studenti
- // GET /studente/:id - Ottiene uno studente per ID
- // POST /studente - Creazione di uno studente
- // PUT /studente/:id - Aggiornamento di uno studente esistente
- // DELETE /studente/:id - Eliminazione di uno studente esistente

- - voti
- // GET /voti/all - Ottiene tutti i voti
- // GET /voti/:id - Ottiene un voto specifico per ID
- // POST /voti - Creazione di un nuovo voto
- // PUT /voti/:id - Aggiornamento di un voto esistente
- // DELETE /voti/:id - Eliminazione di un voto esistente
- // GET /voti/studente/:studenteId - Ottiene tutti i voti per uno studente
