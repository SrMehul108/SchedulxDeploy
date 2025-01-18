import { useState } from "react";
import { Icons } from "../../../constants";
import { Link } from "react-router-dom";
const SocialCard = () => {
  const slides = [
    {
      id: 1,
      img: "https://via.placeholder.com/100x100",
      title: "Creative Content Strategies for Growing Your Online Audience",
    },
    {
      id: 2,
      img: "https://via.placeholder.com/100x100",
      title: "How to Plan Your Social Media Content Effectively in 2024",
    },
    {
      id: 3,
      img: "https://via.placeholder.com/100x100",
      title: "Top 5 Social Media Trends You Should Follow in 2024",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="border rounded-lg shadow-md p-4 bg-white flex flex-col md:flex-row items-center md:items-stretch space-y-4 md:space-y-0 md:space-x-4 h-auto md:h-48 mb-4">
      {/* Left Content */}
      <div className="w-full md:w-1/4 text-center flex items-center md:text-left">
        <div>
          <h2 className="text-lg font-medium mb-2">
            Looking to succeed at social?
          </h2>
          <Link href="#" className="text-black flex items-center gap-2">
            <span className="flex items-center font-extrabold ">
              {" "}
              ScheDul<span>{Icons.schedulXNav}</span>
            </span>{" "}
            Library.
          </Link>
        </div>
      </div>
      <div className="hidden md:block w-px bg-gray-300 h-auto md:h-40"></div>
      {/* Middle Content */}
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-3/5">
        <div className="flex items-center space-x-4 w-full md:w-3/4">
          <img
            src={slides[currentIndex].img}
            alt={slides[currentIndex].title}
            className="w-20 h-20 md:w-28 md:h-28 object-cover rounded"
          />
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm text-gray-700 mb-2">
              {slides[currentIndex].title}
            </p>
            <button className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">
              Read More
            </button>
          </div>
        </div>
        {/* Right Arrow */}
        <button
          className="p-2 border rounded-lg hover:bg-gray-100"
          onClick={nextSlide}
        >
          <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  );
};
export default SocialCard;