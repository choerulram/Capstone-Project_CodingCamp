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
        <div
          className="overflow-x-auto animate-fade-in"
          style={{ animationDelay: "100ms" }}
        >
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-3 text-left text-gray-700 font-semibold">
                  Nutrisi
                </th>
                <th className="py-2 px-3 text-center text-main font-semibold">
                  Per Hari
                </th>
                <th className="py-2 px-3 text-center text-main font-semibold">
                  Per Minggu
                </th>
                <th className="py-2 px-3 text-center text-main font-semibold">
                  Per Bulan
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(nutritionData || {}).map(
                ([key, value], index) => {
                  const unit = nutritionUnits[key.toLowerCase()] || "";
                  return (
                    <tr
                      key={key}
                      className="hover:bg-main/5 transition-all duration-300"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        animation: "fadeInUp 0.5s ease-out forwards",
                      }}
                    >
                      <td className="py-2 px-3 text-gray-700 font-medium">
                        {key
                          .split("_")
                          .map(
                            (word) =>
                              word.charAt(0).toUpperCase() + word.slice(1)
                          )
                          .join(" ")}
                      </td>
                      <td className="py-2 px-3 text-main font-bold text-center">
                        {typeof value === "number"
                          ? `${value.toFixed(1)} ${unit}`
                          : value}
                      </td>
                      <td className="py-2 px-3 text-main font-bold text-center">
                        {typeof value === "number"
                          ? `${(value * 7).toFixed(1)} ${unit}`
                          : "-"}
                      </td>
                      <td className="py-2 px-3 text-main font-bold text-center">
                        {typeof value === "number"
                          ? `${(value * 30).toFixed(1)} ${unit}`
                          : "-"}
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NutritionDataCard;
