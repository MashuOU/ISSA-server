const express = require('express');
const router = express.Router();
const classController = require('../controllers/classController');

router.get('/', classController.fetchAllClass);
router.get('/:classId', classController.fetchClassById);

module.exports = router;
