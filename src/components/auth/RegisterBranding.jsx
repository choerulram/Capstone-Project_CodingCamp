import React from "react";

const RegisterBranding = () => {
  return (
    <div className="w-full md:w-[35%] bg-main p-4 sm:p-8 md:p-12 md:rounded-l-[15px] flex flex-col justify-center relative overflow-hidden min-h-[220px] sm:min-h-[300px] md:min-h-0 shadow-[-15px_0_15px_-15px_rgba(0,0,0,0.4)] md:shadow-[8px_0_25px_-5px_rgba(0,0,0,0.4)]">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl sm:text-5xl md:text-7xl text-white mb-4 sm:mb-8 font-bold tracking-tight leading-tight animate-fade-in">
          Join the
          <span className="text-highlight block mt-1 sm:mt-2">Journey</span>
        </h1>
        <div className="overflow-hidden mb-4 sm:mb-10">
          <div className="flex items-center mb-3 sm:mb-6 animate-slide-up opacity-0 [animation-delay:0.3s] [animation-fill-mode:forwards]">
            <div className="bg-highlight/20 p-1.5 sm:p-3 rounded-full mr-2 sm:mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-6 sm:w-6 text-highlight"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>{" "}
            <p className="text-white text-sm sm:text-xl font-medium">
              Akses Informasi Gizi Instan
            </p>
          </div>
          <div className="flex items-center mb-3 sm:mb-6 animate-slide-up opacity-0 [animation-delay:0.5s] [animation-fill-mode:forwards]">
            <div className="bg-highlight/20 p-1.5 sm:p-3 rounded-full mr-2 sm:mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-6 sm:w-6 text-highlight"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>{" "}
            <p className="text-white text-sm sm:text-xl font-medium">
              Rekomendasi Makanan Sehat
            </p>
          </div>
          <div className="flex items-center animate-slide-up opacity-0 [animation-delay:0.7s] [animation-fill-mode:forwards]">
            <div className="bg-highlight/20 p-1.5 sm:p-3 rounded-full mr-2 sm:mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-6 sm:w-6 text-highlight"
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
            <p className="text-white text-sm sm:text-xl font-medium">
              Analisis Gizi Real-time
            </p>
          </div>
        </div>
        <div className="mt-4 sm:mt-8 bg-highlight/20 px-3 sm:px-8 py-2.5 sm:py-4 rounded-full inline-block animate-bounce-slow">
          <p className="text-white text-xs sm:text-base font-medium tracking-wide">
            Mulai Perjalanan Sehatmu Hari Ini
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterBranding;
