// Since the application is so small and doesn't require
// alot of routes im defining all of them here.

const Journeys = require("../models/journeys")
const Stations = require("../models/stations")

const journey_page = async (req, res, next) => {
  res.status(201).json({"message": "in reality return the journies"})
}

const station_page = async (req, res, next) => {
  // Query all stations
  try {
    const stations = await Stations.find({})
    res.status(201).json({"stations": stations})
  } catch (error) {
    res.status(500).json({"message": "An error occurred while fetching station data",
                          "error": error.message})
  }
}

const single_station = async (req, res, next) => {
  res.status(201).json({"message": "in reality return single station info"})
}

module.exports = {
  journey_page, station_page, single_station
}
