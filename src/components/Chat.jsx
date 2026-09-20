import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const connections = useSelector((state) => state?.connections) || [];
  const targetUser = connections.find((user) => user._id === targetUserId);
  const loggedInUser = useSelector((state) => state?.user);
  const loggedInUserId = loggedInUser?._id;

  const fetchChatMessages = async (recieverId) => {
    try {
      const res = await axios.get(BASE_URL + "/chat/" + recieverId, {
        withCredentials: true,
      });

      const chatMessages = res.data.map((v) => {
        const { sender, message } = v;
        return {
          senderFirstName: sender.firstName,
          senderLastName: sender.lastName,
          message: message,
        };
      });
      setMessages(chatMessages);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchChatMessages(targetUserId);
    console.log(messages);
  }, []);

  useEffect(() => {
    if (!loggedInUser) return;

    const socket = io(BASE_URL);

    socket.emit("joinChat", {
      senderName: loggedInUser.firstName,
      senderId: loggedInUserId,
      recieverId: targetUserId,
    });

    socket.on(
      "messageRecived",
      ({ senderFirstName, senderLastName, message }) => {
        setMessages((prevState) => [
          ...prevState,
          { senderFirstName, senderLastName, message },
        ]);
      },
    );

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSendMessage = () => {
    if (!newMessage) return;
    if (!loggedInUser) return;

    const socket = io(BASE_URL);

    socket.emit("sendMessage", {
      senderFirstName: loggedInUser.firstName,
      senderLastName: loggedInUser.lastName,
      senderId: loggedInUserId,
      recieverId: targetUserId,
      message: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="mx-auto flex flex-col h-[80%] w-[40%] border border-gray-500/75">
      <div className="flex items-center px-2 h-[10%] border-b border-gray-500/75 ">
        <img
          src={targetUser?.photoUrl || ""}
          alt="profile"
          className="h-[75%] rounded-full mr-2"
        />
        <h1>{targetUser?.firstName + " " + targetUser?.lastName}</h1>
      </div>
      <div className="p-2 h-[80%] overflow-hidden">
        {messages.map(({ senderFirstName, senderLastName, message }, index) => (
          <div
            key={index}
            className={
              senderFirstName === loggedInUser.firstName
                ? "max-w-3/4 ml-auto"
                : "max-w-3/4"
            }
          >
            <div
              className={
                senderFirstName === loggedInUser.firstName
                  ? "chat chat-end"
                  : "chat chat-start"
              }
            >
              <div className=" chat-bubble ml-0 text-left">{message}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center h-[10%] border-t border-gray-500/75 px-3">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type message here..."
          className="p-4 flex-1 mr-4 border border-gray-500/75 rounded-md h-[70%]"
        />
        <button onClick={handleSendMessage} className="btn btn-primary">
          send
        </button>
      </div>
    </div>
  );
};

export default Chat;
