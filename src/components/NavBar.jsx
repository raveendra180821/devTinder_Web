import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { clearUser } from '../utils/userSlice'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { clearFeed } from '../utils/feedSlice'
import { clearRequests } from '../utils/requestSlice'
import { clearConnections } from '../utils/connectionSlice'
import { useEffect, useState } from 'react'
import images from '../utils/images'

const NavBar = () => {

    const user = useSelector((state) => state.user)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const res = await axios.post(BASE_URL + "/logout", {}, { withCredentials: true })
            dispatch(clearUser())
            dispatch(clearFeed())
            dispatch(clearRequests())
            dispatch(clearConnections())
            navigate("/login")
        }
        catch (e) {
            console.log(e.message)
        }

    }

    return (
        <div className="navbar shrink-0 relative min-h-[64px] bg-[#102859] shadow-sm">
            <div className="flex-1">
                <Link to="/">
                    <img src={images.navLogo} alt="Logo" className='w-26 lg:w-40 h-8 lg:h-12 hover:shadow-[0_0_15px_#0f1f3f] rounded-lg' />
                </Link>
            </div>
            {user && (
                <div className="flex gap-2 items-center">
                    <div className='max-[648px]:hidden flex items-center text-white-900 text-sm gap-8 mr-3'>
                        <NavLink
                            to="/requests"
                            className={({ isActive }) => `text-base font-medium hover:scale-106 duration-150 pb-1 ${isActive && "border-b-2 border-white/90 scale-106"}`}
                        >
                            Requets
                        </NavLink>
                        <NavLink
                            to="/connections"
                            className={({ isActive }) => `text-base font-medium hover:scale-106 duration-150 pb-1 ${isActive && "border-b-2 border-white/90 scale-106"}`}
                        >
                            Connections
                        </NavLink>
                    </div>
                    <div className="dropdown dropdown-end mx-[8px]">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <figure className='shrink-0'>
                                <img
                                    alt="Profile Photo"
                                    src={user.photoUrl}
                                    className='w-10 h-10 lg:w-11.5 lg:h-11.5 mt-1 rounded-full object-cover' />
                            </figure>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu dropdown-content bg-white text-slate-800 rounded-box z-[1] mt-[12px] w-[160px] p-[8px] shadow"
                        >
                            <li className=''>
                                <NavLink to="/profile" className={({ isActive }) => `hover:bg-base-100 hover:text-white hover:rounded-md group ${isActive && "bg-slate-900 text-white rounded-md"}`}>
                                    Profile
                                    <span className="badge group-hover:bg-white group-hover:text-slate-900 pb-0.5">New</span>
                                </NavLink>
                            </li>
                            <li className='min-[648px]:hidden'>
                                <NavLink to="/requests" className={({ isActive }) => isActive && `bg-slate-900 text-[#fff]`}>Requests</NavLink>
                            </li>
                            <li className='min-[648px]:hidden '>
                                <NavLink to="/connections" className={({ isActive }) => isActive && `bg-slate-900 text-[#fff]`}>Connections</NavLink>
                            </li>
                            <li className='hover:bg-base-100 hover:text-white hover:rounded-md'>
                                <button type='button' onClick={handleLogout}>Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NavBar