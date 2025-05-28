const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const checkAuth = require('../middleware/authentication');

router.post('/verificar', authController.login);
router.post('/logout', checkAuth, authController.logout);

module.exports = router;
