const express = require('express');
const ActivityController = require('../controllers/activityController');
const router = express.Router();

router.get('/', ActivityController.allActivities);
router.get('/:id', ActivityController.activityById);

router.get('/', ActivityController.allActivities)
router.get('/:id', ActivityController.activityById)

router.post('/', ActivityController.addActivity)
router.put('/:id', ActivityController.editActivity)

module.exports = router;
router.delete('/:id', ActivityController.deleteActivity)
