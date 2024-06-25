"use client"; // Ensures client-side rendering

import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { FaPen } from "react-icons/fa";

const AdminHeader = () => {
  const { user, isAuthenticated, getPermission } = useKindeBrowserClient(); // Replace with actual condition for admin access

  return (
    <header className="text-gray-900 bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Left Side: Logo and Name */}
       <Link href={'/'}>
       <img src="/logo.png" alt="Logo" className="h-14 mr-2" />
       </Link>
        <div className="flex justify-center items-center">
          <div className="border border-blue-500 text-black rounded-lg p-3 mt-2 flex justify-center items-center mr-2">
            <Link href="/admin/createpost">
              <span className="flex items-center">
                <FaPen className="text-blue-500 text-xl mr-2 w-6" />
                <span>Create Post</span>
              </span>
            </Link>
          </div>


          {isAuthenticated ? (
            <span className="text-sm font-bold text-gray-800">
              Welcome, {user.given_name + " " + user.family_name}
            </span>
          ) : (
            <span></span>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
