const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const checkAuth = require('../middleware/authentication');

router.post('/criar', checkAuth, taskController.criarTarefa);
router.get('/', checkAuth, taskController.mostrarTarefaUtilizador);
router.patch('/:id', checkAuth, taskController.atualizarTarefa);
router.delete('/:id', checkAuth, taskController.apagarTarefa);

module.exports = router;
