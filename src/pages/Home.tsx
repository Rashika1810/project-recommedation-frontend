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
  const [visibleProjects, setVisibleProjects] = useState<number>(6);

  const fetchFallbackData = async () => {
    const fallbackProjects: Project[] = [];

    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * (1000 - 800 + 1)) + 800;

      try {
        const response = await fetch(
          `http://localhost:5000/ml_index/${randomIndex}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log(`Fallback API Response (${randomIndex}):`, data);

          if (data && data.data) {
            fallbackProjects.push({
              index: randomIndex, // Use the random index as fallback index
              project: data.data.project_name || "Untitled Project",
              description:
                data.data.project_description || "No description available.",
              skills: data.data.project_skills || "No skills provided.",
            });
          }
        } else {
          console.warn(
            `Fallback API (${randomIndex}) failed with status:`,
            response.status
          );
        }
      } catch (error) {
        console.error("Error fetching fallback data:", error);
      }
    }

    if (fallbackProjects.length === 0) {
      console.warn("No fallback projects found!");
    }
    return fallbackProjects;
  };

  useEffect(() => {
    if (username) {
      const fetchApiResponse = async () => {
        try {
          const response = await fetch(
            `http://localhost:5000/ml_api/${username}`
          );

          if (!response.ok) {
            if (response.status === 500) {
              console.warn(
                "Primary API failed with 500. Fetching fallback data..."
              );
              const fallbackData = await fetchFallbackData();
              setApiResponse({ data: fallbackData });
            } else {
              throw new Error("Network response was not ok");
            }
          } else {
            const data = await response.json();
            console.log("✅ Raw API Response:", data); // Log the raw response

            let parsedProjects: Project[] = [];

            if (data && typeof data.data === "string") {
              try {
                const parsedData = JSON.parse(data.data); // Convert string to array
                console.log("✅ Parsed Data:", parsedData); // Log parsed array

                if (Array.isArray(parsedData) && parsedData.length > 0) {
                  parsedProjects = parsedData.map((item, index) => ({
                    index: item.index ?? index, // Use API-provided index or fallback
                    project: item.project || "Untitled Project",
                    description:
                      item.description || "No description available.",
                    skills: item.skills || "No skills provided.",
                  }));
                }
              } catch (parseError) {
                console.error("❌ Error parsing `data.data`:", parseError);
              }
            } else {
              console.warn("⚠️ `data.data` is not a string:", data.data);
            }

            setApiResponse({ data: parsedProjects });
          }
        } catch (error) {
          console.error("❌ Error fetching the API response:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchApiResponse();
    }
  }, [username]);

  const handleSeeMore = () => {
    setVisibleProjects((prev) => prev + 6);
  };

  const handleSeeLess = () => {
    setVisibleProjects((prev) => (prev > 6 ? prev - 6 : 6));
  };

  return (
    <div className="flex flex-col h-full p-6">
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
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(apiResponse?.data) && apiResponse.data.length > 0 ? (
              apiResponse.data
                .slice(0, visibleProjects)
                .map((project, index) => (
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
                    <div className="mt-2 flex gap-2 text-gray-500">
                      <p className="font-medium text-gray-600">Skills:</p>
                      <p>
                        {" "}
                        {project.skills.length > 100
                          ? `${project.skills.substring(0, 100)}`
                          : project.skills}
                      </p>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-gray-500">No projects found.</p>
            )}
          </div>
          <div className="flex justify-between mt-6">
            {visibleProjects < (apiResponse?.data.length || 0) && (
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-md mr-4"
                onClick={handleSeeMore}
              >
                See More...
              </button>
            )}
            {visibleProjects > 6 && (
              <button
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
                onClick={handleSeeLess}
              >
                See Less...
              </button>
            )}
          </div>
        </>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default Home;
