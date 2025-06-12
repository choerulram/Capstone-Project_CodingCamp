import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api, { BASE_URL } from "../../utils/api";
import DailyScanDetailModal from "./DailyScanDetailModal";
import Pagination from "../history/Pagination";

const DailyScanHistory = () => {
  const { token } = useSelector((state) => state.auth);
  const [todayScans, setTodayScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedScan, setSelectedScan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchTodayScans = async () => {
      try {
        setLoading(true);
        const data = await api.getTodayScanHistory(token);
        const todayData = data?.history || [];
        setTodayScans(todayData);
      } catch (err) {
        setError(err.message);

        // Fallback to getAllScanHistory if getTodayScanHistory fails
        try {
          const allData = await api.getAllScanHistory(token);
          const today = new Date().toISOString().slice(0, 10);
          const todayData = (allData?.history || []).filter(
            (item) => (item.uploaded_at || "").slice(0, 10) === today
          );

          setTodayScans(todayData);
          setError(null); // Clear error if fallback succeeds
        } catch (fallbackErr) {
          console.error("Fallback error:", fallbackErr);
          setError(fallbackErr.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchTodayScans();
    }
  }, [token]);

  const handleOpenModal = (scan) => {
    setSelectedScan(scan);
    setIsModalOpen(true);
  };

  return (
    <>
      {" "}
      <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border border-main/30 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 animate-slide-in-bottom scroll-mt-24">
        <h2 className="text-xl font-bold text-main mb-6 flex items-center animate-float">
          <span className="bg-main p-3 rounded-xl mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-secondary"
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

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-main mx-auto"></div>
            <p className="mt-2 text-gray-600">Memuat data...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
            {error}
          </div>
        ) : todayScans.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl border border-secondary/30 shadow-sm">
            <p className="text-gray-600 text-center">
              Belum ada data scan untuk hari ini
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {todayScans
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((scan, index) => (
                  <div
                    key={scan.id || scan.filename}
                    className="group bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-secondary/30 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in-right"
                    style={{
                      animationDelay: `${index * 150}ms`,
                    }}
                    onClick={() => handleOpenModal(scan)}
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Image Container */}
                      <div className="relative w-full md:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0 border border-secondary/20 shadow-sm">
                        <div className="absolute inset-0 bg-gradient-to-br from-main/10 to-transparent group-hover:from-main/20 transition-all duration-300"></div>
                        <img
                          src={`${BASE_URL}/images/${scan.filename}`}
                          alt="Foto Produk"
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Content Container */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                          <div className="w-full md:w-auto">
                            {/* Timestamp */}
                            <h3 className="text-lg md:text-xl font-bold text-main mb-4 flex items-center gap-2">
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
                                {new Date(scan.uploaded_at).toLocaleDateString(
                                  "id-ID",
                                  {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  }
                                )}
                              </span>
                            </h3>

                            {/* Nutrition Info */}
                            {scan.kandungan_gizi && (
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div className="flex flex-col gap-1 bg-blue-50/80 text-blue-600 px-3 py-2 rounded-xl text-sm">
                                  <div className="text-xs text-blue-600/70 font-medium">
                                    Energi
                                  </div>
                                  <div className="flex items-baseline gap-1">
                                    <span className="text-base font-bold">
                                      {scan.kandungan_gizi.energi || "0"}
                                    </span>
                                    <span className="text-xs font-medium text-blue-600/70">
                                      g
                                    </span>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-1 bg-green-50/80 text-green-600 px-3 py-2 rounded-xl text-sm">
                                  <div className="text-xs text-green-600/70 font-medium">
                                    Protein
                                  </div>
                                  <div className="flex items-baseline gap-1">
                                    <span className="text-base font-bold">
                                      {scan.kandungan_gizi.protein || "0"}
                                    </span>
                                    <span className="text-xs font-medium text-green-600/70">
                                      g
                                    </span>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-1 bg-yellow-50/80 text-yellow-600 px-3 py-2 rounded-xl text-sm">
                                  <div className="text-xs text-yellow-600/70 font-medium">
                                    Lemak
                                  </div>
                                  <div className="flex items-baseline gap-1">
                                    <span className="text-base font-bold">
                                      {scan.kandungan_gizi["lemak total"] ||
                                        "0"}
                                    </span>
                                    <span className="text-xs font-medium text-yellow-600/70">
                                      g
                                    </span>
                                  </div>
                                </div>
                                <div className="flex flex-col gap-1 bg-purple-50/80 text-purple-600 px-3 py-2 rounded-xl text-sm">
                                  <div className="text-xs text-purple-600/70 font-medium">
                                    Karbohidrat
                                  </div>
                                  <div className="flex items-baseline gap-1">
                                    <span className="text-base font-bold">
                                      {scan.kandungan_gizi.karbohidrat || "0"}
                                    </span>
                                    <span className="text-xs font-medium text-purple-600/70">
                                      g
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* View Detail Button */}
                          <button className="w-full md:w-auto px-6 py-3 bg-main/90 hover:bg-main text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium hover:-translate-y-0.5 hover:shadow-lg group">
                            <span>Lihat Detail</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 transform transition-all duration-300 group-hover:translate-x-1"
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
                  </div>
                ))}
            </div>

            {todayScans.length > itemsPerPage && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalItems={todayScans.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>{" "}
      {selectedScan && (
        <DailyScanDetailModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedScan(null);
          }}
          scan={selectedScan}
        />
      )}
    </>
  );
};

export default DailyScanHistory;
