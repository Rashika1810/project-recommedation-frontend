import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../Components/components/ui/card";
import { Skeleton } from "../Components/components/ui/skeleton";
import { Button } from "../Components/components/ui/button";
import { BsBookmarksFill } from "react-icons/bs";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { useNavigate, useParams } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
const Project: React.FC = () => {
  const { index } = useParams<{ index: string }>();
  const [projectData, setProjectData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showAllSkills, setShowAllSkills] = useState(false);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://sem-project-0232.onrender.com/ml_index/${index}`
        );
        const data = await response.json();
        if (data.success) {
          setProjectData(data.data);
        } else {
          console.error("Failed to fetch project data", data.message);
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [index]);

  const skills = projectData?.project_skills?.split(", ") || [];
  const visibleSkills = showAllSkills ? skills : skills.slice(0, 5);

  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex justify-between">
        <Button
          className=" bg-gray-400 py-3 text-black font-medium text-base active:bg-gray-500 hover:bg-gray-400"
          onClick={() => {
            navigate(-1);
          }}
        >
          <FaLongArrowAltLeft color="black" />
          Back
        </Button>
        <Button
          className=" bg-purple-400 py-3 text-white font-medium text-base active:bg-purple-500 hover:bg-purple-400"
          onClick={() => {
            setClicked(true);
          }}
        >
          Bookmark {clicked ? <BsFillBookmarkCheckFill /> : <BsBookmarksFill />}
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center h-full p-6">
        <Card className="max-w-2xl w-full shadow-lg rounded-2xl bg-white p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
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
                <h2 className="text-xl font-semibold text-gray-900">
                  {projectData.project_name}
                </h2>
                <p className="text-gray-600">
                  {projectData.project_description}
                </p>
                <div className="bg-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    Skills Required:
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {visibleSkills.map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  {skills.length > 5 && (
                    <Button
                      className="mt-3 text-blue-600 hover:text-blue-800"
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
    </div>
  );
};

export default Project;
