const express = require('express')
const router = express.Router()
// const { authentication } = require('../middlewares/authentication')
const user = require('./user')
const student = require('./student')
const teacher = require('./teacher')
const lesson = require('./lesson')
const activity = require('./activity')
const attendance = require('./attendance')
const score = require('./score')

router.use(teacher)
router.use(user)
// router.use(authentication)
router.use(lesson)
router.use(score)
router.use(student)
router.use(activity)
router.use(attendance)

router.get('/', (req, res) => {
    res.send(`
======================================
🚀  ISSA SERVER STATUS : CONNECTED 🚀
======================================
    `)
})

module.exports = router