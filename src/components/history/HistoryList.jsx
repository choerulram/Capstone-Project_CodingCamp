import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import ScanHistoryCard from "./ScanHistoryCard";
import Pagination from "./Pagination";

const HistoryList = ({
  loading,
  error,
  history,
  searchQuery,
  timeFilter,
  fetchScanHistory,
  handleDelete,
  currentPage,
  itemsPerPage,
  setCurrentPage,
}) => {
  const [dailyNeeds, setDailyNeeds] = useState(null);
  useEffect(() => {
    const fetchNeeds = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const needs = await api.getDailyNutrition(token);
        setDailyNeeds(needs);
      } catch {
        setDailyNeeds(null);
      }
    };
    fetchNeeds();
  }, []);
  const filteredHistory = history
    .filter((scan) => {
      if (searchQuery) {
        const scanDate = new Date(scan.timestamp);
        const formattedDate = scanDate.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });
        return formattedDate.toLowerCase().includes(searchQuery.toLowerCase());
      }
      return true;
    })
    .filter((scan) => {
      const scanDate = new Date(scan.timestamp);
      const today = new Date();
      if (timeFilter === "today") {
        return scanDate.toDateString() === today.toDateString();
      }
      if (timeFilter === "week") {
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        return scanDate >= lastWeek;
      }
      if (timeFilter === "month") {
        const lastMonth = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
        return scanDate >= lastMonth;
      }
      return true;
    });
  return (
    <div className="p-3 md:p-6 bg-gradient-to-br from-white/50 via-gray-50/30 to-highlight/5">
      {/* Info Penjelasan Status Pindai Gizi dengan badge warna, UI lebih rapi */}
      <div className="mb-6">
        <div className="bg-white/90 border border-gray-100 rounded-xl px-3 py-2 md:px-4 md:py-3 text-xs md:text-sm shadow-sm">
          <h2 className="text-sm md:text-lg font-bold text-main mb-1 flex items-center gap-1 md:gap-2">
            <svg
              className="w-4 h-4 md:w-5 md:h-5 text-main"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 20l9-5-9-5-9 5 9 5zm0-10V4m0 0a2 2 0 114 0 2 2 0 01-4 0z"
              />
            </svg>
            <span className="truncate">Status Pindai Gizi</span>
          </h2>
          <p className="mb-2 md:mb-3 text-gray-600 leading-snug md:leading-normal">
            Status pindai gizi
            <span className="inline-block bg-gray-100 text-gray-700 rounded px-1.5 py-0.5 mx-0.5 md:px-2 md:py-0.5 md:mx-1">
              ditentukan dari perbandingan kebutuhan nutrisi harian
            </span>
            dengan
            <span className="inline-block bg-gray-100 text-gray-700 rounded px-1.5 py-0.5 mx-0.5 md:px-2 md:py-0.5 md:mx-1">
              hasil pindai nutrisi per kemasan produk
            </span>
            yang Anda scan.
          </p>
          <ul className="space-y-1 md:space-y-2">
            <li className="flex flex-col md:flex-row md:items-start gap-1 md:gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold bg-red-50 text-red-700 border border-red-200 min-w-[80px] md:min-w-[90px] justify-center">
                Berlebihan
              </span>
              <span className="leading-tight md:leading-normal">
                Jika salah satu dari <b>energi, gula, garam, atau lemak</b> &gt;
                100% kebutuhan harian.
              </span>
            </li>
            <li className="flex flex-col md:flex-row md:items-start gap-1 md:gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold bg-yellow-50 text-yellow-700 border border-yellow-200 min-w-[80px] md:min-w-[90px] justify-center">
                Cukup
              </span>
              <span className="leading-tight md:leading-normal">
                Jika salah satu dari <b>energi, gula, garam, atau lemak</b> &gt;
                80% kebutuhan harian (namun tidak ada yang &gt; 100%).
              </span>
            </li>
            <li className="flex flex-col md:flex-row md:items-start gap-1 md:gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold bg-orange-50 text-orange-700 border border-orange-200 min-w-[80px] md:min-w-[90px] justify-center">
                Perlu Dibatasi
              </span>
              <span className="leading-tight md:leading-normal">
                Jika salah satu dari <b>gula, garam, atau lemak</b> &gt; 50% dan
                ≤ 100% kebutuhan harian (namun tidak ada yang &gt; 80%).
              </span>
            </li>
            <li className="flex flex-col md:flex-row md:items-start gap-1 md:gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 min-w-[80px] md:min-w-[90px] justify-center">
                Kurang
              </span>
              <span className="leading-tight md:leading-normal">
                Jika <b>protein</b> atau <b>serat</b> &lt; 20% kebutuhan harian
                (dan tidak ada status di atas).
              </span>
            </li>
            <li className="flex flex-col md:flex-row md:items-start gap-1 md:gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold bg-green-50 text-green-700 border border-green-200 min-w-[80px] md:min-w-[90px] justify-center">
                Baik
              </span>
              <span className="leading-tight md:leading-normal">
                Jika semua nutrisi utama dalam rentang aman: <b>energi ≤ 80%</b>
                , <b>gula/garam/lemak ≤ 50%</b>, <b>protein ≥ 20%</b>,{" "}
                <b>serat ≥ 20%</b>.
              </span>
            </li>
          </ul>
        </div>
      </div>
      {loading ? (
        <div className="text-center py-8 md:py-12">
          <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-main mx-auto"></div>
          <p className="mt-4 text-sm md:text-base text-gray-600">
            Memuat riwayat pemindaian...
          </p>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <div className="bg-red-50/80 backdrop-blur-sm text-red-600 p-6 rounded-xl inline-block mb-4 shadow-sm border border-red-100">
            <p>{error}</p>
          </div>
          <button
            onClick={fetchScanHistory}
            className="px-6 py-2.5 bg-main text-white rounded-xl hover:bg-opacity-90 transition-colors duration-300 shadow-sm hover:shadow-md"
          >
            Coba Lagi
          </button>
        </div>
      ) : filteredHistory.length > 0 ? (
        <>
          {" "}
          <div className="grid gap-3 md:gap-6">
            {filteredHistory
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((scan) => (
                <ScanHistoryCard
                  key={scan.id}
                  scan={scan}
                  onDelete={handleDelete}
                  dailyNeeds={dailyNeeds}
                />
              ))}
          </div>
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalItems={filteredHistory.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        </>
      ) : (
        <div className="text-center py-8 md:py-12">
          <div className="bg-gray-50/80 backdrop-blur-sm p-6 md:p-8 rounded-xl md:rounded-2xl inline-block shadow-sm border border-gray-100/50">
            <div className="text-gray-400 text-5xl md:text-6xl mb-3 md:mb-4">
              📄
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-main mb-2">
              Belum Ada Riwayat
            </h3>
            <p className="text-sm md:text-base text-gray-600 mb-4">
              Anda belum melakukan pemindaian nutrisi apapun
            </p>
            <a
              href="/scan"
              className="inline-block px-6 py-2.5 bg-main text-white rounded-xl hover:bg-opacity-90 transition-colors duration-300 shadow-sm hover:shadow-md"
            >
              Mulai Pemindaian
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryList;
