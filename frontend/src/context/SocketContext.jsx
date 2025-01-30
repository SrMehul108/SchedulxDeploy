import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://twitter-1-msth.onrender.com";
    const backendUrl = import.meta.env.VITE_BACKEND_URL || "https://schedulx-backend-ybdo.onrender.com";

    const newSocket = io(backendUrl, { withCredentials: true });

    setSocket(newSocket);

    // Cleanup socket on unmount
    return () => {
      if (newSocket) {
        newSocket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    if (socket) {
      const userId = localStorage.getItem("userId"); // Get logged-in user ID from localStorage

      if (userId) {
        socket.emit("join", userId); // User joins their private room
      }

      socket.on("notification", (data) => {
        if (data.receiverId === userId) {
          // Show notification only if receiverId matches the logged-in userId
          console.log("New Notification:", data.message);
        }
      });

      return () => {
        socket.off("notification");
      };
    }
  }, [socket]); // Log when socket state updates

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (socket === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return socket;
};
