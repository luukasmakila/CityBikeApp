const express = require("express")
const router = express.Router()

const { journey_page, station_page, single_station } = require("../routes/main")

router.route("/journey_page").get(journey_page)
router.route("/station_page").get(station_page)
router.route("/single_station").get(single_station)

module.exports = router
