const express = require('express')
const ActivityController = require('../controllers/activityController')
const router = express.Router()

router.get('/activities', ActivityController.allActivities)
router.get('/activity/:id', ActivityController.activityById)

router.post('/activity', ActivityController.addActivity)
router.put('/activity/:id', ActivityController.editActivity)

router.delete('/activity/:id', ActivityController.deleteActivity)

module.exports = router