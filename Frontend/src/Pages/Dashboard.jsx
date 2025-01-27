import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import Metadata from '../Components/Metadata'
import { RxCross1 } from 'react-icons/rx'
import Countup from 'react-countup'
import Sidebar from '../Components/Sidebar'
import Loader from '../Components/Loader'
import BarChart from '../Components/BarChart'


const Dashboard = () => {

    const [sideToggle , setSideToggle] = useState(false)

    const dispatch = useDispatch()

     const {loading , allJobs , allApplications, allUsers} = useSelector(state=> state.admin)

     useEffect(()=>{
        
     })
  return (
   <>
   <Metadata title='Dashboard' />
   <div className='bg-gradient-to-b from-purple-900 to-blue-500 min-h-screen pt-14 md:px-20 px-3 text-white'>
      

      <div className='pt-1 fixed left-0 z-20 pl-0'>
        <div onClick={(()=> setSideToggle(!sideToggle))} className='blueCol cursor-pointer px-3 py-2'>
        {!sideToggle ? "Menu":<RxCross1 size={44}/>}
        </div>
      </div>

      <Sidebar sideToggle={sideToggle}/>
      <div className='w-full'>
       {loading ?
        
        <Loader/>
        :
       <>
       <div className='flex justify-center items-center text-4xl pt-8'>
        <p className='border-b pb-3 border-gray-600 text-center font-medium w-1/2'>Dashboard</p>
       </div>


       <div className='gird md:grid-cols-3 grid-cols-1 md:gap-0 gap-16 md:pt-28 pt-16 pb-28'>
        <div className='flex flex-col gap-3 justify-center items-center'>


          <div className='text-8xl'><Countup start={0} end={allUsers && allUsers.length}/></div>
          <p className='text-2xl'>Users</p>
        </div>

        <div className='flex flex-col justify-center items-center gap-3'>
        <div className='text-8xl'><Countup start={0} end={allJobs && allJobs.length} /></div>
        <p className='text-2xl'>Jobs</p>
        </div>


        <div className='flex flex-col justify-center items-center gap-3'>
          <div className='text-8xl'><Countup start={0} end={allApplications && allApplications.length} /></div>
          <p className='text-2xl'>Applications</p>
        </div>


       </div>

       <div className='flex items-center justify-center pb-28'>
        <div className='w-[27rem] md:px-0 px-6 h-[27rem]'>
          <BarChart applications={allApplications && allApplications.length} users={allUsers && allUsers.length}/>
        </div>
       </div>

       </>
       }
   </div>
   </div>
   </>
  )
}

export default Dashboard