"use client";
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import { store } from '../../_redux/news/store';
import Header from '../../_components/header';
import { useState } from 'react';
import Footer from '../../_components/footer';

const inter = Inter({ subsets: ['latin'] });

export default function NewsLayout({ children }) {
  

  return (
    <>
    <Provider store={store}>
      
      <div className="flex flex-col w-full">
        {children}
      </div>
    </Provider>
    
    </>
  );
}
