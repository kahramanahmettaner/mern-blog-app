// Load environment variables from a .env file
require('dotenv').config()

// Import necessary modules
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const cookieParser = require('cookie-parser')
const connectDB = require('./config/dbConnection')

// Define the port to be used or default to 3500
const PORT = process.env.PORT || 3500

// Create an instance of the Express application
const app = express()

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

// Handle 404 errors
app.all('*', require('./routes/notFound'))

// Connect to the database
connectDB()
const db = mongoose.connection

// Event handler for database connection errors
db.on('error', (error) => console.log(error))

// Event handler for successful database connection
db.once('open', () => {
    console.log('Connected to Database')

    // Start the Express server
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
