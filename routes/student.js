const express = require('express')
const StudentController = require('../controllers/studentController')
const router = express.Router()

router.get('/student', StudentController.allStudents)
router.get('/student/:id', StudentController.studentById)

router.post('/student', StudentController.addStudent)
router.put('/student/:id', StudentController.editStudent)

router.delete('/student/:id', StudentController.deleteStudent)

module.exports = router