import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import ScanHistoryCard from "../../components/history/ScanHistoryCard";
import api from "../../utils/api";

const HistoryPage = () => {
  const { token } = useSelector((state) => state.auth);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("");

  const fetchScanHistory = useCallback(async () => {
    if (!token) {
      window.location.href = "/login";
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await api.getAllScanHistory(token);

      // Debug: Lihat struktur response
      console.log("API Response:", response);

      // Pastikan kita mengambil data dengan benar
      let scanData;

      if (response && typeof response === "object") {
        // Jika response adalah object, coba ambil dari beberapa kemungkinan properti
        scanData =
          response.data ||
          response.scans ||
          response.history ||
          response.items ||
          [];
      } else {
        scanData = response || [];
      }

      // Debug: Lihat data yang akan diproses
      console.log("Scan Data:", scanData);

      if (!Array.isArray(scanData)) {
        console.error("Invalid scan data format:", scanData);
        throw new Error("Format data tidak valid");
      }

      // Menggunakan data langsung dari API tanpa transformasi yang tidak perlu
      const formattedHistory = scanData.map((item, index) => ({
        ...item, // Mempertahankan semua data asli
        id: item.id || index.toString(), // Menggunakan index sebagai fallback untuk key
        timestamp: new Date(item.uploaded_at),
      }));

      setHistory(formattedHistory);
    } catch (err) {
      setError(err.message || "Gagal memuat riwayat pemindaian");
      console.error("Error fetching scan history:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchScanHistory();
  }, [fetchScanHistory]);

  const handleDelete = useCallback((filename) => {
    // Update the history state to remove the deleted item
    setHistory((currentHistory) =>
      currentHistory.filter((item) => item.filename !== filename)
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-main/5 via-gray-50 to-highlight/10">
      <Header />

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden">
            {/* Header Section */}
            <div className="p-8 bg-gradient-to-r from-main/10 to-highlight/20 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-white/80 rounded-xl shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-main"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-main">
                  Riwayat Pemindaian
                </h1>
              </div>
              <p className="text-gray-600 pl-[52px]">
                Lihat riwayat pemindaian informasi nutrisi produk Anda di sini.
              </p>
            </div>

            {/* Filter and Search Section */}
            <div className="p-6 bg-gradient-to-b from-gray-50/50 to-white/50 border-b border-gray-100">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Cari produk..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-highlight/50 focus:border-transparent transition-all duration-300 bg-white/70"
                    />
                    <svg
                      className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex gap-2">
                  <select
                    value={timeFilter}
                    onChange={(e) => setTimeFilter(e.target.value)}
                    className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-highlight/50 focus:border-transparent transition-all duration-300 bg-white/70 pr-10"
                  >
                    <option value="">Semua Waktu</option>
                    <option value="today">Hari Ini</option>
                    <option value="week">Minggu Ini</option>
                    <option value="month">Bulan Ini</option>
                  </select>
                </div>
              </div>
            </div>

            {/* History List */}
            <div className="p-6 bg-gradient-to-br from-white/50 via-gray-50/30 to-highlight/5">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main mx-auto"></div>
                  <p className="mt-4 text-gray-600">
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
              ) : history.length > 0 ? (
                <div className="grid gap-6">
                  {history
                    .filter((scan) => {
                      if (searchQuery) {
                        return scan.filename
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase());
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
                        const lastWeek = new Date(
                          today.getTime() - 7 * 24 * 60 * 60 * 1000
                        );
                        return scanDate >= lastWeek;
                      }
                      if (timeFilter === "month") {
                        const lastMonth = new Date(
                          today.getTime() - 30 * 24 * 60 * 60 * 1000
                        );
                        return scanDate >= lastMonth;
                      }
                      return true;
                    })
                    .map((scan) => (
                      <ScanHistoryCard
                        key={scan.id}
                        scan={scan}
                        onDelete={handleDelete}
                      />
                    ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="bg-gray-50/80 backdrop-blur-sm p-8 rounded-2xl inline-block shadow-sm border border-gray-100/50">
                    <div className="text-gray-400 text-6xl mb-4">📄</div>
                    <h3 className="text-xl font-semibold text-main mb-2">
                      Belum Ada Riwayat
                    </h3>
                    <p className="text-gray-600 mb-4">
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
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HistoryPage;
