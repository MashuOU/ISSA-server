const express = require('express');
const StudentController = require('../controllers/studentController');
const router = express.Router();

router.get('/', StudentController.allStudents);
router.get('/:id', StudentController.studentById);

router.post('/', StudentController.addStudent);
router.put('/:id', StudentController.editStudent);

router.delete('/:id', StudentController.deleteStudent);

module.exports = router;
