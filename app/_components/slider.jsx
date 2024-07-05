import React, { useState, useEffect, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Slider = ({ sliders }) => {
  
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setCurrent((prev) => (prev === sliders.length - 1 ? 0 : prev + 1)),
      5000
    );

    return () => resetTimeout();
  }, [current]);

  const prevSlide = () => {
    setCurrent(current === 0 ? sliders.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent(current === sliders.length - 1 ? 0 : current + 1);
  };

  return (
    <div className="relative max-w-3xl h-[60%] mx-auto hover:cursor-pointer">
      <div className="overflow-hidden relative h-[500px]">
        {sliders &&
          sliders.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-transform transform ${
                index === current ? "translate-x-0" : "translate-x-full"
              } ${index < current ? "-translate-x-full" : ""}`}
            >
              <div className="flex flex-col items-start justify-start">
                <img
                  src={slide.imageUrl}
                  alt={`Slide ${slide.id}`}
                  className="w-full  object-cover h-[412px]"
                />
                <h2 className="entry-title text-xl font-semibold mb-2">
                  <a href={`/news/${slide.title}`} className="hover:underline">
                    {slide.title}
                  </a>
                </h2>
              </div>
            </div>
          ))}
      </div>
      <div className="absolute right-0 top-0 transform -translate-y-0 flex">
        <button
          onClick={prevSlide}
          className="bg-white bg-opacity-50 px-4 py-2 mr-0"
        >
          <FaChevronLeft/>
        </button>
        <button
          onClick={nextSlide}
          className="bg-white bg-opacity-50 px-4 py-2"
        >
          <FaChevronRight/>
        </button>
      </div>      <div className="flex justify-center mt-4 ">

        {sliders.map((slide, index) => (
         
<div className="relative">
<div className="absolute h-16 w-16 top-0 right-1 items-center justify-center bg-gray-200 bg-opacity-50 z-10">

</div>

<img
            key={slide.id}
            src={slide.imageUrl}
            alt={`Thumbnail ${slide.id}`}
            className={`w-16 h-16 object-cover cursor-pointer mx-1 border-2  ${
              current === index ? "border-blue-500" : "border-transparent"
            }`}
            onClick={() => setCurrent(index)}
          />
</div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
