import FeedUserCard from './FeedUserCard'
import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { addData } from '../utils/feedSlice'
import { useDispatch, useSelector } from 'react-redux'

const Feed = () => {

    const feed = useSelector((state) => state.feed)

    const dispatch = useDispatch()

    const getFeed = async () => {
        if (feed) return;
        try {
            const res = await axios.get(BASE_URL + "/feed", { withCredentials: true })
            dispatch(addData(res?.data?.data))
        }
        catch (e) {
            console.log(e.message)
        }
    }

    useEffect(() => { getFeed() }, [])

    return (
        feed && (
            <div>
                <FeedUserCard data={feed[0]} />
            </div>
        )
    )
}

export default Feed