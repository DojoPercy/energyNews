"use client";
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIssues } from '../_redux/news/digitalEdition';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/react';
import groupIssuesByYear from '../../lib/digitalIssueUtils';
const DigitalIssuesByYear = () => {
  const dispatch = useDispatch();
  const { digitalIssues, loading, error } = useSelector(state => state.digitalIssues);
  const [groupedIssues, setGroupedIssues] = useState({});
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    dispatch(fetchIssues());
  }, [dispatch]);

  useEffect(() => {
    if (digitalIssues.length > 0) {
      const grouped = groupIssuesByYear(digitalIssues);
      setGroupedIssues(grouped);
      const years = Object.keys(grouped).map(year => parseInt(year));
      if (years.includes(currentYear)) {
        setCurrentYear(currentYear);
      } else if (years.length > 0) {
        setCurrentYear(Math.max(...years));
      }
    }
  }, [digitalIssues]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading issues: {error}</p>;

  const years = Object.keys(groupedIssues).map(year => parseInt(year)).sort((a, b) => b - a);

  return (
    <div className="p-4">
      <Tabs isFitted variant="enclosed" defaultIndex={years.indexOf(currentYear)}>
        <TabList>
          {years.map(year => (
           <div className='px-3 py-2 border border-gray-500 shadow-sm mx-1 rounded-md'>
             <Tab key={year} onClick={() => setCurrentYear(year)}>
              {year}
            </Tab>
           </div>
          ))}
        </TabList>
        <TabPanels>
          {years.map(year => (
            <TabPanel key={year}>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {groupedIssues[year].map(issue => (
                  <div key={issue.id} className="p-4 border rounded-lg">
                    <h3 className="text-xl font-semibold">{issue.description}</h3>
                    {issue.imageUrl && <img src={issue.imageUrl} alt="Issue" className="w-full h-64 object-cover mt-2 rounded-lg" />}
                    <p className="mt-2">PDF: <a href={issue.pdfUrl} className="text-blue-500" target="_blank" rel="noopener noreferrer">{issue.pdfUrl}</a></p>
                    <p className="mt-2 text-gray-600">Date: {issue.date}</p>
                  </div>
                ))}
              </div>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default DigitalIssuesByYear;
