import React from "react";

const nutritionUnits = {
  energi: "kkal",
  protein: "g",
  "lemak total": "g",
  karbohidrat: "g",
  serat: "g",
  gula: "g",
  garam: "mg",
};

const NutritionDataCard = ({ nutritionData }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-main text-white p-4">
        <h2 className="text-xl font-semibold">Kebutuhan Nutrisi</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {Object.entries(nutritionData || {}).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-main/5 transition-colors"
            >
              <span className="text-gray-700 font-medium">
                {key
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </span>
              <span className="text-main font-bold">
                {typeof value === "number"
                  ? `${value.toFixed(1)} ${nutritionUnits[key.toLowerCase()] || ""}`
                  : value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NutritionDataCard;
