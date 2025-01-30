import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Icons } from "../../constants/icons";
import { Link } from "react-router-dom";
import { BsFillFileEarmarkPostFill } from "react-icons/bs";
import { FcIdea } from "react-icons/fc";
import { FaUser, FaUserFriends } from "react-icons/fa";
import { RiPagesFill } from "react-icons/ri";
import { SiGitconnected } from "react-icons/si";
import ChannelModal from "../../components/User/Modal/ChannelModal/ChannelModal";
import NewPost from "../../components/Calendar/NewPost/NewPost";
import { jwtDecode } from "jwt-decode";

const DashboardLayout = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState(""); // State for username
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for New Post dropdown
  const profileDropdownRef = useRef(null);
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? "" : dropdownName);
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const items = [
    { name: "Create", path: "/create" },
    { name: "Publish", path: "/publish" },
    { name: "Analyze", path: "/analyze/home" },
    // { name: "Engage", path: "/engage" },
    { name: "Start Page", path: "/startpage" },
  ];
  const User = [
    { name: "EditProfile", path: "/editprofile" },
    { name: "Account", path: "/account/accountdetail" },
    { name: "Preference", path: "/preference/General" },
    { name: "Security", path: "/preference/Security" },
    { name: "Notification Setting", path: "/preference/Notifications" },
  ];
  const SubUser = [
    { name: "Channels", path: "/channel" },
    { name: "Manage Your Team", path: "/manageteam" },
    { name: "Refer a Friend", path: "/referafriend" },
    { name: "Beta Features", path: "/betafeatures" },
  ];
  const Post = [
    {
      name: "Connect a New Channel",
      path: "",
      Icons: <SiGitconnected />,
      action: openModal, // Trigger modal open function
    },
    { name: "Create a Start Page", path: "/startpage", Icons: <RiPagesFill /> },
    {
      name: "Invite a Team Member",
      path: "/referafriend",
      Icons: <FaUserFriends />,
    },
  ];
  const location = useLocation();

  const activeTab = items.find((item) =>
    location.pathname.startsWith(item.path)
  )?.path;

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      openDropdown === "newPost"
    ) {
      setOpenDropdown("");
    }

    if (
      profileDropdownRef.current &&
      !profileDropdownRef.current.contains(event.target) &&
      openDropdown === "profile"
    ) {
      setOpenDropdown("");
    }
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      return navigate("/");
    } catch (error) {
      
    }
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openDropdown]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode the token
        setUsername(decodedToken.user); // Extract and set the username
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }

    const handleUserLogin = (event) => {
      setUsername(event.detail); // Update username from event details
    };

    window.addEventListener("user-login", handleUserLogin);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("user-login", handleUserLogin);
    };
  }, []);


  return (
    <>
      {token ? (
        <header className="flex border-b border-b-slate-300 py-3 px-4 justify-end bg-white  min-h-[70px] tracking-wide  z-50 fixed top-0 right-0 left-0 dark:bg-darkmode text-black  dark:text-white dark:border-b-slate-800">
          <div className="flex justify-between items-center  lg:gap-y-4 gap-y-6 gap-x-4 w-full sm:gap-0">
            {/* Logo */}
            <div className="flex items-center justify-start  lg:w-32">
              <Link to={"/publish"}>
                <span className="font-extrabold flex items-center  text-black  dark:text-white">
                  ScheduL
                  <span className="text-red-600">{Icons.schedulXNav}</span>
                </span>
              </Link>
            </div>
            {/* Navigation Menu */}
            <div
              id="collapseMenu"
              className={`${isMenuOpen ? "block" : "hidden"
                } lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50 flex-grow`}
            >
              <button
                id="toggleClose"
                onClick={() => setMenuOpen(false)}
                className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border "
              >
                {Icons.togglebar}
              </button>

              <ul className="lg:flex justify-center lg:gap-x-10 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50 dark:bg-darkmode">
                <li className="mb-6 hidden max-lg:block">
                  <Link to={"/publish"}>
                    <span className="font-extrabold flex items-center">
                      ScheduL
                      <span className="text-red-600">{Icons.schedulXNav}</span>
                    </span>
                  </Link>
                </li>
                {items.map((item, index) => (
                  <li
                    key={index}
                    className={`max-lg:border-b max-lg:py-3 max-lg:px-3 relative 
      lg:hover:after:absolute lg:after:bg-black lg:after:dark:bg-white lg:after:w-0 
      lg:hover:after:w-full lg:hover:after:h-[2px] lg:after:block 
      lg:after:top-7 lg:after:transition-all lg:after:duration-300 dark:border-borderDarkmode ${activeTab === item.path
                        ? "text-black lg:after:w-full"
                        : "text-gray-200"
                      }`}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      className={`font-bold block text-base ${activeTab === item.path
                        ? "text-black dark:text-white"
                        : "text-gray-400"
                        }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}

              </ul>
            </div>
            {/* Welcome Message */}
            <div className="flex items-center max-sm:ml-auto space-x-6 justify-end sm:w-1/2 lg:w-auto">
              <div className="hidden sm:block">
                <h2 className="text-base font-medium text-gray-500 dark:text-white">
                  Welcome, {username.name}
                </h2>
              </div>
              {/* New Post Dropdown */}
              <ul>
                <li
                  id="dropdown-toggle"
                  className="relative px-1 after:absolute after:w-full after:h-[2px] after:block after:top-8 after:left-0 after:transition-all after:duration-300"
                  ref={dropdownRef} // Attach ref
                >
                  <button
                    class="flex items-center justify-center"
                    onClick={() => toggleDropdown("newPost")}
                  >
                    <Link
                      to={""}
                      class="relative inline-flex items-center justify-start px-2 py-2 overflow-hidden font-normal transition-all bg-slate-500 rounded-xl group"
                    >
                      <span class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-slate-700 rounded group-hover:-mr-4 group-hover:-mt-4">
                        <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                      </span>
                      <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-slate-600 rounded-2xl group-hover:mb-10 group-hover:translate-x-0"></span>
                      <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white flex items-center">
                        {Icons.plus}
                        <span className="hidden lg:block">New Post</span>
                      </span>
                    </Link>
                  </button>
                  {openDropdown === "newPost" && (
                    <div
                      id="profile-dropdown-menu"
                      className="bg-white block  z-20 shadow-lg py-6 px-2 rounded-xl sm:min-w-[300px] max-sm:min-w-[250px] absolute right-0 top-10 left-[-85px]   dark:bg-dropdown dark:text-white max-w-full"
                    >


                      <button
                        className="flex items-center w-full py-2 px-2 transition-all rounded-xl bg-transparent border border-transparent hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-black dark:hover:text-white hover:shadow-lg dark:hover:shadow-md"
                        onClick={openPopup}
                      >
                        <div className="p-1 text-4xl hidden sm:block">
                          <BsFillFileEarmarkPostFill />
                        </div>
                        <div className="p-1">
                          <span className="block text-sm text-start font-bold text-gray-700 dark:text-white">
                            Post
                          </span>
                          <small>Publish content to a channel</small>
                        </div>
                      </button>
                      {isPopupOpen && <NewPost closePopup={closePopup} />}
                      <hr className="border-b-0 my-4" />
                      <ul className="space-y-1.5">
                        {Post.map((item, index) => (
                          <li key={index} className="flex items-center p-1">
                            <span className="pl-2 text-lg">{item.Icons}</span>
                            {item.action ? (
                              <button
                                onClick={item.action}
                                className="text-sm text-gray-500 hover:text-black ps-2 dark:text-white"
                              >
                                {item.name}
                              </button>
                            ) : (
                              <Link
                                to={item.path}
                                className="text-sm text-gray-500 hover:text-black ps-2 dark:text-white"
                              >
                                {item.name}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>

                      {isModalOpen && <ChannelModal onClose={closeModal} />}
                    </div>
                  )}
                </li>
              </ul>

              {/* Profile Dropdown */}
              <ul>
                <li
                  id="profile-dropdown-toggle"
                  className="relative "
                  ref={profileDropdownRef} // Attach ref
                >
                  <button onClick={() => toggleDropdown("profile")}>
                    {/* {Icons.profileuser} */}
                    <div className="rounded-full border border-slate-400 p-2 group hover:bg-slate-100 flex items-center">
                      <FaUser className="text-slate-300 text-xl group-hover:text-slate-400" />
                    </div>
                  </button>
                  {openDropdown === "profile" && (
                    <div
                      id="profile-dropdown-menu"
                      className="bg-white block z-20 shadow-lg pt-4 pb-3 px-4 rounded-xl sm:min-w-[320px] max-sm:min-w-[250px] absolute right-0 top-10 dark:bg-dropdown dark:text-white"
                    >
                      <div>
                        <span className="px-2 py-1">{username.email}</span>
                      </div>
                      <ul className="space-y-2">
                        {/* First section: User Links */}
                        {User.map((item, index) => (
                          <li key={index}>
                            <Link
                              to={item.path}
                              className={`text-gray-500 mt-2 px-2 py-1 hover:text-gray-700 text-[15px] block hover:bg-slate-100 hover:font-medium rounded-lg transition-transform transform hover:scale-105  dark:text-white dark:hover:text-black`}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                        {/* Horizontal line after the User Links */}
                        {User.length > 0 && <hr className="border-b-0 my-4" />}
                        {/* Second section: SubUser Links */}
                        {SubUser.map((item, index) => (
                          <li key={index}>
                            <Link
                              className={`text-gray-500 px-2 py-1 hover:text-gray-700 text-[15px] block hover:bg-slate-100 hover:font-medium rounded-lg transition-transform transform hover:scale-105 dark:text-white dark:hover:text-black`}
                              to={item.path}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                        {/* Horizontal line after the SubUser Links */}
                        {SubUser.length > 0 && (
                          <hr className="border-b-0 my-4" />
                        )}
                        {/* Logout option */}
                        <li
                          className={`text-gray-500 px-2 py-1 hover:text-gray-700 text-[15px] block hover:bg-slate-100 hover:font-medium rounded-lg transition-transform transform hover:scale-105 dark:hover:text-black dark:text-white`}
                        >
                          <button
                            onClick={handleLogout}
                            className="text-sm"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  )}
                </li>
              </ul>
              {/* Hamburger Menu Button */}
              <div className="flex  sm:justify-end ml-0">
                <button
                  id="toggleOpen"
                  onClick={() => setMenuOpen(true)}
                  className="lg:hidden"
                >
                  <span className="text-black dark:text-white">{Icons.hamburger}</span>
                </button>
              </div>
            </div>
          </div>
        </header>
      ) : (
        <header className="flex  py-3 px-4 justify-end bg-white  min-h-[70px] tracking-wide  z-50 fixed top-0 right-0 left-0 dark:bg-darkmode text-black  dark:text-white dark:border-b-slate-800">
          <div className="flex justify-between items-center  lg:gap-y-4 gap-y-6 gap-x-4 w-full">
            {/* Logo */}
            <div className="flex items-center justify-start  lg:w-32">
              <Link to={"/"}>
                <span className="font-extrabold flex items-center">
                  ScheduL
                  <span className="text-red-600">{Icons.schedulXNav}</span>
                </span>
              </Link>
            </div>
            <div className="flex items-center max-sm:ml-auto space-x-6 justify-end sm:w-1/2 lg:w-auto">
              {/* New Post Dropdown */}
              <Link
                to={"/registration"}
                type="button"
                className="flex gap-2 items-center px-5 py-2.5 rounded-xl text-sm tracking-wider font-medium border border-current outline-none bg-black hover:bg-transparent text-white hover:text-black transition-all duration-300 dark:bg-bgbutton hover:dark:bg-white"
              >
                {Icons.registration}
                <span>Registration</span>
              </Link>
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default DashboardLayout;
