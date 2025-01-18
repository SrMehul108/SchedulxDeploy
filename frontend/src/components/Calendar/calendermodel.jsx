import React, { useState } from "react";
import Menu1 from "./menudots";
import { Icons } from "../../constants";
import ShareButton from "./sharebutton";
import api from "../../apis/api";
import { Link } from "react-router-dom";

const InputCalendar = ({ props, value, onChange, placeholder }) => {
  const currentDateTime = new Date().toISOString().slice(0, 16);

  return (
    <input
      type="datetime-local"
      value={value}
      onChange={onChange}
      min={currentDateTime}
      className="w-full px-3 py-2 border mt-5 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-bgCopnents dark:text-white"
      placeholder="Schedule Date & Time"
      {...props}
    />
  );
};

const CalenderModel = ({ isOpen, onClose, event, onDelete, onEdit }) => {

  const [rescheduleTime, setRescheduleTime] = useState("");
  const [showInputCalendar, setShowInputCalendar] = useState(false);

  if (!isOpen || !event) return null;

  console.log("Particular event", event);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // const scheduledTime = event.extendedProps.post.scheduledTime;
  // const formattedDate = scheduledTime.toLocaleDateString([], {
  //   year: "numeric",
  //   month: "short",
  //   day: "numeric",
  // });
  // const formattedTime = scheduledTime.toLocaleTimeString([], {
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   hour12: true,
  // });

  const scheduledTime = event.extendedProps.post.scheduledTime;

  // Initialize datePart and formattedTime
  let datePart = null;
  let formattedTime = null;

  if (scheduledTime) {
    // Extract the date and time parts
    const [date, time] = scheduledTime.split("T"); // Splits 'YYYY-MM-DDTHH:mm:ss' format
    datePart = date; // Set datePart
    formattedTime = time ? time.slice(0, 5) : null; // Set formattedTime as 'HH:mm'
  } else {
    console.error("scheduledTime is undefined or invalid:", scheduledTime);
  }

  const platformName = event.extendedProps.platformName.toLowerCase();
  const postId =
    event.extendedProps.post.platformSpecific[platformName]?.postId;
  console.log(postId, platformName);

  const platformUrls = {
    linkedin: `https://www.linkedin.com/feed/update/${postId}`,
    xtwitter: `https://twitter.com/user/status/${postId}`,
  };

  const redirectUrl = platformUrls[platformName] || "#";
  const analytics = event.extendedProps.post.analytics[0] || {};
  const comments = analytics.comment || 0;
  const engagements = analytics.engagements || 0;
  const impressions = analytics.impressions || 0;
  const likes = analytics.like || 0;
  const shares = analytics.share || 0;

  const updatePostStatus = async (status) => {
    try {
      const response = await fetch(
        `${backendUrl}/posts/${event.extendedProps.post._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );
      const data = await response.json();
      if (data.success) {
        onClose();
      } else {
        console.log(data.error)
      }
    } catch (error) {
      console.error("Error updating post status:", error);
    }
  };

  const handleMoveToDraft = () => {
    updatePostStatus("draft");
  };

  const handleReschedule = async () => {
    if (!rescheduleTime) {
      alert("Please select a valid reschedule time.");
      return;
    }

    console.log("Rescheduling", event.extendedProps.post);

    try {
      const payload = {
        postId: event.extendedProps.post._id,
        socialMediaId: event.extendedProps.post.platformSpecific.linkedin.socialMediaId,
        scheduledTime: rescheduleTime,
        status: "scheduled",
      };

      console.log("Payload being sent:", payload);

      const response = await api.put("/api/v1/post/post-schedule-time", payload);

      if (response.data.success) {
        setShowInputCalendar(false);
        onClose();
      } else {
        alert(`Error: ${response.data.error}`);
      }
    } catch (error) {
      console.error("Error rescheduling post:", error);

      if (error.response) {
        console.error("Server Response:", error.response.data);
      } else {
        alert("An error occurred while rescheduling. Please try again.");
      }
    }
  };


  return (
    <div className="fixed z-[2147483647] rounded-2xl inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif] px-2 py-1">
      <div className="w-auto max-w-lg bg-white shadow-lg relative rounded-2xl dark:bg-bgCopnents">
        {/* Close Button */}
        <div className="flex justify-end py-2 me-6 mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
            viewBox="0 0 320.591 320.591"
            onClick={onClose}
          >
            <path d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"></path>
            <path d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"></path>
          </svg>
        </div>

        {/* Event Box */}
        <div className="event-box z-[2147483647] p-2 bg-white text-black h-auto rounded-2xl shadow-lg dark:bg-bgCopnents dark:text-white">
          {/* Content */}
          <div className="user-profile flex justify-between px-2 border-b pb-3">
            <div className="user-img flex relative">
              <img
                src="https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                alt="user-img"
                className="w-16 h-16 object-cover rounded-full"
              />
              <div className="child-img">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpF7etH_u0DYh8Nsksf8rRdUiys8ZM2TCOjA&s"
                  alt="child-img"
                />
              </div>
            </div>
            <h3 className="px-2">{event.extendedProps.platformName}</h3>
            <div className="flex items-center p-1">
              {Icons.clock}
              <span className="mx-1">
                {datePart} at {formattedTime}
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="main-content grid grid-cols-1 md:grid-cols-2 gap-5 mt-3">
            <div className="p-3">
              <p className="text-justify">{event.title}</p>
            </div>
            <div>
              {event.status === "draft" || event.status === "scheduled" || event.status === "failed" ? (
                <img
                  src={`${backendUrl}/${event.extendedProps.imageUrl}`}
                  alt="event-box-img"
                  className="event-box-img p-2 rounded-2xl"
                />
              ) : (
                <img
                  src={event.extendedProps.imageUrl}
                  alt="event-box-img"
                  className="event-box-img p-2 rounded-2xl"
                />
              )}
            </div>
          </div>

          {/* Footer Box */}
          <div className="footer-box grid grid-cols-1">
            <div className="flex flex-wrap justify-center w-full lg:gap-5 md:gap-4 sm:gap-1 items-center p-3 mt-5">
              <div className="text-center font-medium">
                <div className="relative w-max group mx-auto">
                  <button
                    type="button"
                    className="px-6 py-2.5 rounded  text-sm tracking-wider font-semibold border-none outline-none group-hover:text-blue-500"
                  >
                    {Icons.bar}
                  </button>
                  <div className="max-w-xs absolute  hidden group-hover:block bg-slate-200 text-black font-semibold px-3 py-[6px] text-[13px] right-0 -left-2.5 mx-auto w-max -top-6 before:w-4 before:h-4 before:rotate-45 before:bg-slate-200 before:absolute before:z-[-1] before:-bottom-1 before:left-0  before:right-0 before:mx-auto rounded-xl">
                    Impressions
                  </div>
                </div>
                <div>{impressions}</div>
              </div>
              <div className="text-center font-medium">
                <div className="relative w-max group mx-auto">
                  <button
                    type="button"
                    className="px-6 py-2.5 rounded  text-sm tracking-wider font-semibold border-none outline-none group-hover:text-green-500"
                  >
                    {Icons.comment}
                  </button>
                  <div className="max-w-xs absolute  hidden group-hover:block bg-slate-200 text-black font-semibold px-3 py-[6px] text-[13px] -right- -left-2 mx-auto w-max -top-6 before:w-4 before:h-4 before:rotate-45 before:bg-slate-200 before:absolute before:z-[-1] before:-bottom-1 before:left-0  before:right-0 before:mx-auto rounded-xl">
                    Comments
                  </div>
                </div>
                <div>{comments}</div>
              </div>
              <div className="text-center font-medium">
                <div className="relative w-max group mx-auto">
                  <button
                    type="button"
                    className="px-6 py-2.5 rounded  text-sm tracking-wider font-semibold border-none outline-none group-hover:text-pink-500"
                  >
                    {Icons.engagements}
                  </button>
                  <div className="max-w-xs absolute  hidden group-hover:block bg-slate-200 text-black font-semibold px-3 py-[6px] text-[13px] -right-2 -left-3.5 mx-auto w-max -top-6 before:w-4 before:h-4 before:rotate-45 before:bg-slate-200 before:absolute before:z-[-1] before:-bottom-1 before:left-0  before:right-0 before:mx-auto rounded-xl">
                    Engagements
                  </div>
                </div>
                <div>{engagements}</div>
              </div>
              <div className="text-center font-medium">
                <div className="relative w-max group mx-auto">
                  <button
                    type="button"
                    className="group px-6 py-2.5 rounded text-sm tracking-wider font-semibold border-none outline-none text-current group-hover:text-red-500"
                  >
                    {Icons.heart}
                  </button>

                  <div className="max-w-xs absolute  hidden group-hover:block bg-slate-200 text-black font-semibold px-3 py-[6px] text-[13px] -right-1 left-0 mx-auto w-max -top-6 before:w-4 before:h-4 before:rotate-45 before:bg-slate-200 before:absolute before:z-[-1] before:-bottom-1 before:left-0  before:right-0 before:mx-auto rounded-xl">
                    Likes
                  </div>
                </div>
                <div>{likes}</div>
              </div>
              <div className="text-center font-medium">
                <div className="relative w-max group mx-auto">
                  <button
                    type="button"
                    className="px-6 py-2.5 rounded  text-sm tracking-wider font-semibold border-none outline-none group-hover:text-lime-400"
                  >
                    {Icons.send}
                  </button>
                  <div className="max-w-xs absolute  hidden group-hover:block bg-slate-200 text-black font-semibold px-3 py-[6px] text-[13px] -right-2 left-0 mx-auto w-max -top-6 before:w-4 before:h-4 before:rotate-45 before:bg-slate-200 before:absolute before:z-[-1] before:-bottom-1 before:left-0  before:right-0 before:mx-auto rounded-xl">
                    Shares
                  </div>
                </div>
                <div>{shares}</div>
              </div>
            </div>
            {(event.status === "scheduled" || event.status === "failed") && (
              <div className="p-3">
                {showInputCalendar && (
                  <InputCalendar
                    value={rescheduleTime}
                    onChange={(e) => setRescheduleTime(e.target.value)}
                    placeholder="Reschedule Date & Time"
                  />
                )}
              </div>
            )}
            <div className="flex justify-between items-center p-2">
              <div>
                <span className="border rounded-3xl bg-slate-200 px-4 py-1 capitalize dark:bg-bgbutton dark:border-borderDarkmode">
                  {event.status}
                </span>
              </div>
              {/* calendar modal */}
              <div className="flex items-center">
                {postId && (
                  <>
                    <ShareButton redirectUrl={redirectUrl} />
                    <Link
                      to={redirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2 py-2 border rounded-xl hover:bg-slate-50 flex items-center justify-center space-x-1 mx-3 dark:bg-bgbutton dark:border-borderDarkmode"
                    >
                      {Icons.redirect}
                      <span className="text-sm font-medium">
                        View on Platform
                      </span>
                    </Link>
                  </>
                )}
                {(event.status === "scheduled" || event.status === "failed") && (
                  <button
                    onClick={() => {
                      if (showInputCalendar) {
                        handleReschedule();
                      } else {
                        setShowInputCalendar(true);
                      }
                    }}
                    className="px-2 py-2 border rounded-xl hover:bg-slate-50 flex items-center justify-center space-x-1 mx-3 dark:bg-bgbutton dark:border-borderDarkmode"
                  >
                    {showInputCalendar ? "Update Schedule" : "Reschedule"}
                  </button>
                )}

                {event.status === "draft" && (
                  <button
                    className="px-2 py-2 border rounded-xl hover:bg-slate-50 flex items-center justify-center space-x-1 mx-3 dark:bg-bgbutton  dark:border-borderDarkmode"
                    onClick={() => {
                      onEdit(event);
                      onClose(event);
                    }}
                  >
                    {Icons.pen}
                  </button>
                )}
                <Menu1
                  postId={event.extendedProps.post._id}
                  onDelete={onDelete}
                  postStatus={event.extendedProps.post.status}
                  onMoveToDraft={(draftedPostId) => {
                    console.log(`Post ${draftedPostId} moved to drafts`);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalenderModel;