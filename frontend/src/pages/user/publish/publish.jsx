import { Outlet, redirect, useLocation, useNavigate } from "react-router";
import { Icons } from "../../../constants/icons";
import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import Calendar from "../../../components/Calendar/calender";
import NewPost from "../../../components/Calendar/NewPost/NewPost";
import Loading from "../../../components/loader/loader";
import api from "../../../apis/api";
import { jwtDecode } from "jwt-decode";
import { Loader } from "lucide-react";

const socialMedia = [
  {
    name: "Facebook",
    mainImage:
      "https://1000logos.net/wp-content/uploads/2017/02/Facebook-Logosu.png",
    profileImage:
      "https://1000logos.net/wp-content/uploads/2017/02/Facebook-Logosu.png",
    userName: "John Doe",
    userImage:
      "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "LinkedIn",
    mainImage:
      "https://static.vecteezy.com/system/resources/previews/023/986/970/non_2x/linkedin-logo-linkedin-logo-transparent-linkedin-icon-transparent-free-free-png.png",
    profileImage:
      "https://static.vecteezy.com/system/resources/previews/023/986/970/non_2x/linkedin-logo-linkedin-logo-transparent-linkedin-icon-transparent-free-free-png.png",
    userImage:
      "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "XTwitter",
    mainImage:
      "https://e7.pngegg.com/pngimages/708/311/png-clipart-twitter-twitter-thumbnail.png",
    profileImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpF7etH_u0DYh8Nsksf8rRdUiys8ZM2TCOjA&s",
    userImage:
      "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Pinterest",
    mainImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqG93lkzv_XzSqufe5xS6sFgw7TpUYpH_ZiA&s",
    profileImage:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqG93lkzv_XzSqufe5xS6sFgw7TpUYpH_ZiA&s",
    userImage:
      "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    name: "Instagram",
    mainImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/640px-Instagram_logo_2022.svg.png",
    profileImage:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/640px-Instagram_logo_2022.svg.png",
    userImage:
      "https://plus.unsplash.com/premium_photo-1671656349322-41de944d259b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
  },
];

