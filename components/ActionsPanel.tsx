import React from 'react';
// Fix: Changed type-only import of 'ResultType' to a value import as it's used as a value.
import { ResultType } from '../types';

interface ActionsPanelProps {
  onGenerate: (type: ResultType) => void;
  jobDescription: string;
  setJobDescription: (value: string) => void;
  isLoading: boolean;
}

const ActionsPanel: React.FC<ActionsPanelProps> = ({ onGenerate, jobDescription, setJobDescription, isLoading }) => {
  const buttonClass = "w-full px-4 py-3 font-semibold text-white rounded-lg shadow-sm transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed";

  return (
    <div className="p-6 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">1. Generate Generic Resume</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Create a general-purpose resume based on your profile.</p>
        <button
          onClick={() => onGenerate(ResultType.GENERIC_RESUME)}
          disabled={isLoading}
          className={`${buttonClass} bg-primary-600 hover:bg-primary-700`}
        >
          Generate Generic Resume
        </button>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700"></div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">2. Generate Custom Resume</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Paste a job description below to create a resume tailored for that specific role.</p>
        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description here..."
          className="w-full h-40 p-3 border border-gray-300 rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 mb-3"
          disabled={isLoading}
        />
        <button
          onClick={() => onGenerate(ResultType.CUSTOM_RESUME)}
          disabled={isLoading || !jobDescription}
          className={`${buttonClass} bg-green-600 hover:bg-green-700 disabled:bg-gray-400`}
        >
          Generate Custom Resume
        </button>
      </div>

      <div className="border-t border-gray-200 dark:border-gray-700"></div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">3. Recommend Job Titles</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">Get AI-powered suggestions for job titles that match your skills and experience.</p>
        <button
          onClick={() => onGenerate(ResultType.JOB_TITLES)}
          disabled={isLoading}
          className={`${buttonClass} bg-indigo-600 hover:bg-indigo-700`}
        >
          Recommend Job Titles
        </button>
      </div>
    </div>
  );
};

export default ActionsPanel;