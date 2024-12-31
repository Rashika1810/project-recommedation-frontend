export interface Option {
    value: string;
    label: string;
  }
  
  export const frameworks: Option[] = [
    { value: "web-development", label: "Web Development" },
    { value: "data-science", label: "Data Science" },
    { value: "ai-ml", label: "AI/ML" },
    { value: "cyber-security", label: "Cyber Security" },
    { value: "other", label: "Other" },
  ];
  
  export const programmingLanguages: Option[] = [
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "c++", label: "C++" },
    { value: "javascript", label: "JavaScript" },
    { value: "ruby", label: "Ruby" },
  ];
  
  export const technologiesFrameworks: Option[] = [
    { value: "react", label: "React" },
    { value: "angular", label: "Angular" },
    { value: "vue", label: "Vue" },
    { value: "django", label: "Django" },
    { value: "flask", label: "Flask" },
  ];
  