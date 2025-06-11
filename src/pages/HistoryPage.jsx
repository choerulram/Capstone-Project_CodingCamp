/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import HistoryHeader from "../components/history/HistoryHeader";
import HistoryFilter from "../components/history/HistoryFilter";
import HistoryList from "../components/history/HistoryList";
import api from "../utils/api";

const HistoryPage = () => {
  const { token } = useSelector((state) => state.auth);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [timeFilter, setTimeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

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
      <motion.main
        className="flex-grow py-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 overflow-hidden"
            variants={itemVariants}
          >
            <motion.div variants={itemVariants}>
              <HistoryHeader />
            </motion.div>
            <motion.div variants={itemVariants}>
              <HistoryFilter
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                timeFilter={timeFilter}
                setTimeFilter={setTimeFilter}
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <HistoryList
                loading={loading}
                error={error}
                history={history}
                searchQuery={searchQuery}
                timeFilter={timeFilter}
                fetchScanHistory={fetchScanHistory}
                handleDelete={handleDelete}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                setCurrentPage={setCurrentPage}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default HistoryPage;
