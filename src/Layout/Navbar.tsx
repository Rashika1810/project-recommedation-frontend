import logo from "../assets/new_logo.png";
import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "../Components/components/ui/navigation-menu";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Components/components/ui/button";
import { PiBookmarkBold } from "react-icons/pi";
import { PiNotebookFill } from "react-icons/pi";
import { PiUserFill } from "react-icons/pi";
import { FaPowerOff } from "react-icons/fa6";
import { toast } from "react-hot-toast";
import bit_logo from "../assets/bit logo.png";
import { PiBookOpenTextFill } from "react-icons/pi";
const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    toast(
      (t) => (
        <span>
          Are you sure you want to logout?
          <div className="flex justify-center gap-5 mt-2">
            <Button
              onClick={() => {
                // Remove the token from local storage
                localStorage.removeItem("Token");
                toast.dismiss(t.id); // Dismiss the toast
                navigate("/auth"); // Redirect to the login page
              }}
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
            >
              Yes
            </Button>
            <Button
              onClick={() => toast.dismiss(t.id)} // Dismiss the toast
              className="bg-gray-300 hover:bg-gray-400 py-1 px-3 rounded"
            >
              No
            </Button>
          </div>
        </span>
      ),
      {
        duration: 5000,
      }
    );
  };

  return (
    <nav className="bg-purple-50 shadow-sm">
      <div className="mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link
          to="/home"
          className="text-2xl font-bold text-gray-800 h-full hover:text-gray-600"
        >
          <div className="flex gap-4">
            {" "}
            <img src={bit_logo} className="h-16" />
            <img src={logo} className="h-16" alt="Logo" />
          </div>
        </Link>
        {/* Desktop Navigation Menu */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex space-x-6">
            {/* Saved Menu Item */}
            <NavigationMenuItem className=" shadow-md hover:shadow-lg text-purple-400  p-1 rounded-md">
              <NavigationMenuLink asChild>
                <Link
                  to="/saved"
                  className={` flex items-center gap-1 text-xl  font-medium `}
                  // Prevent navigation
                >
                  <PiBookmarkBold />
                  Saved
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {/* Courses Menu Item */}
            <NavigationMenuItem className=" shadow-md hover:shadow-lg text-purple-400  p-1 rounded-md">
              <NavigationMenuLink asChild>
                <Link
                  to="/about"
                  className={` flex  items-center gap-1 text-xl font-medium `}
                  // Prevent navigation
                >
                  <PiNotebookFill />
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className=" shadow-md hover:shadow-lg text-purple-400  p-1 rounded-md">
              <NavigationMenuLink asChild>
                <Link
                  to="/course"
                  className={` flex  items-center gap-1 text-xl font-medium `}
                  // Prevent navigation
                >
                  <PiBookOpenTextFill />
                  Course
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {/* Profile Menu Item */}
            <NavigationMenuItem className=" shadow-md hover:shadow-lg text-purple-400  p-1 rounded-md">
              <NavigationMenuLink asChild>
                <Link
                  to="/complete-profile"
                  className={` flex  items-center gap-1 text-xl font-medium `}
                >
                  <PiUserFill />
                  Profile
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {/* Logout Button */}
            <NavigationMenuItem className="">
              <Button variant={"destructive"} onClick={handleLogout}>
                <FaPowerOff />
                Logout
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <NavigationMenu className="md:hidden flex absolute top-16 right-0 bg-purple-100 px-4 py-2">
          <NavigationMenuList className="space-y-4 flex  flex-col ">
            {/* Saved Menu Item */}
            <NavigationMenuItem className=" shadow-md hover:shadow-lg text-purple-400  p-1 rounded-md">
              <NavigationMenuLink asChild>
                <Link
                  to="/saved"
                  className={` flex items-center gap-1 text-xl  font-medium `}
                >
                  <PiBookmarkBold />
                  Saved
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {/* Courses Menu Item */}
            <NavigationMenuItem className=" shadow-md hover:shadow-lg text-purple-400  p-1 rounded-md">
              <NavigationMenuLink asChild>
                <Link
                  to="/about"
                  className={` flex  items-center gap-1 text-xl font-medium `}
                  // Prevent navigation
                >
                  <PiNotebookFill />
                  About
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className=" shadow-md hover:shadow-lg text-purple-400  p-1 rounded-md">
              <NavigationMenuLink asChild>
                <Link
                  to="/course"
                  className={` flex  items-center gap-1 text-xl font-medium `}
                  // Prevent navigation
                >
                  <PiBookOpenTextFill />
                  Course
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {/* Profile Menu Item */}
            <NavigationMenuItem className=" shadow-md hover:shadow-lg text-purple-400  p-1 rounded-md">
              <NavigationMenuLink asChild>
                <Link
                  to="/complete-profile"
                  className={` flex  items-center gap-1 text-xl font-medium `}
                >
                  <PiUserFill />
                  Profile
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem className="">
              <Button variant={"destructive"} onClick={handleLogout}>
                <FaPowerOff />
                Logout
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </nav>
  );
};

export default Navbar;
