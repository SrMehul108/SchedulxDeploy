import React from "react";
import { Link } from "react-router-dom";
import TestimonialSlider from "../components/LandingPage/TestimonialSlider/TestimonialSlider";
import Faq from "../components/LandingPage/FAQ/Faq";
import HeroSection from "../components/LandingPage/Herosection/HeroSection";
import Section1 from "../components/LandingPage/Section/Section1";
import Section from "../components/LandingPage/Section/Section";
import Section2 from "../components/LandingPage/Section/Section2";
import Section3 from "../components/LandingPage/Section/Section3";
import Section4 from "../components/LandingPage/Section/Section4";
import Sts from "../components/LandingPage/Sts/Sts";
import Section5 from "../components/LandingPage/Section/Section5";
import section2 from "../assets/images/great-team.png";
export default function LandingPage() {
  return (
    <>
      <div className="mx-auto text-black text-sm">
        <div className="container mx-auto bg-white dark:bg-darkmode dark:text-white px-4 sm:px-6 lg:px-8">
          {/* hero */}
          <HeroSection />
          {/* section */}
          <Section />
          {/* section1 */}
          <Section1 />
          {/* section2 */}
          <Section2 />
          {/* section3 */}
          <Section3 />
          {/* section4 */}
          <Section4 />
          <Section5 />
          {/* slider */}
          <div className="mx-auto py-20 ps-10">
            <TestimonialSlider />
          </div>
          {/* STS */}
          <Sts />
          {/* FAQ */}
          <div className="px-4 sm:px-10 mt-28">
            <Faq />
          </div>
          {/* Subscribe */}
          {/* <div className="mt-28 px-4 sm:px-10">
            <div className="max-w-7xl mx-auto bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700 py-16 px-6 relative">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="md:text-4xl text-3xl font-semibold mb-6 text-white">
                  Subscribe to Our Schedulx
                </h2>
                <div className="my-6">
                  <p className="text-white">
                    Subscribe to our Schedulx and stay up to date with the latest news, updates, and exclusive offers. Get valuable insights. Join our community today!
                  </p>
                </div>
                <div className="max-w-2xl left-0 right-0 mx-auto w-full bg-white p-5 flex items-center shadow-lg absolute -bottom-10 rounded-md">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-gray-50 py-3.5 px-4 text-base focus:outline-none"
                  />
                  <button className="bg-black hover:bg-[#222] text-white flex items-center transition-all font-semibold px-5 py-4">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div> */}
          <div className="w-full h-full pt-20">
            <img
              src={section2}
              alt="SchedulX Calendar Feature"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>

          <footer className="">
            <hr className="my-6" />
            <p className="text-center mb-6">
              © 2025
              <Link href="" target="_blank" className="hover:underline mx-1">
                Schedulx
              </Link>
              All Rights Reserved.
            </p>
          </footer>
        </div>
      </div>

    </>
  );
}