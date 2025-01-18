import React, { useState } from "react";
import { Icons } from "../../constants";
import "./calender.css";

const Tagbutton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setIsOpen(true); 
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); 
  };

  return (
    <div className="relative dropdown inline-block text-left">
      <button onClick={toggleDropdown} className="px-2 py-2 fc-h-event fc-button-primary">
        {Icons.tag} <span className="mx-2">Tag</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-auto z-10 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
          <div
            onClick={() => handleItemClick("Option 1")}
            className="px-3 py-1 w-auto text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            <div className="flex w-auto mt-6 space-x-4">
              <div className="flex-1 flex px-2 py-1 rounded-lg border border-gray-300 focus-within:border-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="email"
                  placeholder="Search Something..."
                  className="w-80px outline-none bg-transparent text-gray-500 text-sm"
                />
              </div>
            </div>
          </div>

          <div
            onClick={() => handleItemClick("Option 3")}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
          >
            <div className="flex items-center">

              <input
                id="checkbox3"
                type="checkbox"
                checked={isChecked} 
                onChange={handleCheckboxChange} 
                className="hidden peer"
              />
              <label
                htmlFor="checkbox3"
                className="relative flex items-center justify-center p-1 peer-checked:before:hidden before:block before:absolute before:w-full before:h-full before:bg-white w-6 h-6 cursor-pointer bg-slate-950 border rounded-full overflow-hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full fill-white"
                  viewBox="0 0 520 520"
                >
                  <path
                    d="M79.423 240.755a47.529 47.529 0 0 0-36.737 77.522l120.73 147.894a43.136 43.136 0 0 0 36.066 16.009c14.654-.787 27.884-8.626 36.319-21.515L486.588 56.773a6.13 6.13 0 0 1 .128-.2c2.353-3.613 1.59-10.773-3.267-15.271a13.321 13.321 0 0 0-19.362 1.343q-.135.166-.278.327L210.887 328.736a10.961 10.961 0 0 1-15.585.843l-83.94-76.386a47.319 47.319 0 0 0-31.939-12.438z"
                    data-name="7-Check"
                    data-original="#000000"
                  />
                </svg>
              </label>
              <p className="text-sm text-black ml-4">heloo wold</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tagbutton;