import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function ReferAFriend() {
  const [referralLink, setReferralLink] = useState();
  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
  };

  return (
    <div className="flex items-center justify-center  px-4 ">
      <div className="">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 dark:text-white">Refer a Friend</h1>
        <div className="bg-white max-w-3xl w-full shadow-md rounded-lg p-6 md:p-8 border border-gray-200 dark:bg-bgCopnents dark:text-white dark:border-borderDarkmode">
          <p className="text-gray-700 mb-4 dark:text-white">
            Enjoying Buffer? Your friends will too!
          </p>
          <p className="text-gray-700 mb-6 dark:text-white">
            Share Buffer to help them grow an audience with a totally free
            account. You’ll also support Buffer’s growth, allowing us to continue
            improving the service.
          </p>
          <div>
            <h2 className="font-bold text-gray-800 mb-2 dark:text-white">How to share</h2>
            <ol className="list-decimal list-inside text-gray-700 space-y-2 mb-4 dark:text-white">
              <li>Find the unique referral link below for your organization.</li>
              <li>
                Share your link publicly or with someone who’d enjoy using Buffer.
              </li>
              <li>Your friend signs up for their free Buffer account.</li>
              <li>You and your friend can grow on social and beyond.</li>
            </ol>
          </div>
          <div className="mb-6">
            <p className="font-bold text-gray-800 mb-2 dark:text-white">
              My organization’s unique referral link:
            </p>
            <div className="flex flex-col md:flex-row items-center gap-2">
              <input
                type="text"
                value={referralLink}
                placeholder="Enter Referral Link"
                onChange={(e) => setReferralLink(e.target.value)}
                className="w-full md:flex-1 border border-gray-300 rounded-md px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-ScocilMCompnent dark:border-borderDarkmode dark:text-white"
              />
              <button
                onClick={handleCopy}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Copy
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 ">
                Share Now
              </button>
            </div>
          </div>
          <div className="text-sm text-gray-600 dark:text-white">
            Help us improve the Buffer referral experience!{" "}
            <Link
              to={""}
              className="text-blue-500 hover:underline focus:outline-none"
            >
              Take our quick survey
            </Link>
            .
          </div>
        </div>
      </div>
    </div>
  );
}
