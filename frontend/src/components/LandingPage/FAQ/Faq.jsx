import React, { useState } from "react";
import { Icons } from "../../../constants";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Schedulx, and how does it work?",
      answer: "Schedulx is a social media scheduling platform that lets you plan, create, and post content across multiple platforms like Instagram, Twitter, Facebook, and LinkedIn. It simplifies social media management by allowing you to schedule posts for specific dates and times.",
    },
    {
      question: "Can I schedule posts for multiple platforms simultaneously?",
      answer: "Yes, Schedulx allows you to create a single post and schedule it across multiple social media platforms simultaneously, saving you time and effort.",
    },
    {
      question: "Does Schedulx provide analytics for scheduled posts?",
      answer: "Absolutely! Schedulx provides insights and analytics for your scheduled posts, including engagement, impressions, and click-through rates to help you measure performance.",
    },
    {
      question: "Is there a free version of Schedulx available?",
      answer: "Yes, Schedulx offers a free version with limited features. For advanced features like analytics, multi-platform scheduling, and team collaboration, you can upgrade to one of our premium plans.",
    },
    {
      question: "Can I collaborate with my team on Schedulx?",
      answer: "Yes, Schedulx offers team collaboration features, allowing multiple users to work on posts, review schedules, and manage campaigns together.",
    },
    {
      question: "Does Schedulx support video and image scheduling?",
      answer: "Yes, you can schedule posts that include videos, images, or a combination of both. Schedulx ensures your media is optimized for each platform.",
    },
    {
      question: "How secure is my data on Schedulx?",
      answer: "Schedulx prioritizes user privacy and data security. We use encryption and other security measures to ensure your data is safe and protected.",
    },
    {
      question: "Can I reschedule or edit posts after scheduling them?",
      answer: "Yes, Schedulx allows you to edit or reschedule posts even after they’ve been scheduled, giving you complete control over your content.",
    },
    {
      question: "What platforms does Schedulx integrate with?",
      answer: "Schedulx integrates with popular platforms like Instagram, Facebook, Twitter, LinkedIn, and more. We’re constantly working on adding new integrations based on user feedback.",
    },
    {
      question: "How can I get customer support for Schedulx?",
      answer: "You can contact our support team via email or through the support section in the app. We’re here to help you 24/7."
    },
  ];

  return (
    <div className="font-sans mx-auto px-4 sm:px-8 md:px-16 lg:px-24 py-12 border rounded-2xl dark:bg-[#37393b]">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          Find answers to common questions about Schedulx and learn how it can streamline your social media management.
        </p>
      </div>
      <div className="divide-y divide-gray-300 dark:divide-gray-600">
        {faqs.map((faq, index) => (
          <div className="accordion" role="accordion" key={index}>
            <button
              type="button"
              onClick={() => toggleAccordion(index)}
              className={`toggle-button w-full text-lg font-semibold py-4 flex items-center justify-between ${
                activeIndex === index ? "text-blue-600" : "text-gray-800 dark:text-gray-200"
              }`}
            >
              <span>{faq.question}</span>
              <span className={`transform transition-transform duration-200 ${activeIndex === index ? "rotate-45" : ""}`}>
                {Icons.plus}
              </span>
            </button>
            <div
              className={`content overflow-hidden transition-all duration-300 ${
                activeIndex === index ? "max-h-[300px] py-4" : "max-h-0"
              }`}
            >
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
