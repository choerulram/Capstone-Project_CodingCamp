import React from "react";

const ComingSoonModal = ({ isOpen, onClose, planName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity animate-fade-in"
          onClick={onClose}
        ></div>

        {/* Modal Content */}
        <div className="relative transform overflow-hidden rounded-2xl bg-white px-8 py-12 text-center shadow-xl transition-all sm:w-full sm:max-w-md animate-scale-in">
          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-highlight/10 rounded-full"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-highlight/10 rounded-full"></div>
          </div>
          {/* Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-highlight/20">
            {" "}
            <svg
              className="h-8 w-8 text-highlight animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>{" "}
          {/* Content */}
          <div className="mt-6">
            <h3 className="text-2xl font-bold text-gray-900">Coming Soon!</h3>{" "}
            <p className="mt-4 text-gray-500">
              Paket <span className="font-bold text-highlight">{planName}</span>{" "}
              sedang dalam pengembangan. Kami sedang mempersiapkan sesuatu yang
              spesial untuk Anda. Nantikan peluncurannya segera!
            </p>
          </div>
          {/* Close Button */}
          <button
            onClick={onClose}
            className="mt-8 w-full rounded-lg border border-main px-4 py-2.5 text-sm font-semibold text-main hover:bg-main/5 focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonModal;
