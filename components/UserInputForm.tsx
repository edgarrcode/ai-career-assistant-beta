
import React, { useState } from 'react';
import type { UserProfile, WorkExperience, Education } from '../types';
import { PlusIcon } from './icons/PlusIcon';
import { TrashIcon } from './icons/TrashIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';

interface UserInputFormProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

const SectionWrapper: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 font-semibold text-lg text-gray-800 dark:text-gray-100"
      >
        {title}
        <ChevronDownIcon className={`w-6 h-6 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="p-4 border-t border-gray-200 dark:border-gray-700">{children}</div>}
    </div>
  );
};


const UserInputForm: React.FC<UserInputFormProps> = ({ profile, setProfile }) => {
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, personalInfo: { ...prev.personalInfo, [name]: value } }));
  };

  const handleGenericChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleExperienceChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      experience: prev.experience.map(exp => exp.id === id ? { ...exp, [name]: value } : exp)
    }));
  };
  
  const addExperience = () => {
    setProfile(prev => ({
      ...prev,
      experience: [...prev.experience, { id: Date.now().toString(), jobTitle: '', company: '', location: '', startDate: '', endDate: '', responsibilities: '' }]
    }));
  };

  const removeExperience = (id: string) => {
    setProfile(prev => ({ ...prev, experience: prev.experience.filter(exp => exp.id !== id) }));
  };

  const handleEducationChange = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      education: prev.education.map(edu => edu.id === id ? { ...edu, [name]: value } : edu)
    }));
  };

  const addEducation = () => {
    setProfile(prev => ({
      ...prev,
      education: [...prev.education, { id: Date.now().toString(), degree: '', institution: '', location: '', graduationDate: '' }]
    }));
  };

  const removeEducation = (id: string) => {
    setProfile(prev => ({ ...prev, education: prev.education.filter(edu => edu.id !== id) }));
  };

  const inputClass = "w-full p-2 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500";
  const labelClass = "block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300";

  return (
    <div className="p-4 h-full overflow-y-auto">
      <SectionWrapper title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Full Name</label>
            <input type="text" name="fullName" value={profile.personalInfo.fullName} onChange={handlePersonalInfoChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" name="email" value={profile.personalInfo.email} onChange={handlePersonalInfoChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input type="tel" name="phone" value={profile.personalInfo.phone} onChange={handlePersonalInfoChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>LinkedIn Profile</label>
            <input type="url" name="linkedin" value={profile.personalInfo.linkedin} onChange={handlePersonalInfoChange} className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Portfolio/Website</label>
            <input type="url" name="portfolio" value={profile.personalInfo.portfolio} onChange={handlePersonalInfoChange} className={inputClass} />
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper title="Professional Summary">
        <textarea name="summary" value={profile.summary} onChange={handleGenericChange} className={`${inputClass} h-32`} placeholder="A brief summary of your career..."></textarea>
      </SectionWrapper>

      <SectionWrapper title="Skills">
        <textarea name="skills" value={profile.skills} onChange={handleGenericChange} className={`${inputClass} h-24`} placeholder="List your skills, separated by commas..."></textarea>
      </SectionWrapper>

      <SectionWrapper title="Work Experience">
        {profile.experience.map((exp, index) => (
          <div key={exp.id} className="p-4 mb-4 border border-gray-200 dark:border-gray-700 rounded-lg relative">
            <button onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
              <TrashIcon className="w-5 h-5" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={labelClass}>Job Title</label><input type="text" name="jobTitle" value={exp.jobTitle} onChange={(e) => handleExperienceChange(exp.id, e)} className={inputClass} /></div>
              <div><label className={labelClass}>Company</label><input type="text" name="company" value={exp.company} onChange={(e) => handleExperienceChange(exp.id, e)} className={inputClass} /></div>
              <div><label className={labelClass}>Location</label><input type="text" name="location" value={exp.location} onChange={(e) => handleExperienceChange(exp.id, e)} className={inputClass} /></div>
              <div><label className={labelClass}>Start Date</label><input type="text" name="startDate" value={exp.startDate} onChange={(e) => handleExperienceChange(exp.id, e)} className={inputClass} placeholder="e.g., Jan 2020" /></div>
              <div><label className={labelClass}>End Date</label><input type="text" name="endDate" value={exp.endDate} onChange={(e) => handleExperienceChange(exp.id, e)} className={inputClass} placeholder="e.g., Present" /></div>
              <div className="md:col-span-2"><label className={labelClass}>Responsibilities & Achievements</label><textarea name="responsibilities" value={exp.responsibilities} onChange={(e) => handleExperienceChange(exp.id, e)} className={`${inputClass} h-32`} placeholder="Describe your role and key accomplishments..."></textarea></div>
            </div>
          </div>
        ))}
        <button onClick={addExperience} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700">
          <PlusIcon className="w-5 h-5" /> Add Experience
        </button>
      </SectionWrapper>

      <SectionWrapper title="Education">
        {profile.education.map((edu, index) => (
          <div key={edu.id} className="p-4 mb-4 border border-gray-200 dark:border-gray-700 rounded-lg relative">
            <button onClick={() => removeEducation(edu.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
              <TrashIcon className="w-5 h-5" />
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className={labelClass}>Degree/Certificate</label><input type="text" name="degree" value={edu.degree} onChange={(e) => handleEducationChange(edu.id, e)} className={inputClass} /></div>
              <div><label className={labelClass}>Institution</label><input type="text" name="institution" value={edu.institution} onChange={(e) => handleEducationChange(edu.id, e)} className={inputClass} /></div>
              <div><label className={labelClass}>Location</label><input type="text" name="location" value={edu.location} onChange={(e) => handleEducationChange(edu.id, e)} className={inputClass} /></div>
              <div><label className={labelClass}>Graduation Date</label><input type="text" name="graduationDate" value={edu.graduationDate} onChange={(e) => handleEducationChange(edu.id, e)} className={inputClass} placeholder="e.g., May 2019" /></div>
            </div>
          </div>
        ))}
        <button onClick={addEducation} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700">
          <PlusIcon className="w-5 h-5" /> Add Education
        </button>
      </SectionWrapper>
    </div>
  );
};

export default UserInputForm;
