import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const AppsExtra = () => {
   const [isChecked, setIsChecked] = useState(true);

   const handleToggle = () => {
      setIsChecked(!isChecked);
   };

   return (
      <>
         <div className="p-6 max-w-[864px] mx-auto">
            {/* Section Header */}
            <h2 className="text-2xl font-semibold mb-6 border-gray-300 pb-3 dark:text-white">
               Buffer Apps & Extras
            </h2>
            <p className="mb-6 border-b mt-2 pb-3 text-sm md:text-base dark:text-white dark:border-borderDarkmode">
               Get the most out of Buffer with our mobile apps and browser extension.
            </p>

            {/* Browser Extension Section */}
            <div className="flex flex-col md:flex-row items-start justify-between border-b mb-8 pb-4 gap-6 dark:border-borderDarkmode">
               <div className="flex-1">
                  <label className="text-lg font-semibold text-gray-700 dark:text-white">Browser Extension</label>
                  <p className="text-gray-600 mt-2 text-sm md:text-base dark:text-white ">
                     Our browser extension lets you share content as you browse the web.
                  </p>
               </div>
               <button className="text-[rgb(61, 61, 61)] border border-[#3D3D3D] h-10 py-1 px-3 mt-3 md:mt-0 hover:text-gray-700 focus:outline-none w-full md:w-auto dark:bg-bgbutton hover:dark:bg-white hover:dark:text-black">
                  Install the Browser extension
               </button>
            </div>

            {/* Mobile Apps Section */}
            <div className="flex flex-col md:flex-row items-start justify-between border-b mb-8 pb-4 gap-6 dark:border-borderDarkmode">
               <div className="flex-1">
                  <label className="text-lg font-semibold text-gray-700 dark:text-white">Mobile Apps</label>
                  <p className="text-gray-600 mt-2 mb-3 text-sm md:text-base dark:text-white">
                     Share content and manage your Buffer account on the go with our mobile apps.
                  </p>
                  <div className="flex flex-col md:flex-row gap-4">
                     <button className="text-[rgb(61, 61, 61)] border border-[#3D3D3D] h-10 py-1 px-3 mt-3 md:mt-0 hover:text-gray-700 focus:outline-none w-full md:w-auto dark:bg-bgbutton hover:dark:bg-white hover:dark:text-black">
                        View on Apple Store
                     </button>
                     <button className="text-[rgb(61, 61, 61)] border border-[#3D3D3D] h-10 py-1 px-3 mt-3 md:mt-0 hover:text-gray-700 focus:outline-none w-full md:w-auto dark:bg-bgbutton hover:dark:bg-white hover:dark:text-black">
                        View on Google Play
                     </button>
                  </div>
               </div>
            </div>

            {/* Connected Apps Section */}
            <div className="flex flex-col md:flex-row items-start justify-between border-b mb-8 pb-4 gap-6 dark:border-borderDarkmode">
               <div className="flex-1">
                  <label className="text-lg font-semibold text-gray-700 dark:text-white">Connected Apps</label>
                  <p className="text-gray-700 mt-2 text-sm md:text-base dark:text-white">
                     Get the most out of Buffer and share from your mobile, news reader, blog, or anywhere!{" "}
                     <Link to={""} className="text-blue-600 hover:text-blue-800">Get More Apps →</Link>
                  </p>
               </div>
            </div>

            {/* Buffer for Android Section */}
            <div className="flex flex-col md:flex-row items-start justify-between border-b mb-8 pb-4 gap-6 dark:border-borderDarkmode">
               <div className="flex-1">
                  <label className="text-lg font-semibold text-gray-700 dark:text-white">Buffer for Android</label>
               </div>
               <button className="text-[rgb(61, 61, 61)] border border-[#3D3D3D] h-10 py-1 px-3 mt-3 md:mt-0 hover:text-gray-700 focus:outline-none w-full md:w-auto dark:bg-bgbutton hover:dark:bg-white hover:dark:text-black">
                  Revoke Access
               </button>
            </div>
         </div>
      </>
   );
};