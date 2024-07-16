"use client";
import React, { useState, useEffect } from "react";
import {
  LoginLink,
  RegisterLink,
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
      <div className="flex justify-between items-center  transition-all duration-2000 ease-out  ">
        <LoginSignupButtons isAuthenticated={isAuthenticated} />
      </div>
      <header
        className={`text-gray-900 bg-blueTheme transition-all ease-in-out duration-200   ${
          isSticky ? "fixed top-0 z-50 w-full" : "relative"
        }`}
      >
        <div className="w-full flex flex-col ">
          <div className="container mx-auto  flex-col lg:flex-row items-center justify-center lg:justify-between lg:mx-auto lg:max-w-[1400px] hidden lg:flex">
            <Link href="/">
              <img
                src="/logo_white.png"
                alt="Logo"
                className={` flex ${
                  isSticky ? " h-16" : " h-24"
                } transition-all ease-out duration-100`}
              />
            </Link>

            <Link href="/" className={`py-3 ${isSticky ? "hidden" : "block"}`}>
              <img
                src="/ads_by_logo.png"
                alt="Logo"
                className={` flex ${
                  isSticky ? "h-0" : "lg:h-32"
                } transition-all ease-in duration-100`}
              />
            </Link>
          </div>
          {/* Mobile Screen Nav */}
          <div className="flex lg:hidden justify-between items-center p-4 transition-all duration-2000 ease-in-out border border-gray-200 ">
           
            <Link href="/">
              <img
                src="/logo_white.png"
                alt="Logo"
                className={` flex ${
                  isSticky ? " h-12" : " h-16"
                } transition-all ease-out duration-100`}
              />
            </Link>
            <div className="flex justify-between items-center">
              <button
                onClick={toggleMenu}
                className="text-white focus:outline-none"
              >
                <div className="flex items-center space-x-3">
                  <FaBars className=" w-5 h-5" />
                  <div className="flex-shrink-0">
                    <button className="text-white focus:outline-none">
                      <FaSearch />
                    </button>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className=" ni">
            <div className="hidden lg:flex items-center w-full space-x-4  my-0    bg-secondaryBlue text-white justify-between ">
              <div className="flex justify-start items-center space-x-2 font-normal text-md lg:mx-auto lg:max-w-7xl w-full ">
                {navItems.map((item, index) => (
                  <NavLink
                    key={index}
                    href={item.href}
                    dropdownItems={item.dropdownItems}
                  >
                    {item.title}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* sidemnue */}
        <nav
          className={`absolute w-[80%] lg:w-[50%] h-screen inset-x-0 shadow-md top-0 bg-white z-50 transform ${
            menuOpen ? "-translate-x-0" : "-translate-x-full"
          } transition duration-300 ease-in-out `}
        >
          <div className="flex flex-col items-start p-4">
            <div className="flex items-center justify-between mb-4 w-full">
              <Link href="/">
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="h-16 flex transition-all ease-in-out duration-100"
                />
              </Link>
              <button
                onClick={toggleMenu}
                className="text-black focus:outline-none"
              >
                <FaTimes />
              </button>
            </div>
            <div className="mt-4 w-full   ">
              {navItems.map((item, index) => (
                <MobileNavLink
                  key={index}
                  href={item.href}
                  dropdownItems={item.dropdownItems}
                >
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
            <RegisterLink>
              <Button variant="outline" href="/login">
                Sign UP
              </Button>
            </RegisterLink>
          </div>
        </nav>
      </header>
      {/* mobile header */}
      <header
        className={`hidden lg:flex fixed top-0 left-0 right-0 bg-white shadow-md z-50 ${
          isSticky ? "invisible" : "invisible"
        }`}
      >
        <div className="container mx-auto  flex items-center justify-between p-4">
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-16 flex" />
          </Link>
          <div className="flex flex-row items-center space-x-4">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                href={item.href}
                dropdownItems={item.dropdownItems}
                isSticky={isSticky}
              >
                {item.title}
                <FaChevronDown height={2} />
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

const NavLink = ({ href, children, dropdownItems, isSticky }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="flex space-x-10 items-center  px-3 py-2">
      <div
        className="relative"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <a
          href={`/categories/${href}`}
          className={`text-black ${
            isSticky ? "text-black" : "text-white"
          } hover:text-gray-600 flex justify-start flex-col items-center`}
        >
          {children}
        </a>
        {dropdownItems && isDropdownOpen && (
          <div className="absolute left-0 mt-0 w-48 z-50 bg-white shadow-lg rounded-md py-2">
            {dropdownItems.map((item, index) => (
              <a
                key={index}
                href={`/categories/${item.toLowerCase().replace(/ /g, "_")}`}
                className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
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
              href={`/categories/${item.toLowerCase().replace(/ /g, "_")}`}
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
    <div className="bg-orangeTheme w-full py-5 relative">
      <div className="absolute right-10 top-2  lg:max-w-7xl lg:mx-auto">
        {!isAuthenticated ? (
          <LoginLink>
            <span
              variant="outline"
              className="text-black text-md p-1 font-semibold"
            >
              Login
            </span>
          </LoginLink>
        ) : (
          <LogoutLink>
            <span
              variant="outline"
              className="text-black text-md p-1 font-semibold"
            >
              Log Out
            </span>
          </LogoutLink>
        )}
      </div>
      <div className="absolute right-28 top-2  lg:max-w-7xl lg:mx-auto">
        <RegisterLink>
          <span
            variant="outline"
            className="text-black text-md p-1 font-semibold "
          >
            Sign Up
          </span>
        </RegisterLink>
      </div>
    </div>
  </>
);

export default Header;
