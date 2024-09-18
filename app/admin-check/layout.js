"use client";
import { Inter } from 'next/font/google';


const inter = Inter({ subsets: ['latin'] });

export default function AdminCheckLayout({ children }) {
  return (
   
      <div className="flex flex-col w-full">
        {children}
      </div>
   
  );
}
