import React from "react";

const SignOutConfirmation = ({ isVisible, onConfirm, onCancel }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg max-w-sm w-[90%] sm:w-full mx-4 animate-scale-in">
        <h2 className="text-lg sm:text-xl font-bold text-main mb-3 sm:mb-4 animate-fade-in-down">
          Konfirmasi Sign Out
        </h2>
        <p
          className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          Apakah Anda yakin ingin keluar dari aplikasi?
        </p>
        <div className="flex space-x-2 sm:space-x-3">
          <button
            onClick={onConfirm}
            className="flex-1 bg-main text-white py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-sm sm:text-base hover:bg-teal-700 transition-all duration-300 hover:scale-105 hover:shadow-lg group animate-fade-in"
            style={{ animationDelay: "200ms" }}
          >
            <span className="inline-flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
              Ya, Sign Out
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 sm:h-4 sm:w-4 ml-1.5 sm:ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </span>
          </button>
          <button
            onClick={onCancel}
            className="flex-1 border border-main text-main py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-sm sm:text-base hover:bg-gray-50 transition-all duration-300 hover:scale-105 animate-fade-in"
            style={{ animationDelay: "300ms" }}
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignOutConfirmation;
