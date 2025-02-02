// routes/studenti.js

const express = require('express');

const mongoose = require('mongoose'); // Importa mongoose per la validazione

const router = express.Router();

const keycloak = require("#middlewares/keycloak");

// Import Mongoose model
const Voto = require('#models/Voto');
const Studente = require('#models/Studente');


// GET /studente/all - Ottiene tutti gli studenti
router.get('/all', [keycloak.protect()],(req, res) => {
    Studente.find({})
        .then(function (studenti) {
            res.json(studenti);
        })
        .catch(function (err) {
            console.error('Errore durante il recupero degli studenti:', err);
            res.status(500).json({ message: 'Errore del server' });
        });
});


// GET /studente/:id - Ottiene uno studente per ID
router.get('/:id', [keycloak.protect()],(req, res) => {
    var id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'ID studente non valido' });
    }

    Studente.findById(id)
        .then(function (studente) {
            if (!studente) {
                return res.status(404).json({ message: 'Studente non trovato' });
            }
            res.json(studente);
        })
        .catch(function (err) {
            console.error('Errore durante il recupero dello studente:', err);
            res.status(500).json({ message: 'Errore del server' });
        });
});


// POST /studente - Creazione di uno studente
router.post('/', [keycloak.protect()],(req, res) => {
    console.log('Richiesta POST /studente con body:', req.body); // Logging del body

    var nuovoStudente = new Studente({
        nome: req.body.nome,
        cognome: req.body.cognome,
        classe: req.body.classe
    });

    nuovoStudente.save()
        .then(function (studenteSalvato) {
            res.status(201).json(studenteSalvato);
        })
        .catch(function (err) {
            console.error('Errore durante la creazione dello studente:', err);
            res.status(400).json({ message: 'Errore durante la creazione dello studente' });
        });
});



// PUT /studente/:id - Aggiornamento di uno studente esistente
router.put('/:id', [keycloak.protect()],(req, res) => {
    var id = req.params.id;
    var update = {
        nome: req.body.nome,
        cognome: req.body.cognome,
        classe: req.body.classe
    };

    Studente.findByIdAndUpdate(id, update, { new: true })
        .then(function (studenteAggiornato) {
            if (!studenteAggiornato) {
                return res.status(404).json({ message: 'Studente non trovato' });
            }
            res.json(studenteAggiornato);
        })
        .catch(function (err) {
            console.error('Errore durante l\'aggiornamento dello studente:', err);
            res.status(400).json({ message: 'Errore durante l\'aggiornamento dello studente' });
        });
});


// DELETE /studente/:id - Eliminazione di uno studente esistente
router.delete('/:id', keycloak.protect(), async (req, res) => {
    try {
      const id = req.params.id;
  
      // 1. Elimina lo studente
      const studenteEliminato = await Studente.findByIdAndDelete(id);
      if (!studenteEliminato) {
        return res.status(404).json({ message: 'Studente non trovato' });
      }
  
      // 2. Elimina tutti i voti di quello studente
      await Voto.deleteMany({ studenteId: id });
  
      // 3. Rispondi
      return res.json({ message: 'Studente e i suoi voti eliminati correttamente' });
  
    } catch (err) {
      console.error('Errore durante l\'eliminazione dello studente o dei voti:', err);
      return res.status(400).json({ message: 'Errore durante l\'eliminazione dello studente' });
    }
});
  


module.exports = router;