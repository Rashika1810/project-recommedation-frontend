import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../Components/components/ui/card";
import { Skeleton } from "../Components/components/ui/skeleton";
import { Button } from "../Components/components/ui/button";
import { BsBookmarksFill, BsFillBookmarkCheckFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { toast } from "react-hot-toast";
import CourseModal from "./component/Course";
import { PiArrowBendUpRightBold } from "react-icons/pi";

type ProjectData = {
  project_name: string;
  project_description: string;
  project_skills: string;
};
const Project: React.FC = () => {
  const { index } = useParams<{ index: string }>();
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (projectData) {
      console.log("Updated projectData:", projectData);
      console.log("Keys in projectData:", Object.keys(projectData));
      console.log("Project Name:", projectData?.project_name);
    }
  }, [projectData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://sem-project-ii06.onrender.com/ml_index/${index}`
        );
        const data = await response.json();

        console.log("Full API Response:", data);

        if (data.success) {
          let parsedData;

          // Check if data.data is a string and parse it
          if (typeof data.data === "string") {
            parsedData = JSON.parse(data.data);
          } else {
            parsedData = data.data;
          }

          console.log("Parsed Data:", parsedData);

          if (Array.isArray(parsedData) && parsedData.length > 0) {
            setProjectData(parsedData[0]);
          } else if (typeof parsedData === "object" && parsedData !== null) {
            setProjectData(parsedData);
          } else {
            console.error("Unexpected API response format:", parsedData);
          }
        } else {
          console.error("API returned success=false", data.message);
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [index]);

  const handleBookmark = async () => {
    const username = localStorage.getItem("username");
    if (!projectData) return;

    const payload = {
      username: username,
      title: projectData.project_name,
      description: projectData.project_description,
      skills: projectData.project_skills,

      index: Number(index),
    };

    try {
      const response = await fetch(
        "https://project-rec-backend.vercel.app/api/bookmark/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const result = await response.json();
      if (response.ok) {
        if (result.success) {
          toast.success(result.message);
          setClicked(true);
        } else {
          toast.error(result.message);
        }
        console.log("Project bookmarked successfully:", result);
      } else {
        toast.error("Failed to bookmark the project");
        console.error("Failed to bookmark project:", result);
      }
    } catch (error) {
      console.error("Error bookmarking project:", error);
    }
  };

  const skills = projectData?.project_skills?.split(", ") || [];
  const visibleSkills = showAllSkills ? skills : skills.slice(0, 5);

  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex justify-between">
        <Button
          className="bg-gray-200 py-3 text-gray-500 font-medium text-base active:bg-gray-500 hover:bg-gray-400"
          onClick={() => navigate(-1)}
        >
          <FaLongArrowAltLeft color="gray" /> Back
        </Button>
        <div className="flex gap-4">
          <Button
            className="bg-purple-400 py-3 text-white font-medium text-base active:bg-purple-500 hover:bg-purple-400"
            onClick={handleBookmark}
          >
            Bookmark{" "}
            {clicked ? <BsFillBookmarkCheckFill /> : <BsBookmarksFill />}
          </Button>
          <Button
            className="bg-gray-400 hover:bg-gray-400"
            onClick={() => setIsModalOpen(true)}
          >
            Get Your Course <PiArrowBendUpRightBold />
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center h-full p-6">
        <Card className="max-w-2xl w-full p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center text-gray-700">
              Project Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ) : projectData ? (
              <div className="text-gray-700 space-y-4">
                <h2 className="text-xl font-semibold text-purple-800">
                  {projectData.project_name}
                </h2>
                <p className="text-gray-600 text-base">
                  {projectData.project_description}
                </p>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    Skills Required:
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {visibleSkills.map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="bg-purple-400 text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-purple-500"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  {skills.length > 5 && (
                    <Button
                      className="mt-3 text-purple-600 hover:text-purple-800"
                      variant="link"
                      onClick={() => setShowAllSkills(!showAllSkills)}
                    >
                      {showAllSkills ? "Show Less" : "Show More"}
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center">
                Failed to load project details.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {isModalOpen && <CourseModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Project;
