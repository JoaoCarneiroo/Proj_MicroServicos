const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.post('/criar', taskController.criarTarefa);
router.get('/', taskController.mostrarTarefaUtilizador);
router.patch('/:id', taskController.atualizarTarefa);
router.delete('/:id', taskController.apagarTarefa);

module.exports = router;
