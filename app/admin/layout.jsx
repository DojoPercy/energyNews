// app/admin/AdminLayout.js
'use client';
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import { store } from '../_redux/news/store';
import Sidebar from '../_components/sidebar';
import AdminHeader from '../_components/admin_header';
import { useState } from 'react';

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';

const inter = Inter({ subsets: ['latin'] });

export default function AdminLayout({ children }) {
 
  const [isExpanded, setIsExpanded] = useState(false);
  

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  if (!store) {
    return <div>Loading...</div>; // Handle case where store isn't ready
  }
return  (
    <Provider store={store}>
     
      <div className="flex">
      <AdminHeader toggleSidebar={toggleSidebar} />
   <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} isAuthenticated={true} />
      <main className={`flex-1 transition-margin duration-300 ${isExpanded ? 'ml-0' : 'ml-0'}`}>
        {children}
      </main>
    </div>
    </Provider>
  ) 
}
