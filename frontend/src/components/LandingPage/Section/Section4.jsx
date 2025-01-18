import React from 'react';
import section4 from "../../../assets/images/section-2.jpg";
import { Icons } from '../../../constants';

function Section4() {
  return (
    <>
      <div className="px-4 sm:px-10 mt-28">
        <div className="w-full mx-auto grid md:grid-cols-2 justify-center items-center gap-10">
          <div className="w-full h-full flex flex-col p-5 justify-evenly text-center">
            <div>
              <h2 className="md:text-4xl text-3xl font-semibold mb-6 text-blue-800">
                Track Performance, Optimize, and Grow
              </h2>
            </div>
            <div className="text-lg text-slate-600 dark:text-gray-400">
              <p>
                With SchedulX’s analytics dashboard, you can gain real-time insights into your social media performance. Monitor key metrics like impressions, engagement, and audience growth to fine-tune your strategy for better results.
              </p>
              <p className="mt-4">
                Visualize trends across all platforms and understand what resonates with your audience. From top-performing posts to detailed performance reports, SchedulX gives you everything you need to make data-driven decisions.
              </p>
            </div>
            <div className="flex flex-wrap gap-y-4 gap-x-8 mt-8 mx-auto">
              <button
                className="bg-blue-800 hover:bg-blue-500 text-white flex items-center transition-all text-xl font-bold rounded-xl px-5 py-4 dark:bg-bgbutton hover:dark:bg-white hover:dark:text-black"
              >
                View Analytics
                {Icons.arrowright}
              </button>
            </div>
          </div>
          <div className="w-full border p-6 rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all duration-200 dark:hover:shadow-slate-700 hover:cursor-pointer">
            <img
              src={section4}
              alt="Social Media Analytics Dashboard"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Section4;
