const mongoose = require('mongoose')

const journeysSchema = new mongoose.Schema({
  departure: { type: String },
  return: { type: String },
  departureStationID: { type: String },
  departureStationName: { type: String },
  returnStationID: { type: String },
  returnStationName: { type: String },
  coveredDistance: { type: String },
  duration: { type: String }
})

const Journeys = mongoose.model("Journeys", journeysSchema)
module.exports = Journeys
