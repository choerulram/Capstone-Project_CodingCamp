import React from "react";

const AnalysisResult = ({ nutritionData, currentTime }) => {
  return (
    <div className="lg:w-1/2 w-full animate-slide-up px-4">
      <div className="bg-white p-4 lg:p-6 rounded-xl shadow-md border border-gray-100">
        {/* Header dengan tanggal dan waktu yang diperbarui */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 lg:mb-6 pb-4 border-b border-gray-100 gap-4">
          <h2 className="text-xl lg:text-2xl font-bold text-main">
            Hasil Analisis Nutrisi
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
            <span className="px-4 py-2 bg-highlight text-main rounded-lg text-sm font-medium flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              {currentTime.toLocaleDateString("id-ID", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="space-y-8">
          {/* Kandungan Gizi */}
          <div className="bg-gray-50 p-4 lg:p-6 rounded-xl border border-gray-100">
            <h3 className="text-lg font-semibold mb-4 text-main flex items-center">
              <span className="bg-secondary p-2 rounded-lg mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
              Kandungan Gizi per Sajian
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3">
              {Object.entries(nutritionData.kandungan).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between p-2 lg:p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors border border-gray-100"
                >
                  <span className="text-gray-600">
                    {key
                      .replace("_", " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </span>
                  <span className="font-medium text-main">{value ?? 0}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Perbandingan Kebutuhan Harian */}
          {nutritionData.perbandingan.length > 0 && (
            <div className="bg-gray-50 p-4 lg:p-6 rounded-xl border border-gray-100">
              <h3 className="text-lg font-semibold mb-4 text-main flex items-center">
                <span className="bg-secondary p-2 rounded-lg mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                Perbandingan dengan Kebutuhan Harian
              </h3>

              {/* Peringatan jika ada yang melebihi */}
              {nutritionData.perbandingan.some(
                (row) => row.status === "Melebihi"
              ) && (
                <div className="mb-4 bg-red-50 border border-red-200 p-4 rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-red-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h4 className="text-sm font-semibold text-red-800">
                        Peringatan Nutrisi
                      </h4>
                      <div className="mt-1">
                        <p className="text-sm text-red-700">
                          Beberapa kandungan gizi{" "}
                          <b>melebihi kebutuhan harian yang direkomendasikan</b>
                        </p>
                        <p className="text-xs text-red-600 mt-1">
                          Saran: Pertimbangkan untuk mengurangi konsumsi atau
                          mengimbangi dengan aktivitas fisik yang sesuai
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="overflow-x-auto -mx-4 lg:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden rounded-lg border border-gray-100">
                    <table className="min-w-full divide-y divide-gray-100 bg-white">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Gizi
                          </th>
                          <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Hasil OCR
                          </th>
                          <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kebutuhan
                          </th>
                          <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {nutritionData.perbandingan.map((row, index) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-xs lg:text-sm font-medium text-main">
                              {row.label}
                            </td>
                            <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-xs lg:text-sm text-gray-600">
                              {row.hasil_ocr}
                            </td>
                            <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-xs lg:text-sm text-gray-600">
                              {row.kebutuhan_harian}
                            </td>
                            <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-xs lg:text-sm">
                              <span
                                className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                                  row.status === "Melebihi"
                                    ? "bg-red-50 text-red-700 border border-red-200"
                                    : "bg-green-50 text-green-700 border border-green-200"
                                }`}
                              >
                                {row.status === "Melebihi" ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                )}
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalysisResult;
