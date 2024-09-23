"use client";
import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";

const Homepage = ({ news }) => {
  const [recentNews, setRecentNews] = useState([]);

  useEffect(() => {
    if (news.length > 0) {
      const sortedNews = [...news].sort(
        (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
      );
      const filteredNews = sortedNews.slice(0, 4);
      setRecentNews(filteredNews);
    }
  }, [news]);

  const convertToTitleCase = (input) => {
    if (typeof input !== "string") return "";
    const words = input.split("_");
    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (recentNews.length < 4) {
    return <div></div>;
  }

  const newsItem1 = recentNews[0];
  const newsItem2 = recentNews[1];
  const newsItem3 = recentNews[2];
  const newsItem4 = recentNews[3];

  return (
    <div className="w-full lg:px-20 px-3 py-5 md:h-[70vh] h-[170vh]">
      <div className="grid lg:grid-cols-9 lg:grid-rows-5 gap-1 md:grid-cols-8 md:grid-rows-8 w-full h-full grid-cols-1 grid-rows-12">
        <div className="lg:col-span-5 md:col-span-4 lg:row-span-5 md:row-span-4 relative overflow-hidden row-span-3">
          <a href={`/news/${newsItem1?.title}`}>
            <img
              src={newsItem1?.imageUrl}
              alt="newsItem1"
              className="w-full h-full object-cover hover:scale-105 hover:rotate-1 transition ease-in-out duration-300"
            />
            <div className="absolute hidden inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
            <div className="absolute bottom-0 flex flex-col left-0 p-2">
            <div className="absolute -top-16 left-0 w-full  flex-col p-2">
                <span className="bg-secondaryBlue text-white  text-xs p-2 ">
                  {convertToTitleCase(newsItem1.category)}
                </span>
                <div className="flex space-x-1 px-0 py-4">
                  <FaClock className="text-secondaryBlue" />
                  <span className="text-xs opacity-80 text-white w-full ">
                    {newsItem1.publishDate}
                  </span>
                </div>
              </div>
              <span className="lg:text-2xl text-md md:text-sm hover:cursor-pointer transition ease-in-out duration-100 font-semibold mt-2 text-white drop-shadow-lg">
                {newsItem1?.title}
              </span>
            </div>
          </a>
        </div>
        <div className="md:col-span-4 row-span-3 row-start-4 lg:row-span-3 md:row-span-4 relative lg:col-start-6 md:col-start-1 md:row-start-5">
          <a href={`/news/${newsItem2?.title}`}>
            <img
              src={newsItem2?.imageUrl}
              alt="newsItem2"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
            <div className="absolute bottom-0 left-0 p-2 flex  flex-col">
              <div className="absolute -top-16 left-0 w-full  flex-col p-2">
                <span className="bg-secondaryBlue text-white  text-xs p-2 ">
                  {convertToTitleCase(newsItem2.category)}
                </span>
                <div className="flex space-x-1 px-0 py-4">
                  <FaClock className="text-secondaryBlue" />
                  <span className="text-xs opacity-80 text-white w-full ">
                    {newsItem2.publishDate}
                  </span>
                </div>
              </div>
              <span className="text-md drop-shadow-lg hover:cursor-pointer transition ease-in-out duration-100 font-semibold mt-2 text-white">
                {newsItem2?.title}
              </span>
            </div>
          </a>
        </div>
        <div className="lg:col-span-2 row-span-3 row-start-7 lg:row-span-2 relative text-sm lg:col-start-6 lg:row-start-4 md:col-span-4 md:row-span-4 md:col-start-5 md:row-start-1">
          <a href={`/news/${newsItem3?.title}`}>
            <img
              src={newsItem3?.imageUrl}
              alt="newsItem3"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
            <div className="absolute bottom-0 left-0 flex flex-col p-2">
              <div className="absolute -top-16 left-0 w-full  flex-col p-2">
                <span className="bg-secondaryBlue text-white  text-xs p-2 ">
                  {convertToTitleCase(newsItem3.category)}
                </span>
                <div className="flex space-x-1 px-2 py-4">
                  <FaClock className="text-secondaryBlue" />
                  <span className="text-xs opacity-80 text-white w-full ">
                    {newsItem3.publishDate}
                  </span>
                </div>
              </div>
              <span className="md:text-sm drop-shadow-lg text-lg hover:cursor-pointer transition ease-in-out duration-100 font-semibold mt-2 text-white">
                {newsItem3?.title}
              </span>
            </div>
          </a>
        </div>
        <div className="lg:col-span-2 relative lg:row-span-2 lg:col-start-8 lg:row-start-4 md:col-span-4 row-span-3 row-start-10 md:row-span-4 md:col-start-5 md:row-start-5">
          <a href={`/news/${newsItem4?.title}`}>
            <img
              src={newsItem4?.imageUrl}
              alt="newsItem4"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
            <div className="absolute bottom-0 left-0 p-2">
            <div className="absolute -top-16 left-0 w-full  flex-col p-2">
                <span className="bg-secondaryBlue text-white  text-xs p-2 ">
                  {convertToTitleCase(newsItem4.category)}
                </span>
                <div className="flex space-x-1 px-2 py-4">
                  <FaClock className="text-secondaryBlue" />
                  <span className="text-xs opacity-80 text-white w-full ">
                    {newsItem4.publishDate}
                  </span>
                </div>
              </div>
              <span className="md:text-sm drop-shadow-lg text-md hover:cursor-pointer transition ease-in-out duration-100 line-clamp-2 font-semibold mt-2 text-white">
                {newsItem4?.title}
              </span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
