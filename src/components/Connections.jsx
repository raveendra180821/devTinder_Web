import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addConnections } from "../utils/connectionSlice"


const Connections = () => {

    const connections = useSelector(state => state.connections)

    const dispatch = useDispatch()

    const fetchConnections = async () => {
        const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true })
        if (res.status === 200)
            dispatch(addConnections(res.data.data))
    }

    useEffect(() => {
        fetchConnections()
    }, [])

    if (!connections) return

    if (connections.length === 0) return <h1>No connections found</h1>

    return (
        <div className="text-center w-3xl">
            <h1 className="text-xl font-bold my-10">Connections</h1>
            {connections.map(con => {
                const { _id, firstName, lastName, photoUrl, description } = con
                return (
                    <div key={_id} className="flex h-22 w-full bg-base-300 rounded-r-xl rounded-l-[50px] mx-auto mb-4">
                        <figure className="my-auto ml-1.5">
                            <img alt="photo" src={photoUrl} className="w-20 h-20 rounded-full object-cover" />
                        </figure>
                        <div className="self-center text-left mx-5 py-4 space-y-2">
                            <h2 className="font-bold">{firstName + " " + lastName}</h2>
                            <p className="text-sm max-w-2xl">{description}</p>
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export default Connections