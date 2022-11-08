require('dotenv').config();
const express = require('express');
const db = require('./db');

const app = express();

app.use(express.json());

const port = process.env.APP_PORT;

db.connect((err) => {
  if (err) {
    console.error(err)
  } else {
    console.log('Connect to database');
  }
})

const getAllKnights = (req, res) => {
  db.promise().query("SELECT * FROM knight")
    .then(result => res.send(result[0]))
    .catch((err) => res.status(404).send(err))
};

const addKnight = (req, res) => {
  const knight = req.body.firstname;
  db.promise().query("INSERT INTO knight (firstname) VALUES (?)", [knight]).then(res.send(knight))
};

app.get('/knights', getAllKnights);

app.post('/knights', addKnight);


app.listen(port, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('server listening on port ', port);
  }
});