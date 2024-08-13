"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../../_redux/news/newSlice";
import NewsShimmer from "../../../lib/shimmer/news_shimmer";
import { FaChevronRight } from "react-icons/fa";
import RecentCategoryNews from "@/app/_components/recentcategories";
import { ClipLoader } from "react-spinners";
import TitleSection from "@/app/_components/titleSection";
import RecentDigitalIssue from "@/app/_components/digitalissuebox";

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

  const getShortSummary = (htmlString) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;
    const textContent = tempElement.textContent || tempElement.innerText || "";
    const words = textContent.trim().split(/\s+/);
    return words.slice(0, 30).join(" ") + (words.length > 30 ? "..." : "");
  };

  const convertToCapitalCase = (str) => {
    return str.replace(/_/g, " ").replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  let content;

  if (loading) {
    content = (
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
        <ClipLoader size={50} color={"#123abc"} loading={true} />
      </div>
    );
  } else if (newsStatus === "succeeded") {
    const filteredNews = news
      .filter((item) => item.category === catName && item.isPublished === true)
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

    content = (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-0">
        <div className="col-span-2">
          {filteredNews.length === 0 ? (
            <p>No news available</p>
          ) : (
            filteredNews.map((article, index) => (
              <article
                key={index}
                className="bg-white overflow-hidden flex flex-col lg:flex-row justify-start space-x-0 w-full mb-4 border border-gray-100 shadow-sm p-1"
              >
                <figure className="post-thumbnail">
                  <a
                    className="block w-full lg:w-[400px]"
                    href={`/news/${article.title}`}
                  >
                    <img
                      src={article.imageUrl || "/path/to/default-image.jpg"}
                      alt={article.title || "Default Title"}
                      className="w-full object-cover"
                    />
                  </a>
                </figure>
                <div className="pr-2 lg:p-4 flex flex-col justify-start">
                  <header className="entry-header">
                    <h2 className="entry-title text-xl font-semibold mb-2">
                      <a
                        href={`/news/${article.title}`}
                        className="hover:underline"
                      >
                        {article.title || article.name}
                      </a>
                    </h2>
                  </header>
                  <div className="flex space-x-2 text-sm text-gray-500 mb-4">
                    <span className="by_line block">
                      by{" "}
                      <strong>
                        <i>{article.author || "Unknown Author"}</i>
                      </strong>
                    </span>
                    <span className="font-semibold">|</span>
                    <span className="posted-on block">
                      {new Date(article.publishDate).toLocaleDateString() ||
                        "Unknown Date"}
                    </span>
                  </div>
                  <div className="entry-content">
                    <p className=" ">
                      {getShortSummary(article.summary) || (
                          <div className="text-gray-600 mt-2 line-clamp-3">
                            <div
                              className="prose max-w-none"
                              dangerouslySetInnerHTML={{
                                __html: article.content || "No content available",
                              }}
                            />
                          </div>
                        ) ||
                        "No summary available"}
                    </p>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="col-span-1 overflow-y-auto mb-3">
          <TitleSection title={"More News"} />
          <RecentCategoryNews news={news} category="industry_updates" />
          <RecentDigitalIssue />
          <RecentCategoryNews
            news={news}
            category="decarbonization_strategies"
          />
        </div>
      </div>
    );
  } else if (newsStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div className="p-2 max-w-7xl mx-auto">
      <div className="flex items-center text-gray-500 text-sm">
        <a href="/" className="hover:underline">
          Home
        </a>
        <FaChevronRight className="mx-2 text-xs" />
        <a href="/news" className="hover:underline max-w-xs" title={catName}>
          {convertToCapitalCase(catName)}
        </a>
      </div>

      <h2 className="text-3xl font-bold my-4 capitalize overflow-hidden">
        <span className="text-sm sm:text-lg md:text-2xl lg:text-3xl">
          {convertToCapitalCase(catName)}
        </span>
      </h2>
      {content}
    </div>
  );
};

export default Categories;
