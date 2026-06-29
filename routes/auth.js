const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

// Page de connexion
router.get('/login', authController.loginPage);

// Connexion
router.post('/login', authController.login);

// Création d'un utilisateur
router.post('/register', authController.register);

// Déconnexion
router.get('/logout', authController.logout);

module.exports = router;