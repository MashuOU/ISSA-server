const express = require('express');
const router = express.Router();
const user = require('./user');
const student = require('./student');
const teacher = require('./teacher');
const lesson = require('./lesson');
const activity = require('./activity');
const attendance = require('./attendance');
const score = require('./score');
const chat = require('./chat');
const schedule = require('./schedule');

router.use('/teachers', teacher);
router.use('/users', user);
router.use('/students', student);
router.use('/lessons', lesson);
router.use('/scores', score);
router.use('/activities', activity);
router.use('/attendances', attendance);
router.use('/schedules', schedule);
router.use('/chats', chat);

router.get('/', (req, res) => {
  res.send(`
======================================
🚀  ISSA SERVER STATUS : CONNECTED 🚀
======================================
    `);
});

module.exports = router;
