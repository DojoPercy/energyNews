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
      .filter((item) => item.isPublished)
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
      const shuffleArray = (array) => {
        let shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
      };

    const latestArticle = filteredNews[0];
    const allOtherArticles = filteredNews.slice(3, 8);
    const updates = shuffleArray(filteredNews).slice(0, 4)



    content = (
      <>
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
            <ClipLoader size={50} color={"#123abc"} loading={true} />
          </div>
        )}
        {latestArticle && (
          <div className="container mx-auto px-0 lg:px-4 py-2 lg:py-10">
            <div className="relative overflow-hidden whitespace-nowrap bg-blueTheme text-gray-400 border border-gray-200">
              <div className="absolute top-0 left-0 h-full flex items-center z-10">
                <div className="bn-title flex items-center bg-white text-black px-4 py-1 ">
                  <span>HEADLINES</span>
                </div>
              </div>
              <div className="ml-32 inline-block animation-marquee">
                {news.map((headline, index) => (
                  <span className="mx-4" key={index}>
                    <i className="fa fa-angle-double-right"></i>
                    <a href={`/news/${headline.title}`} className="text-[12px]">
                      {headline.title}
                    </a>
                  </span>
                ))}
              </div>
            </div>
            <div className="p-4 w-[100%] lg:h-[92px]">
              <img
                src={ads.bannerAds}
                alt="banner.png"
                className="lg:h-[100px]"
              />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 p-6 lg:p-2">
              <div className="lg:col-span-4 lg:mt-4">
                <h2 className="text-2xl lg:text-3xl font-bold text-secondaryBlue font-mont">
                  Top News
                </h2>
                <div className="flex flex-col lg:h-[50vh] lg:flex-row w-full py-0 m-2">
                  <figure className="lg:w-[55%] w-[100%]">
                    <Img
                      src={latestArticle.imageUrl}
                      alt="figure"
                      className="object-cover h-[50vh] object-center"
                    />
                  </figure>
                  <div className="p-5 lg:w-[45%] w-[100%] bg-gray-200 flex flex-col justify-start">
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
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1 lg:flex flex-col hidden mt-4">
                <div className="flex flex-col items-center justify-center space-y-2">
                  <img src={ads.squareAds.SquareAd_1} alt="Ad 1" />
                  <img src={ads.squareAds.SquareAd_2} alt="Ad 2" />
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-10 p-6 lg:p-2">
        
          <section className="mb-8 max-w-7xl mx-auto p-1 lg:p-2 lg:col-span-6 col-span-1">
          <TitleSection title={"Category Focus"} />
          
            <CategoryFocus news={news}/>

          <TitleSection title={"News Updates"}/>
          <NewsUpdates news={updates}/>

            <TitleSection title={"Featured Articles"} />
            {allOtherArticles.slice(0, 4).map((article, index) => (
              <article
                key={index}
                className="bg-white overflow-hidden flex flex-col lg:flex-row justify-start space-x-0 w-full mb-4"
              >
                <figure className="post-thumbnail">
                  <a className="block w-full lg:w-[400px]" href={`/news/${article.title}`}>
                    <img src={article.imageUrl} alt={article.title} className="object-cover" />
                  </a>
                </figure>
                <div className="pr-2 lg:p-4 flex flex-col justify-start">
                  <header className="entry-header">
                    <h2 className="entry-title text-xl text-gray-800 font-mont font-semibold mb-2">
                      <a href={`/news/${article.title}`} className="hover:underline">
                        {article.title}
                      </a>
                    </h2>
                  </header>
                  <div className="flex space-x-2 text-sm text-gray-500 mb-4">
                    <span className="by_line block">
                      by <strong><i>{article.author}</i></strong>
                    </span>
                    <span className="font-semibold">|</span>
                    <span className="posted-on block">{article.publishDate}</span>
                  </div>
                  <div className="entry-content">
                    <p>{getShortSummary(article.summary)}</p>
                  </div>
                </div>
              </article>
            ))}
            <PersonalityofWeek />

            <TitleSection title={"Upcoming Events"}/>
          </section>
          <section className="lg:col-span-2 hidden  lg:block w-full">
            <RecentCategoryNews news={news} category="global_news" />
            <RecentDigitalIssue/>
          </section>

        </div>
      
      </>
    );
  }

  return <>{content}</>;
};

export default Categories;
