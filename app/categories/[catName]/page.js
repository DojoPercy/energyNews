"use client";
import React, { useEffect, useState } from "react";
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
  const [currentPage, setCurrentPage ] = useState(1);
  const itemsPerPage = 10;



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
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-10 lg:pb-20">
      <ClipLoader color="#262262" className="w-10 text-blueTheme"/>
    <img
      src="/logo.png"
      alt="logo"
      className="w-[15rem] animate-zoom"
    />
    <p className="mt-4 text-sm font-semibold font-monsterrat text-gray-500 animate-pulse">
      Loading news just for you...
    </p>
  </div>
    );
  } else if (newsStatus === "succeeded") {
   
    const filteredNews = news
      .filter((item) => item.category === catName && item.isPublished === true)
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
    const latestNews = filteredNews[0];
    const otherNews = filteredNews.slice(1);

    const totalPages = Math.ceil(otherNews.length / itemsPerPage);
    const indexOfLastPage = currentPage * itemsPerPage;
    const indexOfFirstPage = indexOfLastPage - itemsPerPage;

    const currentNews = otherNews.slice(indexOfFirstPage, indexOfLastPage);

    
    const renderPagination = () => {
      const pageNumbers = [];
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
      return (
        <div className="flex space-x-2 mt-4">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-3 py-1 rounded ${
                number === currentPage ? "bg-blueTheme text-white" : "bg-gray-300"
              }`}
            >
              {number}
            </button>
          ))}
        </div>
      );
    };
    content = (
      <div className="flex flex-col ">
        <div className="grid grid-cols-1 lg:grid-cols-4 lg:gap-6 p-0">
          <div className="col-span-3">
            {latestNews && (
              <>
                <div className="flex flex-col ">
                <h2 className="entry-title text-xl lg:text-3xl font-semibold mb-2">
                      <a
                        href={`/news/${encodeURIComponent(latestNews.title)}`}
                        className="hover:underline"
                      >
                        {latestNews.title}
                      </a>
                    </h2>
                  <img
                    src={latestNews.imageUrl}
                    className="w-full "
                    alt={latestNews.id}
                  />
                  <div>
                    
                    <div className="flex space-x-1 lg:space-x-2 lg:text-sm text-xs text-gray-500 mb-4">
                      <span className="by_line block">
                        by{" "}
                        <strong>
                          <i>{latestNews.author}</i>
                        </strong>
                      </span>
                      <span className="font-semibold">|</span>
                      <span className="posted-on block">
                        {latestNews.publishDate}
                      </span>
                    </div>
                    <div className="entry-content">
                      <p>{getShortSummary(latestNews.summary)}</p>
                    </div>
                    <div
                      className="entry-content font-poppins my-10 lg:mr-20 mr-2 text-sm lg:text-lg line-clamp-6"
                      dangerouslySetInnerHTML={{ __html: latestNews.content }}
                    ></div>
                  </div>
                </div>
                <div className="bg-secondaryBlue px-10 py-3 w-56 rounded-md text-white mb-10 shadow-md text-center">
                  <span>
                  <a
                        href={`/news/${encodeURIComponent(latestNews.title)}`}
                        className=""
                      >
                    Continue Reading
                    </a>
                    </span>
                </div>
              </>
            )}
            {otherNews.length === 0 ? (
              <p>No news available</p>
            ) : (
              currentNews.map((article, index) => (
                
                <article
                  key={index}
                  className="bg-white overflow-hidden flex flex-col lg:flex-row justify-start space-x-0 w-full mb-4 border border-gray-100 shadow-sm p-1"
                >
                  <figure className="post-thumbnail">
                    <a
                      className="block w-full lg:w-[400px]"
                      href={`/news/${encodeURIComponent(article.title)}`}
                    >
                      <img
                        src={article.imageUrl || "/path/to/default-image.jpg"}
                        alt={encodeURIComponent(article.title) || "Default Title"}
                        className="w-full object-cover"
                      />
                    </a>
                  </figure>
                  <div className="pr-2 lg:p-4 flex flex-col justify-start">
                    <header className="entry-header">
                      <h2 className="entry-title text-xl font-semibold mb-2">
                        <a
                          href={`/news/${encodeURIComponent(article.title)}`}
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
                                  __html:
                                    article.content || "No content available",
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
             {renderPagination()}
          </div>

          <div className="col-span-1 mx-auto overflow-y-auto mb-3 justify-center w-[85%] ">
            <TitleSection title={"More News"} />
            <RecentCategoryNews news={news} category="industry_updates" />
            <RecentDigitalIssue />
            <RecentCategoryNews
              news={news}
              category="decarbonization_strategies"
            />
          </div>
        </div>
      </div>
    );
  } else if (newsStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div className="p-2   lg:mx-36 mt-14 ">
      <div className="flex items-center text-gray-500 text-sm mb-5">
        <a href="/" className="hover:underline">
          Home
        </a>
        <FaChevronRight className="mx-2 text-xs" />
        <a href="/news" className="hover:underline max-w-xs" title={catName}>
          {convertToCapitalCase(catName)}
        </a>
      </div>

      
      {content}
    </div>
  );
};

export default Categories;
