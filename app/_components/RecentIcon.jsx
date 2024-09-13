"use client";
import React, { useEffect } from "react";
import { ClipLoader } from "react-spinners";

const RecentIcon = ({ news }) => {
  const [recentNews, setRecentNews] = React.useState([]);

  useEffect(() => {
    if (news.length > 0) {
      const filteredNews = news
        .filter(
          (item) => item.category === 'personality_of_the_week' && item.isPublished === true
        )
        .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
        .slice(0, 1); 
      setRecentNews(filteredNews);
      console.log(filteredNews[0]?.imageUrl); 
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
    <div className="border mb-10 border-complementaryTheme shadow-sm my-2 p-3 rounded-sm overflow-hidden">
      <div className="text-black bg-white w-full text-xl font-normal p-4 ">
        Energy Leadership Icon of the Week
      </div>
      <div className="bg-white">
        {imageUrl ? (
          <a
            href={imageUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="overflow-hidden w-full h-full">
              <img
                src={imageUrl}
                alt="Personality of the Week"
                className="w-full object-cover shadow-sm hover:scale-105 transition-all ease-out duration-300"
              />
            </div>
          </a>
        ) : (
          <div>No image available</div>
        )}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {name || "No Name Available"}
          </h3>
          <div className="text-gray-600 mt-2 line-clamp-3">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: content || "No content available" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentIcon;
