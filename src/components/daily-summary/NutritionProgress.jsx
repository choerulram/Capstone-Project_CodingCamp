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
        console.log("Daily target:", dailyData?.kebutuhan_harian);

        // Ambil dan hitung total nutrisi hari ini
        const scanData = await api.getTodayScanHistory(token);
        const todayScans = scanData?.history || [];
        console.log("Today scans:", todayScans);

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
  }, [token]); // Helper function to calculate actual percentage
  const calculatePercentage = (current, target) => {
    if (!target || target === 0) return 0;
    return (current / target) * 100;
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
    <div className="bg-gray-50 p-4 sm:p-6 rounded-xl border border-gray-100 relative animate-slide-in-bottom">
      <h2 className="text-lg sm:text-xl font-semibold text-main mb-4 sm:mb-6 flex items-center animate-float">
        <span className="bg-highlight/20 p-1.5 sm:p-2 rounded-lg mr-2">
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
      </h2>
      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
        <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-red-50 to-red-50/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-red-100 shadow-sm">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-red-600 to-red-400 shadow-inner"></div>
          <div className="text-xs sm:text-sm font-medium text-red-700">
            Berlebih &gt;100%
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-green-50 to-green-50/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-green-100 shadow-sm">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-green-600 to-green-400 shadow-inner"></div>
          <div className="text-xs sm:text-sm font-medium text-green-700">
            Ideal 80-100%
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-yellow-50 to-yellow-50/30 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-yellow-100 shadow-sm">
          <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-yellow-600 to-yellow-400 shadow-inner"></div>
          <div className="text-xs sm:text-sm font-medium text-yellow-700">
            Kurang &lt;80%
          </div>
        </div>
      </div>{" "}
      {/* Bar Chart Container */}
      <div className="relative h-[280px] sm:h-[360px] w-full pt-[30px]">
        {/* Chart Area with Y-axis and Grid */}
        <div className="absolute inset-0 flex pt-[30px]">
          {" "}
          {/* Y-axis labels (percentages) */}
          <div className="w-12 sm:w-16 flex flex-col justify-between h-[220px] sm:h-[300px]">
            {[100, 80, 60, 40, 20, 0].map((percent) => (
              <div key={percent} className="relative h-0">
                <div className="absolute -top-2 right-0 flex items-center">
                  <span className="text-[10px] sm:text-xs text-gray-600 mr-1 sm:mr-2">
                    {percent}%
                  </span>
                  <div className="h-[1px] w-2 bg-gray-300"></div>
                </div>
              </div>
            ))}
          </div>{" "}
          {/* Grid lines */}
          <div className="flex-1 flex flex-col justify-between h-[220px] sm:h-[300px]">
            {[100, 80, 60, 40, 20, 0].map((percent) => (
              <div key={percent} className="relative">
                <div className="absolute top-0 w-full h-[1px] bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>{" "}
        {/* Bars Container */}
        <div className="absolute left-12 sm:left-16 right-0 top-[30px] h-[220px] sm:h-[300px] flex items-stretch justify-between px-2 sm:px-8">
          {nutrients.map((nutrient) => {
            const percentage = calculatePercentage(
              nutrient.current,
              nutrient.target
            );
            return (
              <div
                key={nutrient.id}
                className="relative flex flex-col items-center group"
                style={{ width: `${100 / nutrients.length}%` }}
              >
                {/* Bar Container - Aligns with grid */}{" "}
                <div className="relative w-8 sm:w-14 md:w-20 h-full">
                  {/* Target Bar (Background) */}
                  <div className="absolute inset-0 rounded-lg bg-gray-200/50 border border-gray-300/30 backdrop-blur-sm"></div>{" "}
                  {/* Progress Bar */}{" "}
                  <div
                    className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-500 ease-in-out animate-progress-grow ${
                      percentage > 100
                        ? "bg-red-500"
                        : percentage >= 80
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    } border-2 border-transparent hover:border-blue-400/80 hover:shadow-[0_0_8px_rgba(59,130,246,0.3)]`}
                    style={{
                      "--target-height": `${Math.min(percentage, 100)}%`,
                    }}
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 rounded-t-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"></div>
                  </div>
                </div>{" "}
                {/* X-axis label (nutrient name) */}
                <div className="absolute bottom-[-2.5rem] sm:bottom-[-2.5rem] left-1/2 transform -translate-x-1/2 sm:translate-x-[-50%] rotate-[-25deg] sm:rotate-0 origin-left sm:origin-center text-[10px] sm:text-sm font-semibold text-gray-700 whitespace-nowrap text-start sm:text-center">
                  {nutrient.label.length > 6 && window.innerWidth < 640 ? (
                    <>
                      {nutrient.label.split(" ").map((word, i, arr) => (
                        <React.Fragment key={i}>
                          {word}
                          {i < arr.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </>
                  ) : (
                    nutrient.label
                  )}
                </div>{" "}
                {/* Tooltip */}
                <div
                  className="absolute left-1/2 transform -translate-x-1/2 bg-gray-800/95 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 shadow-lg border border-gray-700/50"
                  style={{
                    bottom: `${Math.min(percentage, 100)}%`,
                    marginBottom: "8px",
                  }}
                >
                  {/* Status Badge */}
                  <div
                    className={`text-[10px] font-medium rounded-full px-2 py-0.5 mb-1 inline-block ${
                      percentage > 100
                        ? "bg-red-500/20 text-red-300"
                        : percentage >= 80
                        ? "bg-green-500/20 text-green-300"
                        : "bg-yellow-500/20 text-yellow-300"
                    }`}
                  >
                    {percentage > 100
                      ? "Berlebihan"
                      : percentage >= 80
                      ? "Ideal"
                      : "Kurang"}
                  </div>

                  {/* Percentage */}
                  <div className="font-bold text-sm mb-0.5">
                    {percentage.toFixed(1)}%
                  </div>

                  {/* Values */}
                  <div className="text-gray-300 text-[10px] flex items-center gap-1">
                    <span className="font-medium">
                      {nutrient.current.toFixed(1)}
                    </span>
                    <span className="opacity-50">/</span>
                    <span>{nutrient.target.toFixed(1)}</span>
                    <span className="text-gray-400">{nutrient.unit}</span>
                  </div>

                  {/* Arrow */}
                  <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-800/95 rotate-45 border-b border-r border-gray-700/50"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NutritionProgress;
