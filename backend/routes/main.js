// Since the application is so small and doesn't require
// alot of routes im defining all of them here.

const journey_page = async (req, res, next) => {
  res.status(201).json({"message": "in reality return the journies"})
}

module.exports = {
  journey_page
}
