"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIssues } from '../_redux/news/digitalEdition';
import Link from "next/link";

const RecentDigitalIssue = () => {
  const dispatch = useDispatch();
  const { digitalIssues, loading, error } = useSelector(state => state.digitalIssues);
  const [recentIssue, setRecentIssue] = useState(null);

  useEffect(() => {
    dispatch(fetchIssues());
  }, [dispatch]);

  useEffect(() => {
    if (digitalIssues.length > 0) {
      const sortedIssues = [...digitalIssues].sort((a, b) => new Date(b.date) - new Date(a.date));
      setRecentIssue(sortedIssues[0]); // Get the most recent issue
    }
  }, [digitalIssues]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading issues: {error}</p>;

  if (!recentIssue) return <p>No digital issues found.</p>;

  const issueDate = new Date(recentIssue.date);
  const year = issueDate.getFullYear();
  const month = issueDate.toLocaleString('default', { month: 'long' });

  return (
    <div className="lg:border-complementaryTheme lg:border shadow-sm mt-10 mb-2">
      <div className="bg-white text-black font-poppins text-xl font-normal p-4">
        Live Publication
      </div>
      <div className="bg-white  g">
        <div className="p-1 ">
          
          {recentIssue.imageUrl && (
            <a href={`/magazines/${recentIssue.date}`} target="_blank" rel="noopener noreferrer">
              <img src={recentIssue.imageUrl} alt="Uploaded" className=" w-full object-cover mt-2" />
            </a>
          )}
          <p className="mt-2 text-gray-600">{`${month} ${year}`}</p>
          
          <div className="mt-4">
            <Link href="/publications" className="text-gray-500 text-center text-xs">View All</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentDigitalIssue;
