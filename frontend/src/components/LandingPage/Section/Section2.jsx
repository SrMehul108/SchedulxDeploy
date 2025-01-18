import React from 'react';
import section2 from "../../../assets/images/image.webp";
import { Icons } from '../../../constants';

function Section2() {
  return (
    <>
      <div className="px-4 sm:px-10 mt-28">
        <div className="w-full mx-auto grid md:grid-cols-2 justify-center items-center gap-10">
          <div className="w-full h-full flex flex-col p-5 justify-evenly text-center">
            <div>
              <h2 className="md:text-4xl text-3xl font-semibold mb-6 text-blue-800">
                Plan, Schedule, and Grow Your Audience
              </h2>
            </div>
            <div className='text-lg text-slate-600 dark:text-gray-400'>
              <p>
                With SchedulX’s interactive calendar, you can schedule posts across multiple platforms like Facebook, Instagram, LinkedIn, and more, all from a single interface. Visualize your strategy for weeks ahead and stay consistent with your posting schedule.
              </p>
              <p className="mt-4">
                Our platform also suggests optimal posting times and hashtags, helping you maximize engagement and expand your reach. Keep track of all your campaigns in one place and watch your audience grow.
              </p>
            </div>
          </div>
          <div className="w-full h-full border p-6 rounded-3xl shadow-xl bg-white  hover:shadow-2xl transition-all duration-200 dark:hover:shadow-slate-700 hover:cursor-pointer">
            <img
              src={section2}
              alt="SchedulX Calendar Feature"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Section2;
