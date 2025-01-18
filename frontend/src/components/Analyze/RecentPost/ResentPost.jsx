const ResentPost = ({ posts, icon }) => {
  return (
    <div className="mb-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Recent Posts</h2>
        <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100 dark:bg-gray-200">
          <span className="text-xl font-bold  dark:text-black">+</span>
        </button>
      </div>
      {/* Posts Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {posts.map((post) => {
          const platformName = post.platformName.toLowerCase();
          const platformSpecific = post.platformSpecific?.[platformName] || {};
          const analytics = post.analytics?.[0] || {};
          const postContent =
            platformSpecific.text ||
            platformSpecific.content ||
            "No content available";
          const mediaUrl = platformSpecific.mediaUrls?.[0];
          return (
            <div
              key={post._id}
              className="border rounded-xl p-4 bg-white hover:bg-gray-100 shadow-lg flex items-center space-x-4 transition-shadow duration-200 ease-in-out dark:text-white dark:bg-bgCopnents dark:border-borderDarkmode"
            >
              {/* Left Content */}
              <div className="flex-1">
                {/* Post Title */}
                <div className="flex gap-2">
                  <div className="h-5 w-5">{icon}</div>
                  <div className="text-black font-bold mb-3 dark:text-blue-500">{platformName}</div>
                </div>
                {/* Post Title */}
                <h3 className="text-base font-medium text-gray-800 mb-3 line-clamp-6 dark:text-white">
                  {postContent}
                </h3>

                {/* Post Details */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-[9px] sm:text-xs text-gray-500 dark:text-blue-500">
                      Reach
                    </p>
                    <p className="text-[13px] sm:text-xs md:text-sm lg:text-base font-semibold text-gray-800 dark:text-white">
                      {analytics.impressions || 0}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] sm:text-xs text-gray-500 dark:text-blue-500 ">
                      Coments
                    </p>
                    <p className="text-[13px] sm:text-xs md:text-sm lg:text-base font-semibold text-gray-800 dark:text-white">
                      {analytics.comment || 0}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-[9px] sm:text-xs text-gray-500 dark:text-blue-500">
                      Likes
                    </p>
                    <p className="text-[13px] sm:text-xs md:text-sm lg:text-base font-semibold text-gray-800 dark:text-white">
                      {analytics.like || 0}
                    </p>
                  </div>
                </div>
              </div>
              {/* Right Image */}
              <div className="w-36 h-36">
                {mediaUrl ? (
                  <img
                    src={mediaUrl}
                    alt="Post"
                    className="w-full h-full object-cover rounded-md"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
                    <span className="text-gray-500 text-sm">No Image</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResentPost;
