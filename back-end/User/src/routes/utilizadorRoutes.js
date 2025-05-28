const express = require('express');
const router = express.Router();
const utilizadorController = require('../controllers/utilizadorController');


router.post('/verificar', utilizadorController.verificarCredenciais);

router.post('/', utilizadorController.mostrarUtilizadores);
router.get('/utilizador/:id', utilizadorController.mostrarUtilizadorID);
router.get('/utilizador', utilizadorController.mostrarUtilizadorAutenticado);

router.post('/criar', utilizadorController.criarUtilizador);
router.get('/confirmar', utilizadorController.confirmarEmail);
router.patch('/', utilizadorController.atualizarUtilizador);
router.delete('/', utilizadorController.apagarUtilizador);


module.exports = router;




