import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addConnections } from "../utils/connectionSlice"
import { Link, useNavigate } from "react-router-dom"
import { MdOutlineMessage } from "react-icons/md";
import images from "../utils/images"

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

    return (
        <div style={{ backgroundImage: `url(${images.connections})` }} className="bg-center bg-cover w-full min-h-[calc(100dvh-128px)]">
            {
                !connections || connections.length === 0
                    ? <div className="flex flex-col justify-center items-center">
                        <h1 className="text-[14px] min-[768px]:text-[16px] mt-[20px]">No connections found</h1>
                        <Link to='/' className="mt-4">
                            <button type="button" className="btn btn-primary">Go to Feed</button>
                        </Link>
                    </div>
                    : (
                        <div className="text-center mx-auto w-full max-w-[768px] px-[16px]">
                            <h1 className="text-[20px] font-bold my-[24px]">Connections</h1>
                            {connections.map(connection => {
                                const { _id, firstName, lastName, photoUrl, status } = connection
                                console.log(firstName, status)
                                return (
                                    <div key={_id} className="flex items-center min-h-[70px] w-full bg-[#08396e] rounded-l-[40px] rounded-r-[10px] mx-auto mb-4">
                                        <figure className="min-[678px]:py-[6px] ml-[6px] shrink-0">
                                            <img alt="photo" src={!photoUrl ? defaultPhotoUrl : photoUrl} className="w-[60px] h-[60px] min-[678px]:w-[70px] min-[678px]:h-[70px] rounded-full object-cover" />
                                        </figure>
                                        <div className="self-center text-left mx-[20px]">
                                            <h2 className="font-bold text-[16px] truncate">{firstName + " " + lastName}</h2>
                                        </div>
                                        <div className="flex items-center justify-center gap-6 ml-auto mr-[24px] shrink-0">
                                            <span data-tip={status ? "Online": "Offline"} className={`lg:tooltip lg:tooltip-top w-3 h-3 text-right rounded-full bg-gray-600 ${status ? "bg-green-700" : ""}`} />
                                            <button type="button" onClick={() => { navigate("/chat/" + _id) }} data-tip={`msg ${firstName}`} className="lg:tooltip lg:tooltip-top text-[32px] cursor-pointer ">
                                                <MdOutlineMessage />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )
            }

        </div>
    )
}

export default Connections