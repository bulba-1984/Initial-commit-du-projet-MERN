require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté ✅"))
  .catch(err => console.error("Erreur connexion MongoDB:", err));

// Routes CRUD
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json(newUser);
});

app.put('/users/:id', async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, 
req.body, { new: true });
  res.json(updatedUser);
});

app.delete('/users/:id', async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  res.json(deletedUser);
});

// Lancer le serveur
app.listen(PORT, () => console.log(`Serveur lancé sur 
http://localhost:${PORT}`));

