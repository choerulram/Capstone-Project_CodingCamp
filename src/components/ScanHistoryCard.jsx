import React, { useState } from "react";
import ScanDetailModal from "./ScanDetailModal";
import { BASE_URL } from "../utils/api";

const ScanHistoryCard = ({ scan, onDelete }) => {
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

  return (
    <>
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01] overflow-hidden border border-gray-100/50">
        <div className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Image Container - Ukuran dikecilkan */}
            <div className="relative w-full md:w-24 h-24 rounded-lg overflow-hidden flex-shrink-0 border border-highlight/30 shadow-sm group">
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
                  {/* Timestamp */}
                  <h3 className="text-lg md:text-xl font-bold text-main mb-2 flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-main/70"
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
                    <span className="truncate">
                      {new Date(scan.timestamp).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </h3>{" "}
                  {/* Nutrition Info - Style yang lebih subtle */}
                  <div className="flex flex-wrap gap-2">
                    {scan.kandungan_gizi && (
                      <>
                        <div className="flex items-center gap-1.5 bg-blue-50/80 text-blue-600 px-2.5 py-1 rounded-lg text-xs">
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
                              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                            />
                          </svg>
                          <span className="font-medium">
                            Karbohidrat:{" "}
                            {scan.kandungan_gizi.karbohidrat || "0"}g
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-green-50/80 text-green-600 px-2.5 py-1 rounded-lg text-xs">
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
                              d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                          </svg>
                          <span className="font-medium">
                            Protein: {scan.kandungan_gizi.protein || "0"}g
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Action Buttons - Style yang lebih subtle */}
                <div className="flex gap-2 w-full md:w-auto">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex-1 md:flex-none px-4 py-2 bg-main/90 hover:bg-main text-light rounded-lg transition-colors duration-300 flex items-center justify-center gap-1.5 text-sm font-medium"
                  >
                    <span>Detail</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 transform transition-transform duration-300 group-hover:translate-x-0.5"
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
                    className="flex-1 md:flex-none px-4 py-2 bg-red-500/90 hover:bg-red-500 text-white rounded-lg transition-colors duration-300 flex items-center justify-center gap-1.5 text-sm font-medium"
                  >
                    <span>Hapus</span>
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl animate-fade-in-up">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 mx-auto flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-red-600"
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
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Konfirmasi Penghapusan
              </h3>
              <p className="text-gray-500 mb-6">
                Apakah Anda yakin ingin menghapus data pemindaian ini? Tindakan
                ini tidak dapat dibatalkan.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
                >
                  Batal
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 flex items-center gap-2"
                >
                  <span>Ya, Hapus</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 transform group-hover:scale-110 transition-transform"
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
      )}

      <ScanDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        scan={scan}
      />
    </>
  );
};

export default ScanHistoryCard;
