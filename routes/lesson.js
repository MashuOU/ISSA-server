const express = require('express')
const LessonController = require('../controllers/lessonController')
const router = express.Router()



router.get('/lessons', LessonController.allLessons)
router.get('/lesson/:id', LessonController.lessonById)

router.post('/lesson', LessonController.addLesson)
router.put('/lesson/:id', LessonController.editLesson)

router.delete('/lesson/:id', LessonController.deleteLesson)



module.exports = router