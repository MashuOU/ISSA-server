const express = require('express');
const AttendanceController = require('../controllers/attendance');
const router = express.Router();

router.post('/', AttendanceController.addAttendance);

module.exports = router;
