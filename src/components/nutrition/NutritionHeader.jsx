import React from "react";

const NutritionHeader = () => {
  return (
    <div className="bg-main text-white p-8 rounded-xl shadow-lg mb-8 transition-all duration-300 hover:shadow-xl">
      <h1 className="text-3xl font-bold transform transition-all duration-300 hover:scale-105">
        Kebutuhan Gizi Harian
      </h1>
      <p className="text-lg mt-2 text-teal-100 transition-opacity duration-300 hover:text-white">
        Rekomendasi asupan gizi harian berdasarkan profil Anda
      </p>
    </div>
  );
};

export default NutritionHeader;
