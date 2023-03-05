const express = require('express');
const router = express.Router();
const public = require('./public');
const user = require('./user');
const student = require('./student');
const teacher = require('./teacher');
const lesson = require('./lesson');
const activity = require('./activity');
const attendance = require('./attendance');
const score = require('./score');
const classes = require('./class');
const chat = require('./chat');
const schedule = require('./schedule');

const { teacherAuth } = require('../middlewares/authentication');


router.use('/users', user);
router.use('/public', public)
router.use('/teachers', teacher);

router.use(teacherAuth);

router.use('/students', student);
router.use('/class', classes);
router.use('/lessons', lesson);
router.use('/scores', score);
router.use('/activities', activity);
router.use('/attendances', attendance);
router.use('/chats', chat);
router.use('/schedule', schedule);

router.get('/', (req, res) => {
  res.send(`
======================================
🚀  ISSA SERVER STATUS : CONNECTED 🚀
======================================
    `);
});

module.exports = router;
