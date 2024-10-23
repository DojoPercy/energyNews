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
import { Img } from "@chakra-ui/react";
import CategoryFocus from "./category_focus";
import NewsUpdates from "./news_updates";
import RecentIcon from "./RecentIcon";
import Homepage from "./homepage";
import LiveIssue from "./liveIssue";
import MultimediaHub from "./multimedia";

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
    return str.length <= num ? str : str.slice(0, num) + "...";
  };

  const getShortSummary = (htmlString) => {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;
    const textContent = tempElement.textContent || tempElement.innerText || "";
    const words = textContent.trim().split(/\s+/);
    return words.slice(0, 30).join(" ") + (words.length > 30 ? "..." : "");
  };

  const parseFirestoreTimestamp = (timestampString) => {
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
  };

  const convertToTitleCase = (input) => {
    const words = input.split("_");
    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
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
      .filter(
        (item) =>
          item.isPublished && item.category !== "personality_of_the_week"
      )
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
    const shuffleArray = (array) => {
      let shuffledArray = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
          shuffledArray[j],
          shuffledArray[i],
        ];
      }
      return shuffledArray;
    };

    const latestArticle = filteredNews[0];
    const secondArticle = filteredNews[1];
    const allOtherArticles = filteredNews.slice(12, 19);
    const updates = shuffleArray(filteredNews).slice(4, 13);

    content = (
      <>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-100 z-10">
            <img src='/logo.png' alt="logo" className="w-20 h-20" />
            <ClipLoader size={50} color={"#123abc"} loading={true} />
          </div>
        )}
           {latestArticle && (
          <>
            
            <div className="pt-2 px-3 lg:hidden">
              <img src={ads.adsLogo} alt="Lexar" />
            </div>
          </>
        )}
        <Homepage news={news}/>
        <div className="fixed z-20 bottom-5 lg:bottom-8  right-3 lg:right-6 w-[7rem]">
          <LiveIssue />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-8 lg:gap-10 p-1 lg:p-2 mt-0 lg:mt-0 lg:px-32">
          <section className="my-0 max-w-7xl mx-auto p-2 px-0 lg:p-0 lg:col-span-6 col-span-1">
            {/* <div className="flex flex-col">
              
              <div className="flex flex-col lg:h-[50vh] lg:flex-row w-full py-0 hover:cursor-pointer">
                <figure className="lg:w-[55%] w-[100%]">
                  <Img
                    src={latestArticle.imageUrl}
                    alt="figure"
                    className="object-cover h-[50vh] w-full object-center"
                  />
                </figure>
                <div className="p-5 lg:w-[45%] w-[100%] bg-gray-200  flex flex-col justify-start">
                  <div className="bg-secondaryBlue flex justify-center rounded w-[100px] mb-3">
                    <h2 className="text-xs lg:text-sm py-2 px-0  font-semibold text-white font-mont">
                      Top News
                    </h2>
                  </div>
                  <h1 className="text-xl lg:text-2xl font-bold text-secondaryBlue hover:text-blueTheme hover:cursor-pointer font-mont">
                    <a href={`/news/${latestArticle.title}`}>
                      {latestArticle.title}
                    </a>
                  </h1>
                  <span className="w-auto text-xs p-2 text-secondaryBlue rounded-md">
                    {convertToTitleCase(latestArticle.category)}
                  </span>
                  <p className="text-gray-500 py-2 text-sm">
                    {latestArticle.summary}
                  </p>
                  <p className="text-gray-500 py-2 text-sm line-clamp-4" 
                  ><div className="text-gray-600 mt-2 line-clamp-4">
                  <div
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: latestArticle.content || "No content available" }}
                  />
                </div></p>
                </div>
              </div>
              
            </div> */}

            <TitleSection title={"News Updates"} />
            <NewsUpdates news={updates} />

            <TitleSection title={"Category Focus"} />

            <CategoryFocus news={news} />

            <TitleSection title={"Featured Articles"} />
            {allOtherArticles.slice(0, 4).map((article, index) => (
              <article
                key={index}
                className="bg-white p-2 overflow-hidden flex flex-col lg:flex-row justify-start space-x-0 w-full mb-4"
              >
                <figure className="post-thumbnail">
                  <a
                    className="block w-full lg:w-[400px] lg:h-[250px]"
                    href={`/news/${encodeURIComponent(article.title)}`}
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
                    <h2 className="entry-title text-xl text-gray-800 font-mont font-semibold mb-2">
                      <a
                        href={`/news/${encodeURIComponent(article.title)}`}
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
            <PersonalityofWeek />
            <TitleSection title={"Multimedia's Hub"} />
            <MultimediaHub news={news} />
          </section>
          <section className="lg:col-span-2 hidden my-6 lg:my-14 lg:block w-full">
            <RecentIcon news={news} />

            <RecentCategoryNews news={news} category="global_news" />
            <RecentDigitalIssue />
            <div className="flex flex-col justify-center items-center space-y-3 mt-10">
              <img src={ads.squareAds.SquareAd_1} alt="Lexar" />
              <img src={ads.squareAds.SquareAd_3} alt="Lexar" />
            </div>
          </section>
          <section className="lg:hidden">
            <div className="p-2">
              <RecentDigitalIssue />
              <RecentIcon news={news} />
            </div>
          </section>
        </div>
      </>
    );
  }

  return <>{content}</>;
};

export default Categories;
