import React from "react";

const CalculationInfoCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-main to-main/90 text-white p-4">
        <h2 className="text-xl font-semibold">Informasi Perhitungan</h2>
      </div>
      <div className="p-6">
        <div className="text-gray-600">
          <p className="mb-4">
            Kebutuhan gizi harian ini dihitung berdasarkan data profil Anda
            dengan mempertimbangkan:
          </p>
          <ul className="space-y-3">
            <li className="flex items-center space-x-3">
              <svg
                className="h-6 w-6 text-main"
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
              <span>
                Profil dasar (usia, gender, tinggi badan, dan berat badan)
              </span>
            </li>
            <li className="flex items-center space-x-3">
              <svg
                className="h-6 w-6 text-main"
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
              <span>Aktivitas fisik dan kebutuhan energi harian</span>
            </li>
            <li className="flex items-center space-x-3">
              <svg
                className="h-6 w-6 text-main"
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
              <span>Kondisi khusus (kehamilan/menyusui) jika ada</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CalculationInfoCard;
