import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addConnections } from "../utils/connectionSlice"
import { useNavigate } from "react-router-dom"
import { MdOutlineMessage } from "react-icons/md";

const defaultPhotoUrl = "https://t4.ftcdn.net/jpg/11/68/50/57/360_F_1168505794_IBCEiafsIrHFJ09e65P2vh5115C1XI7e.jpg"

const Connections = () => {

    const connections = useSelector(state => state.connections)

    const dispatch = useDispatch()
    const navigate = useNavigate()

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
        <div className="text-center mx-auto w-full max-w-[768px] px-[16px]">
            <h1 className="text-[20px] font-bold my-[24px]">Connections</h1>
            {connections.map(connection => {
                const { _id, firstName, lastName, photoUrl } = connection
                return (
                    <div key={_id} className="flex items-center min-h-[70px] w-full bg-base-300 rounded-full mx-auto mb-4">
                        <figure className="my-auto min-[678px]:py-[6px] ml-[6px] shrink-0">
                            <img alt="photo" src={!photoUrl ? defaultPhotoUrl : photoUrl} className="w-[60px] h-[60px] min-[678px]:w-[70px] min-[678px]:h-[70px] rounded-full object-cover" />
                        </figure>
                        <div className="self-center text-left mx-[20px]">
                            <h2 className="font-bold text-[16px] truncate">{firstName + " " + lastName}</h2>
                        </div>
                        <button type="button" onClick={() => {navigate("/chat/" + _id)}} data-tip={`msg ${firstName}`} className="min-[1024px]:tooltip min-[1024px]:tooltip-left ml-auto mr-[24px] shrink-0 text-[32px] cursor-pointer ">
                            <MdOutlineMessage />
                        </button>
                    </div>
                )
            })}

        </div>
    )
}

export default Connections