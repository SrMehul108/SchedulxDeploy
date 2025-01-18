import React, { useState } from "react";
import { Icons } from "../../../constants/icons";
import { Link } from "react-router-dom";

const AnalyzeSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const SocialMedia = [
    { name: "Facebook" },
    { name: "Instagram" },
    { name: "XTwitter" },
    { name: "LinkedIN" },
  ];

  const Tags = [{ name: "Tags" }, { name: "Reports" }];

  return (
    <>
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
        className={`bg-white shadow-lg h-screen fixed left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 min-w-[240px] py-6 px-4 font-[sans-serif] overflow-auto z-40`}
      >
        <ul>
          <li>
            <Link
              to="/home"
              className="text-black hover:text-white text-[15px] block hover:bg-black rounded px-4 py-2.5 transition-transform transform hover:scale-105"
            >
              Home
            </Link>
          </li>
        </ul>
        <div className="mt-4">
          <h6 className="text-black text-base font-extrabold px-4">Channels</h6>
          <ul className="mt-2">
            {SocialMedia.map((item, index) => (
              <li key={index}>
                <Link
                  to="#"
                  className="text-black hover:text-white text-[15px] block hover:bg-black rounded px-4 py-2.5 transition-transform transform hover:scale-105"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <h6 className="text-black text-base font-extrabold px-4">Tools</h6>
          <ul className="mt-2">
            {Tags.map((item, index) => (
              <li key={index}>
                <Link
                  to="#"
                  className="text-black hover:text-white text-[15px] block hover:bg-black rounded px-4 py-2.5 transition-transform transform hover:scale-105"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <ul className="mt-2">
            <li>
              <Link
                to="#"
                className="text-black hover:text-white text-[15px] block hover:bg-black rounded px-4 py-2.5 transition-transform transform hover:scale-105"
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
    </>
  );
};

export default AnalyzeSidebar;