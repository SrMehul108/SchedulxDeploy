import React, { useState } from "react";
import { Icons } from "../../constants";
import api from "../../apis/api"; 
import "./calender.css";

const Menu1 = ({ postId, onDelete, postStatus, onMoveToDraft }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMoveToDrafts = async () => {
    try {
      
      const response = await api.put(`/api/v1/post/post-update/${postId}`, {
        status: "draft",
      });
      if (response.data.success) {
        
        if (onMoveToDraft) onMoveToDraft(postId); 
      } else {
        console.error("Failed to move post to drafts:", response.data.error);
        alert("Failed to move post to drafts. Please try again.");
      }
    } catch (error) {
      console.error("Error moving post to drafts:", error);
      alert("Error moving post to drafts.");
    } finally {
      setIsOpen(false); 
    }
  };

  const handleDelete = async () => {
    try {
      const response = await api.delete(`/api/v1/post/post-delete/${postId}`);
      if (response.data.success) {
        
        if (onDelete) onDelete(postId);
      } else {
        console.error("Failed to delete the post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setIsOpen(false); 
    }
  };

  return (
    <div className="relative dropdown inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="px-2 py-2 border rounded-xl hover:bg-slate-50 flex items-center fc-button-primary dark:bg-bgbutton  dark:border-borderDarkmode"
      >
        {Icons.menu}
      </button>

      {isOpen && (
        <div className="absolute calendebutton3 right-0 mt-1 w-auto z-10 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg max-w-xs md:max-w-sm dark:bg-bgbutton dark:border-borderDarkmode dark:text-white">
          <div className="px-1 py-2 w-[200px] space-y-2">
            {postStatus !== "draft" && postStatus !== "posted" && (
              <button
                 className=" hover:bg-gray-200 cursor-pointer px-2 py-1 rounded flex items-center text-sm md:text-base w-full text-left dark:text-white dark:hover:bg-gray-800"
                onClick={handleMoveToDrafts}
              >
                <span>{Icons.draft}</span>
                <span className="mx-1 dark:text-white">Move To Drafts</span>
              </button>
            )}
            <button
               className="text-red-700 hover:bg-red-100 cursor-pointer px-2 py-1 rounded flex items-center text-sm md:text-base w-full text-left hover:text-red-800 dark:hover:bg-gray-800 dark:text-white dark:hover:text-red-500"
              onClick={handleDelete}
            >
              {Icons.delate}
              <span className="mx-1">Delete</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu1;