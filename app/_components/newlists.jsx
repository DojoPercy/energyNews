import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCaretSquareUp } from "react-icons/fa";
import { Tooltip } from "@nextui-org/react";
import { MdEdit, MdDelete } from "react-icons/md";
import {
  fetchNews,
  updateNews,
  deleteNews,
} from "../_redux/news/newSlice";
import DOMPurify from "dompurify";
import Link from "next/link";
import Analytics from "./anaylstics";
import { ClipLoader } from "react-spinners";

const NewsList = () => {
  const dispatch = useDispatch();
  const news = useSelector((state) => state.news.news);
  const newsStatus = useSelector((state) => state.news.status);
  const loading = useSelector((state) => state.news.loading);
  const error = useSelector((state) => state.news.error);
  const [showButton, setShowButton] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDeleteNews = (newsId) => {
    dispatch(deleteNews(newsId));
  };

  const handleTogglePublish = (newsId, currentStatus, currentNews) => {
    const updatedNewsItem = {
      ...currentNews,
      id: newsId,
      isPublished: !currentStatus,
    };

    dispatch(updateNews({ updatedFields: updatedNewsItem }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  // Sort news by publishDate in descending order
  const sortedNews = news
    .slice()
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));

  // Pagination calculation
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedNews.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(sortedNews.length / itemsPerPage);

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

  let content;

  if (loading) {
    content = (
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
        <ClipLoader size={50} color={"#123abc"} loading={true} />
      </div>
    );
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
              {currentItems.map((newsItem) => (
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
                  <td className="py-4 px-4 border-b flex  items-center space-x-2">
                    <Tooltip
                      content="edit"
                      placement="top"
                      className="bg-gray-200 rounded-sm border border-gray-100"
                    >
                      <Link href={`/admin/editpost/${newsItem.id}`}>
                        <span className="text-blueTheme hover:underline">
                          <MdEdit />
                        </span>
                      </Link>
                    </Tooltip>
                    <Tooltip
                        content="delete"
                        placement="bottom"
                        className="bg-gray-200 rounded-sm border border-gray-100"
                        color="default"
                      >
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDeleteNews(newsItem.id)}
                    >
                    
                        <MdDelete />
                      
                    </button>
                    </Tooltip>
                    <button
                      className="text-yellow-500 hover:underline"
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
        {renderPagination()}
      </>
    );
  } else if (newsStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-4">News List</h2>
      {content}
      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 flex justify-center items-center text-blueTheme font-bold bg-white py-2 px-2 rounded"
        >
          <span><FaCaretSquareUp className="text-2xl" /></span>
        </button>
      )}
    </div>
  );
};

export default NewsList;
