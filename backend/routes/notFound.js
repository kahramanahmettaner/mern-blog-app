const express = require('express')
const router = express.Router()
const path = require('path')

router.get('*', (req, res) => {
    res.status(404)

    // Check the 'Accept' header to respond with HTML, JSON, or plain text
    if (req.accepts('html')) {
       res.sendFile(path.join(__dirname, '..', 'views', '404.html'))
    } else if (req.accepts('json')) {
       res.json({ message: '404 Not Found' })
    } else {
       res.type('txt').send('404 Not Found');
    }
})

module.exports = router