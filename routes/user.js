const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();

router.post('/login', UserController.login);

router.get('/userChild', UserController.userChild);

module.exports = router;
