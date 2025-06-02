import React from "react";
import { BASE_URL } from "../utils/api";

const ScanDetailModal = ({ isOpen, onClose, scan }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const formatNutritionValue = (value, key) => {
    const val = value || "0";
    // Tambahkan satuan yang sesuai
    if (key.includes("energi")) return `${val} kkal`;
    if (
      key.includes("protein") ||
      key.includes("lemak") ||
      key.includes("karbohidrat")
    )
      return `${val} g`;
    if (key.includes("gula")) return `${val} g`;
    if (key.includes("garam") || key.includes("natrium")) return `${val} mg`;
    return val;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full overflow-hidden bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-main">Detail Pemindaian</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-main transition-colors p-2 hover:bg-gray-100 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Product Image */}
            <div className="md:col-span-1">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 shadow-lg border border-gray-100/80 ring-1 ring-gray-100/50">
                <img
                  src={`${BASE_URL}/images/${scan.filename}`}
                  alt="Foto Produk"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-5">
                <h3 className="text-lg font-bold text-main mb-2">
                  {scan?.filename || "Nama Produk"}
                </h3>
                <p className="text-gray-500 text-sm flex items-center gap-2">
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  Dipindai pada:{" "}
                  {new Date(scan?.timestamp).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            {/* Nutrition Details */}
            <div className="md:col-span-2 space-y-8">
              {/* Kandungan Gizi */}
              <div className="bg-gray-50/70 backdrop-blur-sm rounded-xl p-6 border border-gray-100/80 shadow-sm hover:shadow-md transition-all duration-300">
                <h3 className="text-lg font-bold text-main mb-5 flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-highlight"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Kandungan Gizi
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {scan?.kandungan_gizi &&
                    Object.entries(scan.kandungan_gizi).map(([key, value]) => (
                      <div
                        key={key}
                        className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-highlight group"
                      >
                        <div className="text-sm font-medium text-gray-600 mb-2 group-hover:text-main">
                          {key
                            .replace(/_/g, " ")
                            .replace(/\b\w/g, (l) => l.toUpperCase())}
                        </div>
                        <div className="text-xl font-bold text-main group-hover:text-highlight transition-colors">
                          {formatNutritionValue(value, key)}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Perbandingan dengan Kebutuhan Harian */}
              {scan?.perbandingan && scan.perbandingan.length > 0 && (
                <div className="bg-gray-50/70 backdrop-blur-sm rounded-xl p-6 border border-gray-100/80 shadow-sm hover:shadow-md transition-all duration-300">
                  <h3 className="text-lg font-bold text-main mb-5 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-highlight"
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
                    Perbandingan dengan Kebutuhan Harian
                  </h3>
                  <div className="overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-sm">
                    <table className="min-w-full divide-y divide-gray-200/80">
                      <thead className="bg-gray-50/50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Nutrisi
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Nilai
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Kebutuhan
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200/80">
                        {scan.perbandingan.map((item, index) => (
                          <tr
                            key={index}
                            className={`${
                              index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                            } hover:bg-gray-50/80 transition-colors`}
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-main">
                              {item.label}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {item.hasil_ocr}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {item.kebutuhan_harian}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                  item.status === "Melebihi"
                                    ? "bg-red-100 text-red-700 ring-1 ring-red-600/10"
                                    : "bg-green-100 text-green-700 ring-1 ring-green-600/10"
                                }`}
                              >
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Catatan & Rekomendasi */}
              {scan?.perbandingan &&
                scan.perbandingan.some(
                  (item) => item.status === "Melebihi"
                ) && (
                  <div className="bg-red-50/80 backdrop-blur-sm rounded-xl p-6 border border-red-100/80 ring-1 ring-red-100">
                    <h3 className="text-lg font-bold text-red-800 mb-3 flex items-center gap-2">
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
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      Catatan Penting
                    </h3>
                    <p className="text-red-700 text-sm">
                      Beberapa kandungan gizi dalam produk ini melebihi
                      kebutuhan harian yang direkomendasikan. Pertimbangkan
                      untuk:
                    </p>
                    <ul className="list-disc list-inside text-sm text-red-700 mt-2 space-y-1">
                      <li>Membagi porsi makan menjadi beberapa bagian</li>
                      <li>
                        Mengimbangi dengan makanan lain yang lebih rendah
                        kandungan gizinya
                      </li>
                      <li>
                        Melakukan aktivitas fisik untuk mengimbangi asupan
                        kalori
                      </li>
                    </ul>
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-main text-white rounded-xl hover:bg-main/90 transition-all duration-300 font-medium shadow-sm hover:shadow-md active:scale-[0.98]"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanDetailModal;
