import React from "react";

const HistoryFilter = ({
  searchQuery,
  setSearchQuery,
  timeFilter,
  setTimeFilter,
}) => {
  return (
    <div className="p-6 bg-gradient-to-b from-gray-50/50 to-white/50 border-b border-gray-100">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari waktu scan... contoh: 5 Juni 2025"
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
  );
};

export default HistoryFilter;
