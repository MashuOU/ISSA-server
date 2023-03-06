const express = require('express');
const AttendanceController = require('../controllers/attendance');
const router = express.Router();

router.post('/', AttendanceController.addAttendance);
router.put('/:id', AttendanceController.editAttendance);


module.exports = router