import React, { useState } from "react";
import ScanDetailModal from "./ScanDetailModal";
import { BASE_URL } from "../utils/api";

const ScanHistoryCard = ({ scan }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatNutritionValue = (value, key) => {
    const val = value ? parseFloat(value).toFixed(1) : "0";
    switch (true) {
      case key.includes("energi"):
        return `${val} kkal`;
      case ["protein", "lemak", "karbohidrat", "gula"].some((k) =>
        key.includes(k)
      ):
        return `${val} g`;
      case key.includes("garam") || key.includes("natrium"):
        return `${val} mg`;
      default:
        return val;
    }
  };

  // Urutan nutrisi yang diinginkan
  const nutrientOrder = [
    "energi_kal",
    "protein",
    "lemak_total",
    "karbohidrat",
    "serat",
    "gula",
    "garam",
  ];

  // Filter dan urutkan nutrisi sesuai urutan yang ditentukan
  const orderedNutrients = nutrientOrder
    .filter((key) => scan.kandungan_gizi?.[key] !== undefined)
    .map((key) => ({
      key,
      value: scan.kandungan_gizi[key],
    }));

  // Tambahkan nutrisi lain yang mungkin ada tapi tidak dalam urutan
  const otherNutrients = Object.entries(scan.kandungan_gizi || {})
    .filter(([key]) => !nutrientOrder.includes(key))
    .map(([key, value]) => ({ key, value }));

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div className="p-6">
          {/* Header dengan Gambar dan Info */}
          <div className="flex items-start gap-6 mb-8">
            <div className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 border-2 border-highlight shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-main/20 to-transparent"></div>
              <img
                src={`${BASE_URL}/images/${scan.filename}`}
                alt="Foto Produk"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-4">
                <div className="min-w-0">
                  <h3 className="text-2xl font-bold text-main mb-3 truncate">
                    {scan.filename || "Nama Produk"}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center gap-2">
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
                    {new Date(scan.timestamp).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-5 py-2.5 bg-main hover:bg-main/90 text-light rounded-lg transition-all duration-300 flex items-center gap-2 text-sm font-medium shadow-md hover:shadow-lg group"
                >
                  <span>Detail</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Kandungan Gizi */}
          {scan.kandungan_gizi && (
            <div className="bg-gray-50/70 rounded-xl p-6 shadow-sm border border-gray-100/80 backdrop-blur-sm">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-xl font-bold text-main flex items-center gap-2.5">
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Kandungan Gizi
                </h4>
              </div>

              {/* Semua Nutrisi dalam Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[...orderedNutrients, ...otherNutrients].map(
                  ({ key, value }) => (
                    <div
                      key={key}
                      className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-highlight group"
                    >
                      <div className="text-sm font-medium text-gray-600 mb-2.5 group-hover:text-main">
                        {key
                          .replace(/_/g, " ")
                          .replace(/\b\w/g, (l) => l.toUpperCase())}
                      </div>
                      <div className="text-xl font-bold text-main group-hover:text-highlight transition-colors">
                        {formatNutritionValue(value, key)}
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Warning Badge */}
          {scan.perbandingan &&
            scan.perbandingan.some((item) => item.status === "Melebihi") && (
              <div className="mt-6 flex items-center gap-3 text-sm bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 animate-pulse">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 flex-shrink-0 text-red-600"
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
                <span className="font-medium">
                  Beberapa nutrisi melebihi batas harian
                </span>
              </div>
            )}
        </div>
      </div>

      <ScanDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        scan={scan}
      />
    </>
  );
};

export default ScanHistoryCard;
