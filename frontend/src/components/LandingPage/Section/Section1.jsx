import React from 'react';
// import section1 from "../../../assets/images/section-1.png";
import section1 from "../../../assets/images/postmodellight.png";
import { Icons } from '../../../constants';

function Section1() {
  return (
    <>
      <div className="px-4 sm:px-10 mt-28">
        <div className=" w-full ">
          <div className="grid md:grid-cols-2  gap-10">
            <div className="w-full h-full">
              <img src={section1} alt="Premium Benefits"
                className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="w-full h-full flex flex-col p-5 justify-evenly text-center">
              <div>
                <h2 className="md:text-4xl text-3xl font-semibold mb-4 text-blue-800">
                  Simplify Your Social Media Management
                </h2>
              </div>
              <div className='text-lg text-slate-600 dark:text-gray-400'>
                <p>
                  Take the hassle out of creating and scheduling posts for multiple platforms with SchedulX. Our intuitive interface allows you to seamlessly design, preview, and schedule content across LinkedIn, Instagram, Facebook, and more—all in one place.
                </p>
                <p className="mt-4">
                  Drag and drop your files, leverage our AI Assistant for captivating captions, and schedule posts at the perfect time to maximize your reach and engagement. Let SchedulX handle the logistics while you focus on creating impact.
                </p>
              </div>
              <div className="flex flex-wrap gap-y-2 gap-x-8 mt-8 mx-auto">
                <button
                  className="bg-blue-800 hover:bg-blue-500 text-white flex items-center transition-all text-xl font-bold rounded-xl px-5 py-4 dark:bg-bgbutton hover:dark:bg-white hover:dark:text-black"
                >
                  Start Scheduling
                  {Icons.arrowright}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Section1;
