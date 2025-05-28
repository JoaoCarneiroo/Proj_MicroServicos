const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const checkAuth = require('../middleware/authentication');

router.get('/', userController.mostrarUtilizadores);
router.post('/criar', userController.criarUtilizador);
router.get('/utilizador/:id', userController.mostrarUtilizadorID);
router.get('/utilizador', checkAuth, userController.mostrarUtilizadorAutenticado);
router.patch('/', checkAuth, userController.atualizarUtilizador);
router.delete('/', checkAuth, userController.apagarUtilizador);

module.exports = router;