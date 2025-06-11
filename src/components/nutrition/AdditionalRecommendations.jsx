import React from "react";

const AdditionalRecommendations = () => {
  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in"
      style={{ animationDelay: "700ms" }}
    >
      <div className="bg-gradient-to-r from-main/80 via-main/70 to-main/60 text-white p-4">
        <h2 className="text-xl font-semibold">Rekomendasi Tambahan</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div
            className="flex items-start space-x-4 p-4 bg-teal-50 hover:bg-main/5 transition-all duration-300 rounded-lg hover:shadow-md animate-fade-in-left transform hover:scale-102"
            style={{ animationDelay: "800ms" }}
          >
            <svg
              className="h-6 w-6 text-main mt-1 transition-transform duration-300 hover:scale-110"
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
            <div className="transition-all duration-300">
              <h4 className="font-semibold text-main hover:scale-105 transition-transform duration-300">
                Jadwal Makan
              </h4>
              <p className="text-gray-600 mt-1">
                Atur waktu makan dengan interval 4-5 jam untuk metabolisme
                optimal
              </p>
            </div>
          </div>
          <div
            className="flex items-start space-x-4 p-4 bg-teal-50 hover:bg-main/5 transition-all duration-300 rounded-lg hover:shadow-md animate-fade-in-right transform hover:scale-102"
            style={{ animationDelay: "900ms" }}
          >
            <svg
              className="h-6 w-6 text-main mt-1 transition-transform duration-300 hover:scale-110"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <div className="transition-all duration-300">
              <h4 className="font-semibold text-main hover:scale-105 transition-transform duration-300">
                Variasi Menu
              </h4>
              <p className="text-gray-600 mt-1">
                Konsumsi beragam jenis makanan untuk memenuhi kebutuhan nutrisi
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalRecommendations;
