const mongoose = require("mongoose")

// Use local MongoDB if no .env file
const mongoUrl = process.env.MONGO_URL

const connectdb = async () => {
    try {
        await mongoose.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log("MongoDB connected successfully")
    } catch (error) {
        console.log("MongoDB connection failed:", error.message)
        process.exit(1) // Exit process if connection fails
    }
}

// Connect to MongoDB
connectdb()

// Handle connection events
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB')
})

mongoose.connection.on('error', (err) => {
    console.log('Mongoose connection error:', err)
})

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected')
})

// Close connection when process ends
process.on('SIGINT', async () => {
    await mongoose.connection.close()
    console.log('Mongoose connection closed')
    process.exit(0)
})

module.exports = mongoose.connection
