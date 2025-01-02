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
  export const interestedDomains :Option[]= [
    { value: "healthcare", label: "Healthcare" },
    { value: "education", label: "Education" },
    { value: "farming", label: "Farming" },
    { value: "technology", label: "Technology" },
    { value: "environment", label: "Environment" },
    { value: "finance", label: "Finance" },
  ];
  export const cloudAndDatabases = [
    { value: "aws", label: "AWS" },
    { value: "azure", label: "Azure" },
    { value: "gcp", label: "Google Cloud Platform" },
    { value: "mongodb", label: "MongoDB" },
    { value: "postgresql", label: "PostgreSQL" },
    { value: "mysql", label: "MySQL" },
    { value: "firebase", label: "Firebase" },
  ];