const Publish = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const isActive = (path) => location.pathname === path;
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const channels = [
    "Instagram",
    "LinkedIn",
    "XTwitter",
    "Pinterest",
    "Facebook",
  ];
  const [showNewPostPopup, setShowNewPostPopup] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [userData, setUserData] = useState(null);

  const facebookCalled = useRef(false);
  const linkedinCalled = useRef(false);
  const twitterCalled = useRef(false);

  const handleOpenWithChannel = (channel) => {
    setSelectedChannels([channel]);
    setShowNewPostPopup(true);
    console.log("channel namessss", channel);
  };

  const handlePublish = () => {
    setIsLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const platform = urlParams.get("platform");

    if (token) {
      try {
        localStorage.setItem("token", token);
        if (platform) {
          localStorage.setItem("platform", platform);
        }
        navigate("/publish", { replace: true });
      } catch (error) {
        console.error("Error storing auth data:", error);
        setError("Failed to complete authentication. Please try again.");
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handlePublish();

    return () => {
      setIsLoading(false);
      setError(null);
      setSelectedPlatform(null);
    };
  }, []);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const twitter = queryParams.get("twitter");
    const linkedin = queryParams.get("linkedin");
    const accessToken = queryParams.get("accessToken");
    const facebook = queryParams.get("facebook");
    if (facebook && !facebookCalled.current) {
      facebookCalled.current = true;
      try {
        const parsedUser = JSON.parse(decodeURIComponent(facebook));
        setUserData(parsedUser);
        api
          .post(
            "/api/v1/facebook/facebook-add",
            {
              socialMediaID: parsedUser.id,
              accessToken: parsedUser.accessToken,
              platformUserName: parsedUser.displayName,
              displayName: parsedUser.displayName,
            },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            console.log("User data saved successfully:", response.data);
            const newUrl = `${window.location.origin}/publish`;
            window.history.replaceState(null, "", newUrl);
          })
          .catch((error) => {
            console.error("Error saving user data:", error);
            setError(
              error.response?.data?.ErrorMessage || "Failed to save user data"
            );
          });
      } catch (error) {
        console.error("Error parsing user data:", error);
        setError("Failed to parse user data");
      }
    } else {
      console.warn("No user parameter found in the URL.");
    }
    if (linkedin && !linkedinCalled.current) {
      linkedinCalled.current = true;

      try {
        const parsedUser = JSON.parse(decodeURIComponent(linkedin));
        setUserData(parsedUser);
        api
          .post(
            "/api/v1/linkedin/linkedin-add",
            {
              sub: parsedUser.sub,
              accessToken: accessToken,
              socialMediaEmail: parsedUser.email,
              platformUserName: parsedUser.name,
              name: parsedUser.name,
            },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            console.log("User data saved successfully:", response.data);
            const newUrl = `${window.location.origin}/publish`;
            window.history.replaceState(null, "", newUrl);
          })
          .catch((error) => {
            console.error("Error saving user data:", error);
            setError(
              error.response?.data?.ErrorMessage || "Failed to save user data"
            );
          });
      } catch (error) {
        console.error("Error parsing user data:", error);
        setError("Failed to parse user data");
      }
    } else {
      console.warn("No user parameter found in the URL.");
    }
    if (twitter && !twitterCalled.current) {
      twitterCalled.current = true; // Mark Twitter API as calledif (twitter) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(twitter));
        setUserData(parsedUser);
        api
          .post(
            "/api/v1/twitter/twitter-add",
            {
              accessToken: parsedUser.accessToken,
              accessSecret: parsedUser.accessSecret,
              displayName: parsedUser.displayName,
              socialMediaID: parsedUser.id,
              platformUserName: parsedUser.username,
            },
            {
              withCredentials: true,
            }
          )
          .then((response) => {
            console.log("User data saved successfully:", response.data);
            const newUrl = `${window.location.origin}/publish`;
            window.history.replaceState(null, "", newUrl);
          })
          .catch((error) => {
            console.error("Error saving user data:", error);
            setError(
              error.response?.data?.ErrorMessage || "Failed to save user data"
            );
          });
      } catch (error) {
        console.error("Error parsing user data:", error);
        setError("Failed to parse user data");
      }
    } else {
      console.warn("No user parameter found in the URL.");
    }
  }, [location.search]);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token not found");

      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user._id;
      if (!userId) throw new Error("User ID not found in token");

      const response = await api.get(`/api/v1/user/user-get/${userId}`);
      setUserData(response.data.data);
      console.log("User Data : ", response.data.data);
    } catch (err) {
      console.error("Error fetching user data: ", err);
      setError(err.response?.data?.message || "Failed to fetch user data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  
  const checkPlatformStatus = (platformName) => {
    if (!userData?.socialMedia) return false;
    return userData.socialMedia.some(
      (connection) =>
        connection.platformName.toLowerCase() === platformName.toLowerCase()
    );
  };

  const handlePublishAllChannels = () => {
    const connectedChannels = channels.filter((channel) =>
      checkPlatformStatus(channel)
  );
    setSelectedChannels(connectedChannels);
    setShowNewPostPopup(true);
  };
  
  const closePopup = () => {
    setShowNewPostPopup(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <button
        onClick={toggleSidebar}
        className={clsx(
          "bg-black text-white p-2 rounded-md fixed z-50 lg:hidden transition-all duration-300 ease-in-out",
          isOpen ? "left-0" : "left-[-10px]"
        )}
        style={{ top: "20%" }}
      >
        <span
          className={clsx(
            "inline-block transition-transform duration-300",
            isOpen ? "rotate-180" : "rotate-0"
          )}
          >
          {isOpen ? Icons.stepbackward : Icons.stepforward}
        </span>
      </button>
      <div
        className={clsx(
          "bg-gray-100 border-r border-gray-300 w-full md:w-64 xl:w-72",
          isOpen ? "block" : "hidden lg:block"
        )}
      >
        <nav
          className={clsx(
            "bg-white h-screen text-black dark:bg-darkmode dark:text-white fixed top-[70px] left-0 transform transition-transform duration-300 min-w-[240px] py-6 px-4 font-[sans-serif] overflow-auto z-40 flex flex-col justify-between",
            isOpen ? "translate-x-0" : "-translate-x-full",
            "lg:translate-x-0"
          )}
          >
          <ul className="bg-white text-dark text-black dark:bg-darkmode dark:text-white ">
            <li className="px-4 my-2 py-2 w-full flex group rounded-xl bg-white hover:bg-slate-100 transition-transform transform hover:scale-105 duration-300 text-black dark:bg-darkmode dark:text-white hover:dark:text-white hover:dark:bg-slate-100">
              <Link className="w-full flex items-center p-1">
                <div className="relative">
                  <img
                    src="https://media.istockphoto.com/id/605764944/vector/thumbnails-icon-gallery-view-option-symbol.jpg?s=612x612&w=0&k=20&c=7Shv86dBrekqu37fBPpFpd4AWowxtpLf-g0PINSE6cc="
                    alt="static profile"
                    className="h-10 w-10 object-cover rounded-full"
                    loading="lazy"
                    />
                </div>
                <span className="text-black ml-3 group-hover:text-black transition-colors duration-300 font-bold  dark:text-white group-hover:dark:text-black">
                  All channels
                </span>
                <button
                  className="bg-white text-black opacity-0 border border-black ms-3 rounded-xl hover:bg-white hover:text-black group-hover:bg-white group-hover:border-white group-hover:text-black group-hover:opacity-100 transition-all duration-300 dark:bg-darkmode dark:text-white dark:hover:bg-black dark:hover:text-white"
                  onClick={handlePublishAllChannels}
                >
                  {Icons.plus}
                </button>
              </Link>
            </li>
            <hr className="border-gray-200   dark:border-borderDarkmode" />
            {socialMedia.map((platform, index) => {
              const isConnected = checkPlatformStatus(platform.name);
              return (
                <li
                  key={index}
                  className="px-4 my-2 py-2 w-full flex group rounded-xl bg-white hover:bg-slate-100 transition-transform transform hover:scale-105 duration-300 text-black dark:bg-darkmode dark:text-white hover:dark:text-white hover:dark:bg-slate-100"
                  >
                  <div className="w-full flex items-center p-1">
                    <div className="relative">
                      <img
                        src={
                          isConnected
                            ? userData.user.twitter?.profileImage
                            : platform.profileImage
                            ? platform.mainImage
                            : platform.profileImage
                          }
                        alt={platform.name}
                        className="h-10 w-10 object-cover rounded-full mx-2 p-1"
                        loading="lazy"
                      />
                      <img
                        src={
                          isConnected
                          ? platform.profileImage
                            : platform.userImage
                        }
                        alt="profile"
                        className="h-4 w-4 object-cover rounded-full border-2 border-white absolute bottom-2 right-4 transform translate-x-1/2 translate-y-1/2"
                        loading="lazy"
                        />
                    </div>
                    <span className="text-black ml-3 group-hover:text-black transition-colors duration-300 font-bold  dark:text-white group-hover:dark:text-black">
                      {platform.name}
                    </span>
                    {isConnected && (
                      <span className="relative flex h-3 w-3 ml-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                      </span>
                    )}
                    {isConnected && (
                      <button
                      className={clsx(
                          "bg-white text-black opacity-0 border p-1 border-black ms-4 rounded-xl hover:bg-white hover:text-black group-hover:bg-white group-hover:border-white group-hover:text-black group-hover:opacity-100 transition-all duration-300 dark:bg-darkmode dark:text-white dark:hover:bg-black dark:hover:text-white",
                          isLoading && "cursor-not-allowed opacity-50"
                        )}
                        onClick={(e) => {
                          if (isLoading) return;
                          e.stopPropagation();
                          handleOpenWithChannel(platform.name);
                        }}
                        disabled={isLoading}
                      >
                        {Icons.plus}
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          <ul className="bg-white text-black dark:bg-darkmode dark:text-white mt-4 border-t border-gray-200  dark:border-borderDarkmode pt-4 mb-20">
            <li className="px-4 w-full flex group rounded-xl p-2  hover:bg-slate-100  hover:text-black hover:dark:text-black hover:dark:bg-slate-100 justify-between duration-300 transition-transform transform hover:scale-105">
              <Link
                to={"/publish/tags"}
                className="w-full px-2 flex items-center p-1"
              >
                <div className="flex items-center">
                  <div className="px-2 h-9 w-9 flex items-center">
                    {Icons.tag}
                  </div>
                  <div>Manage Tag</div>
                </div>
              </Link>
            </li>
            <li className="px-4 w-full flex group rounded-xl p-2  hover:bg-slate-100  hover:text-black hover:dark:text-black hover:dark:bg-slate-100 justify-between duration-300 transition-transform transform hover:scale-105">
              <Link
                to={"/account/channels"}
                className="w-full px-2 flex items-center p-1"
              >
                <span className="px-2">{Icons.gear}</span>
                <span>Manage Channel</span>
              </Link>
            </li>
          </ul>
        </nav>
        {/* Overlay for mobile */}
        {isOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={toggleSidebar}
          />
        )}
      </div>

      {/* Dashboard */}
      <div
        className={clsx(
          "flex-grow bg-white text-black dark:bg-darkmode dark:text-white   transition-all duration-300 lg:p-9 md:p-8 sm:p-4 w-full",
          isOpen ? "ml-0" : "-[0px]"
        )}
      >
        <div className="overflow-y-auto h-screen p-4 md:p-8 md:border border-gray-300 dark:border-borderDarkmode rounded-xl max-w-full">
          <div className="h-full">
            {isLoading && <Loading />}
            {!isLoading && (
              <>
                {location.pathname === "/publish" ? (
                  <Calendar userData={userData} />
                ) : (
                  <Outlet />
                )}
                {isPopupOpen && (
                  <NewPost closePopup={closePopup} userData={userData} />
                )}
                {showNewPostPopup && (
                  <NewPost
                    closePopup={closePopup}
                    initialChannels={selectedChannels}
                    userData={userData}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Publish;
