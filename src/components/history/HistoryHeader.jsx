import React from "react";

const HistoryHeader = () => {
  return (
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
        <h1 className="text-3xl font-bold text-main">Riwayat Pemindaian</h1>
      </div>
      <p className="text-gray-600 pl-[52px]">
        Lihat riwayat pemindaian informasi nutrisi produk Anda di sini.
      </p>
    </div>
  );
};

export default HistoryHeader;
