import React from 'react';
// Fix: Changed type-only import of 'ResultType' to a value import as it's used as a value.
import { ResultType } from '../types';
import Loader from './Loader';

interface ResultsDisplayProps {
  activeResultType: ResultType | null;
  genericResume: string;
  customResume: string;
  jobTitles: string[];
  isLoading: boolean;
  error: string | null;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  activeResultType,
  genericResume,
  customResume,
  jobTitles,
  isLoading,
  error,
}) => {
  if (isLoading) {
    let loadingText = 'Generating...';
    if (activeResultType === 'GENERIC_RESUME') loadingText = 'Crafting your generic resume...';
    if (activeResultType === 'CUSTOM_RESUME') loadingText = 'Tailoring your custom resume...';
    if (activeResultType === 'JOB_TITLES') loadingText = 'Finding suitable job titles...';
    return <div className="p-6"><Loader text={loadingText} /></div>;
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-500 bg-red-100 dark:bg-red-900/20 border border-red-500 rounded-lg">
        <h3 className="font-bold text-lg">An Error Occurred</h3>
        <p>{error}</p>
      </div>
    );
  }
  
  const renderContent = () => {
    switch (activeResultType) {
      case ResultType.GENERIC_RESUME:
        return (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Generic Resume</h3>
            <pre className="whitespace-pre-wrap font-sans text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">{genericResume}</pre>
          </div>
        );
      case ResultType.CUSTOM_RESUME:
        return (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Custom Resume</h3>
            <pre className="whitespace-pre-wrap font-sans text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 p-4 rounded-md">{customResume}</pre>
          </div>
        );
      case ResultType.JOB_TITLES:
        return (
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Recommended Job Titles</h3>
            <ul className="list-disc list-inside space-y-2">
              {jobTitles.map((title, index) => (
                <li key={index} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-md text-gray-700 dark:text-gray-300">{title}</li>
              ))}
            </ul>
          </div>
        );
      default:
        return (
          <div className="text-center p-10">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">Welcome to your AI Career Assistant</h3>
            <p className="mt-2 text-gray-500 dark:text-gray-400">Complete your profile on the left and select an action to get started.</p>
          </div>
        );
    }
  };
  
  return (
    <div className="p-6 bg-white dark:bg-gray-800/50 rounded-lg shadow-md min-h-[300px]">
      {renderContent()}
    </div>
  );
};

export default ResultsDisplay;