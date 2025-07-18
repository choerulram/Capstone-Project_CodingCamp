import React from "react";

const Alert = ({ isOpen, message, type = "success", onClose }) => {
  if (!isOpen) return null;

  const bgColor = type === "success" ? "bg-green-50" : "bg-red-50";
  const textColor = type === "success" ? "text-main" : "text-red-700";
  const borderColor =
    type === "success" ? "border-green-100" : "border-red-100";
  const iconColor = type === "success" ? "text-highlight" : "text-red-400";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div
        className={`${bgColor} p-6 rounded-xl shadow-lg max-w-sm w-full mx-4 border ${borderColor}`}
      >
        <div className="flex items-start mb-4">
          <div className="flex-shrink-0">
            {type === "success" ? (
              <svg
                className={`h-6 w-6 ${iconColor}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className={`h-6 w-6 ${iconColor}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </div>
          <div className="ml-3 w-0 flex-1">
            <h3 className={`text-sm font-medium ${textColor}`}>
              {type === "success" ? "Berhasil!" : "Kesalahan"}
            </h3>
            <div className={`mt-2 text-sm ${textColor}`}>{message}</div>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={onClose}
              className={`inline-flex ${textColor} hover:${textColor} focus:outline-none`}
            >
              <span className="sr-only">Tutup</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={onClose}
            className="w-full inline-flex justify-center rounded-xl border border-transparent px-4 py-2 bg-main text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main transition-colors duration-300"
          >
            Mengerti
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alert;
