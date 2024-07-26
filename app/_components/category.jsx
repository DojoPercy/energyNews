import React, { useState } from "react";

const SingleCategory = ({ news, currentCategory }) => {
    const decodeURL = (str) => {
        console.log("str", str.toLowerCase().replace(/\s+/g, "_"));
        return str.toLowerCase().replace(/\s+/g, "_");
        
      };

  const filteredNews = news.filter(
    (article) => article.category === decodeURL(currentCategory)
  );
  console.log(filteredNews);
  const firstArticle = filteredNews[0];
  const otherArticles = filteredNews.slice(1, 5);
  const convertToTitleCase = (input) => {
    const words = input.split("_");
    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="w-full">
      <div>
     
        <div className="mt-6">
          {currentCategory && (
            <div
              className={`transition-transform transform ${
               
                  "translate-y-0 opacity-100"
              } duration-500`}
            >
              <h2 className="text-2xl font-bold mb-4">
                {
                  currentCategory
                }
              </h2>
              {filteredNews.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 ">
                  <div className="col-span-1">
                    {firstArticle && (
                      <div className="mb-6 p-4 rounded-lg  bg-white">
                        <img
                          src={firstArticle.imageUrl}
                          alt={firstArticle.title}
                          className="w-full h-64 object-cover mb-0"
                        />
                        <div className="w-full bg-gray-200 flex flex-col p-2 justify-start">
                          <h1 className="text-xl lg:text-2xl font-bold text-secondaryBlue hover:text-blueTheme hover:cursor-pointer font-mont">
                            <a href={`/news/${firstArticle.title}`}>
                              {firstArticle.title}
                            </a>
                          </h1>
                          <span className="w-auto text-xs p-2 text-secondaryBlue rounded-md">
                            {currentCategory}
                          </span>
                          <p className="text-gray-500 py-2 text-sm">
                            {firstArticle.summary}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="col-span-1">
                    <div>
                      {otherArticles.map((article) => (
                        <div key={article.id} className="p-4 border-t">
                          <div className="flex items-start space-x-2">
                            <img
                              src={article.imageUrl}
                              alt={article.title}
                              className="w-16 h-16 object-cover"
                            />
                            <h4 className="text-sm font-semibold">
                              <a href={`/news/${article.title}`}>
                                {article.title}
                              </a>
                            </h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <p>No articles found for this category.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleCategory;
