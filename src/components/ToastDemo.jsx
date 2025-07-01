import React from 'react';
import { useToast } from './ToastProvider';

const ToastDemo = () => {
  const { showSuccess, showError, showWarning, showInfo } = useToast();

  const handleSuccess = () => {
    showSuccess("Operation completed successfully! 🎉");
  };

  const handleError = () => {
    showError("Something went wrong. Please try again.");
  };

  const handleWarning = () => {
    showWarning("Please check your input and try again.");
  };

  const handleInfo = () => {
    showInfo("Here's some important information for you.");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Toast Notifications Demo</h3>
      <div className="space-x-4">
        <button 
          onClick={handleSuccess}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          Success Toast
        </button>
        
        <button 
          onClick={handleError}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Error Toast
        </button>
        
        <button 
          onClick={handleWarning}
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
        >
          Warning Toast
        </button>
        
        <button 
          onClick={handleInfo}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Info Toast
        </button>
      </div>
    </div>
  );
};

export default ToastDemo;
