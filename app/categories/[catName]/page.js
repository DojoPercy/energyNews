"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../_redux/news/newSlice";

import NewsShimmer from "../../../lib/shimmer/news_shimmer";
import { FaChevronRight } from "react-icons/fa";

const Categories = () => {
  const { catName } = useParams();
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  const newsStatus = useSelector((state) => state.news.status);
  const loading = useSelector((state) => state.news.loading);
  const error = useSelector((state) => state.news.error);

  useEffect(() => {
    if (newsStatus === "idle") {
      dispatch(fetchNews());
    }
  }, [newsStatus, dispatch]);

  const truncateString = (str, num) => {
    if (!str || typeof str !== "string") {
      return "";
    }
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  };

  const getShortSummary = (htmlString) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;
    const textContent = tempElement.textContent || tempElement.innerText || "";
    const words = textContent.trim().split(/\s+/);
    return words.slice(0, 30).join(" ") + (words.length > 30 ? "..." : "");
  };

  function parseFirestoreTimestamp(timestampString) {
    const firestoreRegex = /seconds=(\d+), nanoseconds=(\d+)/;

    const firestoreMatches = timestampString.match(firestoreRegex);

    if (firestoreMatches && firestoreMatches.length === 3) {
        const seconds = parseInt(firestoreMatches[1], 10);
        const nanoseconds = parseInt(firestoreMatches[2], 10);
        const milliseconds = seconds * 1000 + nanoseconds / 1000000;
        return new Date(milliseconds);
    } else {
        const date = new Date(timestampString);
        if (!isNaN(date.getTime())) {
            return date;
        } else {
            throw new Error("Invalid timestamp format");
        }
    }
}


  let content;

  if (loading) {
    content = <NewsShimmer />;
  } else if (newsStatus === "succeeded") {
    const filteredNews = news
    .filter((item) => item.category === catName && item.isPublished === true)
    .sort((a, b) => {
      const dateA = new Date(a.publishDate);
      const dateB = new Date(b.publishDate);
      console.log(a.publishDate);
      return dateB - dateA; // Sorts in ascending order (earliest date first)
      // For descending order, use: return dateB - dateA;
    });

    content = (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-0  ">
        <div className="col-span-2">
          {filteredNews.map((article, index) => {
            
            return (
              <article
                key={index}
                className="bg-white overflow-hidden flex flex-col lg:flex-row justify-start space-x-0 w-full mb-0"
              >
                <figure className="post-thumbnail">
                  <a className=" block w-full" href={`/news/${article.title}`}>
                    <img src={article.imageUrl} alt={article.title} className="  object-cover" />
                  </a>
                </figure>
                <div className="pr-0 lg:pt-2 flex flex-col justify-start">
                  <span className=" block text-sm text-gray-500 mb-2"></span>
                  <header className="entry-header">
                    <h2 className="entry-title text-xl font-semibold mb-2">
                      <a href={`/news/${article.id}`} className="hover:underline">
                        {article.title}
                      </a>
                    </h2>
                  </header>
                  <div className="flex space-x-2 text-sm text-gray-500 mb-4">
                    <span className="by_line block">
                      by <strong><i>{article.author}</i></strong>
                    </span>
                    <span className="font-semibold">|</span>
                    <span className="posted-on block">
                      {article.publishDate}
                    </span>
                  </div>
                  <div className="entry-content">
                    <p>{getShortSummary(article.summary)}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="hidden lg:block col-span-1  overflow-y-auto h-screen ">
          {/* Right Section Content */}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-4">Read Next</h3>
            {/* Replace with your read next content */}
            <ul className="divide-y divide-gray-200">
              <li className="py-2">
                <a href="#" className="text-blue-600 hover:underline">
                  Article 1
                </a>
              </li>
              <li className="py-2">
                <a href="#" className="text-blue-600 hover:underline">
                  Article 2
                </a>
              </li>
              <li className="py-2">
                <a href="#" className="text-blue-600 hover:underline">
                  Article 3
                </a>
              </li>
              {/* Add more articles as needed */}
            </ul>
          </div>
        </div>
      </div>
    );
  } else if (newsStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div className="containe mx-auto">
      <div className="flex items-center text-gray-500 text-sm">
        <a href="/" className="hover:underline">
          Home
        </a>
        <FaChevronRight className="mx-2 text-xs" />
        <a href="/news" className="hover:underline">
          {catName}
        </a>
      </div>

      <h2 className="text-3xl font-bold my-4 capitalize">{catName}</h2>
      {content}
    </div>
  );
};

export default Categories;
