import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useState } from "react";

const defaultPhotoUrl =
  "https://t4.ftcdn.net/jpg/11/68/50/57/360_F_1168505794_IBCEiafsIrHFJ09e65P2vh5115C1XI7e.jpg";

const FeedUserCard = ({ data, showLoader }) => {
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
  const displayName = `${firstName ?? ""} ${lastName ?? ""}`.trim();

  const handleSendOrIgnoreRequest = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/req/send/" + status + "/" + id,
        {},
        { withCredentials: true },
      );
      showLoader()
      dispatch(removeUserFromFeed(id));
    } catch (e) {
      console.dir(e);
    }
  };

  return (
    <div className="mx-auto w-full max-w-[340px] min-[768px]:h-[562px] rounded-[8px]">
      {selfCard && (
        <p className="py-[8px] px-[8px] text-center text-[14px]">
          This is how your card visible to others
        </p>
      )}

      <div className="card bg-base-300 w-full shadow-sm overflow-hidden">
        <figure className="h-[300px] w-full overflow-hidden">
          <img
            src={photoUrl || defaultPhotoUrl}
            alt={displayName || "Profile photo"}
            className="h-full w-full object-cover"
          />
        </figure>
        <div className="card-body p-[16px] text-left">
          <div className="flex items-center min-w-0">
            <h2 className="card-title text-[18px] min-w-0 truncate">
              {displayName}
              {!selfCard && (
                <span className="badge badge-sm badge-soft badge-accent shrink-0">
                  New
                </span>
              )}
            </h2>
          </div>

          {companyName && (
            <p className="text-[14px] break-words">
              <span>{designation}</span>
              {` @ `}
              <span className="font-bold">{companyName}</span>
            </p>
          )}
          {age && gender && (
            <p className="text-[14px]">
              {age}, {gender}
            </p>
          )}

          {about && (
            <p className="mt-[8px] text-[14px] break-words">
              {about.length > 90 ? about.slice(0, 90) + "..." : about}
            </p>
          )}
          <div className="card-actions justify-between mt-[16px] gap-[8px]">
            <button
              type="button"
              disabled={selfCard}
              className="btn btn-secondary min-h-[40px] px-[12px]"
              onClick={() => handleSendOrIgnoreRequest("ignored", _id)}
            >
              Ignore
            </button>

            <button
              type="button"
              disabled={selfCard}
              className="btn btn-primary min-h-[40px] px-[12px]"
              onClick={() => {
                handleSendOrIgnoreRequest("interested", _id)
              }}
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
