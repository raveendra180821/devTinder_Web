import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { format } from "date-fns"
import images from "../utils/images";
import { useSocket } from "../utils/SocketContext";

const Chat = () => {
  const { targetUserId } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [targetUser, setTargetUser] = useState()
  const loggedInUser = useSelector((state) => state?.user);
  const loggedInUserId = loggedInUser?._id;

  const fetchChatMessages = async (receiverId) => {
    try {
      const res = await axios.get(BASE_URL + "/chat/" + receiverId, {
        withCredentials: true,
      });

      setTargetUser(() => res.data.participants.find((user) => user?._id?.toString() === targetUserId))

      const chatMessages = res.data.messages.map((v) => {
        const { sender, message, timeStamp } = v;
        return {
          senderId: sender._id,
          senderFirstName: sender.firstName,
          senderLastName: sender.lastName,
          message,
          timeStamp,
        };
      });
      setMessages(chatMessages);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchChatMessages(targetUserId);
    fetchChatMessages(targetUserId)

  }, []);

  const socket = useSocket()

  useEffect(() => {
    if (!socket || !loggedInUserId || !targetUserId) return

    const joinChat = () => {

      socket.emit("joinChat", {
        senderName: loggedInUser.firstName,
        senderId: loggedInUserId,
        receiverId: targetUserId,
      });

    }

    const handleReceivedMessage = (payload) => {
      setMessages((prev) => [...prev, payload]);
    }

    socket.connected
      ? joinChat()
      : socket.on("connect", joinChat)

    socket.on("messageRecived", handleReceivedMessage)

    return () => {
      socket.off("connect", joinChat)
      socket.off("messageRecived", handleReceivedMessage)
    }

  }, [socket, loggedInUserId, targetUserId]);

  const handleSendMessage = () => {
    const text = newMessage.trim();
    if (!text || !socket) return;

    socket.emit("sendMessage", {
      senderFirstName: loggedInUser.firstName,
      senderLastName: loggedInUser.lastName,
      senderId: loggedInUserId,
      receiverId: targetUserId,
      message: text,
    });
    setNewMessage("");
  };

  return (
    <div style={{ backgroundImage: `url(${images.chat})` }} className=" flex items-center bg-center bg-cover h-[calc(100dvh-128px)]">
      <div className="mx-auto flex flex-col mt-[10px] h-[90%] w-full max-w-[768px] rounded-lg">
        {targetUser
          &&
          (<div className="flex items-center shrink-0 px-[8px] h-[56px] border-b border-gray-500/75 bg-[#5071b3] min-[768px]:rounded-t-lg ">
            <img
              src={targetUser?.photoUrl || ""}
              alt="profile"
              className="h-[40px] w-[40px] rounded-full object-cover mr-2"
            />
            <h1 className="flex-1 text-[16px] min-w-0 truncate text-left font-bold">{targetUser?.firstName + " " + targetUser?.lastName}</h1>
          </div>)
        }
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden scrollbar-none p-[8px] bg-blue-300/20">
          {messages.map(({ senderId, message, timeStamp }, index) => {
            return (

              <div
                key={index}
                className={`w-fit max-w-[75%] font-medium my-[10px] p-[8px] rounded-t-[14px] ${senderId === loggedInUserId ? "bg-[#387549] rounded-bl-[14px] ml-auto" : "bg-[#5e5959] rounded-br-[14px]"}`}
              >
                <div className="text-[#f0f2f1] text-left wrap-break-word leading-[18px] pr-[20px]">{message}</div>
                <div className="text-[#c9c9c9] font-medium text-[10px] min-[768px]:text-[12px] text-right mt-1 ml-2">{format(timeStamp, "MMM d , h:mm a")}</div>
              </div>
            )
          })}
        </div>
        <form
          className="flex items-center gap-[10px] shrink-0 px-[8px] h-[66px] bg-[#5071b3] min-[768px]:rounded-b-lg"
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
        >
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type message here..."
            className="flex-1 min-w-0 h-[50px] px-[10px] rounded-[6px] outline-none bg-[#3c4a66] text-[#fff] font-medium"
          />
          <button type="submit" className="btn border-none bg-pink-400 h-[50px] px-[20px]">
            Send
          </button>
        </form>
      </div>
    </div>

  );
};

export default Chat;
