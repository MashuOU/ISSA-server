const express = require('express');
const router = express.Router();
const TeacherController = require('../controllers/teacherController');

router.post('/login', TeacherController.login);


router.post('/register', TeacherController.register);

module.exports = router;
