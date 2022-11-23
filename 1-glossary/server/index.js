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
});

app.put('/terms', (req, res) => {
  console.log(req.body);
  let {_id, term, definition} = req.body;
  db.updateTerm(_id, term, definition)
    .then(() => {
      res.status(202).send();
    })
    .catch(err => {
      res.status(500).send(err);
    })

});

app.post('/terms', (req, res) => {
  let {term, definition} = req.body;
  db.addTerm(term, definition)
    .then(() => {
      res.status(200).send();
    })
    .catch(err => {
      res.status(500).send(err);
    });
})

app.delete('/terms', (req, res) => {
  let {_id} = req.body;
  db.deleteTerm(_id)
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      res.status(500).send(err);
    });
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
