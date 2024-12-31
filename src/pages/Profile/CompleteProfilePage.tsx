import React from "react";
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
} from "../../constants/complete-profile"; // Adjust the import path as needed

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

  const toggleSelection = (value: string) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  return (
    <div className="mb-4 w-3/3">
      <label className="text-gray-600">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {selected.length > 0
              ? selected
                  .map((val) => options.find((opt) => opt.value === val)?.label)
                  .join(", ")
              : `Select ${label.toLowerCase()}...`}
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
              </CommandGroup>
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

  return (
    <div className="p-4 sm:p-8 md:p-10">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4 md:mb-6">
          Complete Your Profile
        </h2>
        <p className="text-gray-600 mb-4 md:mb-6">
          Fill your details to have a good experience.
        </p>

        <form>
          {/* Personal Details Section */}
          <div className="my-6 md:my-10">
            <h3 className="text-xl md:text-2xl font-medium text-gray-800 mb-4">
              Personal Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-gray-600">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="branch" className="text-gray-600">
                  Branch
                </label>
                <Input
                  id="branch"
                  placeholder="Enter your branch"
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="academic-year" className="text-gray-600">
                  Academic Year
                </label>
                <Input
                  id="academic-year"
                  placeholder="Enter your academic year (e.g., 1st, 2nd, 3rd, 4th)"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Technical Details Section */}
          <div className="my-6 md:my-10">
            <h3 className="text-xl md:text-2xl font-medium text-gray-800 mb-4">
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
            </div>

            <div className="mt-4">
              <label htmlFor="databases-cloud" className="text-gray-600">
                Databases/Cloud Experience
              </label>
              <Textarea
                id="databases-cloud"
                placeholder="Describe your experience with databases or cloud computing..."
                className="w-full"
              />
            </div>
          </div>

          <div className="my-6">
            <label htmlFor="projects-opensource" className="text-gray-600">
              Projects/Open-Source Contributions
            </label>
            <Textarea
              id="projects-opensource"
              placeholder="Describe your projects or open-source contributions in detail..."
              className="w-full"
            />
          </div>
          <div className="my-6">
            <label htmlFor="achievements-awards" className="text-gray-600">
              Achievements and Awards
            </label>
            <Textarea
              id="achievements-awards"
              placeholder="Detail your significant achievements or awards that showcase your skills..."
              className="w-full"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 text-white hover:bg-blue-600"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompleteProfilePage;
