import React from "react";
import { Icons } from "../../../constants/icons";

const Insta = ({ previewImage, postContent }) => {
  if (!previewImage && !postContent) {
    return null;
  }

  return (
    <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-5 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4 dark:bg-ScocilMCompnent dark:text-white">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            className="w-10 h-10 rounded-full"
            alt="user"
          />
          <span className="mx-2 font-semibold">John Doe</span>
        </div>
        <div>
          <span className="text-black">{Icons.elips}</span>
        </div>
      </div>

      {previewImage && (
        <div className="p-1 mt-2">
          <img
            src={previewImage}
            className="rounded-lg w-full"
            alt="preview"
          />
        </div>
      )}
      {/* Footer Section */}
      <div className="flex flex-wrap w-full justify-between items-center px-2 py-2">
        {/* Left Section */}
        <div className="flex space-x-3 items-center">
          <span className="cursor-pointer w-4 h-4">{Icons.heart}</span>
          <span className="cursor-pointer w-4 h-4">{Icons.message}</span>
          <span className="cursor-pointer w-4 h-4">{Icons.send}</span>
        </div>
        {/* Right Section */}
        <div>
          <span className="cursor-pointer">{Icons.bookmark}</span>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-3 py-2">
        <p className="text-slate-500 break-words">{postContent}</p>
      </div>
    </div>
  );
};

export default Insta;