// Since the application is so small and doesn't require
// alot of routes im defining all of them here.

const Journeys = require("../models/journeys")
const Stations = require("../models/stations")

const getJourneys = async (type, stationName) => {
  let result = []
  if(type === "starting"){
    result = await Journeys.find({
      departureStationName: stationName
    })
  } else if(type === "ending"){
    result = await Journeys.find({
      returnStationName: stationName
    })
  }
  return result
}

const calculateAverageDistance = async (journeys) => {
  let totalDistance = 0
  const length = journeys.length
  for(let i = 0; i < length; i += 1){
    totalDistance += parseInt(journeys[i].coveredDistance)
  }
  return totalDistance / length
}

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

  // Get the station info
  const stationId = req.query.stationId
  const station = await Stations.findById(stationId)

  // Get the arrays of journeys starting / ending at the station
  const startingJourneys = await getJourneys("starting", station.Nimi)
  const endingJourneys = await getJourneys("ending", station.Nimi)

  // Calculate average distances
  const averageDistanceStarting = await calculateAverageDistance(startingJourneys)
  const averageDistanceEnding = await calculateAverageDistance(endingJourneys)

  const stationInfo = {
    name: station.Nimi,
    namn: station.Namn,
    address: station.Osoite,
    addressSwedish: station.Adress,
    city: station.Kaupunki,
    citySwedish: station.Stad,
    startingJourneys: startingJourneys.length,
    endingJourneys: endingJourneys.length,
    averageDistanceCoveredStarting: averageDistanceStarting,
    averageDistanceCoveredEnding: averageDistanceEnding
  }

  res.status(201).json({"info": stationInfo})
}

module.exports = {
  journey_page, station_page, single_station
}
