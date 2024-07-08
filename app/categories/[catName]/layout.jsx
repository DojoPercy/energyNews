"use client";
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import { store } from '../../_redux/news/store';
import Header from '../../_components/header';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function AdminLayout({ children }) {
  return (
    <Provider store={store}>
      <Header />
      <div className="flex flex-col">
        {children}
      </div>
    </Provider>
  );
}
