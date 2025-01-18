import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function BetaFeatures() {
  const [isBetaEnabled, setIsBetaEnabled] = useState(false);

  const toggleBetaFeatures = () => {
    setIsBetaEnabled(!isBetaEnabled);
  };

  return (
    <div className="flex items-center justify-center  ">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Beta Features</h1>
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300 dark:bg-bgCopnents dark:text-white dark:border-borderDarkmode">
          <h2 className="font-bold text-lg mb-4">Try new Buffer features early</h2>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-700 dark:text-white">Enable Beta features:</span>
            <label
              htmlFor="toggle"
              className="flex items-center cursor-pointer"
            >
              <div className="relative">
                <input
                  id="toggle"
                  type="checkbox"
                  className="sr-only"
                  checked={isBetaEnabled}
                  onChange={toggleBetaFeatures}
                />
                <div
                  className={`block w-12 h-6 rounded-full ${isBetaEnabled ? "bg-blue-500" : "bg-gray-300"
                    }`}
                ></div>
                <div
                  className={`dot absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition ${isBetaEnabled ? "transform translate-x-6" : ""
                    }`}
                ></div>
              </div>
              <span className="ml-3 text-gray-700 font-medium dark:text-white">
                {isBetaEnabled ? "On" : "Off"}
              </span>
            </label>
          </div>
          <p className="text-gray-700 mb-4 dark:text-white">
            What's the catch? Share feedback with us below to help improve
            Buffer!
          </p>
          <p className="text-sm text-gray-600 dark:text-white">
            Beta features are experimental and currently only available in a web
            browser. Enabling them may lead to a less stable Buffer experience.
            For more info, visit our{" "}
            <Link
              to={""}
              className="text-blue-500 hover:underline"
            >
              Help Center
            </Link>
            . We are exploring an open Beta program for our mobile apps. Stay
            tuned!
          </p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300 dark:bg-bgCopnents dark:text-white dark:border-borderDarkmode">
          <h2 className="font-bold text-lg mb-4 dark:text-white">Current Beta features</h2>
          <div className="flex items-start text-gray-700 mb-4">
            <span className="mr-2 text-gray-500 dark:text-white">ℹ️</span>
            <p className="dark:text-white">
              Join our Beta program above to access these current Beta features
            </p>
          </div>
          <ul className="text-gray-400 space-y-2 dark:text-white">
            <li>
              <span className="font-bold">All Channels View</span>
              <p className="text-sm">
                A list view of all your posts across all your channels.
              </p>
            </li>
            <li>
              <span className="font-bold">Floating Composer Toolbar</span>
              <p className="text-sm">
                Toolbar will now be accessible regardless of the scroll position
                in the Composer.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
