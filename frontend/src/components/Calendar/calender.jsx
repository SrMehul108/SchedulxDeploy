import React, { useEffect, useState } from "react";
import "@fullcalendar/react/dist/vdom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment-timezone";
import "./calender.css";
import { Icons } from "../../constants/icons";
import DropdownButton from "./multibutton";
import CalenderModel from "./calendermodel";
import api from "../../apis/api";
import EditPost from "./editPost/EditPost";
import Loading from "../loader/loader";
import { Link } from "react-router-dom";

const CustomEvent = ({ event, onOpenModal }) => {
  const { title, extendedProps } = event;
  const platformName = extendedProps.platformName.toLowerCase();
  const postId = extendedProps?.platformSpecific?.postId;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Determine the platform-specific URL
  const platformUrls = {
    linkedin: `https://www.linkedin.com/feed/update/${postId}`,
    xtwitter: `https://twitter.com/user/status/${postId}`,
  };

  const redirectUrl = platformUrls[platformName] || "#";

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(darkModeQuery.matches);
    darkModeQuery.addEventListener("change", (e) => {
      setIsDarkMode(e.matches);
    });
  }, []);

  return (
    <div
      className={`p-2 flex gap-2 items-center rounded-md  shadow-sm hover:bg-gray-100 transition-all w-[100%] ${extendedProps.post.status === "posted"
          ? "bg-gray-200 dark:bg-bgbutton dark:text-black"
          : "bg-white dark:bg-[#475569] dark:border-borderDarkmode"
        }`}
      onClick={() => onOpenModal(event.id)}
    >
      {/* Event Image */}
      <div className="flex items-center justify-center rounded-full overflow-hidden w-9 h-9">
        <Link to={redirectUrl} target="_blank" rel="noopener noreferrer">
          {extendedProps.status === "draft" ||
            extendedProps.status === "scheduled" ? (
            <img
              src={`${backendUrl}/${extendedProps.imageUrl}`}
              alt={title}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          ) : (
            <img
              src={extendedProps.imageUrl}
              alt={title}
              className="object-cover w-full h-full"
              loading="lazy"
            />
          )}
        </Link>
      </div>
      {/* Event Title */}
      <div className="truncate text-sm font-medium text-gray-900 dark:text-white">
        {title.length > 20 ? `${title.substring(0, 20)}...` : title}
      </div>
    </div>
  );
};

