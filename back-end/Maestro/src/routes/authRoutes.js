const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/verificar', authController.login);
router.post('/logout', authController.logout);

module.exports = router;
