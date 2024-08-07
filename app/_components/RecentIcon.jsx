"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPersonality } from "../_redux/news/personality";
import { ClipLoader } from "react-spinners";
import Link from "next/link"; // Ensure you have this import if using Next.js

const RecentIcon = () => {
  const dispatch = useDispatch();
  const personality = useSelector((state) => state.personality.personality);
  const personalityStatus = useSelector((state) => state.personality.status);
  const error = useSelector((state) => state.personality.error);

  useEffect(() => {
    if (personalityStatus === "idle") {
      dispatch(fetchPersonality());
    }
  }, [personalityStatus, dispatch]);

  if (personalityStatus === "loading") {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
        <ClipLoader size={50} color={"#123abc"} loading={true} />
      </div>
    );
  }

  if (personalityStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="border border-blueTheme shadow-sm  my-2 p-3 rounded-sm overflow-hidden">
      <div className=" text-white bg-blueTheme w-full text-sm font-bold p-4">
        Energy Leadership Icon of the Week
      </div>
      <div className="bg-white">
        <a
          href={personality.imageUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="overflow-hidden w-full h-full">
          <img
            src={personality.imageUrl}
            alt="Personality of the Week"
            className="w-full object-cover shadow-sm hover:scale-105 transition-all ease-out duration-300 "
          />
          </div>
        </a>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {personality.name}
          </h3>
          <div className="text-gray-600 mt-2 line-clamp-3">
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: personality.description }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentIcon;
