// components/Sidebar.js
"use client";
import React, { useState } from 'react';
import { FaTh, FaPen, FaCog, FaList, FaChevronDown, FaChevronUp, FaPlus } from 'react-icons/fa';
import Link from 'next/link';

const Sidebar = ({ isExpanded, setIsExpanded, isAuthenticated }) => {
  const [accordionOpen, setAccordionOpen] = useState({});

  const toggleAccordion = (index) => {
    setAccordionOpen(prevState => ({
      ...prevState,
      [index]: !prevState[index]
    }));
  };

  if (!isAuthenticated) return null;

  return (
    <div className={`bg-gray-900 text-white h-screen transition-width duration-300 z-30  fixed top-0 left-0 ${isExpanded ? 'w-80' : 'w-0'}`}>
      <ul className="mt-10 space-y-2">
        <li className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
          <Link href="/admin" className="flex justify-center items-center">
            {isExpanded ? <FaTh className="text-xl" /> : null}
            {isExpanded && <span className={`ml-4 ${isExpanded ? 'ml-4' : '-ml-4'} `}>Dashboard</span>}
          </Link>
        </li>
        <li className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
          <Link href="/admin/ads" className="flex justify-center items-center">
            {isExpanded ? <FaCog className="text-xl" /> : null}
            {isExpanded && <span className="ml-4">Ads Management</span>}
          </Link>
        </li>
        <li className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
          <Link href="/admin/createpost" className="flex justify-center items-center">
            {isExpanded ? <FaPlus className="text-xl" /> : null}
            {isExpanded && <span className="ml-4">Add news</span>}
          </Link>
        </li>
        <li className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer" onClick={() => toggleAccordion(1)}>
          <div className="flex justify-center items-center w-full">
            {isExpanded ? <FaList className="text-xl" /> : null}
            {isExpanded && <span className="ml-4 flex-grow">Manage</span>}
            {isExpanded && (accordionOpen[1] ? <FaChevronUp /> : <FaChevronDown />)}
          </div>
        </li>
        {accordionOpen[1] && isExpanded && (
          <ul className="ml-12 space-y-2">
            <li className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
              <Link href="/admin/personality">
                Personality of the Week
                
              </Link>
            </li>
            <li className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
              <Link href="/admin/digitaledition">
                Digital Issues
              </Link>
            </li>
          </ul>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
