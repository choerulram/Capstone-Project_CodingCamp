import React from "react";
import { useNavigate } from "react-router-dom";

const LoginRequiredModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      {" "}
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity animate-fade-in"
          onClick={onClose}
        ></div>

        {/* Modal Content */}
        <div className="relative transform overflow-hidden rounded-xl sm:rounded-2xl bg-white px-6 sm:px-8 py-8 sm:py-12 text-center shadow-xl transition-all w-[95%] sm:w-full sm:max-w-md animate-scale-in">
          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-16 -right-16 sm:-top-20 sm:-right-20 w-32 h-32 sm:w-40 sm:h-40 bg-highlight/10 rounded-full"></div>
            <div className="absolute -bottom-16 -left-16 sm:-bottom-20 sm:-left-20 w-32 h-32 sm:w-40 sm:h-40 bg-highlight/10 rounded-full"></div>
          </div>{" "}
          {/* Icon */}
          <div className="mx-auto flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-highlight/20 animate-fade-in-down">
            <svg
              className="h-7 w-7 sm:h-8 sm:w-8 text-highlight animate-bounce-slow"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>{" "}
          {/* Content */}
          <div className="mt-5 sm:mt-6">
            <h3
              className="text-xl sm:text-2xl font-bold text-gray-900 animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              Login Diperlukan
            </h3>
            <p
              className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-500 animate-fade-in"
              style={{ animationDelay: "400ms" }}
            >
              Untuk mengakses fitur ini, Anda perlu login terlebih dahulu. Login
              sekarang untuk menikmati semua fitur yang tersedia!
            </p>
          </div>
          {/* Buttons */}
          <div className="mt-6 sm:mt-8 space-y-2 sm:space-y-3">
            <button
              onClick={() => {
                navigate("/login");
                onClose();
              }}
              className="w-full rounded-lg bg-main px-4 py-2 sm:py-2.5 text-center text-sm font-semibold text-white hover:bg-main/90 focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2 transition-all duration-300 hover:scale-105 hover:shadow-lg group animate-fade-in"
              style={{ animationDelay: "600ms" }}
            >
              <span className="inline-flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                Login Sekarang
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1.5 sm:ml-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
            <button
              onClick={onClose}
              className="w-full rounded-lg border border-main px-4 py-2 sm:py-2.5 text-sm font-semibold text-main hover:bg-main/5 focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2 transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: "700ms" }}
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredModal;
