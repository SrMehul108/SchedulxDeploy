import React from "react";
import { Icons } from "../../../constants/icons";

const Printset = ({ previewImage, postContent }) => {
  if (!previewImage && !postContent) {
    return null;
  }
  return (
    <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-5 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4 dark:bg-ScocilMCompnent dark:text-white">
      {/* Image Section */}
      {previewImage && (
        <div className="p-1 mt-2">
          <img src={previewImage} className="rounded-lg w-full" />
        </div>
      )}
      {/* Footer Section */}
      <p className="truncate  break-words px-2">{postContent}</p>
      <div className="flex items-center px-2 py-2">
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          className="w-7 h-7 rounded-full"
          alt="user"
        />
        <div className="flex justify-between w-full items-center">
          {/* Left Section: User Info */}
          <div className="flex flex-col items-start">
            <div className="flex items-center">
              <span className="mx-2 font-semibold">John Doe</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Printset;