import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://twitter-1-msth.onrender.com";
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://schedulx-backend-gj3k.onrender.com";

    const newSocket = io(backendUrl, { withCredentials: true });
    console.log("Initializing Socket:", newSocket); // Log the new socket instance

    setSocket(newSocket);

    // Cleanup socket on unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect();
        console.log("Socket Disconnected");
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      console.log("Socket Connected:", socket);
    }
  }, [socket]); // Log when socket state updates
  
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};


export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (socket === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return socket;
};
