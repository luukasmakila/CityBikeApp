import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav>
      <p className='link'><Link to="/">Home</Link></p>
      <p className='link'><Link to="/journey_page">Journeys</Link></p>
      <p className='link'><Link to="/station_page">Stations</Link></p>
      <p className='link'><Link to="/">Add station</Link></p>
    </nav>
  )
}

export default Header
