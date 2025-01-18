import React from "react";
import { Icons } from "../../constants/icons";

function ComingSoon() {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-500 dark:from-darkmode dark:to-darkmode">
        <div className="text-center">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white flex items-center">
              Schedul
              <span className="text-red-600">{Icons.schedulX}</span>
            </h1>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white dark:text-gray-300">
            Coming soon...
          </h1>
          <div className="mt-4">
            <p
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-300 opacity-50 transform translate-y-2 blur-sm dark:text-gray-500 dark:opacity-70"
              style={{ textShadow: "0px 2px 6px rgba(0,0,0,0.5)" }}
            >
              Coming soon...
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default ComingSoon;