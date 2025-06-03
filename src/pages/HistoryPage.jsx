import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScanHistoryCard from "../components/ScanHistoryCard";
import api from "../utils/api";

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
      const response = await api.getScanHistory(token);

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
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-main mb-4">
            Riwayat Pemindaian
          </h1>
          <p className="text-gray-600">
            Lihat riwayat pemindaian informasi nutrisi produk Anda di sini.
          </p>
        </div>{" "}
        {/* Filter and Search Section */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Cari produk..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent"
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
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-main mx-auto"></div>
              <p className="mt-4 text-gray-600">Memuat riwayat pemindaian...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">
              <p>{error}</p>
              <button
                onClick={fetchScanHistory}
                className="mt-4 px-6 py-2 bg-main text-white rounded-lg hover:bg-opacity-90"
              >
                Coba Lagi
              </button>
            </div>
          ) : history.length > 0 ? (
            history
              .filter((scan) => {
                // Filter berdasarkan pencarian
                if (searchQuery) {
                  return (
                    scan.filename &&
                    scan.filename
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  );
                }
                return true;
              })
              .filter((scan) => {
                // Filter berdasarkan waktu
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
              ))
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-main mb-2">
                Belum Ada Riwayat
              </h3>
              <p className="text-gray-600 mb-4">
                Anda belum melakukan pemindaian nutrisi apapun
              </p>
              <a
                href="/scan"
                className="inline-block px-6 py-2 bg-main text-white rounded-xl hover:bg-teal-700 transition-colors duration-300"
              >
                Mulai Pemindaian
              </a>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HistoryPage;
