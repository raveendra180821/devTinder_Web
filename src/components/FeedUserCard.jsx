import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const FeedUserCard = ({ data }) => {
  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    age,
    about,
    gender,
    companyName,
    designation,
    selfCard,
  } = data;
  const dispatch = useDispatch();

  const handleSendOrIgnoreRequest = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/req/send/" + status + "/" + id,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(id));
    } catch (e) {
      console.dir(e);
    }
  };

  return (
    <div className="bg-gray-700 rounded-t-lg rounded-b-xl">
      {selfCard && (
        <p className=" py-2 text-center text-sm">
          This is how your card visible to others
        </p>
      )}
      <div className="card bg-base-300 w-85 shadow-sm h-full max-h-[540px]">
        <figure className="h-2/3">
          <img
            src={photoUrl}
            alt="Photo"
            className="min-h-[300px] w-full object-cover "
          />
        </figure>
        <div className="card-body">
          <div className="flex items-center">
            <h2 className="card-title">
              {firstName + " " + lastName}
              <span className="badge badge-sm badge-soft badge-accent">
                New
              </span>
            </h2>
          </div>

          {companyName && (
            <div>
              <span>{designation}</span>
              {` @ `}
              <span className="font-bold">{companyName}</span>
            </div>
          )}
          {age && gender && (
            <p>
              {age}, {gender}
            </p>
          )}

          {about && (
            <p className="mt-2">
              {about.length > 90 ? about.slice(0, 90) + "..." : about}
            </p>
          )}
          <div className="card-actions justify-between mt-6">
            <button
              disabled={selfCard && true}
              className="btn btn-secondary"
              onClick={() => handleSendOrIgnoreRequest("ignored", _id)}
            >
              Ignore
            </button>

            <button
              disabled={selfCard && true}
              className="btn btn-primary"
              onClick={() => handleSendOrIgnoreRequest("interested", _id)}
            >
              Send Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedUserCard;
