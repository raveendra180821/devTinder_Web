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
    <div className="mx-auto flex flex-col w-full max-w-3xl px-4 text-center">
      <h1 className="text-xl font-bold my-10">Requests</h1>
      {requests.map(req => {
        const { _id, firstName, lastName, photoUrl, description } = req.fromUserId
        return (
          <div key={_id} className="flex min-h-20 min-w-0 w-full max-w-200 items-center rounded-r-xl rounded-l-[50px] bg-base-300 px-2 py-2 mb-4">
            <figure className="shrink-0">
              <img alt="photo" src={photoUrl} className="w-16 h-16 rounded-full object-cover" />
            </figure>
            <div className="flex-1 min-w-50 min-[572px]:min-w-75 min-[700px]:min-w-125 min-[800px]:min-w-130 px-3 text-left">
              <h2 className="font-bold">{firstName + " " + lastName}</h2>
              <p className="mt-1 wrap-break-word text-sm">{description}</p>
            </div>
            <div className="ml-auto flex shrink-0 gap-3 px-1">
              <button
                onClick={() => handleAcceptOrRejectTheRequest("rejected", req._id)}
                className="btn btn-secondary h-8 px-2">
                <ImCross />
              </button>
              <button
                onClick={() => handleAcceptOrRejectTheRequest("accepted", req._id)}
                className="btn btn-primary h-8 px-1 text-2xl">
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