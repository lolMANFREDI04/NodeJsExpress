// file: routes/index.js

const express = require('express');
const path = require('path');
const router = express.Router();

router.get('', (req, res) => {
  const filePath = path.join(__dirname, '..', 'README.md');

  res.sendFile(filePath, err => {
    if (err) {
      console.error('Errore nell\'invio del file:', err);
      return res.status(err.status || 500).send('Errore nel recupero del file README.md\n\nDi deguito il link:\thttps://github.com/lolMANFREDI04/NodeJsExpress/blob/main/README.md');
    }
  });
});

module.exports = router;