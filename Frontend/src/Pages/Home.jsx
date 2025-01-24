import React, { useState } from 'react'
import Metadata from '../Components/Metadata'
import { Link } from 'react-router'
import {useDispatch, useSelector} from 'react-redux'

const Home = () => {
       
       const [num , setNum] = useState()
       const dispatch = useDispatch()
       const {loading , allJobs} = useSelector(state=> state.job)
       const [jobs , setJobs] = useState([])

   const data = [
     {
      link:"/JOB/1.png"
     },
     {
      link:"/JOB/2.jpg"
     },
     {
      link:"/JOB/3.jpg"
     },
     {
      link:"/JOB/4.jpg"
     },
     {
      link:"/JOB/5.webp"
     },
     {
      link:"/JOB/6.jpg"
     },
     {
      link:"/JOB/7.webp"
     },
     {
      link:"/JOB/23.png"
     },
     {
      link:"/JOB/9.png"
     },
     {
      link:"/JOB/10.jpeg"
     },
     {
      link:"/JOB/11.png"
     },
     {
      link:"/JOB/12.jpg"
     },
     {
      link:"/JOB/13.jpg"
     },
     {
      link:"/JOB/14.jpg"
     },
     {
      link:"/JOB/15.jpg"
     },
     {
      link:"/JOB/16.png"
     },
     {
      link:"/JOB/17.jpg"
     },
     {
      link:"/JOB/18.png"
     },
     {
      link:"/JOB/19.jpg"
     },
     {
      link:"/JOB/20.webp"
     }, 
     {
      link:"/JOB/21.png"
     }, 
     {
      link:"/JOB/22.png"
     }
     

   ]
  return (
   <>
   <Metadata title='JobTrail'/>
   <div className='min-h-screen bg-gray-900 flex text-white px-3 pt-14 md:px-20'>
    <div className='w-full flex flex-col pt-28 justify-start items-center gap-4'>


    <div className='flex md:flex-row flex-col items-center justify-center md:gap-10 gap-1'>
      <div className='text-6xl md:text-8xl titleT font-medium'>JOBTRAIL</div>
      <div className='flex justify-center items-center pt-1'>
        <Link className='font-semibold md:text-2xl text-lg blueCol md:py-3 py-2 px-6 md:px-10 rounded-md'>Browser Jobs</Link>
      </div>
    </div>

    
    <div >
      <p className='md:text-xl text-sm'>Step Into Your <span className='text-yellow-400'>Dream</span> Career</p>
    </div>



    <div className='pt-[8rem] md:px-[1rem] px-[0rem] w-full'>
      <div className='pb-6 text-2xl titleT'>
        <p className='titleT font-semibold'>Featured Jobs</p>
      </div>

       
       <div>
        {
          loading ?
          <div className='w-full flex justify-center items-center'>
            <span className='loader1'></span>
          </div> : 
          <div>
          <div className='flex md:flex-row flex-col gap-3'>

          </div>
          </div>
        }
       </div>




    </div>

      

      <div className='pt-20 flex flex-col gap-4 md:px-[1rem] px-[1rem]'>
        <div className='titleT text-2xl font-semibold'>
          Companies on our site
        </div>


        <div className='flex flex-wrap gap-3'>
         {
          data.map((e , i)=>(
            <div key={i}>
              <img src={e.link} className='w-[4rem]  object-fit' alt="" />
            </div>
          ))
         }
        </div>


      </div>
    </div>
   </div>
   </>
  )
}

export default Home