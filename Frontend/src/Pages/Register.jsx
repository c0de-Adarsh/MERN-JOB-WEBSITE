import React from 'react'
import Metadata from '../Components/Metadata'
import { FaUserCircle } from 'react-icons/fa'
import { MdOutlineMarkEmailUnread } from 'react-icons/md'
import { TbLockPassword, TbUserCircle } from "react-icons/tb";
import { FaRegFileLines } from "react-icons/fa6";
import { TfiWrite } from "react-icons/tfi";

const Register = () => {
  return (
   <>
   <Metadata title='register' />
   <div className='bg-gray-950 min-h-screen pt-14 md:px-20 px-3  text-white'>
     
     <div className='flex justify-center w-full items-start pt-6'>

      <form action="" className='flex flex-col md:w-1/3 shadow-gray-700 w-full md:mx-0 mx-8'>

        <div className='md:px-10 px-2 pt-4 pb-20 w-full flex flex-col gap-4'>
          <div className='text-center'>
            <p className='text-4xl font-bold'>Registerd</p>
          </div>

          {/* name input */}
          <div className='bg-white flex justify-center items-center'>
            <div className='text-gray-700 px-2'><FaUserCircle size={20} /></div>
            <input type="text" placeholder='Enter Your Name' className='outline-none w-full text-black px-1 pr-3 py-2' required />
          </div>

          {/* mail input */}
          <div className='bg-white flex justify-center items-center'>
            <div className='text-gray-700 px-2'><MdOutlineMarkEmailUnread size={20}/></div>
            <input type="email" required placeholder='Enter Your Email' className='outline-none w-full text-black px-1 pr-3 py-2' />
          </div>
           

           {/* password */}
          <div className='bg-white flex justify-center items-center'>
            <div className='text-gray-700 px-2'><TbLockPassword size={20}/></div>
            <input type="password" required placeholder='Enter Your Password' className='outline-none w-full text-black px-1 py-2 pr-3'/>
            <div>

            </div>
          </div>

          {/* profile */}
          <div >
            <div className='bg-white flex justify-center items-center'>
            <div className='text-gray-600 px-2'>
            <TbUserCircle size={20}/>
            </div>

            <label htmlFor="" className='w-full outline-none cursor-pointer  text-black px-1 pr-3 py-2'><span className='text-gray-500 font-medium'>Select Profile Pic...</span></label>
            </div>
            <p className='bg-gray-950 text-white text-xs'>Please Select Image File</p>
          </div>

          {/* resume */}

          <div>
            <div className='bg-white flex justify-center items-center'>
              <div className='text-gray-600 px-2'>
              <FaRegFileLines size={20}/>
              </div>
              <label htmlFor="" className='w-full outline-none cursor-pointer text-black px-1 pr-3 py-2'><span className='text-gray-500 cursor-pointer font-medium'>Select Resume...</span></label>
              <input type="file" placeholder='Resume' accept='image/*' className='hidden outline-none hidden w-full text-black px-1 pr-3 py-2' />
            </div>
            <p className='bg-gray-950 text-white text-xs'>Please select file</p>
          </div>

          {/* skills */}
          <div className='bg-white flex justify-center items-center'>
            
              <div className='text-gray-600 md:pb-12 pb-8 px-2 mt-1'>
              <TfiWrite size={20} />
              </div>
              <textarea name="" id="" className='outline-none w-full text-black bold-placeholder px-1 pr-3 py-2'/>
          </div>


          {/* button */}
          <div>
            <button className='bg-blue-600 py-2 w-full'>Register</button>
          </div>
        </div>
      </form>
     </div>
   </div>
 
   </>
  )
}

export default Register