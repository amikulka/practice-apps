require("dotenv").config();
const express = require("express");
const path = require("path");
const sessionHandler = require("./middleware/session-handler");
const logger = require("./middleware/logger");

// Establishes connection to the database on server start
const db = require("./db");

const app = express();

// Adds `req.session_id` based on the incoming cookie value.
// Generates a new session if one does not exist.
app.use(sessionHandler);

// Logs the time, session_id, method, and url of incoming requests.
app.use(logger);

app.use(express.json());

// Serves up all static and generated assets in ../client/dist.
app.use(express.static(path.join(__dirname, "../client/dist")));




app.post('/session', (req, res) => {
  console.log(req.session_id);
  //call setSessionId on database
  db.addSession(req.session_id)
    .then(() => {
      res.status(200).send();
    })
    .catch(err => {
      console.log(err);
      res.status(500).send();
    });
});

app.get('/customer', (req, res) => {
  db.getCustomer(req.session_id)
    .then((customerInfo) => {
      res.status(200).send(customerInfo)
    })
    .catch(err => {
      console.log(err);
      res.status(500).send();
    })
})

app.put('/updateLogin', (req, res) => {
  console.log(req.body);
  db.updateLogin(req.body)
    .then(() => {
      res.status(201).send();
    })
    .catch(err => {
      console.log(err);
      res.status(500).send();
    })
})

app.put('/updateAddress', (req, res) => {
  db.updateAddress(req.body)
    .then(() => {
      res.status(201).send();
    })
    .catch(err => {
      console.log(err);
      res.status(500).send();
    })
})

app.put('/updateBilling', (req, res) => {
  db.updateBilling(req.body)
    .then(() => {
      res.status(201).send();
    })
    .catch(err => {
      console.log(err);
      res.status(500).send();
    })
})

app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
