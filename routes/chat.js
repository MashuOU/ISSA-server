const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');


router.post('/', chatController.postMessage);
router.get('/:fromId', chatController.getAllUserRelatedToSender);
router.get('/:from/:to', chatController.getMessageHistory);


module.exports = router;
