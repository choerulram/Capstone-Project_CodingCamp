import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../../utils/api";

const NutritionProgress = () => {
  const { token } = useSelector((state) => state.auth);
  const [dailyTarget, setDailyTarget] = useState({
    energi: 2000,
    protein: 60,
    "lemak total": 70,
    karbohidrat: 300,
    serat: 25,
    gula: 50,
    garam: 2000,
  });
  const [totalNutrition, setTotalNutrition] = useState({
    energi: 0,
    protein: 0,
    "lemak total": 0,
    karbohidrat: 0,
    serat: 0,
    gula: 0,
    garam: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ambil target harian
        const dailyData = await api.getDailyNutrition(token);
        if (dailyData?.kebutuhan_harian) {
          setDailyTarget(dailyData.kebutuhan_harian);
        }

        // Ambil dan hitung total nutrisi hari ini
        const scanData = await api.getTodayScanHistory(token);
        const today = new Date().toISOString().slice(0, 10);
        const todayScans = (scanData?.history || []).filter(
          (item) => (item.uploaded_at || "").slice(0, 10) === today
        );

        const totals = todayScans.reduce(
          (acc, scan) => {
            const gizi = scan.kandungan_gizi || {};
            return {
              energi: acc.energi + Number(gizi.energi || 0),
              protein: acc.protein + Number(gizi.protein || 0),
              "lemak total":
                acc["lemak total"] + Number(gizi["lemak total"] || 0),
              karbohidrat: acc.karbohidrat + Number(gizi.karbohidrat || 0),
              serat: acc.serat + Number(gizi.serat || 0),
              gula: acc.gula + Number(gizi.gula || 0),
              garam: acc.garam + Number(gizi.garam || 0),
            };
          },
          {
            energi: 0,
            protein: 0,
            "lemak total": 0,
            karbohidrat: 0,
            serat: 0,
            gula: 0,
            garam: 0,
          }
        );

        setTotalNutrition(totals);
      } catch (error) {
        console.error("Error fetching nutrition data:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);
  // Helper function to calculate actual percentage
  const calculatePercentage = (current, target) => {
    if (!target || target === 0) return 0;
    return (current / target) * 100;
  };

  // Helper function to calculate progress bar width (capped at 100%)
  const calculateProgressWidth = (current, target) => {
    return Math.min(calculatePercentage(current, target), 100);
  };

  // Array of nutrients in correct order with their units
  const nutrients = [
    {
      id: "energi",
      label: "Energi",
      unit: "kkal",
      target: dailyTarget.energi,
      current: totalNutrition.energi,
    },
    {
      id: "protein",
      label: "Protein",
      unit: "g",
      target: dailyTarget.protein,
      current: totalNutrition.protein,
    },
    {
      id: "lemak_total",
      label: "Lemak",
      unit: "g",
      target: dailyTarget["lemak total"],
      current: totalNutrition["lemak total"],
    },
    {
      id: "karbohidrat",
      label: "Karbohidrat",
      unit: "g",
      target: dailyTarget.karbohidrat,
      current: totalNutrition.karbohidrat,
    },
    {
      id: "serat",
      label: "Serat",
      unit: "g",
      target: dailyTarget.serat,
      current: totalNutrition.serat,
    },
    {
      id: "gula",
      label: "Gula",
      unit: "g",
      target: dailyTarget.gula,
      current: totalNutrition.gula,
    },
    {
      id: "garam",
      label: "Garam",
      unit: "mg",
      target: dailyTarget.garam,
      current: totalNutrition.garam,
    },
  ];

  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 relative">
      <h2 className="text-xl font-semibold text-main mb-6 flex items-center">
        <span className="bg-highlight/20 p-2 rounded-lg mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-highlight"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </span>
        Progress Kebutuhan Harian
      </h2>{" "}
      <div className="flex justify-center gap-4 mb-6">
        <div className="flex items-center gap-3 bg-gradient-to-r from-red-50 to-red-50/30 px-4 py-2 rounded-xl border border-red-100 shadow-sm">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-600 to-red-400 shadow-inner"></div>
          <div className="text-sm font-medium text-red-700">
            Berlebih &gt;100%
          </div>
        </div>
        <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-green-50/30 px-4 py-2 rounded-xl border border-green-100 shadow-sm">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-600 to-green-400 shadow-inner"></div>
          <div className="text-sm font-medium text-green-700">
            Ideal 80-100%
          </div>
        </div>
        <div className="flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-yellow-50/30 px-4 py-2 rounded-xl border border-yellow-100 shadow-sm">
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-400 shadow-inner"></div>
          <div className="text-sm font-medium text-yellow-700">
            Kurang &lt;80%
          </div>
        </div>{" "}
      </div>
      <div className="grid grid-cols-7 gap-4 h-96">
        {nutrients.map((nutrient) => (
          <div key={nutrient.id} className="flex flex-col items-center">
            <div className="text-sm font-medium text-main mb-2">
              {nutrient.current.toFixed(1)}/{Number(nutrient.target).toFixed(1)}{" "}
              {nutrient.unit}
            </div>{" "}
            <div className="relative flex-grow w-full flex items-end justify-center group">
              {/* Target bar (background) */}{" "}
              <div className="absolute inset-0 bg-gray-200/40 rounded-2xl w-28 mx-auto shadow-inner backdrop-blur-sm border border-gray-200/50">
                {/* Progress bar stacked on top */}
                <div
                  className={`absolute bottom-0 w-full rounded-2xl transition-all duration-500 shadow-lg ${
                    calculatePercentage(nutrient.current, nutrient.target) > 100
                      ? "bg-gradient-to-t from-red-600 via-red-500 to-red-400 hover:from-red-500 hover:via-red-400 hover:to-red-300 hover:shadow-red-200/50"
                      : calculatePercentage(
                          nutrient.current,
                          nutrient.target
                        ) >= 80
                      ? "bg-gradient-to-t from-green-600 via-green-500 to-green-400 hover:from-green-500 hover:via-green-400 hover:to-green-300 hover:shadow-green-200/50"
                      : "bg-gradient-to-t from-yellow-600 via-yellow-500 to-yellow-400 hover:from-yellow-500 hover:via-yellow-400 hover:to-yellow-300 hover:shadow-yellow-200/50"
                  }`}
                  style={{
                    height: `${calculateProgressWidth(
                      nutrient.current,
                      nutrient.target
                    )}%`,
                  }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/40 via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {/* Glass effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/20 to-black/5"></div>
                  {/* Bottom highlight */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/30 rounded-b-2xl"></div>
                </div>
              </div>
              {/* Enhanced hover tooltip */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-800/95 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl scale-95 group-hover:scale-100 pointer-events-none">
                <div className="font-semibold mb-1">
                  {calculatePercentage(
                    nutrient.current,
                    nutrient.target
                  ).toFixed(1)}
                  %
                </div>
                <div className="text-gray-300 text-[10px]">
                  {nutrient.current.toFixed(1)} / {nutrient.target.toFixed(1)}{" "}
                  {nutrient.unit}
                </div>
                {/* Tooltip arrow */}
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800/95 rotate-45"></div>
              </div>
            </div>
            <div className="mt-2 text-sm text-gray-600 text-center">
              {nutrient.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionProgress;
