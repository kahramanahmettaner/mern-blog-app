const express = require('express')
const router = express.Router()
const path = require('path')

// Define a route that matches '/' or '/index.html' or '/index' and serves the corresponding HTML file
router.get('^/$|/index(.html)?', (req, res) => {
    // Send the 'index.html' file as the response
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'))
})

module.exports = router