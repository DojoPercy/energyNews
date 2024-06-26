"use client";
import React, { useState, useEffect } from "react";
import {
  LoginLink,
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";
import Divider from "../_components/divider";
import { LogOut } from "lucide-react";
import { Button } from "../../components/ui/button";
import { FaBars, FaChevronDown, FaSearch, FaTimes } from "react-icons/fa";
import { navItems } from "../../lib/navitems";

const Header = () => {
  const { user, isAuthenticated } = useKindeBrowserClient();
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (isAuthenticated && user.email === "ojodavid115@gmail.com") {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    const handleScroll = () => {
     
      if (window.scrollY > 200) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="flex justify-between items-center pb-2 transition-all duration-2000 ease-in-out">
        <LoginSignupButtons isAuthenticated={isAuthenticated} />
      </div>
      <header className={`text-gray-900 bg-white ${isSticky ? "" : ""}`}>
        <div className="w-full flex flex-col">
          <div className="container mx-auto flex items-center justify-between p-4">
            <div className="flex justify-between items-center">
              <button
                onClick={toggleMenu}
                className="text-gray-800 focus:outline-none"
              >
                <FaBars />
              </button>
            </div>
            <Link href="/">
              <img src="/logo.png" alt="Logo" className="h-16 flex" />
            </Link>
            <div className="flex-shrink-0">
              <button className="text-gray-800 focus:outline-none">
                <FaSearch />
              </button>
            </div>
          </div>
          <Divider />
          <div className="hidden lg:flex items-center w-full space-x-4 mx-auto my-0">
            <div className="flex justify-center items-center space-x-16 font-semibold text-md w-full">
              {navItems.map((item, index) => (
                <NavLink key={index} href={item.href} dropdownItems={item.dropdownItems}>
                  {item.title}
                  <FaChevronDown />
                </NavLink>
              ))}
            </div>
          </div>
          <Divider />
        </div>
        <nav
          className={`absolute w-[80%] lg:w-[50%] h-screen inset-x-0 shadow-md top-0 bg-white z-50 transform ${
            menuOpen ? "-translate-x-0" : "-translate-x-full"
          } transition duration-300 ease-in-out`}
        >
          <div className="flex flex-col items-start p-4">
            <div className="flex items-center justify-between mb-4 w-full">
              <Link href="/">
                <img src="/logo.png" alt="Logo" className="h-16 flex" />
              </Link>
              <button
                onClick={toggleMenu}
                className="text-black focus:outline-none"
              >
                <FaTimes />
              </button>
            </div>
            <div className="mt-4 w-full">
              {navItems.map((item, index) => (
                <MobileNavLink key={index} href={item.href} dropdownItems={item.dropdownItems}>
                  {item.title}
                </MobileNavLink>
              ))}
            </div>
            {isAdmin && (
              <a href="/admin" className="text-black-300 hover:text-black mb-4">
                Admin Console
              </a>
            )}
            {isAuthenticated ? (
              <LogOut>
                <Button variant="outline" href="/logout">
                  Log Out
                </Button>
              </LogOut>
            ) : (
              <LoginLink>
                <Button variant="outline" href="/login">
                  Login
                </Button>
              </LoginLink>
            )}
            <Button variant="outline" href="/signup">
              Sign Up
            </Button>
          </div>
        </nav>
      </header>
      <header
        className={`hidden lg:flex fixed top-0 left-0 right-0 bg-white shadow-md z-50 ${
          isSticky ? "visible" : "invisible"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between p-4">
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-16 flex" />
          </Link>
          <div className="flex items-center space-x-4">
            {navItems.map((item, index) => (
              <NavLink key={index} href={item.href} dropdownItems={item.dropdownItems}>
                {item.title}
                <FaChevronDown />
              </NavLink>
            ))}
          </div>
          <div className="flex-shrink-0">
            <button className="text-gray-800 focus:outline-none">
              <FaSearch />
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

const NavLink = ({ href, children, dropdownItems }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <div
        className="relative"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <a href={`/categories/${href}`} className="text-gray-800 hover:text-gray-600 flex space-x-2 justify-center items-center">
          {children}
        </a>
        {dropdownItems && isDropdownOpen && (
          <div className="absolute left-0 mt-0 w-48 z-50 bg-gray-800 shadow-lg rounded-md py-2">
            {dropdownItems.map((item, index) => (
              <a
                key={index}
                href={`/categories/${item.toLowerCase().replace(/ /g, '_')}`}
                className="block px-4 py-2 text-gray-200 hover:bg-gray-600"
              >
                {item}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const MobileNavLink = ({ href, children, dropdownItems }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="w-full">
      <div
        className="flex justify-between items-center py-2 w-full"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <a href={`/categories/${href}`} className="text-gray-800">
          {children}
        </a>
        {dropdownItems && (
          <button className="text-gray-800 focus:outline-none">
            {isDropdownOpen ? <FaTimes /> : <FaChevronDown />}
          </button>
        )}
      </div>
      {dropdownItems && isDropdownOpen && (
        <div className="pl-4">
          {dropdownItems.map((item, index) => (
            <a
              key={index}
              href={`/categories/${item.toLowerCase().replace(/ /g, '_')}`}
              className="block py-2 text-gray-800 hover:bg-gray-200"
            >
              {item}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

const LoginSignupButtons = ({ isAuthenticated }) => (
  <>
    <div className="bg-black w-full py-5 relative">
      <div className="absolute right-10 top-2">
        {!isAuthenticated ? (
          <LoginLink>
            <span variant="outline" className="text-white text-md p-1 bg-gray-800">
              Login
            </span>
          </LoginLink>
        ) : (
          <LogoutLink>
            <span variant="outline" className="text-white text-md px-5 py-1 bg-gray-800">
              Log Out
            </span>
          </LogoutLink>
        )}
      </div>
    </div>
  </>
);

export default Header;
