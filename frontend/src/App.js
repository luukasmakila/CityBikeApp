import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import JourneyPage from './components/JourneyPage'
import StationPage from './components/StationPage'
import SingleStation from './components/SingleStation'
import "./App.css"

const App = () => {

  return (
    <div className='main'>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/journey_page" element={<JourneyPage/>}/>
          <Route path="/station_page" element={<StationPage/>}/>
          <Route path="/single_station/:id" element={<SingleStation/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
