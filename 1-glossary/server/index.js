require("dotenv").config();
const db = require('./db');
const express = require("express");
const path = require("path");


const app = express();

app.use(express.json());

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));


app.get('/terms', (req, res) => {
  db.readTerms()
    .then(terms => {
      res.status(200).send(terms);
    })
    .catch(err => {
      res.status(200)
      res.send(err);
    })
})
/****
 *
 *
 * Other routes here....
 *
 *
 */

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
