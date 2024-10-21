"use client";
import React, { useEffect, useRef, useState } from "react";
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
import MediaPlayer from "@/components/ui/MediaPlayer";
import RecentCategoryNews from "@/app/_components/recentcategories";
import RecentDigitalIssue from "@/app/_components/digitalissuebox";

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
  const [isPinned, setIsPinned] = useState(false);
  const pinEndRef = useRef(null);
  const pinStartRef = useRef(null); 

  useEffect(() => {
    if (newsStatus === "idle") {
      dispatch(fetchNews());
    }
  }, [newsStatus, dispatch]);

  useEffect(() => {
    const filteredNews = news.filter(
      (item) => item.title === decodeURIComponent(newsId)
    );
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

    const filteredNews = news.filter(
      (item) => item.title === decodeURIComponent(newsId)
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
  useEffect(() => {
    const handleScroll = () => {
      if (!pinEndRef.current || !pinStartRef.current) return;
      const pinEndPosition = pinEndRef.current.getBoundingClientRect().top;
      const pinStartPosition = pinStartRef.current.getBoundingClientRect().bottom;

      // Toggle pinned state based on scroll position
      if (pinStartPosition <= 0 && pinEndPosition > window.innerHeight) {
        setIsPinned(true); // Pin when scrolled past start
      } else {
        setIsPinned(false); // Unpin otherwise
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const filteredNews = news.filter(
      (item) => item.title === decodeURIComponent(newsId)
    );
    if (filteredNews.length > 0) {
      const article = filteredNews[0];
      setLikes(article.likes);
      setComments(article.comments);

      // Set the page title based on the article's title
      document.title = article.title || "News Article"; 
    }
  }, [news, newsId]);

  // You can adjust these values as needed to fine-tune when the element should be pinned
  const pinStyle = isPinned
    ? {
        position: "fixed",
        top: "0",
        right: "0",
        width: "100%",
        maxWidth: "300px",
      }
    : {};

  let content;

  if (newsStatus === "succeeded") {
    const filteredNews = news.filter(
      (item) => item.title === decodeURIComponent(newsId)
    );
    if (filteredNews.length > 0) {
      const article = filteredNews[0];

      content = (
        <div className="grid grid-cols-1 lg:grid-cols-8 lg:gap-10 p-1 lg:p-6 mt-0 lg:mt-0">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
              <ClipLoader size={50} color={"#123abc"} loading={true} />
            </div>
          )}
          <div className="col-span-6">
            <article
              key={article.id}
              className="bg-white overflow-hidden flex flex-col justify-start space-x-0 w-full mb-4"
            >
              <figure className="post-thumbnail">
                <header className="entry-header">
                  <h2 className="entry-title text-2xl  font-mont font-semibold mb-4">
                    <a href={`/news/${article.id}`} className="hover:underline">
                      {article.title}
                    </a>
                  </h2>
                  <div className="entry-content mb-4">
                  <p className="font-monsterrat font-normal">{getShortSummary(article.summary)}</p>
                </div>
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
              <div className="pr-0 lg:p-0 flex flex-col  mr-0">
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
                {article.videoUrl && (
                 <div className="lg:w-1/2 w-full p-5">
                 
                  <MediaPlayer mediaUrl={article.videoUrl} />
                 </div>
                )}
               

               
                <div
                  className="entry-content text-sm lg:text-lg font-montserrat"
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

          <div
            className="pin-end overflow-clip col-span-2 flex flex-col gap-4 overflow-y-auto"
            ref={pinEndRef}
            style={pinStyle} 
          >
            <RelatedNews
              category={filteredNews.category}
              currentNewsTitle={decodeURIComponent(newsId)}
              news={news}
            />
             <RecentCategoryNews news={news} category="energy_transition" />
             <RecentDigitalIssue />
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
    <div className="p-2 max-w-7xl mx-auto">
      <div className="opacity-0 flex items-center text-gray-500 text-xs lg:text-sm">
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

    
      {content}
    </div>
  );
};

export default SingleNews;
