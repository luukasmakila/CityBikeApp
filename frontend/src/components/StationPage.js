import React, { useState, useEffect } from 'react'
import axios from "axios"

const StationPage = () => {
  const [stations, setStations] = useState([])

  useEffect(() => {
    // Fetch data only on initial page laod
    const getStations = async () => {
      const result = await axios.get("http://localhost:3001/api/station_page")
      setStations(result.data.stations)
    }
    getStations()
  }, [])

  return (
    <div>
      {stations.map((station, idx) => (
        <div key={idx}>
          <p>{ station.Nimi }</p>
        </div>
      ))}
    </div>
  )
}

export default StationPage
