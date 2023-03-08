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
const classes = require('./class');
const publicRouter = require('./public');
const history = require('./history')
const { teacherAuth } = require('../middlewares/authentication');

router.use('/public', publicRouter)

router.use('/users', user);
router.use('/teachers', teacher);

router.use(teacherAuth);
router.use('/activities', activity);
router.use('/attendances', attendance);

router.use('/chats', chat);
router.use('/classes', classes);

router.use('/histories', history);
router.use('/lessons', lesson);
router.use('/schedules', schedule);
router.use('/scores', score);

router.use('/students', student);

router.get('/', (req, res) => {
  res.send(`
======================================
🚀  ISSA SERVER STATUS : CONNECTED 🚀
======================================
    `);
});

module.exports = router;
