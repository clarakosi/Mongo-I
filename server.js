const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Friend = require('./Friends/FriendModel');

const PORT = 3000;
server = express();
server.use(bodyParser.json());


server.post('/api/friends', (req, res) => {
  const FriendInformation = req.body;
  const {firstName, lastName, age} = req.body;

  if (!firstName || !lastName || !age) {
    res.status(400).json({ errorMessage: "Please provide firstName, lastName and age for the friend." });
  } else if (!Number.isInteger(age) ||  (age < 1 || age > 120)) {
    res.status(400).json({ errorMessage: "Age must be a whole number between 1 and 120" });
  } else {
    const friend = new Friend(FriendInformation);
    
    friend.save()
      .then(friendAdded => {
        res.status(201).json(friendAdded);
      })
      .catch(error => {
        res.status(500).json({ error: "There was an error while saving the friend to the database" });
      })
  }
});








mongoose.connect('mongodb://localhost/friends')
  .then(db => {
    console.log(`Successfully connected to the ${db.connections[0].name} database`)
  })
  .catch(err => {
    console.error('Database Connection Failed')
  })


server.listen(PORT, err => {
  if (err) {
    console.log(`There was a problem starting your server on port: ${PORT}`)
  } else {
    console.log(`Server is running on port: ${PORT}`)
  }
})