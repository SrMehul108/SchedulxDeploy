import { useEffect } from "react";
import { useSocket } from "../../context/SocketContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import "../../App.css";

const NotificationHandler = () => {
  const socket = useSocket();

  useEffect(() => {
    if (!socket) {
      
      return; 
    }

    

    const handleNotification = (data) => {
      
      if (data?.message) {
        toast.info(
          <div className="custom-toast">
            <span className="toast-message">{data.message}</span>
          </div>,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            className: "custom-toast-container",
            progressClassName: "custom-toast-progress",
          }
        );
      }
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
      
    };
  }, [socket]);

  return null; 
};

export default NotificationHandler;