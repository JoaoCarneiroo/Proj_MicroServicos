const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/authentication'); // O caminho depende da sua estrutura de pastas

const authController = require('../controllers/authController');

router.post('/login', authController.login);

router.post('/logout', authController.logout);


module.exports = router;
