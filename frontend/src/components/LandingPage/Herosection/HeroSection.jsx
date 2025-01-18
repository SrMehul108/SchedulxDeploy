import React from 'react';
import { Icons } from '../../../constants';
import hero from '../../../assets/images/hero-image.png';

function HeroSection() {
  return (
   <>
   <div className=" bg-white-100 px-4 sm:px-10">
               <div className=" w-full mx-auto ">
                 <div className="grid lg:grid-cols-2 justify-center items-center gap-10">
                   <div>
                     <h1 className="md:text-5xl text-4xl font-bold mb-6 md:!leading-[55px]">Grow your audience on social and beyond
                     </h1>
                     <p className="text-base leading-relaxed">SchedulX helps you build an audience organically. We’re a values-driven company that provides affordable, intuitive marketing tools for ambitious people and teams.</p>
                     <div className="flex flex-wrap gap-y-4 gap-x-8 mt-8">
                       <button
                         className='bg-blue-800 hover:bg-blue-500 text-white flex items-center transition-all text-xl font-bold rounded-xl px-5 py-4 dark:bg-bgbutton hover:dark:bg-white hover:dark:text-black'>Get
                         started
                         {Icons.arrowright}
                       </button>
                     </div>
                   </div>
                   <div className="max-lg:mt-12 h-full">
                     <img src={hero} alt="banner img" className="w-full h-full object-cover rounded-lg" />
                   </div>
                 </div>
               </div>
             </div>
   </>
  )
}

export default HeroSection;
