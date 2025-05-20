const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/authentication');

const authController = require('../controllers/authController');

router.post('/login', authController.login);

router.post('/logout', checkAuth, authController.logout);


module.exports = router;