function Calendar({ userData }) {
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [popUpOpen, setPopUpOpen] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All Posts");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPostData, setEditPostData] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1025);
  const [isPosting, setIsPosting] = useState(false); // State to manage loader visibility

  const handleEdit = (event) => {
    setEditPostData(event);
    setIsEditModalOpen(true);
  };

  const openPopup = () => {
    setPopUpOpen(!popUpOpen);
  };

  const closePopup = () => {
    setPopUpOpen(false);
  };

  const openModal = (eventId) => {
    setSelectedEventId(eventId);
  };

  const closeModal = () => {
    setSelectedEventId(null);
  };

  const fetchEvents = async () => {
    setIsPosting(true);
    try {
      const response = await api.get("/api/v1/post/posts-get");
      const apiData = response.data.data;

      let filteredPosts = apiData.flatMap((platform) =>
        platform.posts.map((post) => {
          const platformSpecific = post.platformSpecific[platform.platformName];
          return {
            id: post._id,
            title:
              platformSpecific.text || platformSpecific.content || "No Title",
            date: new Date(post.scheduledTime).toISOString(),
            status: post.status,
            extendedProps: {
              imageUrl:
                platformSpecific.mediaUrls?.[0] ||
                "https://via.placeholder.com/150",
              platformSpecific,
              post,
              platformName: platform.platformName,
            },
          };
        })
      );

      if (selectedFilter !== "All Posts") {
        filteredPosts = filteredPosts.filter(
          (event) => event.status === selectedFilter.toLowerCase()
        );
      }

      setEvents(filteredPosts);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsPosting(false);
    }
  };



  useEffect(() => {
    fetchEvents();
  }, [selectedFilter]);

  const fetchData = () => {
    fetchEvents();
  };

  const handleDeletePost = (deletedId) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== deletedId)
    );
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const tagItems1 = [
    { label: "All Posts" },
    { label: "Draft" },
    { label: "Scheduled" },
    { label: "Posted" },
  ];

  const [selectedPost, setSelectedPost] = useState("Post");

  const handleEventDrop = async (info) => {
    const newDate = moment(info.event.startStr).toISOString();
    const eventId = info.event.id;


    const updatedEvent = events.find((event) => event.id === eventId);
    const socialMediaId =
      updatedEvent?.extendedProps?.platformSpecific?.socialMediaId;
    const eventStatus = updatedEvent?.extendedProps?.status;

    if (!updatedEvent || !socialMediaId) {
      console.error("Event or Social Media ID not found");
      info.revert();
      return;
    }

    try {
      const response = await api.put("/api/v1/post/post-schedule-time", {
        postId: eventId,
        socialMediaId,
        scheduledTime: newDate,
      });

      if (response.data.success) {
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId ? { ...event, date: newDate } : event
          )
        );
      } else {
        console.error("Failed to update scheduled time:", response.data.error);
        info.revert();
      }
    } catch (error) {
      console.error("Error updating scheduled time:", error);
      info.revert();
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div className="cal">
        {/* <Loading/> */}
        <div className="calende-hader flex flex-wrap justify-between py-3">
          {/* Custom Header */}
          <div className="user-profile flex justify-center px-2">
            <div className="user-img">
              <img
                src="https://plus.unsplash.com/premium_photo-1683121366070-5ceb7e007a97?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
                alt="user-img"
                loading="lazy"
              />
            </div>
            <div className="flex justify-center items-center">
              <h3 className="px-2 ms-3 text-slate-600 dark:text-white">
                {userData?.user?.name || "User"}
              </h3>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center space-x-4 p-2 head-btn">
            {!isMobile && (
              <DropdownButton
                label="Post"
                icon={Icons.copy}
                items={tagItems1}
                selectedLabel={selectedFilter}
                onSelect={(filter) => {
                  setSelectedFilter(filter);
                  fetchEvents();
                }}
              />
            )}
          </div>
        </div>

        

          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={isMobile ? "timeGridDay" : "dayGridMonth"}
            headerToolbar={{
              start: isMobile ? "prev,next" : "prev,today,next",
              center: isMobile ? "" : "title",
              end: isMobile
                ? "timeGridDay,timeGridWeek"
                : "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            height="auto"
            // events={events}
            events={events} 
            editable={true}
            droppable={true}
            eventOverlap={true}
            timeZone="Asia/Kolkata"
            slotEventOverlap={false}
            eventDrop={(info) => {
              const isPastEvent = moment(info.event.start).isBefore(
                moment(),
                "day"
              );
              const isPosted = info.event.extendedProps.status === "posted";

              if (isPastEvent || isPosted) {
                info.revert();
              } else {
                handleEventDrop(info);
              }
            }}
            eventClick={(info) => openModal(info.event.id)}
            eventContent={(info) => (
              <CustomEvent event={info.event} onOpenModal={openModal} />
            )}
            dayMaxEventRows={true}
            eventClassNames={(info) => {
              if (moment(info.event.start).isBefore(moment(), "day")) {
                return "past-event";
              }
              if (info.event.extendedProps.status === "posted") {
                return "posted-event";
              }
              return "future-event";
            }}
            classNames={`fc-dark:bg-darkBg fc-dark:text-darkText`}
          />
 
      </div>
      {selectedEventId && (
        <CalenderModel
          isOpen={!!selectedEventId}
          onClose={closeModal}
          event={events.find((e) => e.id === selectedEventId)}
          onDelete={handleDeletePost}
          onEdit={handleEdit}
        />
      )}
      {isEditModalOpen && (
        <EditPost
          closePopup={() => setIsEditModalOpen(false)}
          editData={editPostData}
          userData={userData}
          onAdd={fetchData}
        />
      )}
    </>
  );
}

export default Calendar;