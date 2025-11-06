
export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  portfolio: string;
}

export interface WorkExperience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  graduationDate: string;
}

export interface UserProfile {
  personalInfo: PersonalInfo;
  summary: string;
  skills: string;
  experience: WorkExperience[];
  education: Education[];
}

export enum ResultType {
  GENERIC_RESUME = 'GENERIC_RESUME',
  CUSTOM_RESUME = 'CUSTOM_RESUME',
  JOB_TITLES = 'JOB_TITLES',
}
