import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-6 sm:gap-y-8">
          {/* About Us */}
          <div className="mb-6 sm:mb-0">
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-sm">
              EnergyNews covers the latest news and in-depth analysis across the region’s upstream sector, leveraging its print and digital products to act as the meeting point of the oil and gas industry. It is the premier source of information for industry leaders and professionals.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="mb-6 sm:mb-0">
            <h3 className="text-xl font-bold mb-4">Social Media</h3>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-white hover:text-gray-400 transition duration-300">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-400 transition duration-300">
                  YouTube
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-400 transition duration-300">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="mb-6 sm:mb-0">
            <h3 className="text-xl font-bold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white hover:text-gray-400 transition duration-300 block">
                  Exploration
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-400 transition duration-300 block">
                  Drilling & Production
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-400 transition duration-300 block">
                  Products & Services
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-400 transition duration-300 block">
                  Power List
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-400 transition duration-300 block">
                  People
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-400 transition duration-300 block">
                  Events
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-400 transition duration-300 block">
                  Advertise with us
                </a>
              </li>
            </ul>
          </div>

          {/* Sister Sites */}
          <div>
            <h3 className="text-xl font-bold mb-4">Sister Sites</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white hover:text-gray-400 transition duration-300 block">
                  PMV Middle East
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-400 transition duration-300 block">
                  Construction Week Online
                </a>
              </li>
              <li>
                <a href="#" className="text-white hover:text-gray-400 transition duration-300 block">
                  Facilities Management ME
                </a>
              </li>
              {/* Add more sister sites as needed */}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-xs sm:text-sm">
          <p>&copy; 2024. Published by RADComm Group. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
