import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

const isProduction = window.location.hostname !== "localhost";

const SOCKET_URL = isProduction
  ? window.location.origin
  : "http://localhost:3000";

const socketOptions = {
  withCredentials: true,
};

if (isProduction) {
  socketOptions.path = "/api/socket.io";
}

export const SocketContextProvider = ({ children }) => {
  const user = useSelector((state) => state.user);

  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const removeNotification = (id) => {
    const updatedNotificationsArray = notifications.filter(item => item.senderId !== id)
    setNotifications(updatedNotificationsArray)
  }

  useEffect(() => {
    if (!user?._id) return;
    const newSocket = io(SOCKET_URL, socketOptions);

    newSocket.on("connect", () => {
      newSocket.emit("userOnline", { userId: user._id });
    });

    newSocket.on("newMessageNotification", (payload) => {
      setNotifications((prev) => {
        let updatedNotificationsArray = [];
        const existingNotification = prev.some(
          (value) => value.senderId === payload.senderId,
        );
        if (existingNotification) {
          updatedNotificationsArray = prev.map((item) => {
            if (item.senderId === payload.senderId) {
              item.msgCount += 1;
            }
            return item;
          });
        } else {
          updatedNotificationsArray = [...prev, { ...payload, msgCount: 1 }];
        }
        return updatedNotificationsArray;
      });
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
      setSocket(null);
    };
  }, [user?._id]);

  return (
    <SocketContext.Provider value={{ socket, notifications, removeNotification }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  return useContext(SocketContext);
};
