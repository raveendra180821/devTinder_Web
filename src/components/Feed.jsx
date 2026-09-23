import FeedUserCard from './FeedUserCard'
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect, useState } from "react"
import { addFeed } from '../utils/feedSlice'
import { useDispatch, useSelector } from 'react-redux'
import images from '../utils/images'

const Feed = () => {

    const feed = useSelector((state) => state.feed)

    const [isFeedEnd, setIsFeedEnd] = useState(false)

    const [displayNewCard, setDisplayNewCard] = useState(false)

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

    const showLoader = () => {
        setDisplayNewCard(true)
        setTimeout(() => {
            setDisplayNewCard(false)
        }, 600)
    }

    useEffect(() => {
        if (!feed || feed.length === 0) {
            fetchFeed()
        }
    }, [feed])

    if (isFeedEnd) return (
        <h1 className="text-[18px] font-bold px-[16px] py-[24px] text-center h-[calc(100dvh-128px)]">
            No new users on the platform. Please come back after sometime.
        </h1>
    )

    if (!feed || feed.length === 0) return (
        <h1 className="text-[18px] font-bold px-[16px] py-[24px] text-center h-[calc(100dvh-128px)]">
            Loading...
        </h1>
    )


    return (

        <div style={{backgroundImage: `url(${images.feed})`}} className="bg-cover flex items-center bg-white justify-center w-full h-[calc(100dvh-128px)] px-[16px]">
            {displayNewCard
                ? (
                    <div className="flex min-h-[300px] items-center justify-center">
                        <span className="loading loading-infinity loading-lg text-primary"></span>
                    </div>
                )
                : (
                    <FeedUserCard data={feed[0]} showLoader={showLoader} />
                )}


        </div>
    )
}

export default Feed