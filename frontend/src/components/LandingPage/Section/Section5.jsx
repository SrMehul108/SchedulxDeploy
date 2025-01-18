import React from 'react';
import section5 from "../../../assets/images/section-3-a.webp";
import { Icons } from '../../../constants';

function Section5() {
  return (
    <>
      <div className="px-4 sm:px-10 mt-28">
        <div className="w-full mx-auto grid md:grid-cols-1 justify-center items-center gap-10">
          <div className="w-full h-full mx-auto">
            <img
              src={section5}
              alt="SchedulX Post Creation and Scheduling"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Section5;