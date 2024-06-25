// src/components/NewsList.js

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNews,
  addNews,
  updateNews,
  deleteNews,
} from "../_redux/news/newSlice";
import DOMPurify from "dompurify";
import Link from "next/link";
import { FaPen } from "react-icons/fa";
import Analytics from "./anaylstics";
import NewsShimmer from "../../lib/shimmer/news_shimmer";

const NewsList = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  const newsStatus = useSelector((state) => state.news.status);
  const loading = useSelector((state) => state.news.loading);
  const error = useSelector((state) => state.news.error);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (newsStatus === "idle") {
      dispatch(fetchNews());
    }
  }, [newsStatus, dispatch]);
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = window.scrollY;
      const shouldShowButton = scrollHeight > 500; 

      setShowButton(shouldShowButton);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const handleDeleteNews = (newsId) => {
    dispatch(deleteNews(newsId));
  };

  const handleUpdateNews = (currnetNewsItem, newsItem) => {
    dispatch(updateNews(newsItem));
  };

  const handleTogglePublish = (newsId, currentStatus, currentNews) => {
    const updatedNewsItem = {
      ...currentNews,
      id: newsId,
      isPublished: !currentStatus, // Toggle the current publish status
    };

    // Assuming dispatch is available in your component or action creator
    dispatch(updateNews({ updatedFields: updatedNewsItem }));
  };
 
    
  
  
  
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });}
    
  
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
    return words.slice(0, 5).join(" ") + (words.length > 5 ? "..." : "");
  };

  const htmlRenderer = ({ htmlString }) => {
    const sanitizedHtml = DOMPurify.sanitize(htmlString);
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />;
  };
  const sortedNews = news.slice().sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));;
  

  let content;

  if (loading) {
    content = <NewsShimmer />;
  } else if (newsStatus === "succeeded") {
    content = (
      <>
        <Analytics news={news} />
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Summary</th>
                <th className="py-2 px-4 border-b">Author</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Tags</th>
                <th className="py-2 px-4 border-b">Published</th>
                <th className="py-2 px-4 border-b">Likes</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedNews.map((newsItem) => (
                <tr key={newsItem.id}>
                  <td className="py-2 px-4 border-b">
                    {truncateString(newsItem.title, 14)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <img
                      src={newsItem.imageUrl}
                      alt="Uploaded"
                      className="w-10 h-10 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    {getShortSummary(newsItem.content)}
                  </td>
                  <td className="py-2 px-4 border-b">{newsItem.author}</td>
                  <td className="py-2 px-4 border-b">{newsItem.category}</td>
                  <td className="py-2 px-4 border-b">
                    {Array.isArray(newsItem.tags)
                      ? newsItem.tags.join(", ")
                      : ""}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {newsItem.isPublished ? "Yes" : "No"}
                  </td>
                  <td className="py-2 px-4 border-b">{newsItem.likes}</td>
                  <td className="py-2 px-4 border-b">
                    <Link href={`/admin/editpost/${newsItem.id}`}>
                      <span className="text-blue-500 hover:underline">
                        Edit
                      </span>
                    </Link>
                    <button
                      className="ml-2 text-red-500 hover:underline"
                      onClick={() => handleDeleteNews(newsItem.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="ml-2 text-yellow-500 hover:underline"
                      onClick={() =>
                        handleTogglePublish(
                          newsItem.id,
                          newsItem.isPublished,
                          newsItem
                        )
                      }
                    >
                      {newsItem.isPublished ? "Unpublish" : "Publish"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  } else if (newsStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div>
      <h2>News List</h2>
      {content}
      

 {showButton ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 flex justify-center items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      <span>Scroll to Top</span>
    </button>
  )  : null}



    </div>
  );
};

export default NewsList;
