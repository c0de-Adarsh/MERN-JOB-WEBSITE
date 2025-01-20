import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import NavBar from './Components/NavBar'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App