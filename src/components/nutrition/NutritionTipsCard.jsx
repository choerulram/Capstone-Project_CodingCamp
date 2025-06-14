import React from "react";

const NutritionTipsCard = () => {
  return (
    <div
      className="bg-white rounded-lg md:rounded-xl shadow-lg overflow-hidden animate-fade-in"
      style={{ animationDelay: "400ms" }}
    >
      <div className="bg-gradient-to-r from-main/90 via-main/80 to-main/70 text-white p-3 md:p-4">
        <h2 className="text-lg md:text-xl font-semibold">
          Tips Pemenuhan Nutrisi
        </h2>
      </div>
      <div className="p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {" "}
          <div
            className="bg-teal-50 hover:bg-main/5 transition-all duration-300 rounded-lg md:rounded-xl p-3 md:p-5 hover:shadow-lg animate-fade-in-left"
            style={{ animationDelay: "500ms" }}
          >
            <h3 className="text-lg font-semibold text-main mb-3 transition-all duration-300 hover:scale-105">
              Sumber Nutrisi Sehat
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 transition-all duration-300 hover:translate-x-1">
                <span className="text-main">•</span>
                <span>Sayuran hijau segar</span>
              </li>
              <li className="flex items-center space-x-2 transition-all duration-300 hover:translate-x-1">
                <span className="text-main">•</span>
                <span>Buah-buahan berwarna</span>
              </li>
              <li className="flex items-center space-x-2 transition-all duration-300 hover:translate-x-1">
                <span className="text-main">•</span>
                <span>Protein tanpa lemak</span>
              </li>
              <li className="flex items-center space-x-2 transition-all duration-300 hover:translate-x-1">
                <span className="text-main">•</span>
                <span>Biji-bijian utuh</span>
              </li>
            </ul>
          </div>
          <div
            className="bg-teal-50 hover:bg-main/5 transition-all duration-300 rounded-xl p-5 hover:shadow-lg animate-fade-in-right"
            style={{ animationDelay: "600ms" }}
          >
            <h3 className="text-lg font-semibold text-main mb-3 transition-all duration-300 hover:scale-105">
              Cara Konsumsi
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 transition-all duration-300 hover:translate-x-1">
                <span className="text-main">•</span>
                <span>Makan secara teratur</span>
              </li>
              <li className="flex items-center space-x-2 transition-all duration-300 hover:translate-x-1">
                <span className="text-main">•</span>
                <span>Porsi seimbang</span>
              </li>
              <li className="flex items-center space-x-2 transition-all duration-300 hover:translate-x-1">
                <span className="text-main">•</span>
                <span>Kunyah perlahan</span>
              </li>
              <li className="flex items-center space-x-2 transition-all duration-300 hover:translate-x-1">
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
