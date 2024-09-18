"use client";
import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import { store } from '../_redux/news/store';




export default function AdminCheckerLayout({ children }) {
  return (
    <Provider store={store}>
     
      <div className="flex flex-col w-full">
        {children}
      </div>
    </Provider>
  );
}
