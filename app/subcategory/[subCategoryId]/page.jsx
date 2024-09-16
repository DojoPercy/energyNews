"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews, updateNews } from "../../_redux/news/newSlice";
import { ClipLoader } from "react-spinners"; // Import the spinner

import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";

import NewsShimmer from "../../../lib/shimmer/news_shimmer";
import { FaChevronRight, FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import RelatedNews from "@/app/_components/relatedNews";
import { navItems } from "@/lib/navitems";
import TitleSection from "@/app/_components/titleSection";
import RecentDigitalIssue from "@/app/_components/digitalissuebox";
import SingleCategory from "@/app/_components/category";

const SubCategory = () => {
  const { subCategoryId } = useParams();

  const { user, isAuthenticated } = useKindeBrowserClient();
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  const newsStatus = useSelector((state) => state.news.status);
  const loading = useSelector((state) => state.news.loading);
  const error = useSelector((state) => state.news.error);

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    if (newsStatus === "idle") {
      dispatch(fetchNews());
    }
  }, [newsStatus, dispatch]);

  const convertToCapitalCase = (str) => {
    return str
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
  };
  const decodeURL = (str) => {
    return str.toLowerCase().replace(/\s+/g, "_");
    console.log("str", str);
  };
  useEffect(() => {
    const dropDowns = navItems.filter(
      (item) => item.title === convertToCapitalCase(subCategoryId)
    );

    const filteredNews = dropDowns[0].dropdownItems
      .map((dropdownItem) => {
        return news.filter((item) => item.category === decodeURL(dropdownItem));
      })
      .flat();
    console.log("filteredNews", filteredNews);
    if (filteredNews.length > 0) {
      const article = filteredNews[0];
      setLikes(article.likes);
      setComments(article.comments);
    }
  }, [news, subCategoryId]);

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

  const handleLike = (article) => {
    let updatedLikes = article.likes;

    if (!isLiked) {
      updatedLikes++; // Increment likes if not already liked
    } else {
      updatedLikes--; // Decrement likes if already liked (to simulate dislike)
    }

    const updatedNewsItem = {
      ...article,
      likes: updatedLikes,
      updateDate: new Date(),
    };

    dispatch(updateNews({ updatedFields: updatedNewsItem }));

    // Toggle liked state
    setIsLiked(!isLiked);
    setLikes(updatedLikes);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const filteredNews = news.filter(
      (item) => item.title === decodeURIComponent(subCategoryId)
    );
    if (filteredNews.length > 0) {
      const article = filteredNews[0];
      const userMail = user.email;
      const updatedNewsItem = {
        ...article,
        comments: [
          ...article.comments,
          { newComment, userMail, updateDate: new Date().toUTCString() },
        ],
        updateDate: new Date(),
      };

      dispatch(updateNews({ updatedFields: updatedNewsItem }));

      setComments([...comments, { newComment, userMail }]);
      setNewComment("");
    }
  };
  const convertToTitleCase = (input) => {
    const words = input.split("_");
    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  let content;

  if (newsStatus === "succeeded") {
    const dropDowns = navItems.filter(
      (item) => item.title === convertToCapitalCase(subCategoryId)
    );

    const filteredNews = dropDowns[0].dropdownItems
      .map((dropdownItem) => {
        return news.filter((item) => item.category === decodeURL(dropdownItem));
      })
      .flat();
    if (filteredNews.length > 0) {
      const article = filteredNews[0];
      const otherArticles = filteredNews.slice(1,5);
      console.log(dropDowns[0].dropdownItems[1]);
      content = (
        <div className="flex flex-col">
          <div className="absolute lg:top-[270px] top-[102px] right-0 overflow-hidden whitespace-nowrap bg-white text-gray-900 py-2 mb-10 border-t border-b border-complementaryTheme w-full">
        <div className="relative h-full flex items-center z-10">
          <div className="ml-32  animation-marquee text-sm lg:text-base flex">
            {news.map((headline, index) => (
              <span className="px-4 relative " key={index}>
                <span className=" h-[43px] absolute -top-[10px] left-0 w-[0.5px] -ml-1 bg-complementaryTheme inline-block"></span>
                <FaChevronRight className="text-secondaryBlue inline-block text-[10px] opacity-75 " />

                <a
                  href={`/news/${headline.title}`}
                  className="hover:underline ml-1 text-black text-[10px] font-semibold lg:text-[12px]"
                >
                  {headline.title}
                </a>
              </span>
            ))}
          </div>
        </div>
      </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 p-2 lg:gap-6 lg:p-4 relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
              <ClipLoader size={50} color={"#123abc"} loading={true} />
            </div>
          )}
          <div className="col-span-3">
            <div className="flex flex-col space-y-2 justify-start items-start mb-32">
              <article
                key={article.id}
                className="bg-white overflow-hidden flex flex-col lg:flex-row justify-start space-x-0 w-full mb-4"
              >
                <figure className="post-thumbnail">
                  <a
                    className="block w-full lg:w-[510px] relative"
                    href={`/news/${article.title}`}
                  >
                    <img
                      src={article.imageUrl}
                      alt={article.title}
                      className="object-cover"
                    />
                    <div className="hover:opacity-25 opacity-0 transition-all ease-out duration-500 absolute inset-0 bg-gradient-to-t from-black to-transparent "></div>
                    <div className="absolute bottom-0 left-0 w-full p-4">
                <span className="bg-secondaryBlue text-white text-xs py-1 px-2 rounded-md">
                  {convertToTitleCase(article.category)}
                </span>
              </div>
                  </a>
                </figure>
                <div className="pr-2 lg:p-4 flex flex-col justify-start h-full relative">
                  <header className="entry-header">
                    <h2 className="entry-title text-xl text-gray-800 font-mont font-semibold mb-2">
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
                  <hr className="border-t-2 border-gray-300 rounded-lg absolute bottom-0 right-0" />
                </div>
              </article>
              <div className="grid lg:grid-cols-4 grid-cols-2 space-x-4 space-y-2 items-center h-full">
                {
                  otherArticles.map((article, index) => (
                    <div key={index} className=" col-span-1 justify-between flex flex-col space-y-2 h-[170px]">
                      <div>
                      <h2 className="entry-title text-gray-800 font-mont mb-2 text-lg">
                      <a
                        href={`/news/${article.title}`}
                        className="hover:text-secondaryBlue"
                      >
                        {article.title}
                      </a>
                    </h2>
                      <p>
                        {convertToTitleCase(article.category)} 
                      </p>
                      </div>
                      <hr className="border-t-2 border-gray-300 rounded-lg" />
                    </div>
                  ))
                }
              </div>
            </div>
            {
              dropDowns[0].dropdownItems.length > 1 && dropDowns[0].dropdownItems.map(
                (item, index) => (
                  <div key={index} >
                    <SingleCategory news={news} currentCategory={item} />
                  </div>
                )
              )
            }
          </div>

          {/* Right Section Content (Read Next) */}
          <div className=" col-span-1 overflow-y-auto pt-10">
            <RecentDigitalIssue/>
            <div className="py-10">

            </div>
            <RelatedNews
              category={filteredNews.category}
              currentNewsTitle={decodeURIComponent(subCategoryId)}
              news={news}
            />
          </div>
        </div>
        </div>
      );
    } else {
      content = <div>No article found.</div>;
    }
  } else if (newsStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div className=" lg:px-10 py-2 lg:py-10 mt-10  p-2">
      <div className="flex items-center text-gray-500 text-xs lg:text-sm">
        <a href="/" className="hover:underline">
          Home
        </a>

        <FaChevronRight className="mx-1 text-xs" />
        <a href="/news" className="text-xs lg:text-sm">
          {convertToCapitalCase(subCategoryId)}
        </a>
      </div>

      <TitleSection title={convertToCapitalCase(subCategoryId)} />
      {content}
    </div>
  );
};

export default SubCategory;
