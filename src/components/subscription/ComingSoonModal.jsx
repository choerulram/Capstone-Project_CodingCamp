import React from "react";

const ComingSoonModal = ({ isOpen, onClose, planName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-3 md:p-4">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity animate-fade-in"
          onClick={onClose}
        ></div>

        {/* Modal Content */}
        <div className="relative transform overflow-hidden rounded-xl md:rounded-2xl bg-white px-4 md:px-8 py-8 md:py-12 text-center shadow-xl transition-all w-full max-w-[320px] md:max-w-md animate-scale-in">
          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-16 md:-top-20 -right-16 md:-right-20 w-32 md:w-40 h-32 md:h-40 bg-highlight/10 rounded-full"></div>
            <div className="absolute -bottom-16 md:-bottom-20 -left-16 md:-left-20 w-32 md:w-40 h-32 md:h-40 bg-highlight/10 rounded-full"></div>
          </div>

          {/* Icon */}
          <div className="mx-auto flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full bg-highlight/20">
            <svg
              className="h-6 w-6 md:h-8 md:w-8 text-highlight animate-pulse"
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
          </div>

          {/* Content */}
          <div className="mt-4 md:mt-6">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
              Segera Hadir!
            </h3>
            <p className="mt-3 md:mt-4 text-sm md:text-base text-gray-500">
              Paket <span className="font-bold text-highlight">{planName}</span>{" "}
              sedang dalam pengembangan. Kami sedang mempersiapkan sesuatu yang
              spesial untuk Anda. Nantikan peluncurannya dalam waktu dekat!
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="mt-6 md:mt-8 w-full rounded-lg border border-main px-4 py-2 md:py-2.5 text-xs md:text-sm font-semibold text-main hover:bg-main/5 focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonModal;
