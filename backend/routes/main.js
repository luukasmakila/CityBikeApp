// Since the application is so small and doesn't require
// alot of routes im defining all of them here.

const journey_page = async (req, res, next) => {
  res.status(201).json({"message": "in reality return the journies"})
}

const station_page = async (req, res, next) => {
  res.status(201).json({"message": "in reality return the stations"})
}

const single_station = async (req, res, next) => {
  res.status(201).json({"message": "in reality return single station info"})
}

module.exports = {
  journey_page, station_page, single_station
}
