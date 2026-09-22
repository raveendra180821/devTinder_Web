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

    if (isFeedEnd) return (
        <h1 className="text-[18px] font-bold px-[16px] py-[24px] text-center">
            No new users on the platform. Please come back after sometime.
        </h1>
    )

    if (!feed || feed.length === 0) return (
        <h1 className="text-[18px] font-bold px-[16px] py-[24px] text-center">
            Loading...
        </h1>
    )


    return (

        <div className="flex items-center justify-center w-full min-h-full px-[16px]">
            <FeedUserCard data={feed[0]} />
        </div>
    )
}

export default Feed