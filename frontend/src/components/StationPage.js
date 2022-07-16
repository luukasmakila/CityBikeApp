import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "../axios"

const StationPage = () => {
  const [stations, setStations] = useState([])
  const [input, setInput] = useState("")
  const [showAll, setShowAll] = useState(true)

  const stationsToShow = showAll
    ? stations
    : stations.filter(station => station.Nimi.toLowerCase().startsWith(input))

  useEffect(() => {
    // Fetch data only on initial page laod
    const getStations = async () => {
      try {
        const result = await axios.get("/station_page")
        setStations(result.data.stations) 
      } catch (error) {
        console.log(error)
      }
    }
    getStations()
  }, [])

  const handleSearch = (e) => {
    setInput(e.target.value.toLowerCase())
    setShowAll(false)
  }

  return (
    <div>
      <p>Search by name</p>
      <input
        className='search'
        type="text"
        id="search"
        onChange={ handleSearch }
        placeholder="Search stations"
        name="search" 
      />
      {stationsToShow.map((station, idx) => (
        <div key={idx}>
          <Link to={`/single_station/${station._id}`}>
            <p>{ station.Nimi }</p>
          </Link>
        </div>
      ))}
    </div>
  )
}

export default StationPage
