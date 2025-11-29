require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Connexion MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connecté ✅"))
  .catch(err => console.error("Erreur connexion MongoDB:", err));

// Route test
app.get('/', (req, res) => {
  res.send("API MERN fonctionnelle !");
});

// Routes users
app.use('/users', require('./routes/usersRoute'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
