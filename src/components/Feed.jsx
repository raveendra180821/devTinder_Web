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

        <div style={{backgroundImage: `url(${images.main})`}} className="bg-cover flex flex-col items-center bg-white pt-8 lg:pt-20 w-full h-[calc(100dvh-128px)] px-[16px]">
            <span className='border-2 border-purple-700 w-20 h-0.5 rounded-lg' />
            <h1 className='text-xl lg:text-3xl font-bold mt-6'>Discover Developers</h1>
            <p className='text-sm lg:text-[16px] font-bold text-gray-400 mt-3 mb-5'><span>{`${feed.length} developers`}</span> left in your feed</p>
            {displayNewCard
                ? (
                    <div className="flex min-h-[300px] items-center justify-center">
                        <span className="loading loading-infinity loading-lg text-primary"></span>
                    </div>
                )
                : (
                    <FeedUserCard data={feed[0]} showLoader={showLoader}  />
                )}


        </div>
    )
}

export default Feed