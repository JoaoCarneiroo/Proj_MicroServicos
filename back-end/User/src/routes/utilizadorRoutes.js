const express = require('express');
const router = express.Router();
const utilizadorController = require('../controllers/utilizadorController');
const checkAuth = require('../middleware/authentication');


router.post('/verificar', utilizadorController.verificarCredenciais);

router.post('/', utilizadorController.mostrarUtilizadores);
router.get('/utilizador/:id', utilizadorController.mostrarUtilizadorID);
router.get('/utilizador', checkAuth, utilizadorController.mostrarUtilizadorAutenticado);

router.post('/criar', utilizadorController.criarUtilizador);
router.get('/confirmar', utilizadorController.confirmarEmail);
router.patch('/:id', checkAuth, utilizadorController.atualizarUtilizador);
router.delete('/:id', checkAuth, utilizadorController.apagarUtilizador);


module.exports = router;




