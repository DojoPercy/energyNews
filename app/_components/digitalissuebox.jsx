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
    <div className="border border-gray-200 shadow-sm mt-10 mb-2">
      <div className="bg-blueTheme text-white text-sm  font-bold p-4 ">
        Digital Edition
      </div>
      <div className="bg-white p-1 rounded-b-lg g">
        <div className="p-1 rounded-lg">
          
          {recentIssue.imageUrl && (
            <a href={recentIssue.imageUrl} target="_blank" rel="noopener noreferrer">
              <img src={recentIssue.imageUrl} alt="Uploaded" className="  h-80 lg:h-48 object-cover mt-2 rounded-lg" />
            </a>
          )}
          <p className="mt-2 text-gray-600">{`${month} ${year}`}</p>
          
          <div className="mt-4">
            <Link href="/digitaledition" className="text-blue-500 text-center">View All</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentDigitalIssue;
