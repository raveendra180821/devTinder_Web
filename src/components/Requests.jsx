import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { BASE_URL } from "../utils/constants"
import { addRequests, removeRequest } from "../utils/requestSlice"
import { useEffect } from "react"
import { ImCross } from "react-icons/im";
import { TiTick } from "react-icons/ti";



const Requests = () => {

  const requests = useSelector(state => state.requests)

  const dispatch = useDispatch()

  const fetchRquests = async () => {
    const res = await axios.get(BASE_URL + "/user/requests/recieved", { withCredentials: true })
    dispatch(addRequests(res.data.data))
  }

  const handleAcceptOrRejectTheRequest = async (status, id) => {
    try {
      const res = await axios.post(`${BASE_URL}/req/review/${status}/${id}`, {}, { withCredentials: true })
      dispatch(removeRequest(id))
    }
    catch (e) {
      console.dir(e)
    }
  }

  useEffect(() => {
    fetchRquests()
  }, [])

  if (!requests) return

  if (requests.length === 0) return <h1>No Requests Found</h1>

  return (
    <div className="mx-auto flex flex-col w-full max-w-[768px] px-[16px] text-center">
      <h1 className="text-[20px] font-bold my-[24px]">Requests</h1>
      {requests.map(req => {
        const { _id, firstName, lastName, photoUrl, role } = req.fromUserId
        return (
          <div key={_id} className="flex items-center min-h-[70px] w-full rounded-r-xl rounded-l-[50px] bg-base-300 pl-[8px] pr-[12px] py-[8px] mb-[16px]">
            <figure className="shrink-0">
              <img alt="photo" src={photoUrl} className="w-[60px] h-[60px] min-[678px]:w-[70px] min-[678px]:h-[70px] rounded-full object-cover" />
            </figure>
            <div className="flex-1 px-[12px] text-left">
              <h2 className="font-bold text-[16px] truncate">{firstName + " " + lastName}</h2>
            </div>
            <div className="flex shrink-0 gap-[12px]">
              <button
                onClick={() => handleAcceptOrRejectTheRequest("rejected", req._id)}
                className="btn btn-secondary h-[32px] px-[8px]">
                <ImCross />
              </button>
              <button
                onClick={() => handleAcceptOrRejectTheRequest("accepted", req._id)}
                className="btn btn-primary h-[32px] px-[4px] text-[22px]">
                <TiTick />
              </button>
            </div>
          </div>
        )
      })}

    </div>
  )
}

export default Requests