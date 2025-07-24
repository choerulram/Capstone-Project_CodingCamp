import React from "react";

const CalculationInfoCard = () => {
  return (
    <div className="bg-white rounded-lg md:rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl animate-fade-in">
      <div className="bg-gradient-to-r from-main to-main/90 text-white p-3 md:p-4">
        <h2 className="text-lg md:text-xl font-semibold transition-all duration-300">
          Informasi Perhitungan Nutrisi
        </h2>
      </div>
      <div className="p-3 md:p-6">
        <div className="text-gray-600 text-base md:text-lg space-y-6">
          {/* Perhitungan Harian */}
          <div>
            <div className="font-semibold text-main mt-2 mb-3 transition-all duration-300 hover:text-main/80 hover:translate-x-1">
              Nilai Per Hari:
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
                  Berdasarkan data profil pengguna (usia, jenis kelamin, tinggi
                  dan berat badan)
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
                  Tingkat aktivitas fisik dan kebutuhan energi harian
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
                  Menyesuaikan dengan kondisi khusus (kehamilan/menyusui)
                </span>
              </li>
            </ul>
          </div>

          {/* Perhitungan Mingguan */}
          <div>
            <div className="font-semibold text-main mt-4 mb-3 transition-all duration-300 hover:text-main/80 hover:translate-x-1">
              Nilai Per Minggu:
            </div>
            <ul className="space-y-2 md:space-y-3">
              <li
                className="flex items-center space-x-3 animate-fade-in-left group"
                style={{ animationDelay: "500ms" }}
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
                  Total kebutuhan nutrisi selama 7 hari berdasarkan profil
                </span>
              </li>
              <li
                className="flex items-center space-x-3 animate-fade-in-left group"
                style={{ animationDelay: "600ms" }}
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
                  Akumulasi aktivitas fisik selama seminggu
                </span>
              </li>
              <li
                className="flex items-center space-x-3 animate-fade-in-left group"
                style={{ animationDelay: "700ms" }}
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
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <span className="transition-all duration-300 group-hover:text-main group-hover:translate-x-1">
                  Perhitungan: Kebutuhan Harian × 7 hari
                </span>
              </li>
            </ul>
          </div>

          {/* Perhitungan Bulanan */}
          <div>
            <div className="font-semibold text-main mt-4 mb-3 transition-all duration-300 hover:text-main/80 hover:translate-x-1">
              Nilai Per Bulan:
            </div>
            <ul className="space-y-2 md:space-y-3">
              <li
                className="flex items-center space-x-3 animate-fade-in-left group"
                style={{ animationDelay: "800ms" }}
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
                  Total kebutuhan nutrisi selama 30 hari berdasarkan profil
                </span>
              </li>
              <li
                className="flex items-center space-x-3 animate-fade-in-left group"
                style={{ animationDelay: "900ms" }}
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
                  Akumulasi aktivitas fisik selama sebulan
                </span>
              </li>
              <li
                className="flex items-center space-x-3 animate-fade-in-left group"
                style={{ animationDelay: "1000ms" }}
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
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="transition-all duration-300 group-hover:text-main group-hover:translate-x-1">
                  Perhitungan: Kebutuhan Harian × 30 hari
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculationInfoCard;
