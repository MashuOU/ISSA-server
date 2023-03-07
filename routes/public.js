const express = require('express');
const router = express.Router();
const LessonController = require('../controllers/lessonController');
const ActivityController = require('../controllers/activityController');
const chatController = require('../controllers/chatController');

const { userAuth } = require('../middlewares/authentication');

// student n parent authentication
router.use(userAuth);
router.get('/lesson', LessonController.allLessons);
router.get('/lesson/:id', LessonController.lessonById);
router.get('/student/lesson/:ClassId', LessonController.studentlessondetail);

router.get('/activity', ActivityController.allActivities);
router.get('/activity/:id', ActivityController.activityById);



module.exports = router