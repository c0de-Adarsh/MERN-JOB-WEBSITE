import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import NavBar from './Components/NavBar'
import Register from './Pages/Register'
import Login from './Pages/Login'
import About from './Pages/About'

const App = () => {
  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/about' element={<About/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App