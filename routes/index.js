const express = require('express')
const router = express()
// const { authentication } = require('../middlewares/authentication')











router.get('/', (req, res) => {
    res.send(`
===============================================
    🚀  ISSA SERVER STATUS : CONNECTED 🚀
===============================================
    `)
})

module.exports = router