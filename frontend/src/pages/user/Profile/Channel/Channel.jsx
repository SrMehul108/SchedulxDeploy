import React, { useEffect, useState } from "react";
import { ChannelCard } from "../../../../components/Profile/ChannelCard/ChannelCard";
import ChannelModal from "../../../../components/User/Modal/ChannelModal/ChannelModal";
import api from "../../../../apis/api";


import {
  FaFacebook,
  FaLinkedin,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
export default function Channel() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const userId = localStorage.getItem("userId");
      const response = await api.get(`/api/v1/user/user-get/${userId}`);
      setUserData(response.data.data);
      
    } catch (err) {
      console.error("Error fetching user data: ", err);
      setError(err.response?.data?.message || "Failed to fetch user data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const activePlatforms = userData?.socialMedia || [];
  const channels = activePlatforms.map((platform, index) => ({
    id: platform._id,
    name: platform.platformUserName,
    type: `${platform.platformName.toUpperCase()} PROFILE`,
    icon:
      platform.platformName === "xtwitter"
        ? <FaSquareXTwitter className="text-black" />
        : platform.platformName === "facebook"
          ? <FaFacebook className="text-blue-600 w-6 h-6 " />
          : platform.platformName === "linkedin"
            ? <FaLinkedin className="text-blue-700" />
            : "🔗",
    platform: platform.platformName.toLowerCase(),
  }));

  
  

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Channels</h1>
        <button
          className=" border text-slate-800 px-4 py-2 rounded-xl hover:bg-slate-50 dark:bg-bgbutton hover:dark:bg-[#282a2c] transition-all duration-200 dark:text-white"
          onClick={openModal}
        >
          Upgrade Channel
        </button>

        {isModalOpen && <ChannelModal onClose={closeModal} />}
      </div>
      <div className="space-y-5 dark:bg-bgCopnents">
        {channels.map((channel) => (
          <ChannelCard
            onAdd={fetchUserData}
            key={channel.id}
            {...channel}
            isActive={activePlatforms.some(
              (ap) => ap.platformName === channel.platform
            )}
          />
        ))}
      </div>
    </div>
  );
}
