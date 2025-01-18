import { Outlet, useLocation } from "react-router";
import { Icons } from "../../../constants/icons";
import { Link } from "react-router-dom";
import { useState } from "react";

const AccountSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const toggleSidebar = () => setIsOpen(!isOpen);
  const SocialMedia = [
    { name: "Account", path: "/account/accountdetail" },
    { name: "Channels", path: "/account/channels" },
    { name: "Organization", path: "/account/organization" },
    { name: "Beta Features", path: "/account/betafeatures" },
    { name: "Refer a Friend", path: "/account/ReferAFriend" },
  ];
  const isActive = (path) => location.pathname === path;
  return (
    <>
      <div className="flex flex-col md:flex-row mt-20 ">
        {/* Sidebar */}
        <div className=" bg-gray-100 border-r border-gray-300 dark:bg-darkmode dark:border-borderDarkmode">
          <button
            onClick={toggleSidebar}
            className={`bg-black text-white p-2 rounded-md fixed z-50 lg:hidden 
                         transition-all duration-300 ease-in-out
                         ${isOpen ? "left-0" : "left-[-10px]"} top-40`}>
            <span
              className={`inline-block transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0" }`} >
              {isOpen ? Icons.stepbackward : Icons.stepforward}
            </span>
          </button>
          <nav
            className={`bg-white border-r border-slate-200 h-screen fixed left-0 transform dark:bg-darkmode dark:text-white dark:border-borderDarkmode ${isOpen ? "translate-x-0" : "-translate-x-full"
              } lg:translate-x-0 transition-transform duration-300 min-w-[240px] py-6 px-4 font-[sans-serif] overflow-auto z-40 dark:text-white`}>
            <div className="mt-4">
              <h6 className="text-black text-base font-extrabold px-4 mb-5 dark:text-white">
                Settings
              </h6>
              <ul className="mt-2">
                {SocialMedia.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className={`text-black mt-2 hover:text-black text-[15px] block hover:bg-slate-100 dark:hover:text-black transition-all rounded px-4 py-2.5 transform hover:scale-105 dark:text-white ${isActive(item.path) ? "bg-black text-white" : ""
                        }`} >
                      {item.name}
                    </Link>
                  </li>
                ))}
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
          <div className="fixed top-14 left-0 md:static overflow-y-auto h-full p-4 md:p-8 mx-auto md:border border-gray-300 rounded-lg w-full max-w-7xl dark:border-borderDarkmode">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
export default AccountSidebar;
