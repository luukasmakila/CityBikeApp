import axios from '../axios'
import React, { useEffect } from 'react'
import { useParams } from "react-router-dom"

const SingleStation = () => {
  const { id } = useParams()

  useEffect(() => {
    const getStationInfo = async () => {
      const result = await axios.get("/single_station", {params: {stationId: id}})
      console.log(result.data)
    }
    getStationInfo()
  }, [])

  return (
    <div>
      <h1>This is the single station page for station: {id}</h1>
    </div>
  )
}

export default SingleStation
