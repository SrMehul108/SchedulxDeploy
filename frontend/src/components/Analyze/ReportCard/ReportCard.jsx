import React from "react";
const ReportsCard = ({ hasData }) => {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm p-4 bg-white flex flex-col items-center   mx-auto h-96">
      {/* Title */}
      <div className="w-full text-left mb-8">
        <h2 className="text-gray-900 font-semibold text-lg">Recent reports</h2>
      </div>
      {/* Conditional Rendering */}
      {!hasData ? (
        <div className="flex flex-col items-center">
          <div className="flex justify-center mb-6">
            <img
              src="your-illustration-url.png"
              alt="No reports illustration"
              className="w-32 h-32"
            />
          </div>
          {/* Text */}
          <div className="text-center">
            <h3 className="text-gray-800 font-medium text-lg">
              Aw, shucks! There are currently no reports
            </h3>
            <p className="text-gray-500 mt-2 text-sm">
              Create one with the 'Add to Report' button on any graph
            </p>
          </div>
        </div>
      ) : (
        <div className="text-gray-800 text-center font-medium text-lg">
          {/* Data rendering */}
          <p>Reports will appear here!</p>
        </div>
      )}
    </div>
  );
};

export default ReportsCard;
