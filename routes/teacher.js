const express = require('express');
const router = express.Router();
const TeacherController = require('../controllers/teacherController');
const { teacherAuth } = require('../middlewares/authentication');

router.post('/login', TeacherController.login);

router.use(teacherAuth);

router.post('/register', TeacherController.register);

module.exports = router;
