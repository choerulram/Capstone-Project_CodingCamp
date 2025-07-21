import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api, { BASE_URL } from "../../utils/api";
import DailyScanDetailModal from "./DailyScanDetailModal";
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

// Fungsi utilitas untuk menghitung status scan
function getScanStatus(scan, dailyNeeds) {
  // Jika tidak ada kandungan gizi atau kebutuhan harian, return status "-"
  if (!scan?.kandungan_gizi || !dailyNeeds) return { status: "-", details: [] };

  let needs = dailyNeeds;
  // Jika ada properti kebutuhan_harian, gunakan itu
  if (needs?.kebutuhan_harian) needs = needs.kebutuhan_harian;

  // Validasi jika needs masih undefined setelah transformasi
  if (!needs) return { status: "-", details: [] };

  const gizi = {
    energi: parseFloat(scan.kandungan_gizi.energi) || 0,
    gula: parseFloat(scan.kandungan_gizi.gula) || 0,
    garam: parseFloat(scan.kandungan_gizi.garam) || 0,
    lemak:
      parseFloat(
        scan.kandungan_gizi.lemak !== undefined
          ? scan.kandungan_gizi.lemak
          : scan.kandungan_gizi["lemak total"]
      ) || 0,
    protein: parseFloat(scan.kandungan_gizi.protein) || 0,
    serat: parseFloat(scan.kandungan_gizi.serat) || 0,
  };

  const needsMap = {
    energi: parseFloat(needs.energi) || 0,
    gula: parseFloat(needs.gula) || 0,
    garam: parseFloat(needs.garam) || 0,
    lemak: parseFloat(needs.lemak || needs["lemak total"]) || 0,
    protein: parseFloat(needs.protein) || 0,
    serat: parseFloat(needs.serat) || 0,
  };

  // Hitung persentase dan pastikan nilainya valid
  const persentase = {
    energi: needsMap.energi > 0 ? (gizi.energi / needsMap.energi) * 100 : 0,
    gula: needsMap.gula > 0 ? (gizi.gula / needsMap.gula) * 100 : 0,
    garam: needsMap.garam > 0 ? (gizi.garam / needsMap.garam) * 100 : 0,
    lemak: needsMap.lemak > 0 ? (gizi.lemak / needsMap.lemak) * 100 : 0,
    protein: needsMap.protein > 0 ? (gizi.protein / needsMap.protein) * 100 : 0,
    serat: needsMap.serat > 0 ? (gizi.serat / needsMap.serat) * 100 : 0,
  };

  console.log("Perhitungan Nutrisi:", {
    kandunganGizi: gizi,
    kebutuhanHarian: needsMap,
    persentaseNutrisi: persentase,
  });

  let status = "Baik";
  const details = [];

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
    persentase.energi > 80 ||
    persentase.gula > 80 ||
    persentase.garam > 80 ||
    persentase.lemak > 80
  ) {
    status = "Mendekati Batas";
    if (persentase.energi > 80) details.push("Kalori");
    if (persentase.gula > 80) details.push("Gula");
    if (persentase.garam > 80) details.push("Garam");
    if (persentase.lemak > 80) details.push("Lemak");
  }

  return { status, details };
}

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
          Riwayat Scan Hari Ini
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
        ) : todayScans.length === 0 ? (
          <div className="bg-white/90 backdrop-blur-sm p-4 md:p-8 rounded-xl md:rounded-2xl border border-gray-200/80 shadow-sm">
            <p className="text-sm md:text-base text-gray-600 text-center">
              Belum ada data scan untuk hari ini
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4 md:space-y-6">
              {todayScans
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((scan, index) => {
                  console.log("Data Scan:", {
                    scanId: scan.id,
                    filename: scan.filename,
                    kandungan_gizi: scan.kandungan_gizi,
                    daily_needs: scan.daily_needs,
                    kebutuhan_harian: scan.kebutuhan_harian,
                  });

                  // Ambil dailyNeeds dari scan, fallback ke todayScans[0].daily_needs jika tidak ada
                  let dailyNeeds = null;
                  if (scan.daily_needs) dailyNeeds = scan.daily_needs;
                  else if (scan.kebutuhan_harian)
                    dailyNeeds = scan.kebutuhan_harian;
                  else if (todayScans.length > 0 && todayScans[0].daily_needs)
                    dailyNeeds = todayScans[0].daily_needs;

                  console.log("Kebutuhan Nutrisi yang digunakan:", dailyNeeds);
                  const { status, details } = getScanStatus(scan, dailyNeeds);
                  return (
                    <div
                      key={scan.id || scan.filename}
                      className="group bg-white/90 backdrop-blur-sm p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden animate-fade-in-right"
                      style={{
                        animationDelay: `${index * 150}ms`,
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
                              {/* Timestamp & TimeAgo & Status Scan */}
                              <div className="flex items-center gap-2 mb-3 md:mb-4">
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
                                <span className="truncate text-sm md:text-base">
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
                                <span className="text-xs md:text-sm text-gray-500 bg-gray-50 px-1.5 md:px-2 py-0.5 rounded-md whitespace-nowrap">
                                  {calculateTimeAgo(scan.uploaded_at)}
                                </span>
                                {/* Status Scan */}
                                <span
                                  className={`flex items-center gap-1 px-2 py-1 ml-2 md:ml-4 rounded-lg shadow text-xs font-bold border select-none transition-all duration-200
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
                                  style={{
                                    minWidth: 90,
                                    justifyContent: "center",
                                  }}
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
                                        g
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
                                        {scan.kandungan_gizi.karbohidrat || "0"}
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
                  );
                })}
            </div>

            {todayScans.length > itemsPerPage && (
              <div className="mt-6 md:mt-8">
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
