const express = require("express")
const cors = require("cors")

// APP CONFIG
const app = express()
const PORT = process.env.PORT || 3001

// MIDDLEWARES
app.use(express.json())
app.use(cors())

// LISTENER
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})