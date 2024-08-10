import React from "react";
import { FaFacebookF, FaYoutube, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blueTheme text-white pt-8 sm:pt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full justify-between sm:gap-y-8 ">
          {/* About Us */}
          <div className="mb-6 sm:mb-0 col-span-1 flex justify-center flex-col items-center">
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-sm">
              The Energy Governance Middle East & Africa Magazine is the premier
              news platform dedicated to serving the entire energy sector across
              the region. Our publication is a hub for original, insightful
              content that not only drives critical discussions but also shapes
              industry perspectives through continuous thought leadership. Our
              mission is to empower, inspire, and inform energy leaders,
              executives, and board members with cutting-edge insights, trends,
              and stories from the energy world. With a focus on innovation,
              diversity, and strategic growth, Energy Governance is a trusted
              resource for professionals striving for excellence in energy
              leadership and governance. We connect with a highly engaged
              audience that spans the full spectrum of the energy value chain,
              including oil and gas, wind, solar, utilities, hydrogen, and
              nuclear sectors.
            </p>
          </div>

          {/* Social Media Links */}
          <div className="mb-6 sm:mb-0 col-span-1 flex justify-start flex-col items-center">
            <h3 className="text-xl font-bold mb-4">Social Media</h3>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="#"
                  className="text-white hover:text-gray-400 transition duration-300"
                  aria-label="Facebook"
                >
                  <FaFacebookF size={20} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-gray-400 transition duration-300"
                  aria-label="YouTube"
                >
                  <FaYoutube size={20} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-gray-400 transition duration-300"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn size={20} />
                </a>
              </li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="mb-6 sm:mb-0 col-span-1 flex justify-start flex-col items-center">
            <h3 className="text-xl font-bold mb-4">Useful Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-white hover:text-gray-400 transition duration-300 block"
                >
                  Exploration
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-gray-400 transition duration-300 block"
                >
                  Drilling & Production
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-gray-400 transition duration-300 block"
                >
                  Products & Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-gray-400 transition duration-300 block"
                >
                  Power List
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-gray-400 transition duration-300 block"
                >
                  People
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-gray-400 transition duration-300 block"
                >
                  Events
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white hover:text-gray-400 transition duration-300 block"
                >
                  Advertise with us
                </a>
              </li>
            </ul>
          </div>

          {/* Sister Sites */}
          <div>
  <h3 className="text-xl font-bold mb-4">Sister Websites</h3>
  <div className="flex flex-col space-y-2">
    <span>
      RADComm Group -{' '}
      <a
        href="https://www.radcommgroup.com"
        className="text-white hover:text-gray-400 transition duration-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        www.radcommgroup.com
      </a>
    </span>
    <span>
      World Business Leaders Congress -{' '}
      <a
        href="https://www.worldbusinessleaderscongress.com"
        className="text-white hover:text-gray-400 transition duration-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        www.worldbusinessleaderscongress.com
      </a>
    </span>
    <span>
      National Communications Awards -{' '}
      <a
        href="https://www.nationalcommunicationsawards.com"
        className="text-white hover:text-gray-400 transition duration-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        www.nationalcommunicationsawards.com
      </a>
    </span>
    <span>
      Premier Business MEA -{' '}
      <a
        href="https://www.premierbusinessmag.com"
        className="text-white hover:text-gray-400 transition duration-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        www.premierbusinessmag.com
      </a>
    </span>
    <span>
      Premier Energy Leadership MEA -{' '}
      <a
        href="https://www.premierenergymea.com"
        className="text-white hover:text-gray-400 transition duration-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        www.premierenergymea.com
      </a>
    </span>
  </div>
</div>

        </div>

        {/* Copyright */}
      </div>
      <div className="mt-8 text-center text-xs sm:text-sm bg-secondaryBlue w-full py-3">
        <p>&copy; 2024. Published by RADComm Group. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
