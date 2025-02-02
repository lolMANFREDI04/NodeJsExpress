// file: index.js

require('dotenv').config();
const cors = require('cors');
const express = require('express');
const keycloak = require('#middlewares/keycloak'); // Keycloak
const db = require('#db/mongodb');

const port = process.env.PORT;

// Routes
const votiRouter = require('#routes/voti');
const studentiRouter = require('#routes/studenti');

const errorHandler = (error, req, res, next) => {
  const status = error.status || 422;
  res.status(status).send(error.message);
}

const app = express();

app.use(keycloak.middleware());
app.use(express.json());
app.use(cors());

// Register routes
app.use('/voti', votiRouter);
app.use('/studente', studentiRouter);

app.use(errorHandler);

// Connetti a MongoDB PRIMA di avviare il server
db.connectDB(function (err) {
    if (err) {
        console.error("Connessione MongoDB fallita:", err);
        process.exit(1);
    } else {
        app.set('port', port || 3000);
        var server = app.listen(app.get('port'), function () {
            console.log('Server in ascolto sulla porta ' + server.address().port);
        });
    }
});

// app.listen(port, () => {
//   console.log(`Server Started at ${port}`);
// });