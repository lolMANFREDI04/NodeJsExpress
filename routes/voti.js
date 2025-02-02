// routes/voti.js

const express = require('express');

const mongoose = require('mongoose'); // Importa mongoose per la validazione

const router = express.Router();

const keycloak = require("#middlewares/keycloak");

// Import Mongoose models
const Voto = require('#models/Voto');
const Studente = require('#models/Studente'); // Importa il modello Studente


// GET /voti/all - Ottiene tutti i voti
router.get('/all', [keycloak.protect()],(req, res) => {
    Voto.find({})
    .then(function (voti) {
        res.json(voti);
    })
    .catch(function (err) {
        console.error('Errore durante il recupero dei voti:', err);
        res.status(500).json({ message: 'Errore del server' });
    });
});


// GET /voti/:id - Ottiene un voto specifico per ID
router.get('/:id', [keycloak.protect()],(req, res) => {
    var id = req.params.id;
    Voto.findById(id)
        .then(function (voto) {
            if (!voto) {
                return res.status(404).json({ message: 'Voto non trovato' });
            }
            res.json(voto);
        })
        .catch(function (err) {
            console.error('Errore durante il recupero del voto:', err);
            res.status(500).json({ message: 'Errore del server' });
        });
});


// POST /voti - Creazione di un nuovo voto
router.post('/', keycloak.protect(), async (req, res) => {
    try {
      console.log('Richiesta POST /voti con body:', req.body);
  
      const { studenteId, materia, voto, dataVoto } = req.body;
  
      // 1. Verifica che lo studente esista
      const studente = await Studente.findById(studenteId);
      if (!studente) {
        return res.status(400).json({ message: 'Lo studente indicato non esiste' });
      }
  
      // 2. Se esiste, crea il nuovo voto
      const nuovoVoto = new Voto({
        studenteId,
        materia,
        voto,
        dataVoto // opzionale
      });
  
      // Salva il voto
      const votoSalvato = await nuovoVoto.save();
      return res.status(201).json(votoSalvato);
  
    } catch (err) {
      console.error('Errore durante la creazione del voto:', err);
      return res.status(400).json({ message: 'Errore durante la creazione del voto' });
    }
});  


// PUT /voti/:id - Aggiornamento di un voto esistente
router.put('/:id', [keycloak.protect()],(req, res) => {
    var id = req.params.id;
    var update = {
        studenteId: req.body.studenteId,
        materia: req.body.materia,
        voto: req.body.voto,
        dataVoto: req.body.dataVoto
    };

    Voto.findByIdAndUpdate(id, update, { new: true })
        .then(function (votoAggiornato) {
            if (!votoAggiornato) {
                return res.status(404).json({ message: 'Voto non trovato' });
            }
            res.json(votoAggiornato);
        })
        .catch(function (err) {
            console.error('Errore durante l\'aggiornamento del voto:', err);
            res.status(400).json({ message: 'Errore durante l\'aggiornamento del voto' });
        });
});


// DELETE /voti/:id - Eliminazione di un voto esistente
router.delete('/:id', [keycloak.protect()],(req, res) => {
    var id = req.params.id;
    Voto.findByIdAndDelete(id)
        .then(function (votoEliminato) {
            if (!votoEliminato) {
                return res.status(404).json({ message: 'Voto non trovato' });
            }
            res.json({ message: 'Voto eliminato correttamente' });
        })
        .catch(function (err) {
            console.error('Errore durante l\'eliminazione del voto:', err);
            res.status(400).json({ message: 'Errore durante l\'eliminazione del voto' });
        });
});


// NEW ROUTE: GET /voti/studente/:studenteId - Ottiene tutti i voti per uno studente
router.get('/studente/:studenteId', keycloak.protect(), (req, res) => {
    const studenteId = req.params.studenteId;
  
    if (!mongoose.Types.ObjectId.isValid(studenteId)) {
      return res.status(400).json({ message: 'studenteId non valido' });
    }
  
    Studente.findById(studenteId)
      .then(studente => {
        if (!studente) {
          // Mando subito la risposta e ritorno `null` per fermare la catena
          res.status(404).json({ message: 'Studente non trovato' });
          return null;
        }
        // Altrimenti ritorno la Promise di Voto.find(...)
        return Voto.find({ studenteId: studenteId });
      })
      .then(voti => {
        // Se voti è null, significa che sopra avevamo già risposto
        if (voti === null) return;
        // Altrimenti possiamo rispondere con i voti
        res.json(voti);
      })
      .catch(err => {
        console.error('Errore durante il recupero dei voti per studente:', err);
        res.status(500).json({ message: 'Errore del server' });
      });
});

module.exports = router;