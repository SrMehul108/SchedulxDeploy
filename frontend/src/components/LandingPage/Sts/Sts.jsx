import React from 'react';
// Make sure to import your image like this:
import illustration from "../../../assets/images/analytics-demo.png"; // Replace with your actual image path

function Sts() {
  return (
    <>
      <div className="font-[sans-serif] px-4 sm:px-10  flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Left Image Section */}
        <div className="flex-1">
          <img src={illustration} alt="Marketing Team Illustration" className="w-full max-w-md mx-auto lg:max-w-full" />
        </div>

        {/* Right Content Section */}
        <div className="flex-1 text-center lg:text-left ps-10">
          <h2 className="text-5xl font-bold text-gray-700 dark:text-white mb-4">
            We are like an extension <br /> of your marketing team
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            SchedulX empowers your marketing efforts by providing seamless tools for content scheduling, performance tracking, and audience engagement. Our platform acts as an all-in-one solution, helping you streamline your workflow, save time, and focus on growing your brand. Let us handle the logistics while you connect with your audience more effectively.
          </p>


          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-[32px] shadow-lg border border-gray-200 dark:bg-[#37393b] text-center">
              <h3 className="text-4xl font-bold text-gray-800 dark:text-white">
                500<span className="text-blue-500">+</span>
              </h3>
              <p className="text-gray-500 font-medium mt-2 dark:text-gray-200">Happy Clients</p>
            </div>
            <div className="bg-white p-6 rounded-[32px] shadow-lg border border-gray-200 dark:bg-[#37393b] text-center">
              <h3 className="text-4xl font-bold text-gray-800 dark:text-white">
                200M<span className="text-blue-500">+</span>
              </h3>
              <p className="text-gray-500 font-medium mt-2 dark:text-gray-200">Users Acquired</p>
            </div>
            <div className="bg-white p-6 rounded-[32px] shadow-lg border border-gray-200 dark:bg-[#37393b] text-center">
              <h3 className="text-4xl font-bold text-gray-800 dark:text-white">
                250<span className="text-blue-500">+</span>
              </h3>
              <p className="text-gray-500 font-medium mt-2 dark:text-gray-200">Team Members</p>
            </div>
            <div className="bg-white p-6 rounded-[32px] shadow-lg border border-gray-200 dark:bg-[#37393b] text-center">
              <h3 className="text-4xl font-bold text-gray-800 dark:text-white">
                3,000<span className="text-blue-500">+</span>
              </h3>
              <p className="text-gray-500 font-medium mt-2 dark:text-gray-200">Projects Completed</p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Sts;
