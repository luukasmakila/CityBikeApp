const mongoose = require("mongoose")

const stationSchema = new mongoose.Schema({
  primaryKey: { type: Number },
  stations: [{
    fid: { type: Number },
    ID: { type: Number },
    Nimi: { type: String },
    Namn: { type: String },
    Name: { type: String },
    Osoite: { type: String },
    Adress: { type: String },
    Kaupunki: { type: String },
    Stad: { type: String },
    Operaattor: { type: String },
    Kapasiteet: { type: Number },
    x: { type: Number },
    y: { type: Number }
  }]
})

const Stations = mongoose.model("Stations", stationSchema)
module.exports = Stations
