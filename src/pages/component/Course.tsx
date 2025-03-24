import React, { useState } from "react";
import { Button } from "../../Components/components/ui/button";

interface CourseModalProps {
  onClose: () => void;
}

const CourseModal: React.FC<CourseModalProps> = ({ onClose }) => {
  const [courseName, setCourseName] = useState("");
  const [submittedCourse, setSubmittedCourse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!courseName.trim()) {
      setError("Course name cannot be empty");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://api.example.com/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseName }),
      });

      const data = await response.json();
      setSubmittedCourse(data.courseLink || "Course not found");
    } catch (err) {
      setError("Failed to fetch course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 h-auto">
        <div className="flex justify-between">
          <h2 className="text-xl font-semibold text-center mb-4">
            Get Your Course
          </h2>
          <Button
            onClick={onClose}
            className="font-semibold text-xl bg-transparent text-gray-500 hover:bg-transparent"
          >
            x
          </Button>
        </div>
        <input
          type="text"
          className="w-full border p-2 rounded mb-4"
          placeholder="Enter course name..."
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <div className="flex justify-end gap-2">
          <Button
            className="bg-purple-500 text-white"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
        {submittedCourse && (
          <div className="mt-4 text-center text-lg font-semibold text-gray-700">
            Course Link:{" "}
            <a
              href={submittedCourse}
              className="text-blue-500 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              {submittedCourse}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseModal;
