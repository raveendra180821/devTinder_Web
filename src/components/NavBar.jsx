import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { clearUser } from '../utils/userSlice'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { clearFeed } from '../utils/feedSlice'
import { clearRequests } from '../utils/requestSlice'
import { clearConnections } from '../utils/connectionSlice'

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
        <div className="navbar shrink-0 min-h-[64px] bg-base-300 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-[20px]">💢 DevTinder</Link>
            </div>
            {user && (
                <div className="flex gap-2 items-center">
                    <span className='hidden min-[640px]:inline text-sm text-green-500'>Welcome, {user.firstName}</span>
                    <div className="dropdown dropdown-end mx-[8px]">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <figure className='shrink-0'>
                                <img
                                    alt="Profile Photo"
                                    src={user.photoUrl}
                                    className='w-[36px] h-[36px] rounded-full object-cover' />
                            </figure>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-[12px] w-[208px] p-[8px] shadow">
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/requests">Requests</Link>
                            </li>
                            <li>
                                <Link to="/connections">Connections</Link>
                            </li>
                            <li>
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