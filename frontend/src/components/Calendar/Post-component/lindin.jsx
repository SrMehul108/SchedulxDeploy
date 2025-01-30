import React from "react";
import { Icons } from "../../../constants/icons";

const Linkdin = ({ previewImage, postContent, data = {} }) => {
  const userName = data?.user?.name || "John Doe"; 
  const profileImage =
    data?.user?.twitter?.profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png";
  if (!previewImage && !postContent) {
    return null;
  }
  console.log("data", data);
  return (
    <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-5 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4 dark:bg-ScocilMCompnent dark:text-white">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={profileImage}
            className="w-10 h-10 rounded-full"
            alt="user"
          />
          <div>
            <p className="mx-2 font-semibold">{userName}</p>
            <div className="mx-2 flex text-xs text-slate-500">
              1h <span className="px-1">{Icons.earth}</span>
            </div>
          </div>
        </div>
        <div>
          <span className="text-black">{Icons.elips}</span>
        </div>
      </div>

      {previewImage && (
        <div className="p-1 mt-2">
          <img src={previewImage} className="rounded-lg w-full" />
        </div>
      )}

      {/* Footer Section */}
      <div className="flex flex-wrap w-full justify-between items-center px-2 py-2">
        {/* Like Section */}
        <div className="cursor-pointer w-12 h-12 text-xs text-center flex flex-col items-center">
          <span>{Icons.thumsup}</span>
          <p>Like</p>
        </div>

        {/* Comment Section */}
        <div className="cursor-pointer w-12 h-12 text-xs text-center flex flex-col items-center">
          <span>{Icons.comment}</span>
          <p>Comment</p>
        </div>

        {/* Repost Section */}
        <div className="cursor-pointer w-12 h-12 text-xs text-center flex flex-col items-center">
          <span>{Icons.repeat}</span>
          <p>Repost</p>
        </div>

        {/* Send Section */}
        <div className="cursor-pointer w-12 h-12 text-xs text-center flex flex-col items-center">
          <span>{Icons.send}</span>
          <p>Send</p>
        </div>
      </div>

      <div className="flex items-center px-2 py-2">
        <div className="flex justify-between w-full items-start">
          <div className="flex flex-col items-start w-full">
            <div className="mx-2 text-[10px] text-gray-600 break-words overflow-hidden">
              <p className="truncate w-40 break-words text-lg">{postContent}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Linkdin;