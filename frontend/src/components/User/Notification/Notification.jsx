import React, { useState } from 'react';

const Notification = () => {
  const [toggleState, setToggleState] = useState(
    new Array(16).fill(false)
  );

  const handleToggle = (index) => {
    setToggleState((prevState) =>
      prevState.map((state, i) => (i === index ? !state : state))
    );
  };

  const sections = [
    { title: "Getting Started with Buffer", description: "Useful tips and best practices for getting the most out of Buffer." },
    { title: "Channel Connection Updates", description: "Emails about your connected channels. For example, when a channel is disconnected." },
    { title: "Empty Queue Alerts", description: "Receive an alert when you have no more content scheduled for one of your channels." },
    { title: "Published Post Confirmations", description: "Receive an email for any post that is successfully published to one of your channels." },
    { title: "Post Failures", description: "An email if a post in your queue fails to be published." },
    { title: "Billing and Payment Reminders", description: "Emails relating to billing and payment reminders." },
    { title: "Social Post Prompts and Ideas", description: "Daily inspiration and AI prompts for generating social media content." },
    { title: "Daily Post Recap", description: "Receive a daily email reviewing the previous day’s posts and upcoming scheduled posts." },
    { title: "Weekly Analytics Report", description: "A weekly report on the performance of your channels and posts." },
    { title: "Milestones", description: "Emails celebrating your social media achievements with Buffer." },
    { title: "Collaboration", description: "Emails about contributions from team members. For example, if a post is awaiting approval." },
    { title: "User Feedback and Research", description: "Emails to participate in user feedback and research to help make Buffer better." },
    { title: "Buffer Product Updates and News", description: "Occasional emails to help you get the most out of Buffer, including new features and product announcements." },
    { title: "Buffer's Social Media Weekly Newsletter", description: "Buffer’s latest blog posts and curated advice to help you grow on social media." },
    { title: "Buffer's Open Blog Newsletter", description: "Our blog posts on Buffer's open culture and our commitment to transparency." },
    { title: "Buffer Careers", description: "The latest career opportunities and role openings at Buffer." }
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 border-gray-300 pb-3 dark:text-white ">Email Notifications</h2>
      <p className="mb-6 border-b mt-2 pb-3 text-gray-600 dark:text-white dark:border-borderDarkmode">
        Get email alerts and updates to help you manage your Buffer account.
      </p>

      {sections.map((section, index) => (
        <div key={index} className="flex flex-col md:flex-row items-start justify-between border-b mb-8 pb-4 gap-6 dark:border-borderDarkmode">
          <div className="flex-1">
            <label className="text-lg font-semibold text-gray-700 dark:text-white">{section.title}</label>
            <p className="text-gray-600 mt-2 text-sm md:text-base dark:text-white">{section.description}</p>
          </div>
          <div className="flex flex-col items-start gap-3 w-full md:w-auto">
            <label className="flex items-center cursor-pointer">
              <span className="text-gray-700 font-medium mr-3 text-sm md:text-base dark:text-white">
                {toggleState[index] ? "Enabled" : "Disabled"}
              </span>
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={toggleState[index]}
                  onChange={() => handleToggle(index)}
                />
                <div
                  className={`w-14 h-7 rounded-full flex items-center p-1 transition-colors duration-300 ${
                    toggleState[index] ? "bg-blue-600" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full transition-transform duration-300 ${
                      toggleState[index]
                        ? "bg-white translate-x-7"
                        : "bg-white translate-x-0 border border-gray-300"
                    }`}
                  ></div>
                </div>
              </div>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Notification;
