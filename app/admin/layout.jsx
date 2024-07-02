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
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
 
return  (
    <Provider store={store}>
      <AdminHeader />
      <div className="flex mt-20">
        <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
        <section className={`flex-grow p-4 transition-margin duration-300 w-full max-w-6xl mx-auto ${isSidebarExpanded ? 'ml-80' : 'ml-20'} sm:ml-20`}>
          {children}
        </section>
      </div>
    </Provider>
  ) 
}
