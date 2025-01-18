import React from 'react';
import { Icons } from '../../../constants';
import section3 from "../../../assets/images/section-4.webp";

function Section3() {
  return (
    <>
      <div className="px-4 sm:px-10 mt-28">
        <div className="w-full">
          <div className="grid md:grid-cols-2 items-center gap-10">
            <div className="w-full h-full border p-6 rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-200 dark:hover:shadow-slate-700 hover:cursor-pointer">
              <img
                src={section3}
                alt="Automated Scheduling Preview"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
            <div className="w-full h-full flex flex-col p-5 justify-evenly text-center">
              <div>
                <h2 className="md:text-4xl text-3xl font-semibold mb-4 text-blue-800 w-3/4 mx-auto">
                  Save Time with Automated Scheduling
                </h2>
              </div>
              <div className="text-lg text-slate-600 dark:text-gray-400">
                <p>
                  SchedulX takes the repetitive tasks off your plate by publishing your content automatically across all connected platforms. Spend less time managing posts and more time creating impactful campaigns. With our intelligent scheduling system, you can halve your workload and let us handle the logistics. Plus, showcase your success with automated, easy-to-read performance reports.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Section3;
