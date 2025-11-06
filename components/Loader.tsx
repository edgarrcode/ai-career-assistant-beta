
import React from 'react';

const Loader: React.FC<{ text: string }> = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-200">{text}</p>
      <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Please wait, this may take a moment...</p>
    </div>
  );
};

export default Loader;
