import React, { useState, useEffect } from "react";

const CategoryFocus = ({ news }) => {
  const [currentCategory, setCurrentCategory] = useState("global_news");
  const [isAnimating, setIsAnimating] = useState(false);

  const categories = [
    { value: "global_news", label: "Global News" },
    { value: "technology_trends", label: "Technology Trends" },
    { value: "oil_gas", label: "Oil & Gas" },
    { value: "energy_transition", label: "Energy Transition" },
    { value: "market_analysis", label: "Market Analysis" },
    { value: "nuclear_energy", label: "Nuclear Energy" },
    { value: "middle_east", label: "Middle East" },
  ];

  // Automatically change the category every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentCategory((prevCategory) => {
          const currentIndex = categories.findIndex(
            (category) => category.value === prevCategory
          );
          const nextIndex = (currentIndex + 1) % categories.length;
          return categories[nextIndex].value;
        });
        setIsAnimating(false);
      }, 500); // Animation duration
    }, 7000); // Auto change every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [categories]);

  const handleCategoryChange = (value) => {
    if (currentCategory !== value) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentCategory(value);
        setIsAnimating(false);
      }, 500); // Duration of the animation
    }
  };

  const filteredNews = news.filter(
    (article) => article.category === currentCategory
  );
  const firstArticle = filteredNews[0];
  const otherArticles = filteredNews.slice(1, 5);

  return (
    <div className="w-full">
      <div>
        <div className="flex flex-wrap justify-start items-start gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              onClick={() => handleCategoryChange(category.value)}
              className={`px-3 py-2  text-blueTheme ${
                currentCategory === category.value
                  ? "bg-white border border-blueTheme text-blueTheme px-4 transition duration-100 ease-in-out"
                  : "bg-white border border-gray-200"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
        <div className="mt-6">
          {currentCategory && (
            <div
              className={`transition-transform transform ${
                isAnimating
                  ? "translate-y-full opacity-0"
                  : "translate-y-0 opacity-100"
              } duration-500`}
            >
              <h2 className="text-2xl font-bold mb-4">
                {
                  categories.find(
                    (category) => category.value === currentCategory
                  )?.label
                }
              </h2>
              {filteredNews.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="col-span-1">
                    {firstArticle && (
                      <div className="mb-6 cursor-pointer
mx-2 rounded-lg overflow-hidden bg-white">
                        <img
                          src={firstArticle.imageUrl}
                          alt={firstArticle.title}
                          className="w-full h-64 object-cover  mb-0 hover:scale-105 transition ease-in-out duration-500"
                        />
                        <div className="w-full bg-gray-200  flex flex-col p-2 justify-start">
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
                          <div className="flex items-start space-x-2 overflow-hidden">
                            <img
                              src={article.imageUrl}
                              alt={article.title}
                              className="w-16 h-16 object-cover hover:scale-105 transition ease-in-out duration-300"
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

export default CategoryFocus;
