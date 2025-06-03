import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const DailySummaryPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-main mb-6">
            Ringkasan Nutrisi Harian
          </h1>
          <div className="space-y-8">
            {/* Ringkasan Total Nutrisi */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h2 className="text-xl font-semibold text-main mb-6 flex items-center">
                <span className="bg-highlight/20 p-2 rounded-lg mr-2">
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </span>
                Total Nutrisi Hari Ini
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-sm text-gray-600 mb-1">Total Kalori</div>
                  <div className="text-2xl font-bold text-main">0 kkal</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-sm text-gray-600 mb-1">
                    Total Protein
                  </div>
                  <div className="text-2xl font-bold text-main">0 g</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-sm text-gray-600 mb-1">
                    Total Karbohidrat
                  </div>
                  <div className="text-2xl font-bold text-main">0 g</div>
                </div>
                <div className="bg-white p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="text-sm text-gray-600 mb-1">Total Lemak</div>
                  <div className="text-2xl font-bold text-main">0 g</div>
                </div>
              </div>
            </div>

            {/* Riwayat Scan Hari Ini */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h2 className="text-xl font-semibold text-main mb-6 flex items-center">
                <span className="bg-highlight/20 p-2 rounded-lg mr-2">
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
                </span>
                Riwayat Scan Hari Ini
              </h2>
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg border border-gray-100">
                  <p className="text-gray-600 text-center py-8">
                    Belum ada data scan untuk hari ini
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Kebutuhan Harian */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <h2 className="text-xl font-semibold text-main mb-6 flex items-center">
                <span className="bg-highlight/20 p-2 rounded-lg mr-2">
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </span>
                Progress Kebutuhan Harian
              </h2>
              <div className="space-y-4">
                {/* Progress Bar Kalori */}
                <div className="bg-white p-4 rounded-lg border border-gray-100">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Kalori</span>
                    <span className="text-sm font-medium text-main">
                      0/2000 kkal
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-highlight h-2.5 rounded-full"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>

                {/* Progress Bar Protein */}
                <div className="bg-white p-4 rounded-lg border border-gray-100">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Protein</span>
                    <span className="text-sm font-medium text-main">
                      0/60 g
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-highlight h-2.5 rounded-full"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>

                {/* Progress Bar Karbohidrat */}
                <div className="bg-white p-4 rounded-lg border border-gray-100">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Karbohidrat</span>
                    <span className="text-sm font-medium text-main">
                      0/300 g
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-highlight h-2.5 rounded-full"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>

                {/* Progress Bar Lemak */}
                <div className="bg-white p-4 rounded-lg border border-gray-100">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-600">Lemak</span>
                    <span className="text-sm font-medium text-main">
                      0/70 g
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-highlight h-2.5 rounded-full"
                      style={{ width: "0%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DailySummaryPage;
