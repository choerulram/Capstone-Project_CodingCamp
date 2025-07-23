import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api, { BASE_URL } from "../../utils/api";
import DailyScanDetailModal from "../daily-summary/DailyScanDetailModal";
import Pagination from "../history/Pagination";

// Fungsi utilitas untuk menghitung time ago
function calculateTimeAgo(timestamp) {
  const now = new Date();
  const then = new Date(timestamp);
  const diffInSeconds = Math.floor((now - then) / 1000);
  if (diffInSeconds < 60) return `${diffInSeconds} detik yang lalu`;
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} menit yang lalu`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} jam yang lalu`;
  return `${Math.floor(diffInSeconds / 86400)} hari yang lalu`;
}

const MonthlyScanHistory = () => {
  const { token } = useSelector((state) => state.auth);
  const [monthlyScans, setMonthlyScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedScan, setSelectedScan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    const fetchMonthlyScans = async () => {
      try {
        setLoading(true);
        const data = await api.getAllScanHistory(token);

        // Filter untuk bulan ini
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

        const monthlyData = (data?.history || []).filter((item) => {
          const scanDate = new Date(item.uploaded_at);
          return scanDate >= startOfMonth && scanDate <= endOfMonth;
        });

        // Urutkan dari yang terbaru
        monthlyData.sort(
          (a, b) => new Date(b.uploaded_at) - new Date(a.uploaded_at)
        );

        setMonthlyScans(monthlyData);
      } catch (err) {
        console.error("Error fetching monthly scans:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchMonthlyScans();
    }
  }, [token]);

  const handleOpenModal = (scan) => {
    setSelectedScan(scan);
    setIsModalOpen(true);
  };

  // Fungsi untuk mengelompokkan scan berdasarkan hari
  const groupScansByDay = (scans) => {
    const groups = {};
    scans.forEach((scan) => {
      const date = new Date(scan.uploaded_at).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(scan);
    });
    return groups;
  };

  const groupedScans = groupScansByDay(monthlyScans);
  const daysWithScans = Object.keys(groupedScans);
  const paginatedDays = daysWithScans.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="bg-gradient-to-br from-white to-gray-50 p-4 md:p-8 rounded-xl md:rounded-2xl border border-main/30 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 animate-slide-in-bottom scroll-mt-24">
        <h2 className="text-lg md:text-xl font-bold text-main mb-4 md:mb-6 flex items-center animate-float">
          <span className="bg-main p-2 md:p-3 rounded-lg md:rounded-xl mr-2 md:mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 md:h-6 md:w-6 text-secondary"
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
          <div>
            <div className="text-lg md:text-xl font-bold text-main">
              Riwayat Scan Bulan Ini
            </div>
            <div className="text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1">
              {new Date().toLocaleDateString("id-ID", {
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
        </h2>

        {loading ? (
          <div className="text-center py-6 md:py-8">
            <div className="animate-spin rounded-full h-6 w-6 md:h-8 md:w-8 border-b-2 border-main mx-auto"></div>
            <p className="mt-2 text-sm md:text-base text-gray-600">
              Memuat data...
            </p>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-600 p-3 md:p-4 rounded-lg text-sm md:text-base text-center">
            {error}
          </div>
        ) : monthlyScans.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-sm p-4 md:p-8 rounded-xl md:rounded-2xl border border-gray-200/80 shadow-sm">
            <p className="text-sm md:text-base text-gray-600 text-center">
              Belum ada data scan untuk bulan ini
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-6 md:space-y-8">
              {paginatedDays.map((day, dayIndex) => (
                <div
                  key={day}
                  className="animate-fade-in"
                  style={{
                    animationDelay: `${dayIndex * 150}ms`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-px flex-grow bg-gray-200"></div>
                    <span className="text-sm md:text-base font-semibold text-main/80 bg-white px-3 py-1 rounded-full shadow-sm border border-main/10">
                      {day}
                    </span>
                    <div className="h-px flex-grow bg-gray-200"></div>
                  </div>
                  <div className="space-y-4">
                    {groupedScans[day].map((scan, scanIndex) => (
                      <div
                        key={scan.id || scan.filename}
                        className="group bg-white/90 backdrop-blur-sm p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden animate-fade-in-right"
                        style={{
                          animationDelay: `${
                            (dayIndex * 3 + scanIndex) * 100
                          }ms`,
                        }}
                        onClick={() => handleOpenModal(scan)}
                      >
                        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                          {/* Image Container */}
                          <div className="relative w-full md:w-32 h-24 md:h-32 rounded-lg md:rounded-xl overflow-hidden flex-shrink-0 border border-secondary/20 shadow-sm">
                            <div className="absolute inset-0 bg-gradient-to-br from-main/10 to-transparent group-hover:from-main/20 transition-all duration-300"></div>
                            <img
                              src={`${BASE_URL}/images/${scan.filename}`}
                              alt="Foto Produk"
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>

                          {/* Content Container */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-3 md:gap-4">
                              <div className="w-full md:w-auto">
                                {/* Timestamp & TimeAgo */}
                                <div className="flex items-center flex-wrap gap-2 mb-3 md:mb-4">
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
                                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2z"
                                    />
                                  </svg>
                                  <span className="text-sm md:text-base">
                                    {new Date(
                                      scan.uploaded_at
                                    ).toLocaleTimeString("id-ID", {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </span>
                                  <span className="text-xs md:text-sm text-gray-500 bg-gray-50 px-1.5 md:px-2 py-0.5 rounded-md">
                                    {calculateTimeAgo(scan.uploaded_at)}
                                  </span>
                                </div>

                                {/* Nutrition Info */}
                                {scan.kandungan_gizi && (
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                                    <div className="flex flex-col gap-0.5 md:gap-1 bg-blue-50/80 text-blue-600 px-2 md:px-3 py-1.5 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm">
                                      <div className="text-[10px] md:text-xs text-blue-600/70 font-medium">
                                        Energi
                                      </div>
                                      <div className="flex items-baseline gap-1">
                                        <span className="text-sm md:text-base font-bold">
                                          {scan.kandungan_gizi.energi || "0"}
                                        </span>
                                        <span className="text-[10px] md:text-xs font-medium text-blue-600/70">
                                          kkal
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex flex-col gap-0.5 md:gap-1 bg-green-50/80 text-green-600 px-2 md:px-3 py-1.5 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm">
                                      <div className="text-[10px] md:text-xs text-green-600/70 font-medium">
                                        Protein
                                      </div>
                                      <div className="flex items-baseline gap-1">
                                        <span className="text-sm md:text-base font-bold">
                                          {scan.kandungan_gizi.protein || "0"}
                                        </span>
                                        <span className="text-[10px] md:text-xs font-medium text-green-600/70">
                                          g
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex flex-col gap-0.5 md:gap-1 bg-yellow-50/80 text-yellow-600 px-2 md:px-3 py-1.5 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm">
                                      <div className="text-[10px] md:text-xs text-yellow-600/70 font-medium">
                                        Lemak
                                      </div>
                                      <div className="flex items-baseline gap-1">
                                        <span className="text-sm md:text-base font-bold">
                                          {scan.kandungan_gizi["lemak total"] ||
                                            "0"}
                                        </span>
                                        <span className="text-[10px] md:text-xs font-medium text-yellow-600/70">
                                          g
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex flex-col gap-0.5 md:gap-1 bg-purple-50/80 text-purple-600 px-2 md:px-3 py-1.5 md:py-2 rounded-lg md:rounded-xl text-xs md:text-sm">
                                      <div className="text-[10px] md:text-xs text-purple-600/70 font-medium">
                                        Karbohidrat
                                      </div>
                                      <div className="flex items-baseline gap-1">
                                        <span className="text-sm md:text-base font-bold">
                                          {scan.kandungan_gizi.karbohidrat ||
                                            "0"}
                                        </span>
                                        <span className="text-[10px] md:text-xs font-medium text-purple-600/70">
                                          g
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {/* View Detail Button */}
                              <button className="w-full md:w-auto px-4 md:px-6 py-2 md:py-3 bg-main/90 hover:bg-main text-white rounded-lg md:rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5 md:gap-2 text-xs md:text-sm font-medium hover:-translate-y-0.5 hover:shadow-lg group">
                                <span>Lihat Detail</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3.5 w-3.5 md:h-4 md:w-4 transform transition-all duration-300 group-hover:translate-x-1"
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
                </div>
              ))}
            </div>

            {daysWithScans.length > itemsPerPage && (
              <div className="mt-6 md:mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalItems={daysWithScans.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>
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

export default MonthlyScanHistory;
