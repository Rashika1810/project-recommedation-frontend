import { useState, useEffect } from "react";
import { Button } from "../Components/components/ui/button";

const Course = () => {
  const [courseName, setCourseName] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch beginner courses on initial render
    const fetchBeginnerCourses = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://127.0.0.1:5000/beginners_course");
        if (!response.ok) {
          throw new Error("Failed to fetch beginner courses");
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        console.error("Error fetching beginner courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBeginnerCourses();
  }, []);

  const handleSearch = async () => {
    if (!courseName.trim()) {
      alert("Please enter a course name.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:5000/course_api", {
        method: "POST", // Change to GET if needed
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ course: courseName }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch course data");
      }

      const data = await response.json();
      setCourses(data); // Replace the course list with search results
    } catch (error) {
      console.error("Error fetching course:", error);
      alert("Error fetching course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-10 text-purple-500">
        Get Your Course and Begin Your Journey...
      </h1>
      <div className="flex w-full max-w-4xl items-center gap-3">
        <input
          type="text"
          placeholder="Enter course name..."
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <Button
          className="px-6 py-6 bg-purple-600 text-white font-semibold rounded-r-lg hover:bg-purple-700"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>

      {/* Show loading indicator */}
      {loading && <p className="text-gray-600 mt-5">Loading...</p>}

      {/* Display courses */}
      <div className="mt-10 w-full max-w-4xl">
        {courses.length > 0 ? (
          <ul className="space-y-4">
            {courses.map((course, index) => (
              <li
                key={index}
                className="p-4 border border-gray-300 rounded-lg shadow-md"
              >
                {/* <h3 className="text-xl font-semibold text-purple-600">{course.name}</h3>
                <p className="text-gray-700">{course.description}</p> */}
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p className="text-gray-500 mt-5">No courses found.</p>
        )}
      </div>
    </div>
  );
};

export default Course;
