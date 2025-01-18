import React, { useState } from "react";

export const General = () => {
  const [isChecked, setIsChecked] = useState(true);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="p-6 max-w-[864px] mx-auto dark:text-white">
      <h2 className="text-2xl font-semibold mb-6 border-b border-gray-300 pb-3 dark:border-borderDarkmode">
        General
      </h2>
      <p className="mb-6 border-b mt-2 pb-3 text-sm text-gray-600 dark:text-white dark:border-borderDarkmode">
        Change your general preferences.
      </p>

      {/* Row 1: Time Format */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b mb-8 pb-4 gap-6 dark:border-borderDarkmode">
        <div className="flex-1">
          <label className="text-lg font-semibold text-gray-700 dark:text-white">
            Time Format
          </label>
          <div className="flex items-center gap-4 mt-2">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="time"
                defaultChecked
                className="w-5 h-5"
              />
              <span className="text-sm">12 hour</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="time" className="w-5 h-5" />
              <span className="text-sm">24 hour</span>
            </label>
          </div>
        </div>
      </div>

      {/* Row 2: Day to Start the Week */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b mb-8 pb-4 gap-6 dark:border-borderDarkmode">
        <label className="text-lg font-semibold text-gray-700 w-full md:w-auto dark:text-white">
          Day to start the week
        </label>
        <select className="border border-gray-300 rounded-md p-3 w-full md:w-40 text-sm dark:bg-dropdown dark:border-borderDarkmode">
          <option>Sunday</option>
          <option>Monday</option>
        </select>
      </div>

      {/* Row 3: New Publish Experience */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
        <label className="text-lg font-semibold text-gray-700 w-full md:w-auto dark:text-white">
          New Publish Experience
        </label>
        <div className="flex flex-col items-start md:items-end gap-3 w-full md:w-auto">
          <label className="flex items-center cursor-pointer">
            <span className="text-gray-700 font-medium text-sm mr-3 dark:text-white">
              {isChecked ? "Disabled" : "Enabled"}
            </span>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={isChecked}
                onChange={handleToggle}
              />
              <div className="w-14 h-7 bg-gray-300 rounded-full flex items-center p-1 transition-colors duration-300 ">
                <div
                  className={`w-6 h-6 rounded-full transition-transform duration-300 ${
                    isChecked
                      ? "bg-white translate-x-0 border border-gray-300"
                      : "bg-blue-600 translate-x-7"
                  }`}
                ></div>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Description Text */}
      <p className="text-sm text-gray-500 max-w-md mt-2 dark:text-white">
        Temporarily enable/disable the new Publish experience. This experience{" "}
        <strong>will be permanently enabled in January.</strong>
      </p>
    </div>
  );
};
