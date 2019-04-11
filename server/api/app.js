const express = require('express')
const router = express.Router()
const events = require('./json')

router.get('/', (req, res) => {
    res.send(JSON.stringify(events))
})

module.exports = router