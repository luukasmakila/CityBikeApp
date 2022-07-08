const express = require("express")
const cors = require("cors")
const router = require("./controllers/main")

// APP CONFIG
const app = express()
const PORT = process.env.PORT || 3001

// MIDDLEWARES
app.use(express.json())
app.use(cors())

//ENDPOINTS
app.use("/api", router)

// LISTENER
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
