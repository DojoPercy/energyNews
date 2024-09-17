"use client";
import React from "react";
import Header from "../_components/header";
import { FaChevronRight } from "react-icons/fa";
import Sponsors from "./_components/sponsorMarquee";
import { SponsorsArray } from "./_components/sponsorsarray";
import TitleSection from "../_components/titleSection";

const Page = () => {
  return (
    <div>
     
      <div className="">
        <div className="flex items-center py-5 text-gray-500 text-xs lg:text-sm  mx-auto lg:max-w-[1450px] pl-10  lg:mx-auto ">
          <a href="/" className="hover:underline">
            Home
          </a>

          <FaChevronRight className="mx-1 text-xs" />
          <a href="/quarterlyreview" className="text-xs lg:text-sm">
            Quarterly Review
          </a>
        </div>
        <div className="h-96 lg:h-[450px] relative">
          <img
            src="/bannerquater.jpg"
            alt="Quarterly Review"
            className="w-full h-96 lg:h-[450px] object-cover absolute right-0 top-0 z-10"
          />
          <div className="w-full h-full absolute right-0 top-0 bg-black opacity-30 z-20"></div>
          <div className="flex flex-col justify-center items-center">
            <div className="w-full h-full absolute right-0 top-0 z-30 flex items-start justify-center lg:pl-20 pl-2  font-mont flex-col">
              <span className="text-white lg:text-[3rem] text-[2rem] font-semibold">
                Energy Governance MEA Quarterly Review
              </span>
              <div className="mt-10 flex space-x-3">
                <div className="px-3 py-2 bg-secondaryBlue rounded-sm ">
                  <span className="text-white text-sm ">
                    EXPLORE THE FIRST ISSUE
                  </span>
                </div>
                <div className="px-3 py-2 bg-secondaryBlue rounded-sm ">
                  <span className="text-white text-sm ">JOIN NEXT EDITION</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" px-3 lg:px-20 py-10 flex justify-start items-end flex-col lg:flex-row">
          <div className="w-full lg:w-[50%] flex flex-col ">
            <span className=" text-2xl lg:text-3xl px-0  font-bold text-black my-3 lg:my-8  relative inline-block font-mont text-start">
              Your guide to stay informed and connected
            </span>
            <span className="text-slate-500 text-sm lg:text-lg py-5">
              Welcome to the inaugural issue of the Energy Governance MEA
              Quarterly Review - your essential resource for navigating industry
              priorities, seizing opportunities, and addressing the challenges
              across the energy sector. This debut issue features a thoughtfully
              curated selection of insights from global leaders, offering
              diverse perspectives on critical topics.
            </span>
            <span className="text-slate-500 text-sm lg:text-lg ">
              As the energy landscape in the Middle East and Africa undergoes
              significant transformation—driven by innovation, the demand for
              secure and affordable energy, and the imperative to address
              climate change—there has never been a more pivotal time to
              introduce a publication that spans the entire energy sector. Our
              central theme, "Empowering Energy Leadership," lays the foundation
              for an in-depth exploration of these vital dynamics.
            </span>
            <span className="bg-secondaryBlue w-[80%] mx-auto lg:mx-0 lg:w-[60%] py-3 flex justify-center items-center text-white text-sm lg:text-lg rounded-sm mt-5">
              ACCESS EXCLUSIVE INSIGHTS
            </span>
          </div>
          <div className="w-full lg:w-[50%] flex flex-col justify-center items-center p-5">
            <img
              src="/review.jpg"
              alt="Quarterly Review"
              className="w-full lg:w-[90%] object-cover"
            />
          </div>
        </div>
        <div className="">
          <div className=" w-full bg-slate-200 w-100% lg:py-12 pt-3 pb-8  flex flex-col ">
            <h3 className="text-2xl lg:text-3xl px-3 lg:px-20 font-bold text-black lg:my-8 my-3  relative inline-block font-mont text-start">
              Trusted by Global Sponsors
            </h3>
            <Sponsors>
              {SponsorsArray.map((item, index) => (
                <img
                  key={item}
                  src={`/sponsors/${item}`}
                  alt={item}
                  className="px-5 h-[210px] lg:h-[250px] cursor-pointer object-contain"
                />
              ))}
            </Sponsors>
          </div>
        </div>
        <section className="py-10">
          <div className="flex flex-col items-start justify-center  lg:flex-row px-10  ">
            <div className="flex justify-center items-center w-full lg:w-[50%]">
              <img
                src={"/get_involved.jpg"}
                alt="Get Involved"
                className="w-full lg:w-[90%] object-cover rounded-lg"
              />
            </div>
            <div className="flex justify-start flex-col w-[100%] lg:w-[50%]">
              <h3 className="text-2xl lg:text-3xl  font-bold text-black my-3 relative inline-block font-mont text-start">
                Get involved in the next edition
              </h3>
              <span className="text-slate-500 text-xs lg:text-sm ">
                Join us in shaping the future of energy. Contribute to our next
                issue and share your insights to drive meaningful change.
                Contact us to find out how you can get involved.
              </span>
              <div>
                <div className="grid grid-cols-2 gap-3 mt-8 ">
                  <div className="">
                    <input
                      type="text"
                      name="first_name"
                      class="w-full max-w-md p-3 text-sm border-2 border-slate-500 rounded-sm bg-white text-gray-700 focus:outline-none focus:border-secondaryBlue focus:bg-white transition-colors duration-300"
                      maxlength="255"
                      placeholder="First Name"
                      data-val="true"
                      data-val-required="Please provide a value for First Name"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="last_name"
                      class="w-full max-w-md p-3 text-sm border-2 border-slate-500 rounded-sm bg-white text-gray-700 focus:outline-none focus:border-secondaryBlue focus:bg-white transition-colors duration-300"
                      maxlength="255"
                      placeholder="Last Name"
                      data-val="true"
                      data-val-required="Please provide a value for Last Name"
                    />
                  </div>
                  <div className="">
                    <input
                      type="text"
                      name="company_name"
                      class="w-full max-w-md p-3 text-sm border-2 border-slate-500 rounded-sm bg-white text-gray-700 focus:outline-none focus:border-secondaryBlue focus:bg-white transition-colors duration-300"
                      maxlength="255"
                      placeholder="Company's Name"
                      data-val="true"
                      data-val-required="Please provide a value for Company's Name"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      class="w-full max-w-md p-3 text-sm border-2 border-slate-500 rounded-sm bg-white text-gray-700 focus:outline-none focus:border-secondaryBlue focus:bg-white transition-colors duration-300"
                      maxlength="255"
                      placeholder="Email Address"
                      data-val="true"
                      data-val-required="Please provide a value for Email Address"
                    />
                  </div>
                </div>
                <span className="text-slate-500 text-xs lg:text-sm">
                  By submitting, you agree to the processing of your personal
                  data by RADComm Group as described in the
                  <span className="text-secondaryBlue font-semibold">
                    Privacy Statement
                  </span>
                  .
                </span>

                <span className="bg-secondaryBlue w-[80%] lg:w-[40%] py-3 flex justify-center items-center text-white text-sm lg:text-lg rounded-sm mt-5">
                  SUBMIT
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;
