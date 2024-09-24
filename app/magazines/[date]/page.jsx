'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIssues } from '../../_redux/news/store';
import ClipLoader from 'react-spinners/ClipLoader';
import Flipbook from '../../_components/Flipbook';

const PdfViewer = () => {
  const router = useRouter();
  const { date } = router.query;
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
    }
  }, [digitalIssues, date]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-gray-900">
        <ClipLoader color="#ffffff" loading={loading} size={50} />
      </div>
    );
  }

  if (!selectedIssue) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-gray-900 text-white">
        <p>No PDF found for the date: {date}</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col gap-5 justify-center items-center bg-gray-900 overflow-hidden">
      <h1 className="text-3xl text-white text-center font-bold">Digital Issue - {date}</h1>
      <Flipbook pdfUrl={selectedIssue.url} />
    </div>
  );
};

export default PdfViewer;
