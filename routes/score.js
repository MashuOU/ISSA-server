const express = require('express')
const ScoreController = require('../controllers/scoreController')
const router = express.Router()

router.post('/score', ScoreController.addScore)

module.exports = router