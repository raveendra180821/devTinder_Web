import FeedUserCard from './FeedUserCard'
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect, useState } from "react"
import { addFeed } from '../utils/feedSlice'
import { useDispatch, useSelector } from 'react-redux'

const Feed = () => {

    const feed = useSelector((state) => state.feed)

    const [isFeedEnd, setIsFeedEnd] = useState(false)

    const dispatch = useDispatch()

    const fetchFeed = async () => {
        try {
            const res = await axios.get(BASE_URL + "/feed", { withCredentials: true })
            if (res.data.data.length === 0) return setIsFeedEnd(true)
            dispatch(addFeed(res?.data?.data))
        }
        catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => {
        if (!feed || feed.length === 0) {
            fetchFeed()
        }
    }, [feed])

    if (isFeedEnd) return <h1>No new users on the platform. please come back after sometime</h1>

    if (!feed || feed.length === 0) return <h1>Loading . . .</h1>



    return (

        <div className='h-full flex item-center'>
            <FeedUserCard data={feed[0]} />
        </div>
    )
}

export default Feed