import logo from "../assets/logo.png";
import React, { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "../Components/components/ui/navigation-menu";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../Components/components/ui/button";

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("Token");
    // Redirect to the login page
    navigate("/auth");
  };
  return (
    <nav className="bg-purple-50 shadow-sm">
      <div className="mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link
          to="/home"
          className="text-2xl font-bold text-gray-800 h-full hover:text-gray-600"
        >
          <img src={logo} className="h-20" alt="Logo" />
        </Link>

        {/* Desktop Navigation Menu */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList className="flex space-x-6">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/saved"
                  className="text-xl text-purple-500 hover:text-purple-600 font-medium"
                >
                  Saved
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/complete-profile"
                  className="text-xl text-purple-500 hover:text-purple-600 font-medium"
                >
                  Profile
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/courses"
                  className="text-xl text-purple-500 hover:text-purple-600 font-medium"
                >
                  Courses
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button
                onClick={handleLogout}
                className="text-xl text-white bg-red-500 hover:bg-red rounded-md p-2 font-medium"
              >
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
        <NavigationMenu className="md:hidden bg-purple-100 px-4 py-2">
          <NavigationMenuList className="space-y-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/saved"
                  className="block text-lg text-purple-500 hover:text-purple-600 font-medium"
                >
                  Saved
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/profile"
                  className="block text-lg text-purple-500 hover:text-purple-600 font-medium"
                >
                  Profile
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/courses"
                  className="block text-lg text-purple-500 hover:text-purple-600 font-medium"
                >
                  Courses
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <div>
              <Button
                onClick={handleLogout}
                className="block text-lg text-white bg-red-500 rounded-md p-2 font-medium"
              >
                Logout
              </Button>
            </div>
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </nav>
  );
};

export default Navbar;
