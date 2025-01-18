import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Security = () => {
  const [isChecked, setIsChecked] = useState(true);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="p-6 max-w-[864px] mx-auto">
      <h2 className="text-2xl font-semibold mb-6 border-gray-300 pb-3 dark:text-white">Security</h2>
      <p className="mb-6 border-b mt-2 pb-3 text-gray-600 dark:text-white dark:border-borderDarkmode">
        Add an extra layer of security to your account.
      </p>

      {/* Row 1: Password */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between border-b mb-8 pb-4 gap-6 dark:border-borderDarkmode">
        <div className="flex-1">
          <label className="text-lg font-semibold text-gray-700 dark:text-white">Password</label>
          <p className="text-gray-600 mt-2 dark:text-white">
            Use your password to sign in to Buffer on the web and mobile apps. Make it nice and secure!
          </p>
        </div>
        <button className="text-[rgb(61, 61, 61)] border border-[#3D3D3D] h-10 py-1 px-3 w-full md:w-auto hover:text-gray-700 focus:outline-none dark:text-white dark:bg-bgbutton hover:dark:bg-white hover:dark:text-black">
          Change Your Password
        </button>
      </div>

      {/* Row 2: Two-factor Authentication */}
      <div className="flex flex-col md:flex-row items-start md:items-start justify-between gap-6 mb-8">
        <div className="flex-1">
          <label className="text-lg font-semibold text-gray-700 dark:text-white">Two-factor Authentication</label>
          <p className="text-gray-600 mt-2 dark:text-white">
            Two-factor authentication adds an extra layer of security for your Buffer account. 
            Whenever you log in to your account, after entering your username and password, 
            you will be asked for a second authentication code that was sent to your mobile phone 
            via text or a free mobile app.{' '}
            <Link to={""} className="text-blue-600 hover:text-blue-800">Learn more</Link>
          </p>
        </div>
        <div className="flex flex-col items-start gap-3 w-full md:w-auto">
          <label className="flex items-center cursor-pointer">
            <span className="text-gray-700 font-medium mr-3 dark:text-white">
              {isChecked ? 'Disabled' : 'Enabled'}
            </span>
            <div className="relative">
              <input
                type="checkbox"
                className="sr-only"
                checked={isChecked}
                onChange={handleToggle}
              />
              <div className="w-14 h-7 bg-gray-300 rounded-full flex items-center p-1 transition-colors duration-300">
                <div
                  className={`w-6 h-6 rounded-full transition-transform duration-300 ${
                    isChecked
                      ? 'bg-white translate-x-0 border border-gray-300'
                      : 'bg-blue-600 translate-x-7'
                  }`}
                ></div>
              </div>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Security;