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

        // Filter untuk data hari ini saja
        const today = new Date().toISOString().slice(0, 10);
        const todayData = (data?.history || []).filter(
          (item) => (item.uploaded_at || "").slice(0, 10) === today
        );

        setTodayScans(todayData);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching today's scans:", err);
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
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 animate-fade-in">
        <h2 className="text-xl font-semibold text-main mb-6 flex items-center animate-fade-in-down">
          <span className="bg-highlight/20 p-2 rounded-lg mr-2 animate-bounce-slow">
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
          <div className="bg-white p-4 rounded-lg border border-gray-100">
            <p className="text-gray-600 text-center py-8">
              Belum ada data scan untuk hari ini
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {todayScans
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((scan, index) => (
                  <div
                    key={scan.id || scan.filename}
                    className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01] overflow-hidden border border-gray-100/50 animate-fade-in-right"
                    style={{
                      animationDelay: `${index * 150}ms`,
                    }}
                    onClick={() => handleOpenModal(scan)}
                  >
                    <div className="p-4">
                      <div className="flex flex-col md:flex-row gap-4">
                        {/* Image Container */}
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
                              {" "}
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
                                  {new Date(
                                    scan.uploaded_at
                                  ).toLocaleDateString("id-ID", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </h3>{" "}
                              {/* Nutrition Info */}
                              <div className="flex flex-wrap gap-2">
                                {scan.kandungan_gizi && (
                                  <>
                                    {/* Baris pertama */}
                                    <div className="flex items-center gap-1.5 bg-blue-50/80 text-blue-600 px-2.5 py-1 rounded-lg text-xs hover:bg-blue-100/80 transition-colors duration-300">
                                      <span className="font-medium">
                                        Energi:{" "}
                                        {scan.kandungan_gizi.energi || "0"} kkal
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-green-50/80 text-green-600 px-2.5 py-1 rounded-lg text-xs">
                                      <span className="font-medium">
                                        Protein:{" "}
                                        {scan.kandungan_gizi.protein || "0"}g
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-yellow-50/80 text-yellow-600 px-2.5 py-1 rounded-lg text-xs">
                                      <span className="font-medium">
                                        Lemak:{" "}
                                        {scan.kandungan_gizi["lemak total"] ||
                                          "0"}
                                        g
                                      </span>
                                    </div>
                                    {/* Baris kedua */}{" "}
                                    <div className="flex items-center gap-1.5 bg-purple-50/80 text-purple-600 px-2.5 py-1 rounded-lg text-xs">
                                      <span className="font-medium">
                                        Karbohidrat:{" "}
                                        {scan.kandungan_gizi.karbohidrat || "0"}
                                        g
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-orange-50/80 text-orange-600 px-2.5 py-1 rounded-lg text-xs">
                                      <span className="font-medium">
                                        Serat:{" "}
                                        {scan.kandungan_gizi.serat || "0"}g
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-rose-50/80 text-rose-600 px-2.5 py-1 rounded-lg text-xs">
                                      <span className="font-medium">
                                        Gula: {scan.kandungan_gizi.gula || "0"}g
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1.5 bg-cyan-50/80 text-cyan-600 px-2.5 py-1 rounded-lg text-xs">
                                      <span className="font-medium">
                                        Garam:{" "}
                                        {scan.kandungan_gizi.garam || "0"}g
                                      </span>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                            {/* View Detail Button */}{" "}
                            <div className="flex gap-2 w-full md:w-auto">
                              <button className="flex-1 md:flex-none px-4 py-2 bg-main/90 hover:bg-main text-white rounded-lg transition-all duration-300 flex items-center justify-center gap-1.5 text-sm font-medium hover:scale-105 hover:shadow-lg group">
                                <span>Detail</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-3.5 w-3.5 transform transition-all duration-300 group-hover:translate-x-1"
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
                    </div>{" "}
                  </div>
                ))}
            </div>
            {todayScans.length > itemsPerPage && (
              <div className="mt-6">
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
