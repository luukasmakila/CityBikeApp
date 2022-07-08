const express = require("express")
const router = express.Router()

const { journey_page } = require("../routes/main")

router.route("/journey_page").get(journey_page)

module.exports = router
