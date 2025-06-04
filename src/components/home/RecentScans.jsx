import React from "react";

const RecentScans = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-highlight/5">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-main mb-8 flex items-center">
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
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-main">Mie Instan Goreng</h3>
              <span className="text-sm text-gray-500">2 jam yang lalu</span>
            </div>
            <div className="flex items-start gap-4 mb-4">
              <img
                src="https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?ixlib=rb-4.0.3"
                alt="Mie Goreng"
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <p className="text-sm text-gray-600 mb-2">Kalori: 380 kkal</p>
                <div className="flex gap-2">
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                    Karbohidrat: 56g
                  </span>
                  <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
                    Protein: 8g
                  </span>
                </div>
              </div>
            </div>
            <button className="w-full mt-2 text-center py-2 text-highlight hover:text-highlight/80 transition-colors duration-300 border border-highlight/20 rounded-lg hover:bg-highlight/5">
              Lihat Detail →
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-main">Roti Gandum</h3>
              <span className="text-sm text-gray-500">5 jam yang lalu</span>
            </div>
            <div className="flex items-start gap-4 mb-4">
              <img
                src="https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3"
                alt="Roti Gandum"
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <p className="text-sm text-gray-600 mb-2">Kalori: 180 kkal</p>
                <div className="flex gap-2">
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                    Karbohidrat: 35g
                  </span>
                  <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
                    Protein: 6g
                  </span>
                </div>
              </div>
            </div>
            <button className="w-full mt-2 text-center py-2 text-highlight hover:text-highlight/80 transition-colors duration-300 border border-highlight/20 rounded-lg hover:bg-highlight/5">
              Lihat Detail →
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-main">Yogurt Greek</h3>
              <span className="text-sm text-gray-500">8 jam yang lalu</span>
            </div>
            <div className="flex items-start gap-4 mb-4">
              <img
                src="https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3"
                alt="Yogurt Greek"
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <p className="text-sm text-gray-600 mb-2">Kalori: 120 kkal</p>
                <div className="flex gap-2">
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                    Karbohidrat: 9g
                  </span>
                  <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
                    Protein: 15g
                  </span>
                </div>
              </div>
            </div>
            <button className="w-full mt-2 text-center py-2 text-highlight hover:text-highlight/80 transition-colors duration-300 border border-highlight/20 rounded-lg hover:bg-highlight/5">
              Lihat Detail →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentScans;
