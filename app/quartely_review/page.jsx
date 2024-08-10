import React from "react";
import Header from "../_components/header";
import { FaChevronRight } from "react-icons/fa";

const Page = () => {
  return (
    <div>
      <Header />
      <div className="">
        <div className="flex items-center py-5 text-gray-500 text-xs lg:text-sm  mx-auto lg:max-w-[1450px] pl-10  lg:mx-auto ">
          <a href="/" className="hover:underline">
            Home
          </a>

          <FaChevronRight className="mx-1 text-xs" />
          <a href="/quartely_review" className="text-xs lg:text-sm">
            Quarterly Review
          </a>
        </div>
        <div className="h-96 lg:h-[550px] relative">
            <img src="/bannerquater.jpg" alt="Quarterly Review" className="w-full h-96 lg:h-[550px] object-cover absolute right-0 top-0 z-10" />
            <div className="w-full h-full absolute right-0 top-0 bg-black opacity-30 z-20"></div>
            <div className="flex flex-col justify-center items-center">
            <div className="w-full h-full absolute right-0 top-0 z-30 flex items-start justify-center lg:pl-20 pl-2  font-mont flex-col">
           <span className="text-white lg:text-[3rem] text-[2rem] font-semibold">
           Energy Governance MEA Quarterly Review
           </span>
            <div className="mt-10 flex space-x-3">
                  <div className="px-3 py-2 bg-secondaryBlue rounded-sm ">
                    <span className="text-white text-sm ">EXPLORE THE FIRST ISSUE</span>
                  </div>
                  <div className="px-3 py-2 bg-secondaryBlue rounded-sm ">
                    <span className="text-white text-sm ">JOIN NEXT EDITION</span>
                  </div>
              </div>
              </div>
              
            </div>
        </div>
        <div className="p-4">
        <div className="p-4">
  <div className="flex flex-col space-y-4">
    <div>
      <span className="text-xl lg:text-2xl font-semibold font-mont">Our Mission</span>
      <p className="text-sm lg:text-lg mt-2 leading-relaxed">
        At Energy Governance Middle East & Africa Magazine, our mission is to empower, inspire, and inform energy leaders, executives, and board members. We provide cutting-edge insights, trends, and stories from the energy world, focusing on innovation, diversity, and strategic growth.
      </p>
    </div>
    <div>
      <span className="text-xl lg:text-2xl font-semibold font-mont">Who We Serve</span>
      <p className="text-sm lg:text-lg mt-2 leading-relaxed">
        We connect with a highly engaged audience across the entire energy value chain, including professionals in oil and gas, wind, solar, utilities, hydrogen, and nuclear sectors. Our publication is a trusted resource for those striving for excellence in energy leadership and governance.
      </p>
    </div>
    <div>
      <span className="text-xl lg:text-2xl font-semibold font-mont">Our Content</span>
      <p className="text-sm lg:text-lg mt-2 leading-relaxed">
        As the premier news platform in the region, our publication is a hub for original, insightful content that drives critical discussions and shapes industry perspectives. We are committed to continuous thought leadership that keeps our readers at the forefront of the energy sector.
      </p>
    </div>
  </div>
</div>

</div>

      </div>
    </div>
  );
};

export default Page;
