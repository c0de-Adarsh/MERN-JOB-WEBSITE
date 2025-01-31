import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Menu } from '@mantine/core';
import { FaBars, FaUserCircle, FaSave } from 'react-icons/fa';
import { RxCross1 } from 'react-icons/rx';
import { BsPersonWorkspace } from "react-icons/bs";
import { MdDoneAll, MdOutlineDashboard } from 'react-icons/md';
import { RiLogoutBoxFill } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { logOrNot } from '../Actions/UserAction';
import { useNavigate } from 'react-router-dom';
import { logoutClearState } from '../Slice/UserSlice';
import useIsMobile from '../Mobile/Mobile';

const NavBar = () => {
    const { isLogin, me } = useSelector(state => state.user);
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    const LogOut = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('role');
        dispatch(logOrNot());
        navigate('/');
        toast.success("Logout Successful!");
        dispatch(logoutClearState());
    };

    return (
        <>
            <div className='text-white z-50 fixed min-w-full bg-gray-950'>
                {!isMobile && (
                    <ul className='sm:flex justify-center items-center gap-24 pt-4 pb-3 font-semibold text-xl'>
                        <Link to="/" className='flex gap-2 absolute left-24 justify-center items-center titleT'>
                            <BsPersonWorkspace size={19} /> JobTrail
                        </Link>

                        <Link to="/" className='cool-link'>Home</Link>
                        <Link to="/jobs" className='cool-link'>Jobs</Link>
                        <Link to='/contact' className='cool-link'>Contact</Link>
                        <Link to='/about' className='cool-link'>About</Link>

                        {isLogin ? (
                            <div className="absolute right-32">
                                <Menu position="bottom-end" offset={5}>
                                    <Menu.Target>
                                        <Avatar 
                                            className='cursor-pointer' 
                                            radius="xl" 
                                            src={me.avatar.url} 
                                            alt="profile"
                                        />
                                    </Menu.Target>

                                    <Menu.Dropdown>
                                        <Link to="/profile">
                                            <Menu.Item icon={<FaUserCircle size={14} />}>My Profile</Menu.Item>
                                        </Link>
                                        {me.role === "admin" && (
                                            <Link to="/admin/dashboard">
                                                <Menu.Item icon={<MdOutlineDashboard size={14} />}>Dashboard</Menu.Item>
                                            </Link>
                                        )}
                                        <Link to="/applied">
                                            <Menu.Item icon={<MdDoneAll size={14} />}>Applied Jobs</Menu.Item>
                                        </Link>
                                        <Link to="/saved">
                                            <Menu.Item icon={<FaSave size={14} />}>Saved Jobs</Menu.Item>
                                        </Link>
                                        <Menu.Divider />
                                        <Menu.Item onClick={LogOut} color="red" icon={<RiLogoutBoxFill size={14} />}>
                                            Logout
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            </div>
                        ) : (
                            <span className='absolute right-24 flex gap-3'>
                                <Link className='cursor-pointer text-sm px-3 py-1 rounded-xl blueCol' to="/login">
                                    Login
                                </Link>
                                <Link className='cursor-pointer text-sm px-3 py-1 rounded-xl blueCol' to="/register">
                                    Register
                                </Link>
                            </span>
                        )}
                    </ul>
                )}

                <div className='py-3 px-3 md:hidden flex justify-between items-center'>
                    <Link to="/" className='text-lg titleT flex items-center gap-1'>
                        <BsPersonWorkspace size={19} /> JobTrail
                    </Link>
                    
                    <div className='flex items-center gap-4'>
                        {isLogin ? (
                            <Menu position="bottom-end" offset={5}>
                                <Menu.Target>
                                    <Avatar 
                                        size={28} 
                                        className='cursor-pointer' 
                                        radius="xl" 
                                        src={me.avatar.url} 
                                        alt="profile"
                                    />
                                </Menu.Target>

                                <Menu.Dropdown>
                                    <Link to="/profile">
                                        <Menu.Item icon={<FaUserCircle size={14} />}>My Profile</Menu.Item>
                                    </Link>
                                    {me.role === "admin" && (
                                        <Link to="/admin/dashboard">
                                            <Menu.Item icon={<MdOutlineDashboard size={14} />}>Dashboard</Menu.Item>
                                        </Link>
                                    )}
                                    <Link to="/applied">
                                        <Menu.Item icon={<MdDoneAll size={14} />}>Applied Jobs</Menu.Item>
                                    </Link>
                                    <Link to="/saved">
                                        <Menu.Item icon={<FaSave size={14} />}>Saved Jobs</Menu.Item>
                                    </Link>
                                    <Menu.Divider />
                                    <Menu.Item onClick={LogOut} color="red" icon={<RiLogoutBoxFill size={14} />}>
                                        Logout
                                    </Menu.Item>
                                </Menu.Dropdown>
                            </Menu>
                        ) : (
                            <div className='flex gap-3'>
                                <Link className='cursor-pointer text-sm px-3 py-1 rounded-xl blueCol' to="/login">
                                    Login
                                </Link>
                                <Link className='cursor-pointer text-sm px-3 py-1 rounded-xl blueCol' to="/register">
                                    Register
                                </Link>
                            </div>
                        )}

                        <button onClick={() => setToggle(!toggle)} className='cursor-pointer'>
                            {toggle ? <RxCross1 size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>

                <div className='bg-white border-b md:mx-20 mx-3'></div>

                {toggle && (
                    <div className='absolute w-full h-screen z-20 md:hidden'>
                        <ul className='bg-gray-950 bg-opacity-95 flex flex-col gap-20 text-2xl justify-start w-full pt-20 items-center'>
                            <Link onClick={() => setToggle(false)} to="/" className='cool-link'>
                                Home
                            </Link>
                            <Link onClick={() => setToggle(false)} to="/jobs" className='cool-link'>
                                Jobs
                            </Link>
                            <Link onClick={() => setToggle(false)} to='/contact' className='cool-link'>
                                Contact
                            </Link>
                            <Link onClick={() => setToggle(false)} to='/about' className='cool-link'>
                                About
                            </Link>
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}

export default NavBar;









// import React, { useState } from 'react'
// import { Link } from 'react-router'
// import { BsPersonWorkspace } from "react-icons/bs";
// import { RxCross1 } from 'react-icons/rx';
// import { FaBars } from 'react-icons/fa';

// const NavBar = () => {

//     const [toggle , setToggle] = useState(false)
//     return (
//         <>
//             <div className='min-w-full bg-gray-950 text-white z-20 fixed'>
                
//                 <ul className='hidden md:flex justify-center items-center gap-10 py-4 font-semibold text-lg'>
//                 <Link className='flex items-center gap-1 titleT'><BsPersonWorkspace size={19} />JobTrail</Link>
//                     <Link to="/" className='cool-link'>Home</Link>
//                     <Link to="/jobs" className='cool-link'>Jobs</Link>
//                     <Link to='/contact' className='cool-link'>Contact</Link>
//                     <Link to='/about' className='cool-link'>About</Link>
                    
//                     <span className='fixed right-24 flex gap-3'>
//                         <Link className='bg-blue-700 px-3 py-1 text-sm rounded-xl'>Login</Link>
//                         <Link className='bg-blue-700 px-3 py-1 text-sm rounded-xl'>Signup</Link>
//                     </span>
//                 </ul>

//                 <div className='py-3 px-3 md:hidden justify-between items-center flex'>

//                 <div className='pr-1 '>
//                   {
//                     toggle ? (
//                         <RxCross1 size={24}/>
//                     ) : (
//                         <FaBars size={24} />
//                     )
//                   }
//                 </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default NavBar