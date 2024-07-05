// components/Sidebar.js
import React, { useState } from 'react';
import { FaBars, FaTh, FaPen, FaCog, FaList } from 'react-icons/fa';
import Link from 'next/link';

const Sidebar = ({ isExpanded, setIsExpanded }) => {


  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`bg-gray-900 text-white h-screen transition-width duration-300 fixed ${isExpanded ? 'w-80' : 'w-20'}`}>
      <div className="flex items-start justify-start py-4 pl-4 cursor-pointer" onClick={toggleSidebar}>
        <FaBars className="text-xl" />
      </div>
      <ul className="mt-10 space-y-2">
        <li className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
          <Link href="/admin"  className="flex justify-center items-center">
           
              <FaTh className="text-xl" />
              {isExpanded && <span className="ml-4">DashBoard</span>}
           
          </Link>
        </li>
        <li className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
          <Link href="/admin/createpost" className="flex justify-center items-center">
           
              <FaPen className="text-xl" />
              {isExpanded && <span className="ml-4">CreatePost</span>}
            
          </Link>
        </li>
        <li className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
          <Link href="/categories" className="flex justify-center items-center">
           
              <FaList className="text-xl" />
              {isExpanded && <span className="ml-4">Categories</span>}
            
          </Link>
        </li>
        <li className="flex items-center px-4 py-2 hover:bg-gray-700 cursor-pointer">
          <Link href="/admin/ads" className="flex justify-center items-center">
           
              <FaCog className="text-xl" />
              {isExpanded && <span className="ml-4">Ads Management</span>}
            
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
