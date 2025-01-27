import React, { useEffect, useState } from "react";

interface Project {
  project: string;
  description: string;
}

interface ApiResponse {
  data: Project[];
}

const Home: React.FC = () => {
  const username = localStorage.getItem("username");
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  useEffect(() => {
    if (username) {
      const fetchApiResponse = async () => {
        try {
          const response = await fetch(
            `https://sem-project-0232.onrender.com/ml_api/${username}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const data = await response.json();
          console.log("API Response:", data);

          const parsedData = {
            ...data,
            data:
              typeof data.data === "string" ? JSON.parse(data.data) : data.data,
          };

          setApiResponse(parsedData);
        } catch (error) {
          console.error("Error fetching the API response:", error);
        }
      };

      fetchApiResponse();
    }
  }, [username]);

  return (
    <div className="flex flex-col h-screen p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        {`Welcome, ${username ? username : "Guest"}`}
      </h1>
      {apiResponse ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {apiResponse.data.map((project, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-lg border border-gray-200"
            >
              <h3 className="text-lg font-bold text-gray-700">
                {project.project}
              </h3>
              <p className="text-gray-600 mt-2">{project.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default Home;
