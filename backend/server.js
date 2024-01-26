// Load environment variables from a .env file
require('dotenv').config()
require('express-async-errors')

// Import necessary modules
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const { logEvents } = require('./middleware/logger')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/dbConnection')

// Define the port to be used or default to 3500
const PORT = process.env.PORT || 3500

// Create an instance of the Express application
const app = express()

// Connect to the database
connectDB()
const db = mongoose.connection

// Enable the use of a custom logger middleware to log request details
app.use(logger)

// Enable Cross-Origin Resource Sharing (CORS) for the Express app
app.use(cors(corsOptions))

// Enable the Express app to receive and parse JSON data from incoming requests
app.use(express.json())

// Enable the app to parse cookies received from incoming requests
app.use(cookieParser())

// Serve static files (such as CSS, images, etc.) from the 'public' directory
app.use('/', express.static(path.join(__dirname, 'public')))

// Set up routes for the application
app.use('/', require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))

// Handle 404 errors
app.all('*', require('./routes/notFound'))

// Enable the use of a custom error handling middleware
app.use(errorHandler)

// Event handler for database connection errors
mongoose.connection.once('error', err => {
    console.log(err)

    // Log MongoDB-specific error details
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})

// Event handler for successful database connection
db.once('open', () => {
    console.log('Connected to Database')

    // Start the Express server
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
