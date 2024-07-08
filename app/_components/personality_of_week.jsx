"use client";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPersonality } from '../_redux/news/personality';
import { ClipLoader } from "react-spinners";

const PersonalityofWeek = () => {
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
    <div className="p-4 rounded-lg shadow-lg bg-white">
      <div className="bg-blueTheme text-white text-lg font-bold p-2 rounded-t-lg">
        Best Personality of the Week
      </div>
      <div className='flex flex-col md:flex-row items-center justify-start space-y-4 md:space-y-0 md:space-x-6 p-4'>
        <div className='w-full md:w-1/3'>
          <img
            src={personality.imageUrl}
            alt="Personality of the Week"
            className='object-cover w-full h-full rounded-lg shadow-md'
          />
        </div>
        <div className='w-full md:w-2/3'>
          <p className='text-gray-700 text-lg font-semibold mb-2'>
            {personality.title}
          </p>
          <p className='text-gray-600'>
            {personality.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PersonalityofWeek;
