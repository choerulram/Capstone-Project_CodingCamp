import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScanHistoryCard from "../components/ScanHistoryCard";

const HistoryPage = () => {
  // This will be replaced with actual data from your state management
  const [history] = useState([
    {
      id: 1,
      productName: "Susu Ultra Milk",
      timestamp: new Date(),
      calories: 120,
      protein: 8,
      carbs: 12,
      fat: 4,
      imageUrl: "/placeholder-milk.jpg",
    },
    {
      id: 2,
      productName: "Roti Gandum",
      timestamp: new Date(Date.now() - 86400000), // yesterday
      calories: 180,
      protein: 6,
      carbs: 35,
      fat: 2,
      imageUrl: "/placeholder-bread.jpg",
    },
  ]);

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
        </div>

        {/* Filter and Search Section */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Cari produk..."
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-transparent">
                <option value="">Semua Waktu</option>
                <option value="today">Hari Ini</option>
                <option value="week">Minggu Ini</option>
                <option value="month">Bulan Ini</option>
              </select>
              <button className="px-6 py-2 bg-main text-white rounded-lg hover:bg-teal-700 transition-colors duration-300">
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-4">
          {history.length > 0 ? (
            history.map((scan) => <ScanHistoryCard key={scan.id} scan={scan} />)
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

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <nav className="flex items-center space-x-2">
            <button className="px-3 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50">
              &lt;
            </button>
            <button className="px-3 py-1 rounded bg-main text-white">1</button>
            <button className="px-3 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50">
              2
            </button>
            <button className="px-3 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50">
              3
            </button>
            <button className="px-3 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50">
              &gt;
            </button>
          </nav>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HistoryPage;
