"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssues } from "../_redux/news/digitalEdition";
import groupIssuesByYear from "../../lib/digitalIssueUtils";
import CustomTab from "./customTab";
import TabPanel from "./tabPanels";
import { FaChevronRight } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

const DigitalIssuesByYear = () => {
  const dispatch = useDispatch();
  const { digitalIssues, loading, error } = useSelector(
    (state) => state.digitalIssues
  );
  const [groupedIssues, setGroupedIssues] = useState({});
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    dispatch(fetchIssues());
  }, [dispatch]);

  useEffect(() => {
    if (digitalIssues.length > 0) {
      const sortedIssues = [...digitalIssues].sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );
      const latestIssue = sortedIssues[0];
      const grouped = groupIssuesByYear(digitalIssues);
      setGroupedIssues(grouped);
      const years = Object.keys(grouped).map((year) => parseInt(year));
      if (years.includes(currentYear)) {
        setCurrentYear(currentYear);
      } else if (years.length > 0) {
        setCurrentYear(Math.max(...years));
      }
    }
  }, [digitalIssues]);

  if (loading) return <div className="w-full h-full flex jutify-center items-center">
    <ClipLoader size={0} color={"#123abc"} loading={true} />
  </div>;
  if (error) return <p>Error loading issues: {error}</p>;

  const sortedIssues = [...digitalIssues].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const latestIssue = sortedIssues.length > 0 ? sortedIssues[0] : null;
  const years = Object.keys(groupedIssues)
    .map((year) => parseInt(year))
    .sort((a, b) => b - a);

  return (
    <div className="flex flex-col p-16">
      <div className="flex justify-start items-center space-x-2 mb-20">
        <span className="text-base text-gray-600">Home</span>
        <FaChevronRight className="text-[0.7rem] text-gray-600" />
        <span className="text-base text-gray-600">Magazines</span>
      </div>

      {/* Display the latest issue */}
      {latestIssue && (
        <div className="mb-8 p-4 bg-white flex justify-start items-start space-x-3">
          <figure className="post-thumbnail ">
            <a href={latestIssue.pdfUrl} aria-hidden="true" tabIndex="-1">
              <img
                src={latestIssue.imageUrl}
                alt="Latest Issue"
                className="w-[17rem] object-cover mb-4"
              />
            </a>
          </figure>
          <div className="entry-container  flex flex-col justify-between">
            <header className="entry-header flex flex-col justify-between">
              <span className="text-secondaryBlue font-mont text-2xl ">
                {new Date(latestIssue.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </span>
            </header>
            <div className="entry-meta mt-10  flex flex-col justify-between place-items-baseline">
             
              <p className="text-gray-600 mt-2">
                Issued Date: {latestIssue.date}
              </p>
              <p className="text-gray-200 mt-2 px-4 py-2 bg-red-700 ">
                <a
                  href={`/magazines/${latestIssue.date}`}
                  className="text-white text-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read Now
                </a>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tabs for issues by year */}
      <div className="flex flex-col lg:flex-row  ">
        <div className="flex flex-row lg:flex-col border-b border-gray-300">
          {years.map((year) => (
            <CustomTab
              key={year}
              active={year === currentYear}
              onClick={() => setCurrentYear(year)}
            >
              {year}
            </CustomTab>
          ))}
        </div>
        <div className="mt-4">
          {years.map(
            (year) =>
              year === currentYear && (
                <TabPanel key={year}>
                  <div className=" p-5 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {groupedIssues[year].map((issue) => (
                      <div
                        key={issue.id}
                        className="p-4 border border-gray-100 rounded-sm "
                      >
                        <h3 className="text-xl font-semibold">
                          {issue.description}
                        </h3>
                        {issue.imageUrl && (
                          <a href={`/magazines/${issue.date}`} >
                            <img
                            src={issue.imageUrl}
                            alt="Issue"
                            className="w-full h-[17rem] object-cover mt-2 "
                          />
                          </a>
                        )}
                       
                        <p className="mt-2 text-gray-600 text-center">{new Date(issue.date).toLocaleDateString("en-US", {
                  
                  month: "long",
                })}</p>
                      </div>
                    ))}
                  </div>
                </TabPanel>
              )
          )}
        </div>
      </div>
    </div>
  );
};

export default DigitalIssuesByYear;
