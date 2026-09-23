import { Outlet, useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'

import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../utils/constants'
import { addUser } from '../utils/userSlice'



const Body = ({ children }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchUser = async () => {
        try {
            const res = await axios.get(
                BASE_URL + "/profile/view",
                { withCredentials: true }
            )

            dispatch(addUser(res.data))
        }
        catch (e) {
            if (e.response?.status === 401) {
                navigate('/login')
            }
            console.dir(e)
        }

    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div className='flex flex-col w-full min-h-[100dvh]'>
            <NavBar />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Body