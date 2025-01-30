import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Totals from "../Totals/Totals";
import ResentPost from "../RecentPost/ResentPost";
import SocialChannels from "../SocialChannels/SocialChannels";
import AnalyzeTags from "../AnalyzeTags/AnalyzeTags";
import api from "../../../apis/api";
import { Icons } from "../../../constants/icons";

const AnalyzeDashboard = () => {
  const [data, setData] = useState([]); 
  const [metrics, setMetrics] = useState([]); 
  const location = useLocation(); 

  const fetchPost = async () => {
    try {
      const response = await api.get("/api/v1/post/posts-get");
      const platforms = response.data.data;

      const allPosts = platforms.flatMap((platform) =>
        platform.posts.map((post) => ({
          ...post,
          platformName: platform.platformName,
        }))
      );

      setData(allPosts);

      const totalAudience = allPosts.reduce(
        (sum, post) => sum + (post.analytics?.[0]?.impressions || 0),
        0
      );
      const totalEngagement = allPosts.reduce(
        (sum, post) => sum + (post.analytics?.[0]?.engagements || 0),
        0
      );

      setMetrics([
        {
          title: "Total Audience",
          value: totalAudience.toLocaleString(),
          trend: null,
          data: Array.from({ length: 5 }, (_, i) => totalAudience / (5 - i)),
        },
        {
          title: "Total Impressions",
          value: totalAudience.toLocaleString(),
          trend: `\u2191 ${(totalAudience * 0.05).toFixed(2)}%`,
          data: Array.from({ length: 5 }, (_, i) => totalAudience / (5 - i)),
        },
        {
          title: "Total Engagement",
          value: `${totalEngagement.toFixed(2)}%`,
          trend: `\u2191 ${(totalEngagement * 0.02).toFixed(2)}%`,
          data: Array.from({ length: 5 }, (_, i) => totalEngagement / (5 - i)),
        },
      ]);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const renderContent = () => {
    const path = location.pathname;

    const platformIcons = {
      xtwitter: Icons.twitter,
      linkedin: Icons.linkedin,
    };

    if (path === "/analyze/home") {
      return (
        <>
          <Totals
            title="Key Metrics"
            description="Keep an eye on your top metrics, including total engagement, impressions, and reach."
            metrics={metrics}
          />
          <ResentPost
            title="Recent Post Performance"
            description="See how your latest posts are performing across platforms."
            posts={data}
            platformIcons={platformIcons} 
          />
          <SocialChannels
            title="Channel Overview"
            description="Monitor engagement, growth, and activity across all your connected social channels."
            data={data}
          />
        </>
      );
    } else if (path === "/analyze/reports") {
      return (
        <>
          <Totals
            title="All Key Metrics"
            description="An overview of all metrics from your connected platforms."
            metrics={metrics}
          />
        </>
      );
    } else if (path === "/analyze/xtwitter") {
      const twitterPosts = data.filter(
        (post) => post.platformName.toLowerCase() === "xtwitter"
      );

      const twitterMetrics = twitterPosts.reduce(
        (metrics, post) => {
          metrics.totalAudience += post.analytics?.[0]?.impressions || 0;
          metrics.totalEngagement += post.analytics?.[0]?.engagements || 0;
          return metrics;
        },
        { totalAudience: 0, totalEngagement: 0 }
      );

      const twitterMetricsFormatted = [
        {
          title: "Total Audience",
          value: twitterMetrics.totalAudience.toLocaleString(),
          trend: null,
          data: Array.from({ length: 5 }, (_, i) => twitterMetrics.totalAudience / (5 - i)),
        },
        {
          title: "Total Impressions",
          value: twitterMetrics.totalAudience.toLocaleString(),
          trend: `\u2191 ${(twitterMetrics.totalAudience * 0.05).toFixed(2)}%`,
          data: Array.from({ length: 5 }, (_, i) => twitterMetrics.totalAudience / (5 - i)),
        },
        {
          title: "Total Engagement",
          value: `${twitterMetrics.totalEngagement.toFixed(2)}%`,
          trend: `\u2191 ${(twitterMetrics.totalEngagement * 0.02).toFixed(2)}%`,
          data: Array.from({ length: 5 }, (_, i) => twitterMetrics.totalEngagement / (5 - i)),
        },
      ];

      return twitterPosts.length > 0 ? (
        <>
          <Totals
            title="Key Metrics"
            description="Keep an eye on your top metrics, including total engagement, impressions, and reach."
            metrics={twitterMetricsFormatted}
          />
          <ResentPost
            title="Post Performance"
            description="View performance of your posts."
            posts={twitterPosts}
            // icon={platformIcons.xtwitter}
            platformIcons={platformIcons} 
          />
          <SocialChannels
            title="Channel Overview"
            description="Monitor engagement, growth, and activity across all your connected social channels."
            data={twitterPosts} 
          />
        </>
      ) : (
        <AnalyzeTags title="No Twitter Posts Found" />
      );
    } else if (path === "/analyze/linkedin") {
      const linkedinPosts = data.filter(
        (post) => post.platformName.toLowerCase() === "linkedin"
      );

      const linkedinMetrics = linkedinPosts.reduce(
        (metrics, post) => {
          metrics.totalAudience += post.analytics?.[0]?.impressions || 0;
          metrics.totalEngagement += post.analytics?.[0]?.engagements || 0;
          return metrics;
        },
        { totalAudience: 0, totalEngagement: 0 }
      );

      const linkedinMetricsFormatted = [
        {
          title: "Total Audience",
          value: linkedinMetrics.totalAudience.toLocaleString(),
          trend: null,
          data: Array.from({ length: 5 }, (_, i) => linkedinMetrics.totalAudience / (5 - i)),
        },
        {
          title: "Total Impressions",
          value: linkedinMetrics.totalAudience.toLocaleString(),
          trend: `\u2191 ${(linkedinMetrics.totalAudience * 0.05).toFixed(2)}%`,
          data: Array.from({ length: 5 }, (_, i) => linkedinMetrics.totalAudience / (5 - i)),
        },
        {
          title: "Total Engagement",
          value: `${linkedinMetrics.totalEngagement.toFixed(2)}%`,
          trend: `\u2191 ${(linkedinMetrics.totalEngagement * 0.02).toFixed(2)}%`,
          data: Array.from({ length: 5 }, (_, i) => linkedinMetrics.totalEngagement / (5 - i)),
        },
      ];

      return linkedinPosts.length > 0 ? (
        <>
          <Totals
            title="Key Metrics"
            description="Keep an eye on your top metrics, including total engagement, impressions, and reach."
            metrics={linkedinMetricsFormatted}
          />
          <ResentPost
            title="Post Performance"
            description="View performance of your posts."
            posts={linkedinPosts}
            // icon={platformIcons.linkedin}
            platformIcons={platformIcons} 
          />
          <SocialChannels
            title="Channel Overview"
            description="Monitor engagement, growth, and activity across all your connected social channels."
            data={linkedinPosts} 
          />
        </>
      ) : (
        <AnalyzeTags title="No LinkedIn Posts Found" />
      );
    } else {
      return <AnalyzeTags title="Analyze Tags Overview" />;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Welcome to Your Analytics Dashboard!
        </h1>
        <p className="text-gray-600 mt-1 dark:text-gray-400">
          Gain actionable insights and stay ahead of your competition. All your
          reports are stored in the
          <Link
            to={"/reports/"}
            target="_self"
            rel="noreferrer"
            className="text-blue-500 font-bold"
          >
            Reports
          </Link>
          tab. Use the analytics below to track performance, optimize campaigns,
          and grow your brand.
        </p>
      </div>

      {renderContent()}
    </div>
  );
};

export default AnalyzeDashboard;