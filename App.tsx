
import React, { useState } from 'react';
import UserInputForm from './components/UserInputForm';
import ActionsPanel from './components/ActionsPanel';
import ResultsDisplay from './components/ResultsDisplay';
import type { UserProfile } from './types';
import { ResultType } from './types';
import {
  generateGenericResume,
  generateCustomResume,
  recommendJobTitles,
} from './services/geminiService';

const App: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile>({
    personalInfo: { fullName: '', email: '', phone: '', linkedin: '', portfolio: '' },
    summary: '',
    skills: '',
    experience: [],
    education: [],
  });
  const [jobDescription, setJobDescription] = useState('');
  const [genericResume, setGenericResume] = useState('');
  const [customResume, setCustomResume] = useState('');
  const [jobTitles, setJobTitles] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeResultType, setActiveResultType] = useState<ResultType | null>(null);

  const handleGenerate = async (type: ResultType) => {
    setIsLoading(true);
    setError(null);
    setActiveResultType(type);

    try {
      if (type === ResultType.GENERIC_RESUME) {
        const result = await generateGenericResume(profile);
        setGenericResume(result);
      } else if (type === ResultType.CUSTOM_RESUME) {
        if (!jobDescription.trim()) {
            throw new Error("Job description cannot be empty.");
        }
        const result = await generateCustomResume(profile, jobDescription);
        setCustomResume(result);
      } else if (type === ResultType.JOB_TITLES) {
        const result = await recommendJobTitles(profile);
        setJobTitles(result);
      }
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-3xl font-bold text-primary-600 dark:text-primary-400">AI Career Assistant</h1>
          <p className="text-gray-600 dark:text-gray-400">Your personal guide to a better resume and career path.</p>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-t-lg">Your Professional Profile</h2>
            <UserInputForm profile={profile} setProfile={setProfile} />
          </div>
          <div className="space-y-8">
            <ActionsPanel
              onGenerate={handleGenerate}
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              isLoading={isLoading}
            />
            <ResultsDisplay
              activeResultType={activeResultType}
              genericResume={genericResume}
              customResume={customResume}
              jobTitles={jobTitles}
              isLoading={isLoading}
              error={error}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
