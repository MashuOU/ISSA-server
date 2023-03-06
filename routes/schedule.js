const express = require('express');
const schedule = require('../controllers/scheduleController');
const router = express.Router();

router.post('/', schedule.addSchedule);
router.get('/', schedule.schedules);


module.exports = router;

