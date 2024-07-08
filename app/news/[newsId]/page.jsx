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

const SingleNews = () => {
  const { newsId } = useParams();
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

  useEffect(() => {
    const filteredNews = news.filter((item) => item.title === decodeURIComponent(newsId));
    if (filteredNews.length > 0) {
      const article = filteredNews[0];
      setLikes(article.likes);
      setComments(article.comments);
    }
  }, [news, newsId]);

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

    const filteredNews = news.filter((item) => item.title === decodeURIComponent(newsId));
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

  let content;

  if (newsStatus === "succeeded") {
    const filteredNews = news.filter((item) => item.title === decodeURIComponent(newsId));
    if (filteredNews.length > 0) {
      const article = filteredNews[0];

      content = (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 p-2 lg:gap-6 lg:p-4 relative">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
              <ClipLoader size={50} color={"#123abc"} loading={true} />
            </div>
          )}
          <div className="col-span-2">
            <article
              key={article.id}
              className="bg-white overflow-hidden flex flex-col justify-start space-x-4 w-full mb-4"
            >
              <figure className="post-thumbnail">
                <header className="entry-header">
                  <h2 className="entry-title text-xl font-semibold mb-2">
                    <a href={`/news/${article.id}`} className="hover:underline">
                      {article.title}
                    </a>
                  </h2>
                </header>
                <span className="block text-sm text-gray-500 mb-2"></span>
                <a className="block w-full" href={`/news/${article.id}`}>
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="object-cover"
                  />
                </a>
              </figure>
              <div className="pr-0 lg:p-0 flex flex-col justify-start">
                <span className="block text-sm text-gray-500 mb-2"></span>
                <div className="flex space-x-2 text-sm text-gray-500 mb-4">
                  <span className="by_line block">
                    by{" "}
                    <strong>
                      <i>{article.author}</i>
                    </strong>
                  </span>
                  <span className="font-semibold">|</span>
                  <span className="posted-on block">{article.publishDate}</span>
                </div>
                <div className="entry-content">
                  <p>{getShortSummary(article.summary)}</p>
                </div>
                <div
                  className="entry-content text-sm lg:text-lg"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                ></div>
              </div>
            </article>

            {/* Like/Unlike button */}
            <div className="flex justify-center items-center mt-4">
              <button
                className="text-gray-600 hover:text-blue-500 focus:outline-none"
                onClick={() => handleLike(article)}
              >
                {isLiked ? (
                  <FaThumbsDown size={24} />
                ) : (
                  <FaThumbsUp size={24} />
                )}
              </button>
              <span className="ml-2">
                {likes} {likes === 1 ? "like" : "likes"}
              </span>
            </div>

            {/* Comment section */}
            {isAuthenticated ? (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-4">Comments</h3>
                <ul className="divide-y divide-gray-200 mb-4">
                  {comments.map((comment, index) => (
                    <li key={index} className="py-2">
                      <div className="flex space-x-2 text-xs text-gray-500">
                        {comment.userMail}
                      </div>
                      <div className="ml-2">{comment.newComment}</div>
                    </li>
                  ))}
                </ul>
                <form onSubmit={handleCommentSubmit}>
                  <textarea
                    className="w-full border z-0 border-gray-300 rounded p-2 mb-2"
                    rows="4"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Submit
                  </button>
                </form>
              </div>
            ) : (
              <div className="mt-4">Please login to comment</div>
            )}
          </div>

          {/* Right Section Content (Read Next) */}
          <div className=" col-span-1 overflow-y-auto ">
          <RelatedNews category={filteredNews.category} currentNewsTitle={decodeURIComponent(newsId)} news={news} />
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
    <div className="p-2">
      <div className="flex items-center text-gray-500 text-xs lg:text-sm">
        <a href="/" className="hover:underline">
          Home
        </a>
        <FaChevronRight className="mr-1 text-xs" />
        <a href="/" className="hover:underline text-xs lg:text-sm">
          News
        </a>
        <FaChevronRight className="mr-1 text-xs" />
        <a href="/news" className="text-xs lg:text-sm">
          {decodeURIComponent(newsId)}
        </a>
      </div>

      <div className="mt-4 text-orange-600 font-semibold text-sm">News</div>
      {content}
    </div>
  );
};

export default SingleNews;
