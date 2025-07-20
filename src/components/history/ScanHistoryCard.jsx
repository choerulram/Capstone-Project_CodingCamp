import React, { useState } from "react";
import { createPortal } from "react-dom";
import ScanDetailModal from "./ScanDetailModal";
import { BASE_URL } from "../../utils/api";

const calculateTimeAgo = (timestamp) => {
  const now = new Date();
  const then = new Date(timestamp);
  const diffInSeconds = Math.floor((now - then) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} detik yang lalu`;
  }
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} menit yang lalu`;
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} jam yang lalu`;
  }
  const days = Math.floor(diffInSeconds / 86400);
  return `${days} hari yang lalu`;
};

// Fungsi utilitas untuk menghitung status scan
function getScanStatus(scan, dailyNeeds) {
  if (!scan.kandungan_gizi || !dailyNeeds) return { status: "-", details: [] };

  // Normalisasi property agar konsisten
  // dailyNeeds bisa saja nested di kebutuhan_harian
  let needs = dailyNeeds;
  if (needs.kebutuhan_harian) needs = needs.kebutuhan_harian;
  // Mapping property gizi
  const gizi = {
    energi: scan.kandungan_gizi.energi,
    gula: scan.kandungan_gizi.gula,
    garam: scan.kandungan_gizi.garam,
    lemak:
      scan.kandungan_gizi.lemak !== undefined
        ? scan.kandungan_gizi.lemak
        : scan.kandungan_gizi["lemak total"] !== undefined
        ? scan.kandungan_gizi["lemak total"]
        : 0,
    protein: scan.kandungan_gizi.protein,
    serat: scan.kandungan_gizi.serat,
  };
  // Mapping property needs
  const needsMap = {
    energi: needs.energi,
    gula: needs.gula,
    garam: needs.garam,
    lemak:
      needs.lemak !== undefined
        ? needs.lemak
        : needs["lemak total"] !== undefined
        ? needs["lemak total"]
        : 0,
    protein: needs.protein,
    serat: needs.serat,
  };
  const persentase = {
    energi: needsMap.energi ? (gizi.energi / needsMap.energi) * 100 : 0,
    gula: needsMap.gula ? (gizi.gula / needsMap.gula) * 100 : 0,
    garam: needsMap.garam ? (gizi.garam / needsMap.garam) * 100 : 0,
    lemak: needsMap.lemak ? (gizi.lemak / needsMap.lemak) * 100 : 0,
    protein: needsMap.protein ? (gizi.protein / needsMap.protein) * 100 : 0,
    serat: needsMap.serat ? (gizi.serat / needsMap.serat) * 100 : 0,
  };
  // Urutan prioritas status:
  // 1. Berlebihan
  // 2. Cukup
  // 3. Perlu Dibatasi
  // 4. Kurang
  // 5. Baik
  let status = "Baik";
  const details = [];

  // 1. Berlebihan jika ada yang > 100%
  if (
    persentase.energi > 100 ||
    persentase.gula > 100 ||
    persentase.garam > 100 ||
    persentase.lemak > 100
  ) {
    status = "Berlebihan";
    if (persentase.energi > 100) details.push("Kalori");
    if (persentase.gula > 100) details.push("Gula");
    if (persentase.garam > 100) details.push("Garam");
    if (persentase.lemak > 100) details.push("Lemak");
  } else if (
    // 2. Cukup jika ada yang > 80%
    persentase.energi > 80 ||
    persentase.gula > 80 ||
    persentase.garam > 80 ||
    persentase.lemak > 80
  ) {
    status = "Cukup";
    if (persentase.energi > 80) details.push("Kalori");
    if (persentase.gula > 80) details.push("Gula");
    if (persentase.garam > 80) details.push("Garam");
    if (persentase.lemak > 80) details.push("Lemak");
  } else if (
    // 3. Perlu Dibatasi jika > 50% pada gula/garam/lemak
    (persentase.gula > 50 && persentase.gula <= 100) ||
    (persentase.garam > 50 && persentase.garam <= 100) ||
    (persentase.lemak > 50 && persentase.lemak <= 100)
  ) {
    status = "Perlu Dibatasi";
    if (persentase.gula > 50 && persentase.gula <= 100) details.push("Gula");
    if (persentase.garam > 50 && persentase.garam <= 100) details.push("Garam");
    if (persentase.lemak > 50 && persentase.lemak <= 100) details.push("Lemak");
  } else if (
    // 4. Kurang jika protein/serat < 20%
    persentase.protein < 20 ||
    persentase.serat < 20
  ) {
    status = "Kurang";
    if (persentase.protein < 20) details.push("Protein");
    if (persentase.serat < 20) details.push("Serat");
  }
  // 5. Default Baik jika tidak ada kondisi di atas
  return { status, details, persentase };
}

const ScanHistoryCard = ({ scan, onDelete, dailyNeeds }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/delete/${scan.filename}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus data");
      }

      setShowDeleteConfirm(false);
      if (onDelete) {
        onDelete(scan.filename);
      }
    } catch (error) {
      console.error("Error deleting scan:", error);
      alert(error.message || "Terjadi kesalahan saat menghapus data");
    }
  };

  // Hitung status scan
  const { status, details, persentase } = getScanStatus(scan, dailyNeeds);
  return (
    <div className="relative">
      {" "}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01] overflow-hidden border border-gray-100/50">
        {/* Status Scan - Sebaris dengan waktu scan */}
        <div className="p-3 md:p-4">
          <div className="flex flex-col md:flex-row gap-3 md:gap-4">
            {/* Image Container */}
            <div className="relative w-full md:w-24 h-20 md:h-24 rounded-lg overflow-hidden flex-shrink-0 border border-highlight/30 shadow-sm group">
              <div className="absolute inset-0 bg-gradient-to-br from-main/20 to-transparent group-hover:from-main/30 transition-all duration-300"></div>
              <img
                src={`${BASE_URL}/images/${scan.filename}`}
                alt="Foto Produk"
                className="w-full h-full object-cover transform group-hover:scale-102 transition-transform duration-300"
              />
            </div>

            {/* Content Container */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="w-full md:w-auto">
                  {/* Timestamp and TimeAgo Section */}
                  <div className="flex flex-col gap-2">
                    {" "}
                    <div className="flex items-center gap-1.5 md:gap-2 w-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 md:h-5 md:w-5 text-main/70"
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
                      <h3 className="text-base md:text-lg font-bold text-main truncate">
                        {new Date(scan.timestamp).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </h3>
                      <span className="text-xs md:text-sm text-gray-500 bg-gray-50 px-1.5 md:px-2 py-0.5 rounded-md whitespace-nowrap">
                        {calculateTimeAgo(scan.timestamp)}
                      </span>
                      {/* Status Scan */}
                      <span
                        className={`flex items-center gap-1 px-2 py-1 ml-4 md:ml-6 rounded-lg shadow text-xs font-bold border select-none transition-all duration-200
                          ${
                            status === "Baik"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : status === "Cukup"
                              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                              : status === "Berlebihan"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : status === "Perlu Dibatasi"
                              ? "bg-orange-50 text-orange-700 border-orange-200"
                              : status === "Kurang"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-gray-50 text-gray-700 border-gray-200"
                          }
                        `}
                        style={{ minWidth: 90, justifyContent: "center" }}
                        title={
                          details.length > 0
                            ? `Nutrisi: ${details.join(", ")}`
                            : ""
                        }
                      >
                        {status}
                        {details.length > 0 && (
                          <span className="ml-1 font-normal text-xs opacity-80">
                            ({details.join(", ")})
                          </span>
                        )}
                      </span>
                    </div>{" "}
                    {/* Nutrition Info Section */}
                    <div className="flex flex-wrap items-center gap-2">
                      {" "}
                      <div className="flex items-center gap-1 md:gap-1.5 bg-amber-50/80 text-amber-600 px-2 md:px-2.5 py-0.5 md:py-1 rounded-lg text-[10px] md:text-xs">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-3 w-3 md:h-3.5 md:w-3.5"
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
                        <span className="font-medium">
                          Energi: {scan.kandungan_gizi.energi || 0} kkal
                          {dailyNeeds && (
                            <span className="ml-1 text-[10px] text-amber-700">
                              ({Math.round(persentase.energi)}%)
                            </span>
                          )}
                        </span>
                      </div>
                      {scan.kandungan_gizi && (
                        <>
                          {" "}
                          <div className="flex items-center gap-1 md:gap-1.5 bg-blue-50/80 text-blue-600 px-2 md:px-2.5 py-0.5 md:py-1 rounded-lg text-[10px] md:text-xs">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 md:h-3.5 md:w-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                              />
                            </svg>
                            <span className="font-medium">
                              Karbohidrat:{" "}
                              {scan.kandungan_gizi.karbohidrat || "0"}g
                            </span>
                          </div>{" "}
                          <div className="flex items-center gap-1 md:gap-1.5 bg-green-50/80 text-green-600 px-2 md:px-2.5 py-0.5 md:py-1 rounded-lg text-[10px] md:text-xs">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3 w-3 md:h-3.5 md:w-3.5"
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
                            <span className="font-medium">
                              Protein: {scan.kandungan_gizi.protein || "0"}g
                              {dailyNeeds && (
                                <span className="ml-1 text-[10px] text-green-700">
                                  ({Math.round(persentase.protein)}%)
                                </span>
                              )}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons - Preserved Layout */}
                <div className="flex gap-2 w-full md:w-auto">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex-1 md:flex-none px-3 md:px-4 py-1.5 md:py-2 bg-main/90 hover:bg-main text-light rounded-lg transition-colors duration-300 flex items-center justify-center gap-1 md:gap-1.5 text-xs md:text-sm font-medium"
                  >
                    <span>Detail</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 md:h-3.5 md:w-3.5"
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

                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="flex-1 md:flex-none px-3 md:px-4 py-1.5 md:py-2 bg-red-500/90 hover:bg-red-500 text-white rounded-lg transition-colors duration-300 flex items-center justify-center gap-1 md:gap-1.5 text-xs md:text-sm font-medium"
                  >
                    <span>Hapus</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 md:h-3.5 md:w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm &&
        createPortal(
          <div
            className="fixed inset-0 w-full h-full flex items-center justify-center"
            style={{ zIndex: 999999 }}
          >
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fade-in transition-opacity duration-300" />{" "}
            {/* Modal Content */}{" "}
            <div className="relative z-10 bg-white rounded-lg md:rounded-xl p-4 md:p-6 max-w-sm w-full shadow-xl animate-scale-in transition-all duration-300 mx-4">
              <div className="text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-red-100 mx-auto flex items-center justify-center mb-3 md:mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 md:h-8 md:w-8 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>{" "}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-4">
                  Konfirmasi Penghapusan
                </h3>
                <p className="text-sm md:text-base text-gray-500 mb-4 md:mb-6">
                  Apakah Anda yakin ingin menghapus data pemindaian ini?
                  Tindakan ini tidak dapat dibatalkan.
                </p>
                <div className="flex gap-2 md:gap-3 justify-center">
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="px-3 md:px-4 py-1.5 md:py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm md:text-base transition-colors duration-200"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-3 md:px-4 py-1.5 md:py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm md:text-base transition-colors duration-200 flex items-center gap-1.5 md:gap-2"
                  >
                    <span>Ya, Hapus</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 md:h-4 md:w-4 transform group-hover:scale-110 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      <ScanDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        scan={scan}
        dailyNeeds={dailyNeeds}
      />
    </div>
  );
};

export default ScanHistoryCard;
