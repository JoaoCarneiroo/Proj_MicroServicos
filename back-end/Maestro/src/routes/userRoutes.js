const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.mostrarUtilizadores);
router.post('/criar', userController.criarUtilizador);
router.get('/utilizador/:id', userController.mostrarUtilizadorID);
router.get('/utilizador', userController.mostrarUtilizadorAutenticado);
router.patch('/:id', userController.atualizarUtilizador);
router.delete('/:id', userController.apagarUtilizador);

module.exports = router;