"use client";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPersonality } from '../_redux/news/personality';
import { ClipLoader } from "react-spinners";
import TitleSection from './titleSection';

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
    <div className="p-4 rounded-lg  bg-white">
      <TitleSection title="Energy Leadership Icon of the Week" />
      
      <div className='flex flex-col md:flex-row items-start justify-start space-y-4 md:space-y-0 md:space-x-6 p-4'>
        <div className='w-full md:w-1/3 flex flex-col'>
          <img
            src={personality.imageUrl}
            alt="Personality of the Week"
            className='object-cover w-full h-full rounded-lg shadow-md'
          />
           <p className='text-gray-700 text-lg font-semibold mb-2'>
            {personality.name}
          </p>
        </div>
        <div className='w-full md:w-2/3 flex flex-col'>
         
          <p className='text-gray-600'>
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html:  personality.description}} />
           
          </p>
        </div>
      </div>
    </div>
  );
}

export default PersonalityofWeek;
