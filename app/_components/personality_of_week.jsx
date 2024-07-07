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
    return <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-10">
    <ClipLoader size={50} color={"#123abc"} loading={true} />
  </div>;
  }

  if (personalityStatus === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
   <div>
     <div className="bg-blueTheme text-white text-sm font-bold p-4">
        Best Personality of the Week 
      </div>
     <div className='border border-gray-500 bg-white shadow-sm p-4'>
      <div className='flex justify-start space-x-3'>
        <div className='w-1/2'>
          <img src={personality.imageUrl} alt="Personality of the Week" className='object-cover w-full h-full' />
        </div>
        <div className='w-2/3 flex justify-start'>
          <p className='text-gray-700'>
            {personality.description}
          </p>
          <p>
            {personality.title}
          </p>
        </div>
      </div>
    </div>
    
   
   </div>
  );
}

export default PersonalityofWeek;
