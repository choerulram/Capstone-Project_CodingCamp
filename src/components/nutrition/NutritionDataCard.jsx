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
    <div
      className="w-full overflow-x-auto animate-fade-in scrollbar-thin scrollbar-thumb-main/30 scrollbar-track-transparent"
      style={{ animationDelay: "100ms" }}
    >
      <div className="min-w-[500px] md:min-w-0 rounded-xl shadow-lg border border-main/10 overflow-hidden">
        <table className="min-w-full border-collapse text-base md:text-base">
          <thead>
            <tr className="bg-main">
              <th className="py-2 px-2 md:py-3 md:px-4 text-center text-white text-lg md:text-xl font-semibold border-b border-white/30 border-r border-white/30 first:border-l">
                Nutrisi
              </th>
              <th className="py-2 px-2 md:py-3 md:px-4 text-center text-white text-lg md:text-xl font-semibold border-b border-white/30 border-r border-white/30">
                Per Hari
              </th>
              <th className="py-2 px-2 md:py-3 md:px-4 text-center text-white text-lg md:text-xl font-semibold border-b border-white/30 border-r border-white/30">
                Per Minggu
              </th>
              <th className="py-2 px-2 md:py-3 md:px-4 text-center text-white text-lg md:text-xl font-semibold border-b border-white/30 border-r border-white/30 last:border-r-0">
                Per Bulan
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(nutritionData || {}).map(([key, value], index) => {
              const unit = nutritionUnits[key.toLowerCase()] || "";
              return (
                <tr
                  key={key}
                  className={
                    index % 2 === 0
                      ? "bg-white hover:bg-main/5 transition-all duration-200"
                      : "bg-gray-50 hover:bg-main/5 transition-all duration-200"
                  }
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: "fadeInUp 0.5s ease-out forwards",
                  }}
                >
                  <td className="py-2 px-2 md:py-2 md:px-4 text-gray-800 font-medium text-base md:text-base border-b border-main/10 border-r border-main/10 first:border-l">
                    {key
                      .split("_")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </td>
                  <td className="py-2 px-2 md:py-2 md:px-4 text-main font-bold text-base md:text-base border-b border-main/10 border-r border-main/10">
                    {typeof value === "number"
                      ? `${value.toFixed(1)} ${unit}`
                      : value}
                  </td>
                  <td className="py-2 px-2 md:py-2 md:px-4 text-main font-bold text-base md:text-base border-b border-main/10 border-r border-main/10">
                    {typeof value === "number"
                      ? `${(value * 7).toFixed(1)} ${unit}`
                      : "-"}
                  </td>
                  <td className="py-2 px-2 md:py-2 md:px-4 text-main font-bold text-base md:text-base border-b border-main/10 border-r border-main/10 last:border-r-0">
                    {typeof value === "number"
                      ? `${(value * 30).toFixed(1)} ${unit}`
                      : "-"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NutritionDataCard;
