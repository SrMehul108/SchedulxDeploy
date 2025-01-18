import { useState } from "react";
import DeleteModal from "../../DeleteModal/DeleteModal";
import api from "../../../apis/api";

export const ChannelCard = ({ id, name, type, icon, isActive, onAdd }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleDelete = async () => {
    try {
      const response = await api.delete(
        `/api/v1/socialmedia/socialmedia-delete/${id}`
      );
      if (response.status === 200) {
        onAdd(); 
        setIsModalOpen(false);
      } else {
        console.error("Failed to delete item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md dark:bg-ScocilMCompnent dark:text-white dark:border-borderDarkmode gap-4">
    <div className="flex items-center gap-3 w-full sm:w-auto">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-lg">
        {icon}
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 dark:text-white text-center sm:text-left">
          {name}
        </h3>
        <p className="text-gray-500 text-sm dark:text-white text-center sm:text-left">
          {type}
        </p>
      </div>
    </div>
    <div className="flex items-center gap-4 w-full sm:w-auto justify-center sm:justify-end">
      {isActive ? (
        <span
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 px-3 py-1 text-sm font-semibold text-white shadow-lg transform transition-transform hover:scale-105 w-28 justify-center cursor-pointer"
          onClick={handleOpenModal}
        >
          Connected
        </span>
      ) : (
        <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-400 to-red-600 px-3 py-1 text-sm font-semibold text-white shadow-lg transform transition-transform hover:scale-105 w-28 justify-center">
          Pending
        </span>
      )}
    </div>
    {isModalOpen && (
      <DeleteModal onClose={handleCloseModal} onDelete={handleDelete} />
    )}
  </div>
  
  );
};

export default ChannelCard;