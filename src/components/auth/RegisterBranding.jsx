import React from "react";

const RegisterBranding = () => {
  return (
    <div className="flex-1 bg-main p-12 rounded-l-[15px] flex flex-col justify-center">
      <div className="max-w-xl mx-auto">
        <h1 className="text-7xl text-white mb-8 font-bold tracking-tight leading-tight animate-fade-in">
          Join the
          <span className="text-highlight block mt-2">Journey</span>
        </h1>
        <div className="overflow-hidden mb-10">
          <div className="flex items-center mb-6 animate-slide-up opacity-0 [animation-delay:0.3s] [animation-fill-mode:forwards]">
            <div className="bg-highlight/20 p-3 rounded-full mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-highlight"
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
            </div>
            <p className="text-white text-xl font-medium">
              Akses Informasi Gizi Instan
            </p>
          </div>
          <div className="flex items-center mb-6 animate-slide-up opacity-0 [animation-delay:0.5s] [animation-fill-mode:forwards]">
            <div className="bg-highlight/20 p-3 rounded-full mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-highlight"
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
            </div>
            <p className="text-white text-xl font-medium">
              Rekomendasi Makanan Sehat
            </p>
          </div>
          <div className="flex items-center animate-slide-up opacity-0 [animation-delay:0.7s] [animation-fill-mode:forwards]">
            <div className="bg-highlight/20 p-3 rounded-full mr-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-highlight"
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
            <p className="text-white text-xl font-medium">
              Analisis Gizi Real-time
            </p>
          </div>
        </div>
        <div className="mt-8 bg-highlight/20 px-8 py-4 rounded-full inline-block animate-bounce-slow">
          <p className="text-white text-base font-medium tracking-wide">
            Mulai Perjalanan Sehatmu Hari Ini
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterBranding;
