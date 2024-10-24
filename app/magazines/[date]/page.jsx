'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIssues } from '../../_redux/news/digitalEdition';
import ClipLoader from 'react-spinners/ClipLoader';
import Flipbook from '../../_components/Flipbook';

const PdfViewer = () => {
  const { date } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { digitalIssues, loading } = useSelector((state) => state.digitalIssues);
  const [selectedIssue, setSelectedIssue] = useState(null);

  useEffect(() => {
    if (date) {
      dispatch(fetchIssues());
    }
  }, [date, dispatch]);

  useEffect(() => {
    if (digitalIssues.length > 0 && date) {
      const issue = digitalIssues.find((issue) => issue.date === date);
      setSelectedIssue(issue);
      console.log(issue?.pdfUrl); // Ensure issue exists before accessing url
    }
  }, [digitalIssues, date]);

  // Loading state
  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-gray-900">
        <ClipLoader color="#ffffff" loading={loading} size={50} />
      </div>
    );
  }

  // No PDF found
  if (!selectedIssue) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-gray-900 text-white">
        <p>No PDF found for the date: {date}</p>
      </div>
    );
  }

  // Render the Flipbook
  return (
    <div className="h-auto py-0 w-screen flex flex-col gap-5 justify-center items-center bg-white overflow-hidden ">
     
      <iframe
  allowFullScreen="allowfullscreen"
  className="fp-iframe"
  src={selectedIssue?.pdfUrl}
  style={{ border: '1px solid lightgray', width: '100%', height: '100vh' }}
></iframe>

    </div>
  );
};

export default PdfViewer;
