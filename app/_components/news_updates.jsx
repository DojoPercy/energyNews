import Link from "next/link";
import React from "react";

const NewsUpdates = ({ news }) => {
    const convertToTitleCase = (input) => {
        const words = input.split("_");
        return words
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      };
  return (
    <div>
      <div className="p-1 grid grid-cols-2 lg:grid-cols-3 md:grid-cols-3 space-x-0 lg:space-y-0 space-y-0">
        {news.map((article) => (
          <div key={article.id} className="group bg-white  rounded-lg p-4 ">
            <div className="overflow-hidden relative w-full">
              <a href={`/news/${article.title}`}>
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-40 object-cover duration-300 ease-out transform transition-transform group-hover:cursor-pointer "
                />
              </a>
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-full p-2">
                <span className="bg-secondaryBlue text-gray-200  text-xs p-1   ">
                  {convertToTitleCase(article.category)}
                </span>
              </div>
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 hover:cursor-pointer transition-opacity"></div>
            </div>
            <h4 className="text-lg font-semibold mt-2">
              <a href={`/news/${article.title}`} className="hover:underline line-clamp-4">
                {article.title}
              </a>
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsUpdates;
