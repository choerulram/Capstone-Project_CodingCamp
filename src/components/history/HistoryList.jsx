import React from "react";
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
