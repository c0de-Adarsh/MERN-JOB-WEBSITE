import React, { useState } from 'react'
import Metadata from '../Components/Metadata'
import { useDispatch, useSelector } from 'react-redux'
import { RxCross1 } from 'react-icons/rx'
import Sidebar from '../Components/Sidebar'
import { MdAttachMoney, MdOutlineFeaturedPlayList, MdOutlineLocationOn, MdOutlineReceiptLong, MdOutlineWorkOutline, MdWorkspacesOutline } from 'react-icons/md'
import { BiBuilding, BiImageAlt } from 'react-icons/bi'
import { TbLoader2 } from 'react-icons/tb'
import {createJobPost} from '../Actions/JobAction'

const CreateJob = () => {

    const {loading}  = useSelector(state=> state.job)

    const [sideToggle , setSideToggle] = useState(false)

    const dispatch = useDispatch()

    const [title , setTitle] = useState('')
    const [description , setDescription] = useState('')
    const [companyName , setCompanyName] = useState('')
    const [location , setLocation] = useState('')
    const [skillsRequired , setSkillsRequired] = useState('')
    const [experience , setExperience] = useState('')
    const [salary , setSalary] = useState('')
    const [category , setCategory] = useState('')
    const [empolyementType , setEmployementType] = useState('')
    const [logo , setLogo] = useState('')
    const [logoName , setLogoName] = useState('')


    const logoChange = (e) =>{
      if (e.target.name === "logo") {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setLogo(reader.result);
            setLogoName(e.target.files[0].name)
          }
        };
  
        reader.readAsDataURL(e.target.files[0]);
      }
    }

    const postHandler = (e) => {
          e.preventDefault()

          const skillArray = skillsRequired.split(",")

          const data = {title , description , companyName , location , logo , skillsRequired:skillArray, experience, salary, category , empolyementType  }

          dispatch(createJobPost(data))

          console.log(data)

          setTitle("");
          setDescription("");
          setCompanyName("");
          setLocation("");
          setSalary("");
          setExperience("");
          setSkillsRequired("")
          setCategory("");
          setEmployementType("");
          setLogo("");
          setLogoName("")
    }

  
  return (
    <>
    <Metadata title='postjob' />
    <div className='bg-gradient-to-b from-purple-900 to-blue-500 min-h-screen pt-12 text-white md:px-20 px-3'>
         
      
      <div className='pt-2 fixed left-0 z-20 pl-0'>
        <div onClick={(()=> setSideToggle(!sideToggle))} className='blueCol py-2 cursor-pointer px-3' >
       {!sideToggle ? 'Menu': <RxCross1 size={34}/>}
        </div>
      </div>

      <Sidebar sideToggle={sideToggle}/>
       

       <div className='flex justify-center items-start w-full pt-6'>
         
         <form action="" onSubmit={postHandler} className='md:flex hidden shadow-gray-700  md:mx-0 mx-8'>
         <div className='flex flex-col w-full justify-start items-start pt-4 gap-3'>
            <div className='text-4xl pb-1 font-medium border-b w-full'>
                Post Job
            </div>

            <div className='flex gap-3 pt-3'>
                {/* job title */}
                <div className='bg-white flex justify-center items-center'>
                    <div className='px-2 text-black'>
                        <MdOutlineWorkOutline  size={20}/>
                    </div>
                    <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} placeholder='Enter Job Title' className=' outline-none bold-placeholder w-full text-black px-1 pr-3 py-2' />
                </div>

                

                {/* company name */}
               
                <div className=' bg-white flex justify-center items-center'>
                    <div className='px-2 text-black'>
                        <BiBuilding size={20} />
                    </div>
                    <input type="text" value={companyName} onChange={(e)=> setCompanyName(e.target.value)} placeholder='Enter Company Name' className='outline-none bold-placeholder w-full text-black px-1 pr-3 py-2'/>
                </div>
              



               {/* company logo */}
              <div>
              <div className=' bg-white flex w-[15.2rem] justify-center items-center'>
                    <div className=' px-2 text-black'>
                       {
                        logo.length !== 0 ?
                        <img src={logo} className='w-[3em]' alt="" /> :
                         <BiImageAlt size={20} />
                       }
                    </div>
                   <label htmlFor="logo" className='outline-none w-full cursor-pointer text-black px-1 pr-3 py-2 '>
                   {
                    logoName.length === 0 ?  <span className='text-gray-500 font-medium'>Select Company Logo...</span> : logoName
                   }
                  
                   </label>
                   <input type='file' required onChange={logoChange} accept="image/*" className='outline-none  w-full hidden text-black px-1 pr-3 py-2' name="logo" id="logo" />
                </div>
              </div>
              </div>
     
      
      <div className='flex gap-3'>
       {/* experience */}
       <div className='bg-white flex justify-center items-center'>
        <div className='text-black px-2'>
            <MdOutlineReceiptLong size={20} />
        </div>
        <input type="text" placeholder='Enter Experience' value={experience} onChange={(e)=> setExperience(e.target.value)} className='outline-none bold-placeholder text-black w-full px-1 pr-3 py-2 '/>
       </div>
     

      {/* location */}
               
      <div className='bg-white flex justify-center items-center'>
        <div className='text-black px-2'>
          <MdOutlineLocationOn size={20} />
        </div>
        <input type="text" placeholder='Enter Location' value={location} onChange={(e)=> setLocation(e.target.value)} className='outline-none bold-placeholder py-2 text-black pr-3 px-1'/>
      </div>

         

         {/* salary */}

         <div className='flex justify-center items-center bg-white'>
            <div className='text-black px-2'>
                <MdAttachMoney size={20} />
            </div>
            <input type="text" value={salary} onChange={(e)=> setSalary(e.target.value)}  placeholder='Enter Salary' className='outline-none bold-placeholder w-full text-black pr-3 py-2 px-1'/>
         </div>
         </div>

          
          <div className='flex w-[48rem] gap-3'>
          {/* job description */}
          <div className='bg-white w-full flex justify-center items-center'>
             <div className='text-black md:pb-12 pb-8 px-2'>
                <MdOutlineFeaturedPlayList size={20} />
             </div>
             <input type="text" placeholder='Job Description' className='outline-none pr-3 w-full px-1 py-2 text-black bold-placeholder' value={description} onChange={(e)=> setDescription(e.target.value)} />
          </div>
          </div>
        

    
           
          <div className='flex gap-3 w-[48rem]'>
            {/* skills required  */}
            <div className='bg-white w-full flex justify-center items-center'>
              <div className='text-black px-2 pb-8 md:pb-12'>
                <MdWorkspacesOutline size={20} />
              </div>
              <textarea value={skillsRequired} onChange={(e)=> setSkillsRequired(e.target.value)} placeholder=' Required Skilled' className='outline-none w-full text-black bold-placeholder px-1 pr-3 py-2'></textarea>
            </div>
          </div>


            
          <div className='flex gap-3'>
          {/* category */}
          <div className='bg-white flex justify-center items-center'>
             
             <select name="" id="large" value={category} onChange={(e)=> setCategory(e.target.value)} className='block w-full px-6 py-2 text-base text-gray-900 border border-gray-300  bg-gray-50 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 '>
             <option selected value="">Select Category</option>
                    <option value="Technology">Technology</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="Sales">Sales</option>
                    <option value="Legal">Legal</option>
             </select>
          </div>

        
         {/* employement type */}

         <div className='bg-white justify-center items-center flex'>
          <select name="" id="large" value={empolyementType} onChange={(e)=> setEmployementType(e.target.value)} className='block w-full px-6 py-2 text-base text-gray-900 border border-gray-300  bg-gray-50 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900'>
          <option selected value="">Select Employment Type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
          </select>
         </div>
        </div>
  

       <div className='flex w-full'>
           <button disabled={loading} className='blueCol w-[20rem] justify-center items-center flex px-4 py-2'>
            {loading ? <TbLoader2 className='animate-spin' size={20} /> : 'Post Job'}
           </button>
       </div>
         </div>


         </form>






         <form action="" onSubmit={postHandler} className='md:hidden flex md:w-1/3  shadow-gray-700 w-full md:mx-0 mx-8'>
         <div className='md:px-10 px-2 pt-4 pb-20 w-full flex flex-col gap-4'>
            <div className='text-center border-gray-500 border-b'>
               <p className='text-4xl  font-medium'>Post Job</p>
            </div>

           
                {/* job title */}
                <div className='bg-white flex justify-center items-center'>
                    <div className='px-2 text-black'>
                        <MdOutlineWorkOutline  size={20}/>
                    </div>
                    <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} placeholder='Enter Job Title' className=' outline-none bold-placeholder w-full text-black px-1 pr-3 py-2' />
                </div>



                {/* company name */}
               
                <div className=' bg-white flex justify-center items-center'>
                    <div className='px-2 text-black'>
                        <BiBuilding size={20} />
                    </div>
                    <input type="text" value={companyName} onChange={(e)=> setCompanyName(e.target.value)} placeholder='Enter Company Name' className='outline-none bold-placeholder w-full text-black px-1 pr-3 py-2'/>
                </div>
              



               {/* company logo */}
              <div>
              <div className=' bg-white flex w-[15.2rem] justify-center items-center'>
              <div className=' px-2 text-black'>
                       {
                        logo.length !== 0 ?
                        <img src={logo} className='w-[3em]' alt="" /> :
                         <BiImageAlt size={20} />
                       }
                    </div>
                   <label htmlFor="logo" className='outline-none w-full cursor-pointer text-black px-1 pr-3 py-2 '>
                   {
                    logoName.length === 0 ?  <span className='text-gray-500 font-medium'>Select Company Logo...</span> : logoName
                   }
                  
                   </label>
                   <input type='file'  onChange={logoChange} className='outline-none  w-full hidden text-black px-1 pr-3 py-2' name="logo" id="logo" />
                </div>
              </div>
              
     
      
      
       {/* experience */}
       <div className='bg-white flex justify-center items-center'>
        <div className='text-black px-2'>
            <MdOutlineReceiptLong size={20} />
        </div>
        <input type="text" placeholder='Enter Experience' value={experience} onChange={(e)=> setExperience(e.target.value)} className='outline-none bold-placeholder text-black w-full px-1 pr-3 py-2 '/>
       </div>
     

      {/* location */}
               
      <div className='bg-white flex justify-center items-center'>
        <div className='text-black px-2'>
          <MdOutlineLocationOn size={20} />
        </div>
        <input type="text" value={location} onChange={(e)=> setLocation(e.target.value)} placeholder='Enter Location' className='outline-none bold-placeholder w-full py-2 text-black pr-3 px-1'/>
      </div>

         

         {/* salary */}

         <div className='flex justify-center items-center bg-white'>
            <div className='text-black px-2'>
                <MdAttachMoney size={20} />
            </div>
            <input type="text"  placeholder='Enter Salary' value={salary} onChange={(e)=> setSalary(e.target.value)} className='outline-none bold-placeholder w-full text-black pr-3 py-2 px-1'/>
         </div>
        

          
          
          {/* job description */}
          <div className='bg-white w-full flex justify-center items-center'>
             <div className='text-black md:pb-12 pb-8 px-2'>
                <MdOutlineFeaturedPlayList size={20} />
             </div>
             <input type="text" placeholder='Job Description' value={description} onChange={(e)=> setDescription(e.target.value)} className='outline-none pr-3 w-full px-1 py-2 text-black bold-placeholder' />
          </div>
          
        

    
           
        
            {/* skills required  */}
            <div className='bg-white w-full flex justify-center items-center'>
              <div className='text-black px-2 pb-8 md:pb-12'>
                <MdWorkspacesOutline size={20} />
              </div>
              <textarea name="" id="" placeholder=' Required Skilled' value={skillsRequired} onChange={(e)=> setSkillsRequired(e.target.value)} className='outline-none w-full text-black bold-placeholder px-1 pr-3 py-2'></textarea>
            </div>
        


            
          
          {/* category */}
          <div className='bg-white flex justify-center items-center'>
             
             <select name="" id="large" value={category} onChange={(e)=> setCategory(e.target.value)} className='block w-full px-6 py-2 text-base text-gray-900 border border-gray-300  bg-gray-50 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900 '>
             <option selected value="">Select Category</option>
                    <option value="Technology">Technology</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="Sales">Sales</option>
                    <option value="Legal">Legal</option>
             </select>
          </div>

        
         {/* employement type */}

         <div className='bg-white justify-center items-center flex'>
          <select name="" id="large" value={empolyementType} onChange={(e)=> setEmployementType(e.target.value)} className='block w-full px-6 py-2 text-base text-gray-900 border border-gray-300  bg-gray-50 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-900'>
          <option selected value="">Select Employment Type</option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="contract">Contract</option>
                    <option value="internship">Internship</option>
          </select>
         </div>
       
  

       <div className='flex w-full'>
           <button disabled={loading} className='blueCol w-[20rem] justify-center items-center flex px-4 py-2'>
            {loading ? <TbLoader2 className='animate-spin' size={20} /> : 'Post Job'}
           </button>
       </div>
         </div>


         </form>
       </div>

    </div>
    </>
  )
}

export default CreateJob