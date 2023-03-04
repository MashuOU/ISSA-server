const express = require('express');
const router = express.Router();
const TeacherController = require('../controllers/teacherController');

router.post('/login', TeacherController.login);

module.exports = router;
