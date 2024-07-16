"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews } from "../_redux/news/newSlice";
import { fetchAd } from "../_redux/news/ads";
import { ClipLoader } from "react-spinners";
import NewsShimmer from "../../lib/shimmer/news_shimmer";
import { FaChevronRight } from "react-icons/fa";
import Slider from "./slider";
import RecentDigitalIssue from "./digitalissuebox";
import RecentCategoryNews from "./recentcategories";
import PersonalityofWeek from "./personality_of_week";
import TitleSection from "./titleSection";

const Categories = () => {
  const { catName } = useParams();
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  const ads = useSelector((state) => state.ads.ads);
  const adsStatus = useSelector((state) => state.ads.adsStatus);
  const newsStatus = useSelector((state) => state.news.status);
  const loading = useSelector((state) => state.news.loading);
  const error = useSelector((state) => state.news.error);

  useEffect(() => {
    if (newsStatus === "idle") {
      dispatch(fetchNews());
      dispatch(fetchAd());
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
    content = (
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
        <ClipLoader size={50} color={"#123abc"} loading={true} />
      </div>
    );
  } else if (newsStatus === "succeeded") {
    const filteredNews = news
      .filter((item) => item.isPublished === true)
      .sort((a, b) => {
        const dateA = new Date(a.publishDate);
        const dateB = new Date(b.publishDate);
        return dateB - dateA;
      });

    const latestArticle = filteredNews[0];
    const topRightContent = filteredNews[1];
    const bottomRightContent = filteredNews[2];

    const allOtherArticles = filteredNews.slice(3, 8);

    content = (
      <>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
            <ClipLoader size={50} color={"#123abc"} loading={true} />
          </div>
        )}
        {latestArticle && (
          <div className="container mx-auto px-0 lg:px-4 py-2 lg:py-10">
            <div>
              <div class="relative overflow-hidden whitespace-nowrap bg-blueTheme text-gray-400 border border-gray-200">
                <div class="absolute top-0 left-0 h-full flex items-center z-10">
                  <div class="bn-title flex items-center bg-white text-black px-4 py-1 ">
                    <span>HEADLINES</span>
                  </div>
                </div>
                <div className="ml-32 inline-block animation-marquee">
                  {news.map((headline, index) => (
                    <span className="mx-4" key={index}>
                      <i className="fa fa-angle-double-right"></i>{" "}
                      <a
                        href={`/news/${headline.title}`}
                        className="text-[12px]"
                      >
                        {headline.title}
                      </a>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-4 w-[100%] lg:w-[60%]   mx-auto">
              <img
                src={ads.bannerAds}
                alt="banner.png"
                className=" w-[95%] mx-auto"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 p-6  lg:p-2  ">
              {/* Main Content - 2/3 width */}
              <div className="lg:col-span-1 lg:flex flex-col hidden mt-4 ">
                {topRightContent && (
                  <div className="flex-1 ">
                    <section className="mt-8">
                      <article className="bg-white overflow-hidden flex flex-col  justify-start space-x-0 w-full mb-0">
                        <figure className="post-thumbnail">
                          <a
                            className="block w-full"
                            href={`/news/${topRightContent.title}`}
                          >
                            <img
                              src={topRightContent.imageUrl}
                              alt={topRightContent.title}
                              className="object-cover"
                            />
                          </a>
                        </figure>
                        <div className="pr-0 lg:pt-2 flex flex-col justify-start">
                          <header className="entry-header">
                            <h2 className="entry-title text-sm font-normal mb-1">
                              <a
                                href={`/news/${topRightContent.title}`}
                                className="hover:underline"
                              >
                                {topRightContent.title}
                              </a>
                            </h2>
                          </header>
                          <div className="flex space-x-2 text-xs text-gray-500 mb-4">
                            <span className="posted-on block">
                              {topRightContent.publishDate}
                            </span>
                          </div>
                        </div>
                      </article>
                    </section>
                  </div>
                )}
                <div className="flex-1">
                  {bottomRightContent && (
                    <div className="flex-1 mb-0">
                      <section className="mt-0">
                        <article className="bg-white overflow-hidden flex flex-col  justify-start space-x-0 w-full mb-2">
                          <figure className="post-thumbnail">
                            <a
                              className="block w-full "
                              href={`/news/${bottomRightContent.title}`}
                            >
                              <img
                                src={bottomRightContent.imageUrl}
                                alt={bottomRightContent.title}
                                className="object-cover"
                              />
                            </a>
                          </figure>
                          <div className="pr-0 lg:pt-2 flex flex-col justify-start">
                            <header className="entry-header">
                              <h2 className="entry-title text-sm font-normal mb-1">
                                <a
                                  href={`/news/${bottomRightContent.title}`}
                                  className="hover:underline"
                                >
                                  {bottomRightContent.title}
                                </a>
                              </h2>
                            </header>
                            <div className="flex space-x-2 text-xs text-gray-500 mb-4">
                              <span className="posted-on block">
                                {bottomRightContent.publishDate}
                              </span>
                            </div>
                          </div>
                        </article>
                      </section>
                      <div class="bg-transparent border-0 border-t border-gray-300 h-px my-8 mx-auto max-w-[5rem] opacity-100"></div>
                    </div>
                  )}
                </div>
              </div>
              <div className="lg:col-span-3 lg:mt-10">
                <h2 className="text-2xl font-bold text-gray-900">
                  Latest News
                </h2>
                {news && <Slider sliders={news} />}
              </div>
              {/* Right Column - 1/3 width */}

              <div className="lg:col-span-1 lg:flex flex-col hidden mt-4 ">
                <div>
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <img src={ads.squareAds.SquareAd_1} alt="Lexar" />
                    <img src={ads.squareAds.SquareAd_2} alt="Lexar" />
                    <img src={ads.squareAds.SquareAd_3} alt="Lexar" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 p-6  lg:p-2">
          <div className="lg:col-span-1 hidden lg:block">
            <RecentDigitalIssue />
           <div className="ml-1">
           <RecentCategoryNews news={news} category="industry_updates" /> 
           </div>
          </div>
          <section className="mb-8 max-w-7xl mx-auto p-1 lg:p-2 lg:col-span-3 col-span-1">
            <TitleSection title={"Featured Articles"}/>
            {allOtherArticles.map((article, index) => (
              <article
                key={index}
                className="bg-white overflow-hidden flex flex-col lg:flex-row justify-start space-x-0 w-full mb-4"
              >
                <figure className="post-thumbnail">
                  <a
                    className="block w-full lg:w-[400px]"
                    href={`/news/${article.title}`}
                  >
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="object-cover"
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
                        {article.title}
                      </a>
                    </h2>
                  </header>
                  <div className="flex space-x-2 text-sm text-gray-500 mb-4">
                    <span className="by_line block">
                      by{" "}
                      <strong>
                        <i>{article.author}</i>
                      </strong>
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
            ))}
            <PersonalityofWeek/>
          </section>

          <section className="">
            <div className="lg:col-span-1 hidden lg:block">
              <RecentCategoryNews news={news} category="global_news" />
            </div>
          </section>
        </div>
        <div className="flex flex-col lg:hidden p-2 justify-around">
          <TitleSection title={"More News"}/>
          <RecentCategoryNews news={news} category="global_news" />
          <div className="mt-5">
            <RecentCategoryNews news={news} category="industry_updates" />
          </div>
          <div className="mt-5">
            <RecentDigitalIssue />
          </div>
          <div className=" mt-5 flex flex-col items-center justify-center space-y-2">
            <img src={ads.squareAds.SquareAd_1} alt="Lexar" />
            <img src={ads.squareAds.SquareAd_2} alt="Lexar" />
            <img src={ads.squareAds.SquareAd_3} alt="Lexar" />
          </div>
        </div>
      </>
    );
  }

  return <>{content}</>;
};

export default Categories;
