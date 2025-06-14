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
    <div className="bg-white rounded-lg md:rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl">
      <div className="bg-main text-white p-3 md:p-4">
        <h2 className="text-lg md:text-xl font-semibold">Kebutuhan Nutrisi</h2>
      </div>
      <div className="p-4 md:p-6">
        <div className="space-y-3 md:space-y-4">
          {Object.entries(nutritionData || {}).map(([key, value], index) => (
            <div
              key={key}
              className="flex justify-between items-center p-2.5 md:p-3 bg-gray-50 rounded-lg hover:bg-main/5 transition-all duration-300 transform hover:scale-102 hover:shadow-md"
              style={{
                animationDelay: `${index * 100}ms`,
                animation: "fadeInUp 0.5s ease-out forwards",
              }}
            >
              <span className="text-gray-700 font-medium">
                {key
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
              </span>
              <span className="text-main font-bold">
                {typeof value === "number"
                  ? `${value.toFixed(1)} ${
                      nutritionUnits[key.toLowerCase()] || ""
                    }`
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
