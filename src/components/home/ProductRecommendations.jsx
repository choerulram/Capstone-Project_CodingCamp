import React from "react";

const ProductRecommendations = () => {
  return (
    <section className="py-16 bg-gradient-to-bl from-gray-50 via-white to-highlight/5">
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
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          Produk Rekomendasi untuk Anda
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group">
            <div className="relative mb-4">
              <img
                src="https://images.unsplash.com/photo-1576186726115-4d51596775d1"
                alt="Granola Bar"
                className="w-full h-48 object-cover rounded-lg"
              />
              <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                Sehat
              </span>
            </div>
            <h3 className="font-semibold text-main mb-2">
              Granola Bar Oatmeal
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Camilan sehat kaya serat dan protein
            </p>
            <div className="flex gap-2 mb-4">
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                180 kkal
              </span>
              <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
                5g protein
              </span>
            </div>
            <button className="w-full py-2 text-highlight border border-highlight/20 rounded-lg hover:bg-highlight/5 transition-colors">
              Lihat Detail
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group">
            <div className="relative mb-4">
              <img
                src="https://images.unsplash.com/photo-1563636619-e9143da7973b"
                alt="Greek Yogurt"
                className="w-full h-48 object-cover rounded-lg"
              />
              <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                Protein Tinggi
              </span>
            </div>
            <h3 className="font-semibold text-main mb-2">
              Greek Yogurt Original
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Yogurt tinggi protein rendah lemak
            </p>
            <div className="flex gap-2 mb-4">
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                120 kkal
              </span>
              <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
                15g protein
              </span>
            </div>
            <button className="w-full py-2 text-highlight border border-highlight/20 rounded-lg hover:bg-highlight/5 transition-colors">
              Lihat Detail
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group">
            <div className="relative mb-4">
              <img
                src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f"
                alt="Almond Milk"
                className="w-full h-48 object-cover rounded-lg"
              />
              <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                Rendah Kalori
              </span>
            </div>
            <h3 className="font-semibold text-main mb-2">
              Susu Almond Original
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Alternatif susu rendah kalori
            </p>
            <div className="flex gap-2 mb-4">
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                30 kkal
              </span>
              <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
                1g protein
              </span>
            </div>
            <button className="w-full py-2 text-highlight border border-highlight/20 rounded-lg hover:bg-highlight/5 transition-colors">
              Lihat Detail
            </button>
          </div>

          <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group">
            <div className="relative mb-4">
              <img
                src="https://images.unsplash.com/photo-1604431696980-094b6012d1b3"
                alt="Mixed Nuts"
                className="w-full h-48 object-cover rounded-lg"
              />
              <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                Omega 3
              </span>
            </div>
            <h3 className="font-semibold text-main mb-2">Mix Nuts Premium</h3>
            <p className="text-sm text-gray-600 mb-3">
              Camilan sehat kaya nutrisi
            </p>
            <div className="flex gap-2 mb-4">
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                160 kkal
              </span>
              <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
                6g protein
              </span>
            </div>
            <button className="w-full py-2 text-highlight border border-highlight/20 rounded-lg hover:bg-highlight/5 transition-colors">
              Lihat Detail
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductRecommendations;
