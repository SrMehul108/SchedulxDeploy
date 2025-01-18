const SocialChannels = ({ data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border dark:bg-bgCopnents dark:text-white dark:border-borderDarkmode">
      {/* Title */}
      <h3 className="text-lg font-semibold mb-4">Social Channels Overview</h3>
      {/* Table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-600 dark:text-white">
              <th className="py-2">Profiles</th>
              <th>Followers</th>
              <th>Impressions</th>
              <th>Engagement Rate</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              const platformName = item.platformName.toLowerCase();
              const platformSpecific = item.platformSpecific?.[platformName] || {};
              const analytics = item.analytics?.[0] || {};

              return (
                <tr key={item._id} className="border-t text-gray-700 dark:text-white dark:border-borderDarkmode">
                  <td className="py-2 flex items-center">
                    <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full mr-2 dark:text-white">
                      {item.platformName?.charAt(0).toUpperCase()}
                    </div>
                    {item.platformName}
                  </td>
                  <td className="dark:text-white">{analytics.followers || 0}</td>
                  <td>
                    {analytics.impressions || 0}{" "}
                    {analytics.impressions && (
                      <span className="text-green-500 text-xs font-semibold">
                        &#x2191; {analytics.impressions}%
                      </span>
                    )}
                  </td>
                  <td>
                    {analytics.engagements || "0%"}{" "}
                    {analytics.engagements && (
                      <span className="text-green-500 text-xs font-semibold">
                        &#x2191; {analytics.engagements}%
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Mobile View*/}
      <div className="sm:hidden">
        {data.map((item) => {
          const platformName = item.platformName.toLowerCase();
          const platformSpecific = item.platformSpecific?.[platformName] || {};
          const analytics = item.analytics?.[0] || {};

          return (
            <div key={item._id} className="border-t py-4 text-gray-700">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full mr-2 dark:text-white">
                  {item.platformName?.charAt(0).toUpperCase()}
                </div>
                <p className="font-semibold dark:text-white">{item.platformName}</p>
              </div>
              <p className="text-sm text-gray-600 dark:text-white">
                Followers:{" "}
                <span className="font-bold text-gray-900 dark:text-[#3B82F6]">
                  {analytics.followers || 0}
                </span>
              </p>
              <p className="text-sm text-gray-600 dark:text-white">
                Impressions:{" "}
                <span className="font-bold text-gray-900 dark:text-[#3B82F6]">
                  {analytics.impressions || 0}{" "}
                  {analytics.impressions && (
                    <span className="text-green-500 text-xs font-semibold">
                      &#x2191; {analytics.impressions}%
                    </span>
                  )}
                </span>
              </p>
              <p className="text-sm text-gray-600 dark:text-white">
                Engagement Rate:{" "}
                <span className="font-bold text-gray-900 dark:text-[#3B82F6]">
                  {analytics.engagementRate || "0%"}{" "}
                  {analytics.engagementRateGrowth && (
                    <span className="text-green-500 text-xs font-semibold">
                      &#x2191; {analytics.engagementRateGrowth}%
                    </span>
                  )}
                </span>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SocialChannels;