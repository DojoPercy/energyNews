import React from 'react';

const getTotalPosts = (news) => news.length;
const getTotalViews = (news) => news.reduce((sum, item) => sum + item.views, 0);
const getTotalLikes = (news) => news.reduce((sum, item) => sum + item.likes, 0);
const getMostPopularCategory = (news) => {
  const categoryCount = news.reduce((count, item) => {
    count[item.category] = (count[item.category] || 0) + 1;
    return count;
  }, {});
  return Object.keys(categoryCount).reduce((a, b) => categoryCount[a] > categoryCount[b] ? a : b, '');
};
const getTotalPublishedPosts = (news) => news.filter(item => item.isPublished).length;

const Analytics = ({ news }) => {
  return (
    <div className="p-6 mt-20 mb-10 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnalyticsCard title="Total Posts" value={getTotalPosts(news)} />
        <AnalyticsCard title="Total Views" value={getTotalViews(news)} />
        <AnalyticsCard title="Total Likes" value={getTotalLikes(news)} />
        <AnalyticsCard title="Most Popular Category" value={getMostPopularCategory(news)} />
        <AnalyticsCard title="Published Posts" value={getTotalPublishedPosts(news)} />
      </div>
    </div>
  );
};

const AnalyticsCard = ({ title, value }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default Analytics;
