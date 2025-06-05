import React from "react";

const NutritionTipsCard = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-main/90 via-main/80 to-main/70 text-white p-4">
        <h2 className="text-xl font-semibold">Tips Pemenuhan Nutrisi</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-teal-50 hover:bg-main/5 transition-colors duration-300 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-main mb-3">
              Sumber Nutrisi Sehat
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <span className="text-main">•</span>
                <span>Sayuran hijau segar</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-main">•</span>
                <span>Buah-buahan berwarna</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-main">•</span>
                <span>Protein tanpa lemak</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-main">•</span>
                <span>Biji-bijian utuh</span>
              </li>
            </ul>
          </div>
          <div className="bg-teal-50 hover:bg-main/5 transition-colors duration-300 rounded-xl p-5">
            <h3 className="text-lg font-semibold text-main mb-3">
              Cara Konsumsi
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <span className="text-main">•</span>
                <span>Makan secara teratur</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-main">•</span>
                <span>Porsi seimbang</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-main">•</span>
                <span>Kunyah perlahan</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-main">•</span>
                <span>Cukup air putih</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionTipsCard;
