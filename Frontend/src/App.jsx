import React, { useEffect } from 'react'
import {BrowserRouter, Navigate, Outlet, Route, Routes} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './Components/NavBar'
import Register from './Pages/Register'
import Login from './Pages/Login'
import About from './Pages/About'
import Home from './Pages/Home';
import { useDispatch, useSelector } from 'react-redux';
import Dashboard from './Pages/Dashboard';
import CreateJob from './Pages/CreateJob';
import { logOrNot, me } from './Actions/UserAction';
import { getAlljobs } from './Actions/JobAction';
import NotFound from './Pages/NotFound';
import UnAuthorized from './Pages/UnAuthorized';

const App = () => {

  const dispatch = useDispatch()

  const {isLogin} = useSelector(state=> state.user)

   useEffect(()=>{
     dispatch(me())
   },[isLogin,dispatch])

   useEffect(()=>{
    const LogOrNot = () =>{
      dispatch(logOrNot())
      dispatch(getAlljobs())
    }
    LogOrNot()
   },[])
 
    const ProtectedRoute = ({isAllowed , redirectPath = '/unauthorized', children}) =>{
       if(!isAllowed){
        return <Navigate to={redirectPath} replace />
       }

       return children ? children : <Outlet/>
    }
  return (
    <>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/about' element={<About/>}/>

      <Route element={<ProtectedRoute isAllowed={['applicant','admin'].includes(localStorage.getItem('role'))}/>} />

      <Route element={<ProtectedRoute isAllowed={"admin" === localStorage.getItem('role')} />}>
      
      <Route path='/admin/dashboard' element={<Dashboard/>} />
      <Route path='/admin/postjob' element={<CreateJob/>} />

      <Route path='*' element={<NotFound />} />
        <Route path='/unauthorized' element={<UnAuthorized />} />
      </Route>
      
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