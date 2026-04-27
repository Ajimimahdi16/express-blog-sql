const express = require('express');
const app = express();
const port = 3000;

// Importa il router della bacheca
const bachecaRouter = require('./routers/bacheca');
// Importa il middleware personalizzato
const middleware = require("./middlewars/middlewars");
// Importa il middleware per la gestione degli errori interno server 500
const middlewareTwo = require("./middlewars/middlewarstwo");
// Importa il middleware per la gestione delle rotte non trovate server 404
const middlewareThree = require("./middlewars/middlewarsThree");
// Middleware per servire i file statici dalla cartella "public"
app.use(express.static('public'));
// Middleware per il parsing del corpo delle richieste in formato JSON  
app.use(express.json());
// Middleware per il parsing del corpo delle richieste
app.use(middleware);



app.get('/', (req, res) => {
  res.send('server del blog');
});
// Usa il router della bacheca per tutte le rotte che iniziano con /bacheca
app.use('/bacheca', bachecaRouter);


// Middleware per la gestione delle rotte non trovate 404
app.use(middlewareThree);
// Middleware per la gestione degli errori interno del server 500 perche si mette infondo a tutte 
// le rotte e se c'è un errore in una rotta viene gestito da questo middleware
app.use(middlewareTwo);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});