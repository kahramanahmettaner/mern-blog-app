const { format } = require('date-fns')
const { v4: uuid } = require('uuid')
const fs = require('fs')
const fsPromises = require('fs').promises
const path = require('path')

// Directory to store logs
const LOGS_DIR = path.join(__dirname, '..', 'logs');

// Function to log events with a timestamp, unique identifier, and custom message
const logEvents = async (message, logFileName) => {
    // Format the current date and time
    const dateTime = format(new Date(), 'yyyyMMdd\tHH:mm:ss')

    // Create a log entry with timestamp, unique identifier, and message
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`  // \t helps to import logs in Excel, etc.

    try {
        // Check if the logs directory exists; if not, create it
        if (!fs.existsSync(LOGS_DIR)) {
            await fsPromises.mkdir(LOGS_DIR)
        }
        // Append the log entry to the specified log file
        await fsPromises.appendFile(path.join(LOGS_DIR, logFileName), logItem)
    } catch (err) {
        console.log(err)
    }
}

// Middleware function to log request information and call the next middleware
const logger = (req, res, next) => {
    // Log request details, including method, URL, and origin
    logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, 'reqLog.log')
    console.log(`${req.method} ${req.path}`)

    // Call the next middleware in the chain
    next()
}

module.exports = { logEvents, logger }
