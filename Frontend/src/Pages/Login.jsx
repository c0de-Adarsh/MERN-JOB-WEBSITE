import React, { useEffect, useState } from 'react'
import Metadata from '../Components/Metadata'
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineMail, AiOutlineUnlock } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { TbLoader2 } from 'react-icons/tb'
import { loginUser } from '../Actions/UserAction'
const Login = () => {
  
  const {loading , isLogin} = useSelector(state=> state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email ,setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [eyeToggle , setEyeToggle] = useState(false)

  const loginHandler = (e) =>{
       e.preventDefault()

       const data = {
        email,password
       }

       dispatch(loginUser(data))
  }

  useEffect(()=>{
    if(isLogin){
      setEmail('')
      setPassword('')
      navigate('/')
    }
  },[isLogin , navigate])
  return (
    <>
    <Metadata title='login'/>
    <div className='bg-gradient-to-b from-purple-900 to-blue-500 min-h-screen pt-14 md:px-20 px-3  '>
    <div className='flex justify-center w-full items-start pt-14 '>
    <form action="" onSubmit={loginHandler} className=' bg-white flex flex-col md:w-1/3 shadow-gray-900 rounded-md w-full md:mx-0 mx-8'>

      <div className='md:px-10 px-2 py-6  w-full flex flex-col gap-4'>
      <div className='text-center'>
        <p className='text-4xl font-semibold'>Login</p>
      </div>

      <div className=' flex justify-center items-center border-[1.5px] border-black'>
        <div className='px-2 text-gray-600'>
          <AiOutlineMail size={20} />
        </div>
        <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} required placeholder='Enter Your Email' className='outline-none bold-placeholder w-full text-black px-1 pr-3 py-2' />
      </div>
      <div className=' flex justify-center items-center border-[1.5px] border-black'>
        <div className='px-2 text-gray-600'>
          <AiOutlineUnlock size={20} />
        </div>
        <input type={eyeToggle ? 'text':'password'} value={password} onChange={(e)=> setPassword(e.target.value)} required placeholder='Enter Your Password' className='outline-none bold-placeholder w-full text-black px-1 pr-3 py-2' />
        <div className='text-gray-600 cursor-pointer px-2'>
       {
        eyeToggle ? 
        <AiOutlineEye onClick={()=> setEyeToggle(!eyeToggle)} size={20}/> : <AiOutlineEyeInvisible onClick={()=> setEyeToggle(!eyeToggle)} size={20}/>
       }
        </div>
      </div>

      
      <div>
       <button disabled={loading || !password || !email} className='blueCol w-full flex justify-center text-white rounded-md items-center py-2 px-8 font-semibold'>{loading ? <TbLoader2 className='animate-spin' size={24} /> :'Login'}</button>
      </div>

      <div>
        <p>Don't have a account, <Link to='/register' className='text-yellow-400 underline'>register </Link>here.</p>
      </div>
      </div>



    </form>

    </div>
  </div>
    </>
  )
}

export default Login