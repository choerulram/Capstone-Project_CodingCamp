import React from "react";

const CalculationInfoCard = () => {
  return (
    <div className="bg-white rounded-lg md:rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl animate-fade-in">
      <div className="bg-gradient-to-r from-main to-main/90 text-white p-3 md:p-4">
        <h2 className="text-lg md:text-xl font-semibold transition-all duration-300">
          Informasi Perhitungan
        </h2>
      </div>
      <div className="p-3 md:p-6">
        <div className="text-gray-600 text-base md:text-lg space-y-4">
          <div className="font-semibold text-main mt-2 mb-1 transition-all duration-300 hover:text-main/80 hover:translate-x-1">
            Faktor Perhitungan Kebutuhan Harian:
          </div>
          <ul className="space-y-2 md:space-y-3">
            <li
              className="flex items-center space-x-2 md:space-x-3 animate-fade-in-left group"
              style={{ animationDelay: "200ms" }}
            >
              <svg
                className="h-6 w-6 text-main transition-transform duration-300 group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="transition-all duration-300 group-hover:text-main group-hover:translate-x-1">
                Profil dasar (usia, gender, tinggi badan, dan berat badan)
              </span>
            </li>
            <li
              className="flex items-center space-x-3 animate-fade-in-left group"
              style={{ animationDelay: "300ms" }}
            >
              <svg
                className="h-6 w-6 text-main transition-transform duration-300 group-hover:scale-110"
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
              <span className="transition-all duration-300 group-hover:text-main group-hover:translate-x-1">
                Aktivitas fisik dan kebutuhan energi harian
              </span>
            </li>
            <li
              className="flex items-center space-x-3 animate-fade-in-left group"
              style={{ animationDelay: "400ms" }}
            >
              <svg
                className="h-6 w-6 text-main transition-transform duration-300 group-hover:scale-110"
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
              <span className="transition-all duration-300 group-hover:text-main group-hover:translate-x-1">
                Kondisi khusus (kehamilan/menyusui) jika ada
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalculationInfoCard;
