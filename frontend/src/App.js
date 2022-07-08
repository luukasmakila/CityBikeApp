import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import JourneyPage from './components/JourneyPage'

const App = () => {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/journey_page" element={<JourneyPage/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
