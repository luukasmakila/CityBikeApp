const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const router = require("./controllers/main")
require('dotenv').config()


// APP CONFIG
const app = express()
const PORT = process.env.PORT || 3001
const MONGO_URI = process.env.MONGO_URI

// MIDDLEWARES
app.use(express.json())
app.use(cors())

//DATABASE CONFIGURATION
console.log("Connecting to MongoDB")
mongoose.connect(MONGO_URI)
  .then(res => {
    console.log("Successfully connected to MongoDB")
  })
  .catch(err => {
    console.log(`Connection to MongoDB failed with error: ${err}`)
  })

// API ENDPOINTS
app.use("/api", router)

// LISTENER
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
