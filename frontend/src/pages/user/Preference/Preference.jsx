import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const Preference = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { path: '/preference/General', label: 'General' },
    { path: '/preference/Security', label: 'Security' },
    { path: '/preference/Notifications', label: 'Notifications' },
    { path: '/preference/AppsExtras', label: 'Apps & Extras' },
  ];

  const activeTab = tabs.find((tab) => location.pathname.startsWith(tab.path))?.path;

  const handleTabClick = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 mt-20 dark:bg-ScocilMCompnent">
      {/* Navigation Bar */}
      <div className="tabs tabs-lifted tabs-lg mt-4 rounded-lg border-b  dark:border-borderDarkmode">
        <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-start space-y-2 md:space-y-0">
          {tabs.map((tab) => (
            <Link
              key={tab.path}
              to={tab.path}
              role="tab"
              className={`cursor-pointer py-4 px-6 text-sm sm:text-base md:text-lg tab rounded-t transition-all duration-200 ${
                activeTab === tab.path
                  ? 'bg-gray-100 text-black border-blue-500 border-b-4 '
                  : 'hover:bg-gray-200 dark:hover:text-black'
              }`}
            > 
              {tab.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-grow bg-white pt-5  dark:bg-bgCopnents">
        <div className="overflow-y-auto h-screen p-4 md:p-8 mx-auto rounded-lg w-full max-w-7xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Preference;
