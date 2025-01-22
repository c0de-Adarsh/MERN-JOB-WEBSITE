import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
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
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        className="mt-14 font-bold  "

      />

    </BrowserRouter>
    </>
  )
}

export default App