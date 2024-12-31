import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from local storage
    localStorage.removeItem("Token");

    // Redirect to the login page
    navigate("/auth");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Home Page</h1>
      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-red-500 text-white font-medium text-lg rounded-lg hover:bg-red-400 active:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        Logout
      </button>
    </div>
  );
};

export default Home;
