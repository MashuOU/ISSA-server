const express = require('express');
const router = express.Router();
const TeacherController = require('../controllers/teacherController');
const { userAuth } = require('../middlewares/authentication');

router.post('/login', TeacherController.login);

router.use(userAuth);

router.post('/register', TeacherController.register);

module.exports = router;
