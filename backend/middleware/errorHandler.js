const { logEvents } = require('./logger')

// Error handling middleware to log errors and send an appropriate response
const errorHandler = (err, req, res, next) => {
    // Log error details
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}\t`, 'errLog.log')
    console.log(err.stack)

    // Set the response status code to the error status or default to 500 (server error)
    const status = res.statusCode ? res.statusCode : 500
    res.status(status)

    // Send a JSON response with the error message
    res.json({ message: err.message })

    // Call the next middleware in the chain
    next()
}

module.exports = errorHandler
