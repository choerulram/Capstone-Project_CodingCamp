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
          <div
            className="flex items-start gap-3 bg-main/5 border border-main/10 rounded-lg p-3 animate-fade-in group"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex-shrink-0">
              <svg
                className="h-7 w-7 text-main"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                />
              </svg>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div className="font-semibold text-main mb-2 text-xs sm:text-base md:text-lg transition-all duration-300">
                Penjelasan Perhitungan
              </div>
              <div className="text-gray-700 text-sm md:text-base leading-relaxed">
                <span className="block mb-2 transition-all duration-300 hover:text-main hover:translate-x-1">
                  Tabel di atas ini menampilkan kebutuhan gizi{" "}
                  <span className="font-semibold text-main transition-all duration-300 hover:text-main/80 hover:translate-x-1">
                    per hari
                  </span>
                  ,{" "}
                  <span className="font-semibold text-main transition-all duration-300 hover:text-main/80 hover:translate-x-1">
                    per minggu
                  </span>
                  , dan{" "}
                  <span className="font-semibold text-main transition-all duration-300 hover:text-main/80 hover:translate-x-1">
                    per bulan
                  </span>{" "}
                  Anda.
                </span>
                <ul className="list-disc list-inside pl-4 space-y-2">
                  <li className="transition-all duration-300 hover:text-main hover:translate-x-1">
                    <span className="font-semibold text-main transition-all duration-300 hover:text-main/80 hover:translate-x-1">
                      Per Hari
                    </span>{" "}
                    dihitung berdasarkan profil Anda (lihat poin di bawah).
                  </li>
                  <li className="transition-all duration-300 hover:text-main hover:translate-x-1">
                    <span className="font-semibold text-main transition-all duration-300 hover:text-main/80 hover:translate-x-1">
                      Per Minggu
                    </span>{" "}
                    = hasil perkalian kebutuhan harian x 7 hari.
                  </li>
                  <li className="transition-all duration-300 hover:text-main hover:translate-x-1">
                    <span className="font-semibold text-main transition-all duration-300 hover:text-main/80 hover:translate-x-1">
                      Per Bulan
                    </span>{" "}
                    = hasil perkalian kebutuhan harian x 30 hari.
                  </li>
                </ul>
              </div>
            </div>
          </div>
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
