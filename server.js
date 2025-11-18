// server.js (Dans le répertoire racine /mon-mern-app)
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const apiRoutes = require('./api/routes/apiRoutes').default;

// 1. Charger les variables d'environnement seulement en local
// Azure définit déjà NODE_ENV à 'production'
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connexion à MongoDB réussie.'))
  .catch(err => console.error('Erreur de connexion à MongoDB:', err));

app.use('/api', apiRoutes);
if (process.env.NODE_ENV === 'production') {
  const frontendPath = path.join(__dirname, 'client', 'build');
  app.use(express.static(frontendPath));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(frontendPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Serveur Express démarré sur le port ${PORT}`);
});