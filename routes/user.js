const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();
const { userAuth } = require('../middlewares/authentication');

router.post('/login', UserController.login);
router.use(userAuth);

router.get('/userChild', UserController.userChild);

module.exports = router;
