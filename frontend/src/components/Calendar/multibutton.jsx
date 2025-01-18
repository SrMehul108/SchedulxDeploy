import React from "react";
import { Menu } from "@headlessui/react";
import "./calender.css";

const DropdownButton = ({ label, icon, items, selectedLabel, onSelect }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="px-3 py-2 flex items-center space-x-2 dark:bg-[#64748b] bg-white text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300">
        <span className="inline-flex ">{icon}</span>
        <span>{selectedLabel || label}</span>
      </Menu.Button>
      <Menu.Items className="absolute z-10 right-0 mt-2 w-40 origin-top-right bg-white dark:bg-gray-800 text-black  dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {items.map((item, index) => (
          <Menu.Item key={index} className="rounded-xl">
            {({ active }) => (
              <button
                onClick={() => {
                  onSelect(item.label);
                  item.onClick && item.onClick();
                }}
                className={`${
                  active
                    ? "bg-gray-100 dark:bg-gray-700"
                    : "bg-white dark:bg-gray-800"
                } group flex items-center w-full px-4 py-2 text-sm text-black transition-all dark:text-white  duration-300 hover:dark:text-black`}
              >
                {item.icon && <span className="mr-2">{item.icon}</span>}
                {item.label}
              </button>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default DropdownButton;