// Load environment variables from a .env file
require('dotenv').config()

// Import necessary modules
const express = require('express')
const mongoose = require('mongoose')
const connectDB = require('./config/dbConnection')

// Define the port to be used or default to 3500
const PORT = process.env.PORT || 3500

// Create an instance of the Express application
const app = express()

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
