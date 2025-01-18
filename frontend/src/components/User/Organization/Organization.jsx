import React from "react";

const Organization = () => {
  return (
    <>
      <div className="p-4 sm:p-6 max-w-full sm:max-w-[540px] mx-auto ">
        <div className="mb-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Organization</h2>
        </div>
        <div className="bg-white border border-gray-300 rounded-lg shadow-md dark:bg-bgCopnents dark:border-borderDarkmode">
          <div className="p-4 border-b dark:border-borderDarkmode">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-white">New Organizwe</h3>
          </div>
          <div className="p-4">
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-600 dark:text-white">Creation Date</p>
              <p className="text-gray-700 dark:text-white">December 13th, 2024</p>
            </div>
            <div>
              <label
                htmlFor="organizationName"
                className="block text-sm font-medium text-gray-600 mb-1 dark:text-white"
              >
                Organization Name
              </label>
              <input
                type="text"
                id="organizationName"
                defaultValue="new organizwe"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-ScocilMCompnent dark:border-borderDarkmode"
              />
            </div>
          </div>
          <div className="p-4 border-t text-right dark:border-borderDarkmode">
            <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded cursor-pointer hover:bg-gray-400 dark:bg-bgbutton dark:text-white hover:dark:bg-white hover:dark:text-black">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Organization;