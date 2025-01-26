import React, { useEffect, useState } from 'react'
import Metadata from '../Components/Metadata'
import { FaUserCircle } from 'react-icons/fa'
import { MdOutlineMarkEmailUnread } from 'react-icons/md'
import { TbLoader2, TbLockPassword, TbUserCircle } from "react-icons/tb";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FaRegFileLines } from "react-icons/fa6";
import { TfiWrite } from "react-icons/tfi";
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../Actions/UserAction';
const Register = () => {

  const { loading, isLogin } = useSelector(state => state.user)


  const disptach = useDispatch()
  const navigate = useNavigate()

  const [eyeToggle, setEyeToggle] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [skills, setSkills] = useState('')
  const [avatar, setAvatar] = useState(null)
  const [avatarName, setAvatarName] = useState('')
  const [resume, setResume] = useState(null)
  const [resumeName, setResumeName] = useState('')


  const avatarChange = (e) => {
    if (e.target.name === 'avatar') {
      const file = e.target.files[0];
      setAvatar(file);
      setAvatarName(file.name);
    }
  };

  

  const resumeHandler = (e) => {
    if (e.target.name === 'resume') {
      const file = e.target.files[0];
      setResume(file);
      setResumeName(file.name);
    }
  };

  const registerHandler = (e) => {
    e.preventDefault()

    if (!avatar) {
      alert('Please upload an avatar')
      return
    }

    if (!resume) {
      alert('Please upload a resume')
      return
    }

    const skillsArray = skills.split(" , ")

    const data = {
      name,
      email,
      password,
      avatar,
      resume,
      skills: skillsArray
    }
   
    disptach(registerUser(data))

    
  }
 
  useEffect(() => {
   
    if (isLogin) {
      setName("");
      setEmail("");
      setPassword("");
      setAvatar(null);
      setAvatarName("");
      setResume(null);
      setResumeName("");
      setSkills("");
        navigate('/');
    }
}, [isLogin, navigate]);
  return (
    <>
      <Metadata title='register' />
      <div className='bg-gradient-to-b from-purple-900 to-blue-500 min-h-screen pt-14 md:px-20 px-3 '>

        <div className='flex justify-center w-full items-start pt-6'>

          <form action="" onSubmit={registerHandler} className='flex bg-white flex-col md:w-1/3 shadow-2xl  rounded-md w-full md:mx-0 mx-8'>

            <div className='md:px-10 px-2 pt-4 pb-20 w-full flex flex-col  gap-4'>
              <div className='text-center'>
                <p className='text-4xl font-bold'>Registerd</p>
              </div>

              {/* name input */}
              <div className='bg-white flex justify-center items-center border-[1.5px] border-black'>
                <div className='text-gray-700 px-2'><FaUserCircle size={20} /></div>
                <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Enter Your Name' className='outline-none w-full text-black px-1 pr-3 py-2' required />
              </div>

              {/* mail input */}
              <div className='bg-white flex justify-center items-center border-[1.5px] border-black'>
                <div className='text-gray-700 px-2'><MdOutlineMarkEmailUnread size={20} /></div>
                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} required placeholder='Enter Your Email' className='outline-none w-full text-black px-1 pr-3 py-2' />
              </div>


              {/* password */}
              <div className='bg-white flex justify-center items-center border-[1.5px] border-black'>
                <div className='text-gray-700 px-2'><TbLockPassword size={20} /></div>
                <input type={eyeToggle ? 'text':'password'} onChange={(e) => setPassword(e.target.value)} value={password} required placeholder='Enter Your Password' className='outline-none w-full text-black px-1 py-2 pr-3' />
                <div className='text-gray-600 px-2 cursor-pointer'>
                  {eyeToggle ? 
                   <AiOutlineEye onClick={()=> setEyeToggle(!eyeToggle)} size={20} />:<AiOutlineEyeInvisible onClick={()=> setEyeToggle(!eyeToggle)} size={20}/>}
                 
                </div>
                
              </div>

              {/* profile */}
              <div >
                <div className='bg-white flex justify-center items-center border-[1.5px] border-black'>
                  <div className='text-gray-600 px-2'>
                  {avatar ? <img src={URL.createObjectURL(avatar)} className='w-[3em] h-[2.5em]' alt="Avatar" /> : <TbUserCircle size={20} />}

                  </div>

                  <label htmlFor="avatar" className='w-full outline-none cursor-pointer  text-black px-1 pr-3 py-2'>
                  {avatar ? avatarName : <span className='text-gray-500 font-medium'>Select Profile Pic...</span>}
                  </label>
                  <input required accept='image/*' onChange={avatarChange} id='avatar' name='avatar' type="file" className='w-full outline-none hidden text-black px-1 pr-3 py-2' />
                </div>
                <p className=' text-xs'>Please Select Image File</p>
              </div>

              {/* resume */}

              <div>
                <div className='bg-white flex justify-center items-center border-[1.5px] border-black'>
                  <div className='text-gray-600 px-2'>
                    <FaRegFileLines size={20} />
                  </div>
                  <label htmlFor="resume" className='w-full outline-none cursor-pointer text-black px-1 pr-3 py-2'>
                  {resume ? resumeName : <span className='text-gray-500 cursor-pointer font-medium'>Select Resume...</span>}
                  </label>
                  <input required type="file" onChange={resumeHandler} placeholder='Resume' id='resume'
                    name='resume'
                    accept='.pdf,.doc,.docx' className=' outline-none hidden w-full text-black px-1 pr-3 py-2' />
                </div>
                <p className='  text-xs'>Please select file</p>
              </div>

              {/* skills */}
              <div className='bg-white flex justify-center items-center border-[1.5px] border-black'>

                <div className='text-gray-600 md:pb-12 pb-8 px-2 mt-1'>
                  <TfiWrite size={20} />
                </div>
                <textarea value={skills} onChange={(e) => setSkills(e.target.value)} className='outline-none w-full text-black bold-placeholder px-1 pr-3 py-2' />
              </div>


              {/* button */}
              <div>
                <button disabled={loading}  className='blueCol text-white rounded-md flex justify-center items-center px-8 w-full py-2 font-semibold'>

                  {loading ? <TbLoader2 size={24} className='animate-spin' /> : 'Register'}
                </button>
              </div>

              <div className='text-center text-sm pt-2'>
                <p>Already Have a Account,<Link to='/login' className='text-yellow-400 underline'> Login</Link> here.</p>
              </div>
            </div>
          </form>
        </div>
      </div>

    </>
  )
}

export default Register