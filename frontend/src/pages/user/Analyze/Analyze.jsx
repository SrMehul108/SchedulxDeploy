import { Outlet, useLocation } from "react-router";
import { Icons } from "../../../constants/icons";
import { Link } from "react-router-dom";
import { useState } from "react";

const Analyze = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const closeSidebar = () => {
    if (isOpen) setIsOpen(false);
  };

  const SocialMedia = [
    {icon:Icons.facebook, name: "Facebook", path: "/analyze/facebook" },
    { icon:Icons.insta,name: "Instagram", path: "/analyze/instagram" },
    { icon:Icons.twitter,name: "XTwitter", path: "/analyze/xtwitter" },
    {icon:Icons.linkedin, name: "LinkedIN", path: "/analyze/linkedin" },
  ];

  const Tags = [
    {icon:Icons.tag, name: "Tags", path: "/analyze/tags" },
    { icon:Icons.report,name: "Reports", path: "/analyze/reports" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="flex flex-col md:flex-row mt-20">
        {/* Sidebar */}
        <div className=" bg-gray-100 border-r border-gray-300">
         
          <button
            onClick={toggleSidebar}
            className={`bg-black text-white p-2 rounded-md fixed z-50 lg:hidden 
                         transition-all duration-300 ease-in-out
                         ${isOpen ? "left-0" : "left-[-10px]"} top-40`}
          >
            <span
              className={`inline-block transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            >
              {isOpen ? Icons.stepbackward : Icons.stepforward}
            </span>
          </button>
          {/* Sidebar */}
          <nav
            className={`bg-white top-[70px] border-r border-slate-200 h-screen fixed left-0 transform dark:bg-darkmode dark:text-white ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 transition-transform duration-300 min-w-[240px] py-6 px-4 font-[sans-serif] overflow-auto z-40`}
          >
            <ul>
              <li>
                <Link
                  to="/analyze/home"
                  className={`hover:text-black text-[15px] block hover:bg-gray-200 text-black rounded px-4 py-2.5 transition-transform transform hover:scale-105 dark:text-white ${
                    isActive("/analyze/home")
                      ? "bg-gray-200 dark:bg-gray-700 dark:text-black dark:hover:text-white"
                      : "hover:dark:text-black"
                  }`}
                  onClick={closeSidebar}
                >
                  Home
                </Link>
              </li>
            </ul>
 <div className="mt-4">
              <h6 className="text-black text-base font-extrabold px-4 dark:text-white ">
                Channels
              </h6>
              <ul className="mt-2">
                {SocialMedia.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className={`text-black mt-2 text-[15px] block hover:bg-slate-100 rounded px-4 py-2.5 transition-transform transform hover:scale-105 
                        dark:text-white ${
                          isActive(item.path)
                            ? "bg-gray-200 dark:bg-gray-700 dark:text-black hover:dark:text-white"
                            : "hover:text-black hover:dark:text-black"
                        }`}
                      onClick={closeSidebar}
                    >
                      <div className="flex items-center gap-2">
                      <div className="h-5 w-5">{item.icon}</div>
                      {item.name}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <h6 className="text-black text-base font-extrabold px-4 dark:text-white ">
                Tools
              </h6>
              <ul className="mt-2">
                {Tags.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className={`text-black mt-2 hover:text-black text-[15px] block hover:bg-gray-200 rounded px-4 py-2.5 transition-transform transform hover:scale-105 dark:text-white hover:dark:text-black  ${
                        isActive(item.path) ? "bg-gray-200 dark:bg-gray-700 dark:text-black dark:hover:text-white"
                      : "hover:dark:text-black"
                      }`}
                      onClick={closeSidebar}
                    >
                       <div className="flex items-center gap-2">
                      <div className="h-5 w-5">{item.icon}</div>
                      {item.name}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4">
              <ul className="mt-2">
                <li>
                  <Link
                    to="/account/channels"
                    className={`text-black mt-2 hover:text-black text-[15px] block hover:bg-gray-200 rounded px-4 py-2.5 transition-transform transform hover:scale-105 dark:text-white hover:dark:text-black  ${
                      isActive("/analyze/manage-channels")
                        ? "bg-gray-200 dark:bg-gray-700 dark:text-black dark:hover:text-white"
                      : "hover:dark:text-black"
                    }`}
                    onClick={closeSidebar}
                  >
                    Manage Channels
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
 {isOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
              onClick={toggleSidebar}
            />
          )}
        </div>
        {/* Dashboard */}
        <div className="flex-grow bg-white md:ml-64 py-10 dark:bg-darkmode">
          <div className="fixed top-14 left-0 md:static overflow-y-auto h-full p-4 md:p-8 mx-auto rounded-lg w-full max-w-screen-2xl">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Analyze;