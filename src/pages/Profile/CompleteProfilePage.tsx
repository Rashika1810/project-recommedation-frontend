import React, { useEffect } from "react";
import { Input } from "../../Components/components/ui/input";
import { Textarea } from "../../Components/components/ui/textarea";
import { Button } from "../../Components/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../Components/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../Components/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "../../Components/lib/utils";
import {
  frameworks,
  programmingLanguages,
  technologiesFrameworks,
  interestedDomains,
  cloudAndDatabases,
} from "../../constants/complete-profile";
import { toast } from "react-hot-toast";

type Option = {
  value: string;
  label: string;
};

type MultiSelectDropdownProps = {
  label: string;
  options: Option[];
  selected: string[];
  setSelected: React.Dispatch<React.SetStateAction<string[]>>;
};

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  label,
  options,
  selected,
  setSelected,
}) => {
  const [open, setOpen] = React.useState(false);
  const [otherValue, setOtherValue] = React.useState("");

  const toggleSelection = (value: string) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };
  const handleOtherInput = () => {
    if (otherValue.trim()) {
      setSelected((prev) => [...prev, otherValue.trim()]);
      setOtherValue("");
    }
  };

  const displaySelected = () => {
    const filteredSelected = selected.filter((val) => val !== "Other");
    if (filteredSelected.length > 3) {
      const displayed = filteredSelected
        .slice(0, 2)
        .map((val) => options.find((opt) => opt.value === val)?.label || val)
        .join(", ");
      return `${displayed}, ...`;
    }
    return filteredSelected
      .map((val) => options.find((opt) => opt.value === val)?.label || val)
      .join(", ");
  };
  return (
    <div className="mb-4 w-3/3 space-y-2">
      <label className="text-gray-600">{label} *</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between outline outline-purple-200 border-purple-200 focus:outline-purple-200 focus:ring-purple-200 placeholder:text-gray-400"
          >
            {selected.length > 0 ? displaySelected() : "Select ..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
            <CommandList>
              <CommandEmpty>No options found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => toggleSelection(option.value)}
                  >
                    {option.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        selected.includes(option.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
                <CommandItem
                  key="other"
                  value="other"
                  onSelect={() => toggleSelection("Other")}
                >
                  Other
                  <Check
                    className={cn(
                      "ml-auto",
                      selected.includes("Other") ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              </CommandGroup>
              {selected.includes("Other") && (
                <div className="p-4">
                  <input
                    type="text"
                    placeholder="Enter custom value"
                    value={otherValue}
                    onChange={(e) => setOtherValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleOtherInput()}
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                  <Button
                    onClick={handleOtherInput}
                    className="mt-2 w-full bg-purple-400 text-white"
                  >
                    Add
                  </Button>
                </div>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

const CompleteProfilePage = () => {
  const [selectedLanguages, setSelectedLanguages] = React.useState<string[]>(
    []
  );
  const [selectedTechnologies, setSelectedTechnologies] = React.useState<
    string[]
  >([]);
  const [selectedFields, setSelectedFields] = React.useState<string[]>([]);
  const [selectedDomains, setSelectedDomains] = React.useState<string[]>([]);
  const [selectedCloudDatabases, setSelectedCloudDatabases] = React.useState<
    string[]
  >([]);
  const [profileImage, setProfileImage] = React.useState<string | null>(
    localStorage.getItem("profileImage")
  );
  const [profileSubmitted, setProfileSubmitted] = React.useState(false);
  const fname = localStorage.getItem("fname");
  const lname = localStorage.getItem("lname");
  const token = localStorage.getItem("Token");
  const username = localStorage.getItem("username");
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result as string;
        localStorage.setItem("profileImage", imageData);
        setProfileImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveProfileImage = () => {
    localStorage.removeItem("profileImage");
    setProfileImage(null);
  };

  const full_name = `${fname} ${lname ? lname : ""}`;

  const fetchUserData = async (username: string, token: string) => {
    try {
      const response = await fetch(
        `https://project-rec-backend.vercel.app/api/user_profile/${username}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data.");
      }
      const data = await response.json();
      if (data.success) {
        setProfileSubmitted(true);
      } else {
        setProfileSubmitted(false);
      }
      const userData = data.data;

      setSelectedLanguages(userData?.programming_language?.split(", ") || []);
      setSelectedTechnologies(userData?.frameworks?.split(", ") || []);
      setSelectedFields(userData?.interest_field?.split(", ") || []);
      setSelectedDomains(userData?.interest_domain?.split(", ") || []);
      setSelectedCloudDatabases(
        userData?.cloud_and_database?.split(", ") || []
      );

      // Safely set input fields
      (document.getElementById("branch") as HTMLInputElement).value =
        userData?.branch || "";
      (document.getElementById("academic-year") as HTMLInputElement).value =
        userData?.academic_year || "";
      (
        document.getElementById("projects-opensource") as HTMLTextAreaElement
      ).value = userData?.projects || "";
      (
        document.getElementById("achievements-awards") as HTMLTextAreaElement
      ).value = userData?.achievements_and_awards || "";
    } catch (error) {
      console.error(error);
      // Reset to empty fields in case of an error
      setSelectedLanguages([]);
      setSelectedTechnologies([]);
      setSelectedFields([]);
      setSelectedDomains([]);
      setSelectedCloudDatabases([]);
    }
  };

  useEffect(() => {
    if (token && username) fetchUserData(username, token);
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || !username) {
      toast.error("Token or username not found. Please log in.");
      return;
    }

    const payload = {
      branch: (document.getElementById("branch") as HTMLInputElement).value,
      academic_year: (
        document.getElementById("academic-year") as HTMLInputElement
      ).value,
      interest_field: selectedFields.join(", "),
      interest_domain: selectedDomains.join(", "),
      programming_language: selectedLanguages.join(", "),
      frameworks: selectedTechnologies.join(", "),
      cloud_and_database: selectedCloudDatabases.join(", "),
      projects: (
        document.getElementById("projects-opensource") as HTMLTextAreaElement
      ).value,
      achievements_and_awards: (
        document.getElementById("achievements-awards") as HTMLTextAreaElement
      ).value,
    };

    try {
      const method = profileSubmitted ? "PATCH" : "POST";
      const response = await fetch(
        `https://project-rec-backend.vercel.app/api/user_profile/${username}/`,
        {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Error submitting profile.");
      }
      const responseBody = await response.json();

      toast.success(responseBody.message);

      await fetchUserData(username, token); // Refresh data after submission
    } catch (error) {
      console.error("Error submitting profile:", error);
      alert("An error occurred while submitting your profile.");
    }
  };

  return (
    <div className="">
      <div className="max-w-full p-4">
        <h2 className="text-3xl font-medium mb-2 md:mb-2  text-gray-700">
          Complete Your Profile
        </h2>
        <p className="text-gray-600 text-sm mb-6 md:mb-8">
          Fill your details to have a good experience.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="my-6 md:my-10 border-b border-purple-200 pb-6">
            <h3 className="text-xl md:text-2xl font-normal text-gray-700 mb-8">
              Personal Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center my-8 justify-center space-x-4">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="profile-upload"
                    />
                    <label
                      htmlFor="profile-upload"
                      className="w-40 h-40 rounded-full border-dashed border-2 border-purple-400 flex justify-center items-center cursor-pointer text-sm text-gray-600 bg-gray-50"
                    >
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Uploaded Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-purple-700 text-sm">
                          Upload Profile
                        </span>
                      )}
                    </label>
                    {profileImage && (
                      <Button
                        type="button"
                        onClick={handleRemoveProfileImage}
                        className="mt-2 w-full text-sm text-red-500 bg-transparent shadow-none hover:bg-transparent"
                      >
                        Remove Profile
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-gray-600">
                    Name
                  </label>
                  <Input
                    id="name"
                    value={full_name}
                    disabled
                    placeholder="Enter your name"
                    className="outline outline-purple-200 border-purple-200 focus:outline-purple-200 focus:ring-purple-200 placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="branch" className="text-gray-600">
                    Branch
                  </label>
                  <Input
                    id="branch"
                    placeholder="Enter your branch"
                    className="outline outline-purple-200 border-purple-200 focus:outline-purple-200 focus:ring-purple-200 placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="academic-year" className="text-gray-600">
                    Academic Year
                  </label>
                  <Input
                    id="academic-year"
                    placeholder="Enter your academic year (e.g., 1st, 2nd, 3rd, 4th)"
                    className="outline outline-purple-200 border-purple-200 focus:outline-purple-200 focus:ring-purple-200 placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Technical Details Section */}
          <div className="my-6 md:my-10 border-b border-purple-200 pb-6">
            <h3 className="text-xl md:text-2xl font-normal text-gray-700 mb-8">
              Technical Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <MultiSelectDropdown
                label="Interested Fields"
                options={frameworks}
                selected={selectedFields}
                setSelected={setSelectedFields}
              />
              <MultiSelectDropdown
                label="Interested Domains"
                options={interestedDomains}
                selected={selectedDomains}
                setSelected={setSelectedDomains}
              />
              <MultiSelectDropdown
                label="Programming Languages"
                options={programmingLanguages}
                selected={selectedLanguages}
                setSelected={setSelectedLanguages}
              />
              <MultiSelectDropdown
                label="Technologies/Frameworks"
                options={technologiesFrameworks}
                selected={selectedTechnologies}
                setSelected={setSelectedTechnologies}
              />
              <MultiSelectDropdown
                label="Cloud and Databases Experience"
                options={cloudAndDatabases}
                selected={selectedCloudDatabases}
                setSelected={setSelectedCloudDatabases}
              />
            </div>
          </div>

          {/* Experience Section */}
          <div className="my-6 md:my-10  pb-6">
            <h3 className="text-xl md:text-2xl font-normal text-gray-700 mb-8">
              Experience
            </h3>
            <div className=" space-y-2 my-6">
              <label htmlFor="projects-opensource" className="text-gray-600">
                Projects/Open-Source Contributions *
              </label>
              <Textarea
                id="projects-opensource"
                placeholder="Describe your projects or open-source contributions in detail..."
                className="outline outline-purple-200 border-purple-200 focus:outline-purple-200 focus:ring-purple-200 placeholder:text-gray-400"
              />
            </div>
            <div className=" space-y-2 my-6">
              <label htmlFor="achievements-awards" className="text-gray-600">
                Achievements and Awards *
              </label>
              <Textarea
                id="achievements-awards"
                placeholder="Detail your significant achievements or awards that showcase your skills..."
                className="outline outline-purple-200 border-purple-200 focus:outline-purple-200 focus:ring-purple-200 placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              type="submit"
              className="w-2/3 bg-purple-400 py-3 text-white font-medium text-base active:bg-purple-500 hover:bg-purple-400"
            >
              {profileSubmitted ? "Update Profile" : "Submit"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfilePage;
