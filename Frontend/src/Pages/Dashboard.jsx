import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Metadata from '../Components/Metadata'
import { RxCross1 } from 'react-icons/rx'

const Dashboard = () => {

    const [sideToggle , setSideToggle] = useState(false)

    const dispatch = useDispatch()

     const {loading , allJobs , allApplications, allUsers} = useSelector(state=> state.admin)
  return (
   <>
   <Metadata title='Dashboard' />
   <div className='bg-gray-900 min-h-screen pt-14 md:px-20 px-3 text-white'>
      

      <div className='pt-1 fixed left-0 z-20 pl-0'>
        <div onClick={(()=> setSideToggle(sideToggle))} className='blueCol cursor-pointer px-3 py-2'>
        {!sideToggle ? "Menu":<RxCross1 size={44}/>}
        </div>
      </div>


   </div>
   </>
  )
}

export default Dashboard