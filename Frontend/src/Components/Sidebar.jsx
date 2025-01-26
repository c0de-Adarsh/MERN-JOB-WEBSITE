import React from 'react'
import {motion} from 'framer-motion'
import {Link} from 'react-router-dom'
import {MdOutlineCreateNewFolder, MdOutlineDashboard, MdOutlineFeaturedPlayList} from 'react-icons/md'
import {BsBriefcase} from 'react-icons/bs'
import {AiOutlineUser} from 'react-icons/ai'

const Sidebar = ({sideToggle}) => {

    const sidebarVariants = {
        hidden:{
            x: '-100%',
        },
        visible:{
           x:0,
        },
    }
  return (
   <>
   <motion.div
   className={`${sideToggle ? 'flex' : 'hidden'} flex flex-col bg-gray-900 min-h-screen md:w-72 w-64 shadow-lg shadow-gray-700 border-r border-gray-800 z-10 fixed left-0`}
   variants={sidebarVariants}
   initial='hidden'
   animate={sideToggle ? 'visible':'hidden'}
   transition={{duration: 0.1 , ease:'easeIn'}}
   >

    <div></div>

    <div className='flex justify-center md:pl-12 pl-3 flex-col gap-14 items-center pt-20'>
    
    <div className='flex justify-center items-center gap-2'>
        <Link to='/admin/dashboard'><MdOutlineDashboard className='flex justify-center blueCol items-center gap-2 px-4 py-1' size={20}/>Dashboard</Link>
    </div>
    
     
     <div className='flex justify-center items-center gap-2'>
        <Link to='/admin/postjob' className='flex justify-center blueCol items-center gap-2 px-4 py-1'><MdOutlineCreateNewFolder size={20} />     Post Job</Link>
     </div>

     <div className='flex justify-center items-center gap-2'>
        <Link to='/admin/alljobs'><BsBriefcase size={20} className='flex justify-center items-center gap-2 px-4 py-1'/>View All Jobs</Link>
     </div>


     <div className='flex justify-center items-center gap-2'>
     <Link to='/admin/allApplication'><MdOutlineFeaturedPlayList size={20} className='flex justify-center items-center gap-2 px-4 py-1'/>View All Application</Link>
     </div>

     <div className='flex justify-center items-center gap-2'>
        <Link to='/admin/allUsers'><AiOutlineUser size={20} className='flex justify-center items-center gap-2 px-4 py-1'/>View All Users</Link>
     </div>

    </div>

   </motion.div>
   
   </>
  )
}

export default Sidebar