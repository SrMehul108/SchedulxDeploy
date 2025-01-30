import React, { useState } from "react";
import { Icons } from "../../constants";
import "./calender.css";

const FeedBack = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedback = e.target.elements[0].value;
    
    setIsOpen(false); 
    e.target.reset(); 
  };

  return (
    <div className="relative dropdown inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="px-2 py-1 fc-h-event flex items-center"
      >
        {Icons.bell}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-auto z-10 origin-top-right bg-white border border-gray-200 rounded-md shadow-lg">
          <div className="px-4 py-2">
            <form
              className="flex flex-col w-full space-y-4"
              onSubmit={handleSubmit}
            >
              <div
                className="w-full h-20 resize-none outline-none bg-gray-100 text-gray-500 text-sm p-3 rounded-lg border border-gray-300 focus:border-blue-600"
              ></div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-5 py-2 rounded-lg text-gray-700 fc-h-event text-sm border border-gray-300 bg-white hover:bg-gray-200"
                  onClick={handleClose}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg text-gray-700 text-sm fc-h-event"
                >
                  Approve
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedBack;
