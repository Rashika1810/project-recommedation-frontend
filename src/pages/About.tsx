import React from "react";

const About: React.FC = () => {
  return (
    <div className=" flex flex-col items-center p-6">
      <div className="max-w-4xl w-full bg-white  p-8 text-gray-800">
        {/* <h1 className="text-4xl font-bold text-purple-600 text-center mb-6">
          About Skill Nexus
        </h1> */}
        <p className="text-lg text-gray-700 mb-4">
          Skill Nexus is a platform designed to help you discover and work on
          projects that match your skills and interests. Whether you're looking
          learn, or showcase your expertise, Skill Nexus connects you with the
          right opportunities.
        </p>
        <h2 className="text-2xl font-medium text-purple-500 mt-6 mb-4">
          How to Use Skill Nexus
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-3">
          <li>
            <span className="font-semibold">Register/Login:</span> Create an
            account or log in to access the platform.
          </li>
          <li>
            <span className="font-semibold">Explore Projects:</span> The
            homepage displays random recommended projects for you.
          </li>
          <li>
            <span className="font-semibold">Complete Your Profile:</span>{" "}
            Navigate to the profile page to add details about your skills for
            better recommendations.
          </li>
          <li>
            <span className="font-semibold">Bookmark Projects:</span> Save
            interesting projects for later and manage your bookmarked list.
          </li>
          <li>
            <span className="font-semibold">Learn New Skills:</span> Click on a
            skill to explore courses recommended by us to improve your
            knowledge.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default About;
