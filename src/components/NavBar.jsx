import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { removeUser } from '../utils/userSlice'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'

const defaultPhotoUrl = "https://cdn.vectorstock.com/i/500p/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg"

const NavBar = () => {

    const user = useSelector((state) => state.user)
    const profilePhoto = user && user.photoUrl ? user.photoUrl : defaultPhotoUrl

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            const res = await axios.post(BASE_URL + "/logout", {}, { withCredentials: true })
            dispatch(removeUser())
            navigate("/login")
        }
        catch (e) {
            console.log(e.message)
        }

    }

    return (
        <div className="navbar bg-base-300 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">💢 DevTinder</Link>
            </div>
            {user && (
                <div className="flex gap-2 items-center">
                    <span className='text-sm text-green-500'>Welcome, {user.firstName}</span>
                    <div className="dropdown dropdown-end mx-4">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-8 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={profilePhoto} />
                            </div>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to="profile" className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}

export default NavBar