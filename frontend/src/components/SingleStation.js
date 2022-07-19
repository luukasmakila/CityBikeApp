import axios from '../axios'
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"

const SingleStation = () => {
  const { id } = useParams()
  const [stationInfo, setStationInfo] = useState({})
  const [language, setLanguage] = useState(true)

  useEffect(() => {
    const getStationInfo = async () => {
      const result = await axios.get("/single_station", {params: {stationId: id}})
      setStationInfo(result.data.info)
    }
    getStationInfo()
  }, [])

  return (
    <div>
      <div className='station-card'>
        <h2>City: <b>{language ? stationInfo.city : stationInfo.citySwedish }</b></h2>
        <h2>Station name: <b>{language ? stationInfo.name : stationInfo.namn }</b></h2>
        <h2>Station address: <b>{language ? stationInfo.address : stationInfo.addressSwedish }</b></h2>
        <h2>Journeys starting from this station: <b>{ stationInfo.startingJourneys }</b></h2>
        <h2>Journeys ending at this station: <b>{ stationInfo.endingJourneys }</b></h2>
        <h2>Average distance of journeys starting from this station: <b>{ stationInfo.averageDistanceCoveredStarting }</b></h2>
        <h2>Average distance of journeys ending at this station: <b>{ stationInfo.averageDistanceCoveredEnding }</b></h2>
      </div>
      <div className='language-button'>
        <button onClick={() => setLanguage(!language)}>
          Switch to {language ? "swedish" : "finnish"}
        </button>
      </div>
    </div>
  )
}

export default SingleStation
