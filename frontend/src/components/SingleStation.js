import axios from '../axios'
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"

const SingleStation = () => {
  const { id } = useParams()
  const [stationInfo, setStationInfo] = useState({})

  useEffect(() => {
    const getStationInfo = async () => {
      const result = await axios.get("/single_station", {params: {stationId: id}})
      setStationInfo(result.data.info)
    }
    getStationInfo()
  }, [])

  return (
    <div>
      <h2>Station name: <b>{ stationInfo.name }</b></h2>
      <h2>Station address: <b>{ stationInfo.address }</b></h2>
      <h2>Journeys starting from this station: <b>{ stationInfo.startingJourneys }</b></h2>
      <h2>Journeys anding at this station: <b>{ stationInfo.endingJourneys }</b></h2>
      <h2>Average distance of journeys starting from this station: <b>{ stationInfo.averageDistanceCoveredStarting }</b></h2>
      <h2>Average distance of journeys ending at this station: <b>{ stationInfo.averageDistanceCoveredEnding }</b></h2>
    </div>
  )
}

export default SingleStation
