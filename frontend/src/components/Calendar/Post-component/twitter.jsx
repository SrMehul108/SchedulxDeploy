import React from "react";

const Twitter = ({ previewImage, postContent = "", data = {} }) => {
  const userName = data?.user?.name || "John Doe"; 
  const profileImage =
    data?.user?.twitter?.profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  if (!previewImage && !postContent) {
    return null;
  }

  return (
    <div className="bg-white shadow-[0_4px_12px_-5px_rgba(0,0,0,0.4)] p-5 w-full max-w-sm rounded-lg font-[sans-serif] overflow-hidden mx-auto mt-4 dark:bg-ScocilMCompnent dark:text-white">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <img
            src={profileImage}
            className="w-10 h-10 rounded-full"
            alt={`${userName}'s Profile`}
          />
          <div>
            <p className="mx-2 font-semibold">{userName}</p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      {postContent && (
        <p className="truncate break-words px-2 mt-2">{postContent}</p>
      )}

      {/* Image Section */}
      {previewImage && (
        <div className="p-1 mt-2">
          <img
            src={previewImage}
            alt="Preview of the post"
            className="rounded-lg w-full"
          />
        </div>
      )}
    </div>
  );
};

export default Twitter;