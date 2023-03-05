const express = require('express');
const schedule = require('../controllers/scheduleController');
const router = express.Router();

router.post('/', schedule.addSchedule);


module.exports = router;