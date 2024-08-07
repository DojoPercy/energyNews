import React from "react";
import Header from "../_components/header";
import { FaChevronRight } from "react-icons/fa";

const Page = () => {
  return (
    <div>
      <Header />
      <div className="">
        <div className="flex items-center py-5 text-gray-500 text-xs lg:text-sm  mx-auto lg:max-w-[1450px]  lg:mx-auto ">
          <a href="/" className="hover:underline">
            Home
          </a>

          <FaChevronRight className="mx-1 text-xs" />
          <a href="/news" className="text-xs lg:text-sm">
            Quarterly Review
          </a>
        </div>
        <div className="h-96 relative">
            <img src="/bannerquater.jpg" alt="Quarterly Review" className="w-full h-96 object-cover absolute right-0 top-0 z-10" />
            <div className="w-full h-full absolute right-0 top-0 bg-black opacity-30 z-20"></div>
            <div className="w-full h-full absolute right-0 top-0 z-30 flex items-center justify-start pl-20 text-white text-[3rem] font-semibold font-mont">
              Energy Governance Quarterly Review
              </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
