"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../_redux/news/newSlice";
import Link from "next/link";
import { fetchAd } from "../_redux/news/ads";

const RecentCategoryNews = ({ category, news }) => {
  const [recentNews, setRecentNews] = useState([]);
  const ads = useSelector((state) => state.ads.ads);
  const dispatch = useDispatch();

  useEffect(() => {
    if (news.length > 0) {
      const filteredNews = news
        .filter(
          (item) => item.category === category && item.isPublished === true
        )
        .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
        .slice(0, 3); // Get the latest three news items
      setRecentNews(filteredNews);
      dispatch(fetchAd());
    }
  }, [news, category]);

  function convertToTitleCase(input) {
    const words = input.split("_");

    const titleCase = words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return titleCase;
  }
  const categoryFormat = convertToTitleCase(category);

  return (
    <div
      className={`border border-gray-200 shadow-sm w-full ${
        recentNews.length === 0 ? "hidden" : "block"
      } `}
    >
      <div className="bg-blueTheme text-white text-sm font-bold p-4">
        {categoryFormat}
      </div>
      <div className="bg-white p-1 rounded-b-lg">
        {recentNews.map((newsItem, index) => {
          const publishDate = new Date(newsItem.publishDate);
          const year = publishDate.getFullYear();

          const month = publishDate.toLocaleString("default", {
            month: "long",
          });
          return (
            <div key={index} className="p-1 rounded-lg mb-4">
              {newsItem.imageUrl && (
                <div className="flex justify-start items-start lg:justify-between p-1 lg:flex-col">
                  <Link
                    href={`/news/${newsItem.title}`}
                    rel="noopener noreferrer"
                  >
                    <img
                      src={newsItem.imageUrl}
                      alt="Uploaded"
                      className=" lg:w-48 w-[300px] object-cover mt-2 "
                    />
                  </Link>
                  <Link
                    href={`/news/${newsItem.title}`}
                    rel="noopener noreferrer"
                  >
                    <p className=" ml-2 font-semibold lg:text-sm text-lg">
                      {newsItem.title}
                      <p className="  font-semibold lg:text-sm text-sm lg:hidden text-gray-600">
                        {newsItem.summary}
                      </p>
                    </p>
                  </Link>
                </div>
              )}
              <p className="mt-2 text-gray-400 text-xs">{`${month} ${year}`}</p>
            </div>
          );
        })}
        <div className="mt-4">
          <Link
            href={`/news/category/${category}`}
            className="text-blue-500 text-center"
          >
            View More
          </Link>
        </div>
        <div>
          <div className="flex flex-col items-center justify-center space-y-2">
            <img src={ads.squareAds.SquareAd_1} alt="Lexar" />
            <img src={ads.squareAds.SquareAd_2} alt="Lexar" />
            <img src={ads.squareAds.SquareAd_3} alt="Lexar" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentCategoryNews;
