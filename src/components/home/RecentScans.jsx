/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import api, { BASE_URL } from "../../utils/api";

const TEMPLATE_DATA = [
  {
    title: "Pocary Sweat",
    image:
      "https://ik.imagekit.io/dcjlghyytp1/b82d6614ce50cf0aa1128f9682df35e1?tr=f-auto,w-360",
    energi: 60,
    karbohidrat: 15,
    protein: 0,
  },
  {
    title: "Taro Net BBQ",
    image:
      "https://nilaigizi.com/assets/images/produk/produk_1612861702.jpg",
    energi: 90,
    karbohidrat: 15,
    protein: 1,
  },
  {
    title: "Milku Susu UHT Rasa Cokelat",
    image:
      "https://nilaigizi.com/assets/images/produk/produk_1613362652.jpeg",
    energi: 100,
    karbohidrat: 11,
    protein: 5,
  },
];

const RecentScans = () => {
  const navigate = useNavigate();
  const [recentScans, setRecentScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRecentScans = async () => {
      if (!token) {
        console.log("No token found, using template data");
        // Menambahkan isTemplate ke setiap item template data
        const templateDataWithFlag = TEMPLATE_DATA.map((item) => ({
          ...item,
          isTemplate: true,
        }));
        setRecentScans(templateDataWithFlag);
        setLoading(false);
        return;
      }
      try {
        const response = await api.getAllScanHistory(token);
        const scans = response.history;

        if (!Array.isArray(scans)) {
          console.error("Invalid response format:", response);
          setRecentScans([]);
          return;
        }

        // Mengubah format data untuk disesuaikan dengan tampilan
        const formattedScans = scans.map((scan) => ({
          id: scan.filename,
          filename: scan.filename,
          timestamp: scan.uploaded_at,
          energi: scan.kandungan_gizi.energi || 0,
          karbohidrat: scan.kandungan_gizi.karbohidrat || 0,
          protein: scan.kandungan_gizi.protein || 0,
        }));

        // Sort by timestamp descending (newest first)
        const sortedData = formattedScans.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );

        // Get only first 3 items
        const latestScans = sortedData.slice(0, 3);
        setRecentScans(latestScans);
      } catch (error) {
        console.error("Failed to fetch scan history:", error);
        setRecentScans([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentScans();
  }, [token]);

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Template Data";
    const date = new Date(timestamp);
    return date.toLocaleString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateTimeAgo = (timestamp) => {
    if (!timestamp) return "Template";
    const now = new Date();
    const then = new Date(timestamp);
    const diffInSeconds = Math.floor((now - then) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} detik yang lalu`;
    }
    if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} menit yang lalu`;
    }
    if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} jam yang lalu`;
    }
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} hari yang lalu`;
  };

  if (loading) {
    return (
      <motion.section
        className="py-16 bg-gradient-to-br from-white via-gray-50 to-highlight/5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-main mb-8">Memuat data...</h2>
        </div>
      </motion.section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-highlight/5">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between mb-8">
          <motion.h2
            className="text-3xl font-bold text-main flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-highlight mr-3"
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
            Riwayat Scan Terakhir
          </motion.h2>
          <motion.button
            onClick={() => navigate("/history")}
            className="px-4 py-2 text-white bg-highlight hover:bg-highlight/90 transition-all duration-300 rounded-lg shadow-sm hover:shadow flex items-center gap-2 font-medium"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Lihat Semua
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
          </motion.button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentScans.map((scan, index) => (
            <motion.div
              key={scan.id || index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1, // Memberikan delay berdasarkan index
              }}
              whileHover={{
                y: -5,
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              {" "}
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-main">
                  {scan.isTemplate
                    ? scan.title
                    : formatTimestamp(scan.timestamp)}
                </h3>
                <span className="text-sm text-gray-500">
                  {scan.isTemplate
                    ? index === 0
                      ? "2 jam yang lalu"
                      : index === 1
                      ? "5 jam yang lalu"
                      : "8 jam yang lalu"
                    : calculateTimeAgo(scan.timestamp)}
                </span>
              </div>
              <div className="flex items-start gap-4">
                <motion.img
                  src={
                    scan.isTemplate
                      ? scan.image
                      : `${BASE_URL}/images/${scan.filename}`
                  }
                  alt={scan.isTemplate ? scan.title : "Food Image"}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/150?text=No+Image";
                  }}
                  className="w-16 h-16 rounded-lg object-cover border-2 border-highlight/30 shadow-md"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                />
                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Energi: {scan.energi || 0} kkal
                  </p>
                  <div className="flex gap-2">
                    <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                      Karbohidrat: {scan.karbohidrat || 0}g
                    </span>
                    <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
                      Protein: {scan.protein || 0}g
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentScans;
