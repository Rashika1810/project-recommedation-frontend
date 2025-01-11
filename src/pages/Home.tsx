import React from "react";

const Home = () => {
  const username = localStorage.getItem("username");
  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        {`Welcome, ${username ? username : ""}`}
      </h1>
    </div>
  );
};

export default Home;
