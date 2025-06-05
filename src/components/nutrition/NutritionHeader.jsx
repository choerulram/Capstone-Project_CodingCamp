import React from "react";

const NutritionHeader = () => {
  return (
    <div className="bg-main text-white p-8 rounded-xl shadow-lg mb-8">
      <h1 className="text-3xl font-bold">Kebutuhan Gizi Harian</h1>
      <p className="text-lg mt-2 text-teal-100">
        Rekomendasi asupan gizi harian berdasarkan profil Anda
      </p>
    </div>
  );
};

export default NutritionHeader;
