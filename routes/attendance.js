const express = require('express')
const AttendanceController = require('../controllers/attendance')
const router = express.Router()

router.post('/attendance', AttendanceController.addAttendance)

module.exports = router