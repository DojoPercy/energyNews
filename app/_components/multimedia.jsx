"use client";
import { convertToTitleCase } from "@/lib/common/TextFunctions";
import React, { useEffect } from "react";
import { FaClock } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const MultimediaHub = ({ news }) => {
  const [recentNews, setRecentNews] = React.useState([]);

  useEffect(() => {
    if (news.length > 0) {
      const filteredNews = news
        .filter(
          (item) =>
            ["podcast", "video", "gallery"].includes(item.category) &&
            item.isPublished === true
        )
        .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
        .slice(0, 4);
      setRecentNews(filteredNews);
      console.log(filteredNews);
    }
  }, [news]);

  if (news.length === 0) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
        <ClipLoader size={50} color={"#123abc"} loading={true} />
      </div>
    );
  }

  if (recentNews.length === 0) {
    return <div>No news available</div>;
  }

  const { imageUrl, name, content } = recentNews[0] || {};

  return (
    <div className="h-[90vh] relative">
      <div className="grid grid-cols-2 grid-rows-10 gap-1 h-full w-full">
        <div className="col-span-3 row-span-6 relative">
          {recentNews[0] && (
            <a href={`/news/${encodeURIComponent(recentNews[0]?.title)}`}>
              <img
                src={recentNews[0]?.imageUrl}
                alt="recentNews[0]"
                className="w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition ease-in-out duration-300"
              />
              <div className="absolute  inset-0 bg-gradient-to-t from-black to-transparent opacity-50 hover:opacity-55"></div>
              <div className="absolute bottom-0 flex flex-col left-0 p-2 lg:pl-6 lg:pb-5">
                <div className="absolute -top-16 left-0 w-full  flex-col p-2 lg:pl-6 lg:pb-5">
                  <span className="bg-secondaryBlue text-white uppercase font-monsterrat font-semibold text-xs p-1 ">
                    {convertToTitleCase(recentNews[0].category)}
                  </span>
                  <div className="flex space-x-1 px-0 py-4 opacity-70">
                    <FaClock className="text-white" />
                    <span className="text-xs  text-white w-full ">
                      {recentNews[0].publishDate}
                    </span>
                  </div>
                </div>
                <span className="lg:text-xl text-md md:text-sm hover:cursor-pointer transition ease-in-out capitalize duration-100 font-semibold mt-2 text-white drop-shadow-lg">
                  {recentNews[0]?.title}
                </span>
              </div>
            </a>
          )}
        </div>
        <div className="row-span-4 row-start-7 relative my-5 mr-5">
        {recentNews[0] && (
            <a href={`/news/${encodeURIComponent(recentNews[0]?.title)}`}>
              <img
                src={recentNews[1]?.imageUrl}
                alt="recentNews[1]"
                className="w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition ease-in-out duration-300"
              />
              <div className="absolute  inset-0 bg-gradient-to-t from-black to-transparent opacity-50 hover:opacity-55"></div>
              <div className="absolute bottom-0 flex flex-col left-0 p-2 lg:pl-6 lg:pb-5">
                <div className="absolute -top-16 left-0 w-full  flex-col p-2 lg:pl-6 lg:pb-5">
                  <span className="bg-secondaryBlue text-white uppercase font-monsterrat font-semibold text-xs p-2 ">
                    {convertToTitleCase(recentNews[1].category)}
                  </span>
                  <div className="flex space-x-1 px-0 py-4 opacity-70">
                    <FaClock className="text-white" />
                    <span className="text-xs  text-white w-full ">
                      {recentNews[1].publishDate}
                    </span>
                  </div>
                </div>
                <span className="lg:text-xl text-md md:text-sm hover:cursor-pointer transition ease-in-out capitalize duration-100 font-semibold mt-2 text-white drop-shadow-lg">
                  {recentNews[1]?.title}
                </span>
              </div>
            </a>
          )}
        </div>
        <div className="row-span-4 row-start-7 relative my-5">
        {recentNews[2] && (
            <a href={`/news/${encodeURIComponent(recentNews[2]?.title)}`}>
              <img
                src={recentNews[2]?.imageUrl}
                alt="recentNews[2]"
                className="w-full h-full object-cover group-hover:scale-105 group-hover:rotate-1 transition ease-in-out duration-300"
              />
              <div className="absolute  inset-0 bg-gradient-to-t from-black to-transparent opacity-50 hover:opacity-55"></div>
              <div className="absolute bottom-0 flex flex-col left-0 p-2 lg:pl-6 lg:pb-5">
                <div className="absolute -top-16 left-0 w-full  flex-col p-2 lg:pl-6 lg:pb-5">
                  <span className="bg-secondaryBlue text-white uppercase font-monsterrat font-semibold text-xs p-2 ">
                    {convertToTitleCase(recentNews[2].category)}
                  </span>
                  <div className="flex space-x-1 px-0 py-4 opacity-70">
                    <FaClock className="text-white" />
                    <span className="text-xs  text-white w-full ">
                      {recentNews[2].publishDate}
                    </span>
                  </div>
                </div>
                <span className="lg:text-xl text-md md:text-sm hover:cursor-pointer transition ease-in-out capitalize duration-100 font-semibold mt-2 text-white drop-shadow-lg">
                  {recentNews[2]?.title}
                </span>
              </div>
            </a>
          )}
        </div>
       
      </div>
    </div>
  );
};

export default MultimediaHub;
