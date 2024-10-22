"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssues } from "../_redux/news/digitalEdition";
import Link from "next/link";

const LiveIssue = () => {
  const dispatch = useDispatch();
  const { digitalIssues, loading, error } = useSelector(
    (state) => state.digitalIssues
  );
  const [recentIssue, setRecentIssue] = useState(null);

  useEffect(() => {
    dispatch(fetchIssues());
  }, [dispatch]);

  useEffect(() => {
    if (digitalIssues.length > 0) {
      const sortedIssues = [...digitalIssues].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      setRecentIssue(sortedIssues[0]); // Get the most recent issue
    }
  }, [digitalIssues]);

  if (loading) return <p></p>;
  if (error) return <p>Error loading issues: {error}</p>;

  if (!recentIssue) return <p>No digital issues found.</p>;

  const issueDate = new Date(recentIssue.date);
  const year = issueDate.getFullYear();
  const month = issueDate.toLocaleString("default", { month: "long" });

  return (
    <div className="p-0 flex flex-col border border-gray-100">
      {recentIssue.imageUrl && (
        <a
          href={`/magazines/${recentIssue.date}`}
          target="_blank"
          rel="noopener noreferrer"
          className="border hover:border-gray-500 w-full"
        >
          <div className="relative overflow-hidden mt-0">
            <img
              src={recentIssue.imageUrl}
              alt="Uploaded"
              className="w-full h-auto hover:border-r-2 hover:border-gray-500 transition-transform duration-500 ease-in-out transform origin-left hover:scale-x-[0.95] hover:shadow-2xl hover:shadow-black "
            />
          </div>
        </a>
      )}

      <div className=" bg-blueTheme  shadow-sm py-1 flex  w-full overflow-hidden text-black font-poppins text-sm font-normal p-0 justify-center">
        <span className="text-white font-monsterrat text-sm font-bold text-center">Live Now</span>
      </div>
    </div>
  );
};

export default LiveIssue;
