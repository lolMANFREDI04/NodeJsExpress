// db/mongodb.js (ES5, Mongoose 7)
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/testdb';

function connectDB(callback) {
    // Non passiamo pi� la callback direttamente a connect()
    mongoose.connect(MONGODB_URI)
        .then(function () {
            console.log("Connesso a MongoDB:", MONGODB_URI);
            return callback(null); // callback con err=null
        })
        .catch(function (err) {
            console.error("Errore di connessione a MongoDB:", err);
            return callback(err);
        });
}

module.exports.connectDB = connectDB;
