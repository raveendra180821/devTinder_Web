import { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

const SocketContext = createContext(null)

const isProduction = window.location.hostname !== "localhost"

const SOCKET_URL = isProduction ? window.location.origin : "http://localhost:3000"

const socketOptions = {
    withCredentials: true
}

if (isProduction) {
    socketOptions.path = "/api/socket.io"
}

export const SocketContextProvider = ({ children }) => {

    const user = useSelector(state => state.user)

    const [socket, setSocket] = useState(null)

    useEffect(() => {

        if (!user?._id) return

        const newSocket = io(SOCKET_URL, socketOptions)

        newSocket.on("connect", () => {
            newSocket.emit("userOnline", {userId: user._id})
        })

        setSocket(newSocket)

        return () => {
            newSocket.disconnect()
            setSocket(null)
        }
    }, [user?._id])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => {
    return useContext(SocketContext)
}