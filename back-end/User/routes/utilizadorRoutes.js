const express = require('express');
const router = express.Router();
const utilizadorController = require('../controllers/utilizadorController');


router.post('/verificar', utilizadorController.verificarCredenciais);
router.post('/logout', utilizadorController.logout);

router.post('/', utilizadorController.mostrarUtilizadores);
router.get('/utilizador/:id', utilizadorController.mostrarUtilizadorID);
router.get('/utilizador', utilizadorController.mostrarUtilizadorAutenticado);

router.post('/criar', utilizadorController.criarUtilizador);
router.patch('/:id', utilizadorController.atualizarUtilizador);
router.delete('/:id', utilizadorController.apagarUtilizador);


module.exports = router;




