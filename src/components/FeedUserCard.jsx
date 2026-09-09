import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useDispatch } from "react-redux"
import { removeUserFromFeed } from "../utils/feedSlice"

const FeedUserCard = ({ data }) => {

  const { _id, firstName, lastName, photoUrl, description, gender, disableButton } = data
  const dispatch = useDispatch()

  const handleSendOrIgnoreRequest = async (status, id) => {
    try {
      const res = await axios.post(BASE_URL + "/req/send/" + status + "/" + id, {}, { withCredentials: true })
      dispatch(removeUserFromFeed(id))
    }
    catch (e) {
      console.dir(e)
    }

  }

  return (
    <div className="card bg-base-300 w-96 shadow-sm h-150">
      <figure className="h-2/3">
        <img
          src={photoUrl}
          alt="Photo"
          className="w-full h-full"
        />
      </figure>
      <div className="card-body">
        <div className="flex items-center">
          <h2 className="card-title">
            {firstName + " " + lastName}
            {gender && <span className="badge badge-sm badge-soft badge-accent">{gender}</span>}
          </h2>
        </div>

        <p>{description}</p>
        <div className="card-actions justify-between mt-6">
          <button
            disabled={disableButton}
            className="btn btn-secondary"
            onClick={() => handleSendOrIgnoreRequest("ignored", _id)}
          >
            Ignore
          </button>

          <button
            disabled={disableButton}
            className="btn btn-primary"
            onClick={() => handleSendOrIgnoreRequest("interested", _id)}
          >
            Send Request</button>
        </div>
      </div>
    </div>
  )
}

export default FeedUserCard