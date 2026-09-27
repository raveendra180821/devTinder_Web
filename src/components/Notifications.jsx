import { Link, useNavigate, useParams } from "react-router-dom";
import { useSocket } from "../utils/SocketContext";

const Notifications = ({ data }) => {
  const { senderId, senderFirstName, senderLastName, msgCount } = data;

  const {removeNotification} = useSocket()
  const navigate = useNavigate()

  return (
    <li onClick={() => {
      removeNotification(senderId)
      navigate(`chat/${senderId}`)
    }}
    className="group mt-2 text-[12px] font-medium text-[#102859] bg-blue-200 hover:bg-[#102859] hover:text-white duration-300 rounded-md">
      <div>
        <p className="truncate">{senderFirstName + " " + senderLastName}</p>
        <span className="group-hover:bg-white group-hover:text-[#102859] font-bold ml-auto mr-3 px-2 bg-[#102859] text-white rounded-full">
          {msgCount}
        </span>
      </div>
    </li>
  );
};

export default Notifications;
