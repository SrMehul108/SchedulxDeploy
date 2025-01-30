import React, { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPinterestSquare,
} from "react-icons/fa";

import { FiPlus } from "react-icons/fi";
import { FaSquareXTwitter } from "react-icons/fa6";
const ChannelModal = ({ onClose }) => {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const channels = [
    { name: "Facebook", description: "Page or Group", icon: <FaFacebook className="text-blue-600" /> },
    { name: "Instagram", description: "Profile", icon: <FaInstagram className="text-pink-500" /> },
    { name: "LinkedIn", description: "Page or Profile", icon: <FaLinkedin className="text-blue-700" /> },
    { name: "XTwitter", description: "Profile", icon: <FaSquareXTwitter  className="text-black" /> },
    { name: "Pinterest", description: "Profile", icon: <FaPinterestSquare className="text-red-600" /> },
    { name: "Other", description: "Other Profile ", icon: <FiPlus className="text-black" /> },
  ];

  const handlePlatformClick = async (platformName) => {
    setSelectedPlatform(platformName);
    try {
      setIsLoading(true);
      setError(null);

      let authUrl;
      
      switch (platformName) {
        
        case "XTwitter":
          authUrl = "https://schedulx-backend-ybdo.onrender.com/api/v1/twitter";
          // authUrl = "http://localhost:5000/api/v1/twitter";
          break;
        case "Facebook":
          authUrl = "https://schedulx-backend-ybdo.onrender.com/api/v1/facebook";
          // authUrl = "http://localhost:5000/api/v1/facebook";
          break;
        case "LinkedIn":
          authUrl = "https://schedulx-backend-ybdo.onrender.com/api/v1/linkedin";
          // authUrl = "http://localhost:5000/api/v1/linkedin";
          break;
        default:
          throw new Error(`${platformName} authentication not yet implemented`);
      }

      window.location.href = authUrl;
    } catch (error) {
      setError(`Failed to connect to ${platformName}. Please try again.`);
      console.error(`Error initiating ${platformName} auth:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
    className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-50"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-xl shadow-lg w-full max-w-3xl mx-4 sm:mx-6 md:mx-auto dark:bg-bgCopnents dark:text-white"
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
    >
      {/* Header */}
      <div className="flex justify-end p-4">
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-red-600 text-lg"
        >
          &#10005;
        </button>
      </div>
  
      {/* Content */}
      <h2 className="text-xl sm:text-2xl font-semibold text-slate-700 text-center px-4 dark:text-white">
        Setup your New Connection
      </h2>
      <div className="p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {channels.map((channel, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 sm:p-5 hover:border-slate-500 rounded-2xl border border-white hover:bg-slate-50 hover:cursor-pointer hover:shadow-lg transition-all duration-200 relative dark:border-borderDarkmode dark:hover:text-black"
            onClick={() => handlePlatformClick(channel.name)}
          >
            {isLoading && selectedPlatform === channel.name && (
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70 rounded-2xl">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
              </div>
            )}
            <div className="text-6xl sm:text-7xl md:text-8xl mb-2">
              {channel.icon}
            </div>
            <h3 className="text-sm sm:text-base md:text-lg font-semibold">
              {channel.name}
            </h3>
            <p className="text-xs sm:text-sm text-center text-gray-500 dark:text-gray-300">
              {channel.description}
            </p>
            {error && selectedPlatform === channel.name && (
              <p className="text-red-500 text-xs mt-2">{error}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
  
  );
};

export default ChannelModal;