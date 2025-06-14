import React from "react";

const ErrorMessage = ({ error, isErrorVisible, setIsErrorVisible }) => {
  if (!error || !isErrorVisible) return null;

  return (
    <div className="mx-3 sm:mx-6 mt-3 sm:mt-4 mb-2">
      <div className="relative p-3 sm:p-4 bg-red-50 rounded-lg border border-red-100 shadow-sm">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5 text-red-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <p className="flex-1 text-xs sm:text-sm text-red-700 font-medium leading-snug">
            {error}
          </p>
          <button
            onClick={() => setIsErrorVisible(false)}
            className="p-1 rounded-lg hover:bg-red-100 transition-colors duration-200"
            aria-label="Tutup pesan error"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage;
