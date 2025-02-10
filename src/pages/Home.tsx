import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "../Components/components/ui/skeleton";

interface Project {
  index: number;
  project: string;
  description: string;
  skills: string;
}

interface ApiResponse {
  data: Project[];
}

const Home: React.FC = () => {
  const username = localStorage.getItem("username");
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
        } finally {
          setLoading(false);
        }
      };

      fetchApiResponse();
    }
  }, [username]);

  return (
    <div className="flex flex-col h-screen p-6">
      <h1 className="text-2xl font-medium text-gray-600 mb-6">
        {`Welcome, ${username ? username : "Guest"}`}
      </h1>
      <h4 className="mt-2 mb-5 text-gray-500">
        Here are some of the recommended projects...
      </h4>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-lg border border-gray-200"
            >
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      ) : apiResponse ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {apiResponse.data.map((project, index) => (
            <div
              key={index}
              className="bg-white cursor-pointer p-4 rounded-lg shadow-lg border border-gray-200"
              onClick={() => navigate(`/project/${project.index}`)}
            >
              <h3 className="text-lg font-bold text-gray-700">
                {project.project}
              </h3>
              <p className="text-gray-600 mt-2">
                {project.description.length > 100
                  ? `${project.description.substring(0, 100)}...`
                  : project.description}
              </p>
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
