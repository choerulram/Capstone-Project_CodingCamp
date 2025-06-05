import React from "react";

const PremiumOverlay = ({ isVisible, message }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-[2px] rounded-lg z-10">
      <div className="text-center p-4">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 shadow-lg">
          <svg
            className="h-8 w-8 text-yellow-400 mx-auto mb-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <p className="text-white font-medium">
            {message || "Fitur ini hanya tersedia untuk pengguna Premium"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumOverlay;
