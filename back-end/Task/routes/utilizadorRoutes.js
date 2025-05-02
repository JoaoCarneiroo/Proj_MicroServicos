const express = require('express');
const router = express.Router();
const utilizadorController = require('../controllers/utilizadorController');


router.get('/', utilizadorController.mostrarUtilizadores);
router.post('/', utilizadorController.criarUtilizador);




module.exports = router;
