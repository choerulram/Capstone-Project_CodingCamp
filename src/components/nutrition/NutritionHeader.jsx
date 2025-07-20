import React from "react";

const NutritionHeader = () => {
  return (
    <div className="bg-main text-white p-3 md:p-8 rounded-lg md:rounded-xl shadow-lg mb-3 md:mb-8 transition-all duration-300 hover:shadow-xl">
      <h1 className="text-2xl md:text-4xl font-bold transform transition-all duration-300 hover:scale-105">
        Kebutuhan Gizi Anda
      </h1>
      <p className="text-base md:text-lg mt-1 md:mt-2 text-teal-100 transition-opacity duration-300 hover:text-white">
        Tabel di bawah ini menampilkan rekomendasi asupan gizi harian, mingguan,
        dan bulanan berdasarkan profil Anda.
      </p>
    </div>
  );
};

export default NutritionHeader;
