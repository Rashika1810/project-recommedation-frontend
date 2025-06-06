import { useState } from "react";
import { Input } from "../Components/components/ui/input";
import { Button } from "../Components/components/ui/button";
import { Payload } from "./constant";
import { useNavigate } from "react-router-dom";

export default function ResumeForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [socials, setSocials] = useState([{ platform: "", link: "" }]);
  const [skills, setSkills] = useState([{ title: "", description: "" }]);
  const [experiences, setExperiences] = useState<
    {
      position: string;
      company: string;
      duration: string;
      description: string;
    }[]
  >([]);
  const [projects, setProjects] = useState([
    { title: "", description: "", link: "" },
  ]);
  const [courses, setCourses] = useState([""]);
  const [activities, setActivities] = useState([""]);
  const [achievements, setAchievements] = useState([""]);

  const [currentEducation, setCurrentEducation] = useState({
    degree: "",
    branch: "",
    college: "",
    cgpa: "",
    session: "",
  });

  const [intermediateEducation, setIntermediateEducation] = useState({
    school: "",
    percentage: "",
    sessionYear: "",
  });

  const [matriculationEducation, setMatriculationEducation] = useState({
    school: "",
    percentage: "",
    sessionYear: "",
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Error states
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    contactNumber?: string;
    socials?: { platform?: string; link?: string }[];
    currentEducation?: {
      degree?: string;
      branch?: string;
      college?: string;
      cgpa?: string;
      session?: string;
    };
    intermediateEducation?: {
      school?: string;
      percentage?: string;
      sessionYear?: string;
    };
    matriculationEducation?: {
      school?: string;
      percentage?: string;
      sessionYear?: string;
    };
    skills?: { title?: string; description?: string }[];
    projects?: { title?: string; description?: string; link?: string }[];
    achievements?: string[];
    activities?: string[];
  }>({});

  // Helpers for adding/removing fields (unchanged)
  const addField = <T,>(
    setter: React.Dispatch<React.SetStateAction<T[]>>,
    defaultVal: T
  ) => setter((prev) => [...prev, defaultVal]);

  const removeField = <T,>(
    index: number,
    setter: React.Dispatch<React.SetStateAction<T[]>>
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDownloadAndRedirect = () => {
    if (!resumeUrl) return;

    // Trigger the resume download
    const a = document.createElement("a");
    a.href = resumeUrl;
    a.download = "resume.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();

    // Optional: cleanup
    window.URL.revokeObjectURL(resumeUrl);

    // Close modal and redirect to /question-generate
    setShowModal(false);
    setResumeUrl(null);

    // Navigate to the next page and pass resumeUrl (or a flag)
    navigate("/question-generate");
  };
  // Validation function
  const validate = () => {
    const newErrors: typeof errors = {};

    if (!fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!contactNumber.trim())
      newErrors.contactNumber = "Contact Number is required";

    // Validate socials - each platform and link required
    const socialsErrors = socials.map((s) => {
      const err: { platform?: string; link?: string } = {};
      if (!s.platform.trim()) err.platform = "Platform is required";
      if (!s.link.trim()) err.link = "Link is required";
      return err;
    });
    if (socialsErrors.some((e) => Object.keys(e).length > 0))
      newErrors.socials = socialsErrors;

    // Current education
    const curEduErrors: typeof errors.currentEducation = {};
    if (!currentEducation.degree.trim())
      curEduErrors.degree = "Degree is required";
    if (!currentEducation.branch.trim())
      curEduErrors.branch = "Branch is required";
    if (!currentEducation.college.trim())
      curEduErrors.college = "College is required";
    if (!currentEducation.cgpa.trim()) curEduErrors.cgpa = "CGPA is required";
    if (!currentEducation.session.trim())
      curEduErrors.session = "Session is required";
    if (Object.keys(curEduErrors).length > 0)
      newErrors.currentEducation = curEduErrors;

    // Intermediate education
    const intermEduErrors: typeof errors.intermediateEducation = {};
    if (!intermediateEducation.school.trim())
      intermEduErrors.school = "School is required";
    if (!intermediateEducation.percentage.trim())
      intermEduErrors.percentage = "Percentage is required";
    if (!intermediateEducation.sessionYear.trim())
      intermEduErrors.sessionYear = "Session Year is required";
    if (Object.keys(intermEduErrors).length > 0)
      newErrors.intermediateEducation = intermEduErrors;

    // Matriculation education
    const matricEduErrors: typeof errors.matriculationEducation = {};
    if (!matriculationEducation.school.trim())
      matricEduErrors.school = "School is required";
    if (!matriculationEducation.percentage.trim())
      matricEduErrors.percentage = "Percentage is required";
    if (!matriculationEducation.sessionYear.trim())
      matricEduErrors.sessionYear = "Session Year is required";
    if (Object.keys(matricEduErrors).length > 0)
      newErrors.matriculationEducation = matricEduErrors;

    // Skills - title and description required
    const skillsErrors = skills.map((s) => {
      const err: { title?: string; description?: string } = {};
      if (!s.title.trim()) err.title = "Title is required";
      if (!s.description.trim()) err.description = "Description is required";
      return err;
    });
    if (skillsErrors.some((e) => Object.keys(e).length > 0))
      newErrors.skills = skillsErrors;

    // Projects - title and description required
    const projectsErrors = projects.map((p) => {
      const err: { title?: string; description?: string; link?: string } = {};
      if (!p.title.trim()) err.title = "Project title is required";
      if (!p.description.trim()) err.description = "Description is required";
      if (!p.link.trim()) err.link = "Link is required";
      return err;
    });
    if (projectsErrors.some((e) => Object.keys(e).length > 0))
      newErrors.projects = projectsErrors;

    // Achievements - cannot be empty string
    const achievementsErrors = achievements.map((a) =>
      !a.trim() ? "Achievement is required" : ""
    );
    if (achievementsErrors.some((e) => e !== ""))
      newErrors.achievements = achievementsErrors;

    // Activities - cannot be empty string
    const activitiesErrors = activities.map((a) =>
      !a.trim() ? "Activity is required" : ""
    );
    if (activitiesErrors.some((e) => e !== ""))
      newErrors.activities = activitiesErrors;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle submit with validation
  const handleSubmit = async () => {
    // if (!validate()) {
    //   return; // Don't submit if errors
    // }

    const payload = {
      fullName,
      email,
      contactNumber,
      socials,
      education: {
        current: currentEducation,
        intermediate: intermediateEducation,
        matriculation: matriculationEducation,
      },
      skills,
      experiences,
      projects,
      achievements,
      courses,
      activities,
    };

    try {
      setIsLoading(true);

      const response = await fetch(
        "http://localhost:3001/api/generate-resume/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setResumeUrl(url);
      setShowModal(true);
    } catch (error) {
      console.error("Error submitting resume data:", error);
      alert("Failed to generate resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Helper for clearing error on input change
  const clearError = (
    field: keyof typeof errors,
    index?: number,
    subfield?: string
  ) => {
    setErrors((prev) => {
      if (index !== undefined && subfield) {
        // e.g. socials[index].platform error
        if (!prev[field]) return prev;
        const arr = [...(prev[field] as any)];
        if (!arr[index]) return prev;
        arr[index] = { ...arr[index], [subfield]: undefined };
        // Clean empty objects out
        if (
          Object.values(arr[index]).every((v) => v === undefined) &&
          arr[index] !== undefined
        ) {
          arr[index] = {};
        }
        // If all empty, remove entire field error
        if (
          arr.every((obj: any) =>
            Object.values(obj).every((v) => v === undefined)
          )
        ) {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        }
        return { ...prev, [field]: arr };
      } else {
        // Simple field clear
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      }
    });
  };

  const handleGenerateQuestions = () => {
    navigate("/question-generate");
  };

  // Render helper for error messages
  const renderError = (msg?: string) =>
    msg ? <p className="text-red-600 text-sm mt-1">{msg}</p> : null;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Resume Builder</h1>

      {/* Basic Info */}
      <div className="space-y-2">
        <label>
          Full Name
          <Input
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              if (errors.fullName) clearError("fullName");
            }}
          />
          {renderError(errors.fullName)}
        </label>
        <label>
          Email
          <Input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) clearError("email");
            }}
          />
          {renderError(errors.email)}
        </label>
        <label>
          Contact Number
          <Input
            value={contactNumber}
            onChange={(e) => {
              setContactNumber(e.target.value);
              if (errors.contactNumber) clearError("contactNumber");
            }}
          />
          {renderError(errors.contactNumber)}
        </label>
      </div>

      {/* Social Links */}
      <section className="border-t-2 border-gray-700 py-2">
        <h2 className="text-xl font-semibold mt-6">Social Links</h2>
        {socials.map((s, i) => (
          <div key={i} className="flex items-center gap-4 mb-2">
            <div className="flex-grow">
              <Input
                placeholder="Platform (e.g. LinkedIn)"
                value={s.platform}
                onChange={(e) => {
                  const updated = [...socials];
                  updated[i].platform = e.target.value;
                  setSocials(updated);
                  if (errors.socials?.[i]?.platform)
                    clearError("socials", i, "platform");
                }}
              />
              {errors.socials?.[i]?.platform && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.socials[i].platform}
                </p>
              )}
            </div>
            <div className="flex-grow">
              <Input
                placeholder="Link"
                value={s.link}
                onChange={(e) => {
                  const updated = [...socials];
                  updated[i].link = e.target.value;
                  setSocials(updated);
                  if (errors.socials?.[i]?.link)
                    clearError("socials", i, "link");
                }}
              />
              {errors.socials?.[i]?.link && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.socials[i].link}
                </p>
              )}
            </div>
            <div className="flex gap-3">
              {i === socials.length - 1 && (
                <Button
                  variant={"primary"}
                  onClick={() =>
                    addField(setSocials, { platform: "", link: "" })
                  }
                >
                  Add Links
                </Button>
              )}
              <Button
                variant="destructive"
                disabled={socials.length === 1}
                onClick={() => removeField(i, setSocials)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="border-t-2 border-gray-700 py-2">
        <h2 className="text-xl font-semibold mb-2">Current Education</h2>
        <label>
          Degree
          <Input
            value={currentEducation.degree}
            onChange={(e) => {
              setCurrentEducation((prev) => ({
                ...prev,
                degree: e.target.value,
              }));
              if (errors.currentEducation?.degree)
                clearError("currentEducation");
            }}
          />
          {renderError(errors.currentEducation?.degree)}
        </label>
        <label>
          Branch
          <Input
            value={currentEducation.branch}
            onChange={(e) => {
              setCurrentEducation((prev) => ({
                ...prev,
                branch: e.target.value,
              }));
              if (errors.currentEducation?.branch)
                clearError("currentEducation");
            }}
          />
          {renderError(errors.currentEducation?.branch)}
        </label>
        <label>
          College
          <Input
            value={currentEducation.college}
            onChange={(e) => {
              setCurrentEducation((prev) => ({
                ...prev,
                college: e.target.value,
              }));
              if (errors.currentEducation?.college)
                clearError("currentEducation");
            }}
          />
          {renderError(errors.currentEducation?.college)}
        </label>
        <label>
          CGPA
          <Input
            value={currentEducation.cgpa}
            onChange={(e) => {
              setCurrentEducation((prev) => ({
                ...prev,
                cgpa: e.target.value,
              }));
              if (errors.currentEducation?.cgpa) clearError("currentEducation");
            }}
          />
          {renderError(errors.currentEducation?.cgpa)}
        </label>
        <label>
          Session
          <Input
            value={currentEducation.session}
            onChange={(e) => {
              setCurrentEducation((prev) => ({
                ...prev,
                session: e.target.value,
              }));
              if (errors.currentEducation?.session)
                clearError("currentEducation");
            }}
          />
          {renderError(errors.currentEducation?.session)}
        </label>
      </section>

      {/* Intermediate Education */}
      <section className="space-y-4 mt-6">
        <h2 className="text-xl font-semibold mb-2">Intermediate Education</h2>
        <label>
          School
          <Input
            value={intermediateEducation.school}
            onChange={(e) => {
              setIntermediateEducation((prev) => ({
                ...prev,
                school: e.target.value,
              }));
              if (errors.intermediateEducation?.school)
                clearError("intermediateEducation");
            }}
          />
          {renderError(errors.intermediateEducation?.school)}
        </label>
        <label>
          Percentage
          <Input
            value={intermediateEducation.percentage}
            onChange={(e) => {
              setIntermediateEducation((prev) => ({
                ...prev,
                percentage: e.target.value,
              }));
              if (errors.intermediateEducation?.percentage)
                clearError("intermediateEducation");
            }}
          />
          {renderError(errors.intermediateEducation?.percentage)}
        </label>
        <label>
          Session Year
          <Input
            value={intermediateEducation.sessionYear}
            onChange={(e) => {
              setIntermediateEducation((prev) => ({
                ...prev,
                sessionYear: e.target.value,
              }));
              if (errors.intermediateEducation?.sessionYear)
                clearError("intermediateEducation");
            }}
          />
          {renderError(errors.intermediateEducation?.sessionYear)}
        </label>
      </section>

      {/* Matriculation Education */}
      <section className="space-y-4 mt-6">
        <h2 className="text-xl font-semibold mb-2">Matriculation Education</h2>
        <label>
          School
          <Input
            value={matriculationEducation.school}
            onChange={(e) => {
              setMatriculationEducation((prev) => ({
                ...prev,
                school: e.target.value,
              }));
              if (errors.matriculationEducation?.school)
                clearError("matriculationEducation");
            }}
          />
          {renderError(errors.matriculationEducation?.school)}
        </label>
        <label>
          Percentage
          <Input
            value={matriculationEducation.percentage}
            onChange={(e) => {
              setMatriculationEducation((prev) => ({
                ...prev,
                percentage: e.target.value,
              }));
              if (errors.matriculationEducation?.percentage)
                clearError("matriculationEducation");
            }}
          />
          {renderError(errors.matriculationEducation?.percentage)}
        </label>
        <label>
          Session Year
          <Input
            value={matriculationEducation.sessionYear}
            onChange={(e) => {
              setMatriculationEducation((prev) => ({
                ...prev,
                sessionYear: e.target.value,
              }));
              if (errors.matriculationEducation?.sessionYear)
                clearError("matriculationEducation");
            }}
          />
          {renderError(errors.matriculationEducation?.sessionYear)}
        </label>
      </section>

      {/* Skills */}
      <section className="border-t-2 border-gray-700 py-2">
        <h2 className="text-xl font-semibold">Skills</h2>
        {skills.map((skill, i) => (
          <div key={i} className="flex flex-col gap-2">
            <Input
              placeholder="Skill Title"
              value={skill.title}
              onChange={(e) => {
                const updated = [...skills];
                updated[i].title = e.target.value;
                setSkills(updated);
                if (errors.skills?.[i]?.title) clearError("skills", i, "title");
              }}
            />
            {errors.skills?.[i]?.title && (
              <p className="text-red-600 text-sm mt-1">
                {errors.skills[i].title}
              </p>
            )}
            <Input
              placeholder="Skill Description"
              value={skill.description}
              onChange={(e) => {
                const updated = [...skills];
                updated[i].description = e.target.value;
                setSkills(updated);
                if (errors.skills?.[i]?.description)
                  clearError("skills", i, "description");
              }}
            />
            {errors.skills?.[i]?.description && (
              <p className="text-red-600 text-sm mt-1">
                {errors.skills[i].description}
              </p>
            )}
            <div className="flex gap-2 mt-1">
              {" "}
              {i === skills.length - 1 && (
                <Button
                  variant={"primary"}
                  onClick={() =>
                    addField(setSkills, { title: "", description: "" })
                  }
                >
                  Add Skill
                </Button>
              )}
              <Button
                variant="destructive"
                disabled={skills.length === 1}
                onClick={() => removeField(i, setSkills)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </section>

      {/* Projects */}
      <section className="border-t-2 border-gray-700 py-2">
        <h2 className="text-xl font-medium mb-4">Project Section</h2>
        {projects.map((project, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label>Project Title</label>
              <Input
                placeholder="Project Title"
                value={project.title}
                onChange={(e) => {
                  const updated = [...projects];
                  updated[i].title = e.target.value;
                  setProjects(updated);
                  if (errors.projects?.[i]?.title)
                    clearError("projects", i, "title");
                }}
              />
            </div>
            {errors.projects?.[i]?.title && (
              <p className="text-red-600 text-sm mt-1">
                {errors.projects[i].title}
              </p>
            )}
            <div className="flex flex-col gap-1">
              <label>Project Description </label>
              <Input
                placeholder="Project Description"
                value={project.description}
                onChange={(e) => {
                  const updated = [...projects];
                  updated[i].description = e.target.value;
                  setProjects(updated);
                  if (errors.projects?.[i]?.description)
                    clearError("projects", i, "description");
                }}
              />
            </div>
            {errors.projects?.[i]?.description && (
              <p className="text-red-600 text-sm mt-1">
                {errors.projects[i].description}
              </p>
            )}
            <div className="flex flex-col gap-2">
              <label>Project Link</label>
              <Input
                placeholder="Project Link"
                value={project.link}
                onChange={(e) => {
                  const updated = [...projects];
                  updated[i].link = e.target.value;
                  setProjects(updated);
                  if (errors.projects?.[i]?.link)
                    clearError("projects", i, "link");
                }}
              />
            </div>
            {errors.projects?.[i]?.link && (
              <p className="text-red-600 text-sm mt-1">
                {errors.projects[i].link}
              </p>
            )}
            <div className="flex gap-2 mt-1">
              {" "}
              {i === projects.length - 1 && (
                <Button
                  variant={"primary"}
                  onClick={() =>
                    addField(setProjects, {
                      title: "",
                      description: "",
                      link: "",
                    })
                  }
                >
                  Add Project
                </Button>
              )}
              <Button
                variant="destructive"
                disabled={projects.length === 1}
                onClick={() => removeField(i, setProjects)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </section>

      {/* Work Experience */}
      <section className="border-t-2 border-gray-700 py-2">
        <h2 className="text-xl font-medium mb-4">Work Experience</h2>
        <>
          {experiences.length === 0 ? (
            <Button
              variant={"primary"}
              onClick={() =>
                addField(setExperiences, {
                  position: "",
                  company: "",
                  duration: "",
                  description: "",
                })
              }
            >
              Add Experience
            </Button>
          ) : (
            experiences.map((exp, i) => (
              <div key={i} className="flex flex-col gap-2 mb-4">
                <div className="flex items-center gap-4">
                  <Input
                    className="flex-grow"
                    placeholder="Position"
                    value={exp.position}
                    onChange={(e) => {
                      const updated = [...experiences];
                      updated[i].position = e.target.value;
                      setExperiences(updated);
                    }}
                  />
                  <Input
                    className="flex-grow"
                    placeholder="Company"
                    value={exp.company}
                    onChange={(e) => {
                      const updated = [...experiences];
                      updated[i].company = e.target.value;
                      setExperiences(updated);
                    }}
                  />
                  <Input
                    className="flex-grow"
                    placeholder="Time Span"
                    value={exp.duration}
                    onChange={(e) => {
                      const updated = [...experiences];
                      updated[i].duration = e.target.value;
                      setExperiences(updated);
                    }}
                  />
                  <div className="flex gap-3">
                    {i === experiences.length - 1 && (
                      <Button
                        variant={"primary"}
                        onClick={() =>
                          addField(setExperiences, {
                            position: "",
                            company: "",
                            duration: "",
                            description: "",
                          })
                        }
                      >
                        Add Experience
                      </Button>
                    )}
                    <Button
                      variant="destructive"
                      onClick={() => removeField(i, setExperiences)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
                <Input
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => {
                    const updated = [...experiences];
                    updated[i].description = e.target.value;
                    setExperiences(updated);
                  }}
                />
              </div>
            ))
          )}
        </>
      </section>

      {/* Achievements */}
      <section className="border-t-2 border-gray-700 py-2">
        <h2 className="text-xl font-semibold">Achievements</h2>
        {achievements.map((a, i) => (
          <div key={i} className="mb-3 flex items-center gap-2">
            <Input
              placeholder="Achievement"
              value={a}
              onChange={(e) => {
                const updated = [...achievements];
                updated[i] = e.target.value;
                setAchievements(updated);
                if (errors.achievements?.[i]) clearError("achievements", i);
              }}
            />
            {i === achievements.length - 1 && (
              <Button
                variant={"primary"}
                onClick={() => addField<string>(setAchievements, "")}
              >
                Add Achievement
              </Button>
            )}
            <Button
              variant="destructive"
              disabled={achievements.length === 1}
              onClick={() => removeField(i, setAchievements)}
            >
              Remove
            </Button>
          </div>
        ))}
        {errors.achievements && errors.achievements.some((e) => e) && (
          <p className="text-red-600 text-sm mt-1">
            Please fill all achievements
          </p>
        )}
      </section>
      {/* Courses */}
      <section className="border-t-2 border-gray-700 py-2">
        <h2 className="text-xl font-semibold">Courses</h2>
        {courses.length === 0 ? (
          <Button
            variant={"primary"}
            onClick={() => addField<string>(setCourses, "")}
          >
            Add Course
          </Button>
        ) : (
          courses.map((course, i) => (
            <div key={i} className="flex items-center gap-2">
              <Input
                className="flex-1"
                placeholder="Course (e.g. CS50: Intro to CS)"
                value={course}
                onChange={(e) => {
                  const updated = [...courses];
                  updated[i] = e.target.value;
                  setCourses(updated);
                }}
              />
              {i === courses.length - 1 && (
                <Button
                  variant={"primary"}
                  onClick={() => addField<string>(setCourses, "")}
                >
                  Add Course
                </Button>
              )}
              <Button
                variant="destructive"
                onClick={() => removeField(i, setCourses)}
              >
                Remove
              </Button>
            </div>
          ))
        )}
      </section>

      {/* Activities */}
      <section className="border-t-2 border-gray-700 py-2">
        <h2 className="text-xl font-semibold">Activities</h2>
        {activities.map((a, i) => (
          <div key={i} className="mb-3 flex items-center gap-2">
            <Input
              placeholder="Activity"
              value={a}
              onChange={(e) => {
                const updated = [...activities];
                updated[i] = e.target.value;
                setActivities(updated);
                if (errors.activities?.[i]) clearError("activities", i);
              }}
            />
            {i === activities.length - 1 && (
              <Button
                variant={"primary"}
                onClick={() => addField<string>(setActivities, "")}
              >
                Add Activity
              </Button>
            )}
            <Button
              variant="destructive"
              disabled={activities.length === 1}
              onClick={() => removeField(i, setActivities)}
            >
              Remove
            </Button>
          </div>
        ))}
        {errors.activities && errors.activities.some((e) => e) && (
          <p className="text-red-600 text-sm mt-1">
            Please fill all activities
          </p>
        )}
      </section>
      {/* Submit */}
      <Button className="mt-6 w-full" variant="primary" onClick={handleSubmit}>
        Submit
      </Button>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow text-center">
            <p className="text-lg font-semibold">Generating your resume...</p>
          </div>
        </div>
      )}

      {showModal && resumeUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 max-w-md text-center shadow-lg space-y-4">
            <h2 className="text-xl font-bold">Resume Ready!</h2>
            <p>Your resume has been generated successfully.</p>
            <div className="flex gap-2 justify-center flex-wrap">
              <Button variant="primary" onClick={handleDownloadAndRedirect}>
                Download Resume
              </Button>
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
