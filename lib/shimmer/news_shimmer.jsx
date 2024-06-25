import React from 'react';
import { FaPen } from 'react-icons/fa';

const NewsShimmer = () => {
  const shimmerRows = Array.from({ length: 5 }, (_, index) => (
    <tr key={index}>
      <td className="py-2 px-4 border-b">
        <div className="animate-pulse bg-gray-300 h-4 rounded"></div>
      </td>
      <td className="py-2 px-4 border-b">
        <div className="animate-pulse bg-gray-300 h-4 rounded"></div>
      </td>
      <td className="py-2 px-4 border-b">
        <div className="animate-pulse bg-gray-300 h-4 rounded"></div>
      </td>
      <td className="py-2 px-4 border-b">
        <div className="animate-pulse bg-gray-300 h-4 rounded"></div>
      </td>
      <td className="py-2 px-4 border-b">
        <div className="animate-pulse bg-gray-300 h-4 rounded"></div>
      </td>
      <td className="py-2 px-4 border-b">
        <div className="animate-pulse bg-gray-300 h-4 rounded"></div>
      </td>
      <td className="py-2 px-4 border-b">
        <div className="animate-pulse bg-gray-300 h-4 rounded"></div>
      </td>
      <td className="py-2 px-4 border-b">
        <div className="animate-pulse bg-gray-300 h-4 rounded"></div>
      </td>
      <td className="py-2 px-4 border-b">
        <div className="animate-pulse bg-gray-300 h-4 rounded"></div>
      </td>
    </tr>
  ));

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 animate-pulse bg-gray-300 h-8 w-32 rounded"></h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Title</th>
              <th className="py-2 px-4 border-b">Image</th>
              <th className="py-2 px-4 border-b">Summary</th>
              <th className="py-2 px-4 border-b">Author</th>
              <th className="py-2 px-4 border-b">Category</th>
              <th className="py-2 px-4 border-b">Tags</th>
              <th className="py-2 px-4 border-b">Published</th>
              <th className="py-2 px-4 border-b">Likes</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>{shimmerRows}</tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-center items-center">
        <FaPen className="text-xl animate-pulse bg-gray-300 h-8 w-8 rounded-full" />
        <div className="animate-pulse bg-gray-300 h-8 w-32 rounded ml-2"></div>
      </div>
    </div>
  );
};

export default NewsShimmer;
