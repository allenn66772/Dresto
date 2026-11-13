import React from 'react'
import LandingPage from './common/Landingpage'
import { Route, Routes } from 'react-router-dom'
import AuthCard from './AuthCard'

function App() {
  return (
    <>
    {/* <LandingPage/> */}
    <Routes>
      <Route path="/register" element={<AuthCard />} />
    </Routes>
    </>
  )
}

export default App