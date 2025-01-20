import React from 'react'
import { Link } from 'react-router'
import { BsPersonWorkspace } from "react-icons/bs";

const NavBar = () => {
    return (
        <>
            <div className='min-w-full bg-gray-950 text-white z-20 fixed'>
                
                <ul className='pt-4 pb-3 md:flex justify-center items-center gap-24 font-semibold text-xl '>
                <Link className='flex fixed gap-2 left-24 justify-center items-center'><BsPersonWorkspace size={19} />JobTrail</Link>
                    <Link to="/" className='cool-link'>Home</Link>
                    <Link to="/jobs" className=' cool-links'>Jobs</Link>
                    <Link to='/contact' className='cool-link'>Contact</Link>
                    <Link to='/about' className='cool-link'>About</Link>
                    
                    <span className='fixed right-24 flex gap-3'>
                        <Link className='bg-blue-700 px-3 py-1 text-sm rounded-xl'>Login</Link>
                        <Link className='bg-blue-700 px-3 py-1 text-sm rounded-xl'>Signup</Link>
                    </span>
                </ul>
            </div>
        </>
    )
}

export default NavBar