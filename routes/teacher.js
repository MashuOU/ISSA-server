const express = require('express')
const TeacherController = require('../controllers/teacherController')
const router = express.Router()

router.post('/teacher/login', TeacherController.login)

module.exports = router