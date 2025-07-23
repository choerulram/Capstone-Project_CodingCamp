import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../../utils/api";

const WeeklyNutritionProgress = () => {
  const { token } = useSelector((state) => state.auth);
  const [weeklyTarget, setWeeklyTarget] = useState({
    energi: 14000, // 2000 * 7
    protein: 420, // 60 * 7
    "lemak total": 490, // 70 * 7
    karbohidrat: 2100, // 300 * 7
    serat: 175, // 25 * 7
    gula: 350, // 50 * 7
    garam: 14000, // 2000 * 7
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
        // Ambil target harian dan kalikan 7 untuk target mingguan
        const dailyData = await api.getDailyNutrition(token);
        if (dailyData?.kebutuhan_harian) {
          const weekly = Object.entries(dailyData.kebutuhan_harian).reduce(
            (acc, [key, value]) => {
              acc[key] = value * 7;
              return acc;
            },
            {}
          );
          setWeeklyTarget(weekly);
        }

        // Ambil semua riwayat scan dan filter untuk minggu ini
        const scanData = await api.getAllScanHistory(token);

        const allScans = scanData?.history || [];

        // Filter untuk minggu ini (7 hari terakhir)
        const startOfWeek = new Date();
        startOfWeek.setHours(0, 0, 0, 0);
        startOfWeek.setDate(startOfWeek.getDate() - 6); // 6 hari sebelumnya + hari ini = 7 hari

        const thisWeekScans = allScans.filter((scan) => {
          // Menggunakan uploaded_at untuk filter tanggal
          const scanDate = new Date(scan.uploaded_at);
          const isThisWeek = scanDate >= startOfWeek;
          return isThisWeek;
        });


        const totals = thisWeekScans.reduce(
          (acc, scan) => {
            // Pastikan nutrisi ada dan konversi ke number
            acc.energi += Number(scan.kandungan_gizi?.energi || 0);
            acc.protein += Number(scan.kandungan_gizi?.protein || 0);
            acc["lemak total"] += Number(
              scan.kandungan_gizi?.["lemak total"] || 0
            );
            acc.karbohidrat += Number(scan.kandungan_gizi?.karbohidrat || 0);
            acc.serat += Number(scan.kandungan_gizi?.serat || 0);
            acc.gula += Number(scan.kandungan_gizi?.gula || 0);
            acc.garam += Number(scan.kandungan_gizi?.garam || 0);

            return acc;
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
        console.error("Error fetching weekly nutrition data:", error);
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

  // Calculate the dynamic scale for Y-axis
  const calculateDynamicScale = () => {
    let maxPercent = 0;
    nutrients.forEach((nutrient) => {
      const percent = calculatePercentage(nutrient.current, nutrient.target);
      maxPercent = Math.max(maxPercent, percent);
    });

    if (maxPercent <= 100) {
      return { maxScale: 100, step: 20 };
    }

    const roundedMax = Math.ceil(maxPercent / 60) * 60;
    return {
      maxScale: roundedMax,
      step: roundedMax / 5,
    };
  };

  // Array of nutrients in correct order with their units
  const nutrients = [
    {
      id: "energi",
      label: "Energi",
      unit: "kkal",
      target: weeklyTarget.energi,
      current: totalNutrition.energi,
    },
    {
      id: "protein",
      label: "Protein",
      unit: "g",
      target: weeklyTarget.protein,
      current: totalNutrition.protein,
    },
    {
      id: "lemak_total",
      label: "Lemak",
      unit: "g",
      target: weeklyTarget["lemak total"],
      current: totalNutrition["lemak total"],
    },
    {
      id: "karbohidrat",
      label: "Karbohidrat",
      unit: "g",
      target: weeklyTarget.karbohidrat,
      current: totalNutrition.karbohidrat,
    },
    {
      id: "serat",
      label: "Serat",
      unit: "g",
      target: weeklyTarget.serat,
      current: totalNutrition.serat,
    },
    {
      id: "gula",
      label: "Gula",
      unit: "g",
      target: weeklyTarget.gula,
      current: totalNutrition.gula,
    },
    {
      id: "garam",
      label: "Garam",
      unit: "mg",
      target: weeklyTarget.garam,
      current: totalNutrition.garam,
    },
  ];

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-4 md:p-8 rounded-xl md:rounded-2xl border border-main/30 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 animate-slide-in-bottom scroll-mt-24">
      <h2 className="text-lg md:text-xl font-bold text-main mb-4 md:mb-6 flex items-center animate-float">
        <span className="bg-main p-2 md:p-3 rounded-lg md:rounded-xl mr-2 md:mr-3">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 md:h-6 md:w-6 text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
            />
          </svg>
        </span>
        Progress Kebutuhan Mingguan
      </h2>

      <div className="bg-white/90 backdrop-blur-sm p-3 md:p-6 rounded-xl md:rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden mb-4 md:mb-8">
        <div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-gradient-to-br from-red-50 to-white border border-red-200/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-r from-red-500 to-red-600 ring-2 ring-red-200 ring-offset-1"></div>
            <div className="text-xs md:text-sm font-medium text-main">
              Berlebih &gt;100%
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-gradient-to-br from-green-50 to-white border border-green-200/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-r from-green-500 to-green-600 ring-2 ring-green-200 ring-offset-1"></div>
            <div className="text-xs md:text-sm font-medium text-main">
              Ideal 80-100%
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3 px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl bg-gradient-to-br from-yellow-50 to-white border border-yellow-200/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
            <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 ring-2 ring-yellow-200 ring-offset-1"></div>
            <div className="text-xs md:text-sm font-medium text-main">
              Kurang &lt;80%
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/90 backdrop-blur-sm p-3 md:p-6 rounded-xl md:rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-xl">
        <div className="relative h-[200px] sm:h-[360px] w-full pt-[30px]">
          {/* Chart Area with Y-axis and Grid */}
          <div className="absolute inset-0 flex pt-[30px]">
            {/* Y-axis labels (percentages) */}
            <div className="w-10 sm:w-12 md:w-16 flex flex-col justify-between h-[140px] sm:h-[300px]">
              {(() => {
                const { maxScale, step } = calculateDynamicScale();
                return Array.from(
                  { length: 6 },
                  (_, i) => maxScale - i * step
                ).map((percent) => (
                  <div key={percent} className="relative h-0">
                    <div className="absolute -top-2 right-0 flex items-center">
                      <span className="text-[8px] sm:text-[10px] md:text-xs text-main/70 mr-1 sm:mr-2 font-medium">
                        {Math.round(percent)}%
                      </span>
                      <div className="h-[1px] w-2 bg-main/30"></div>
                    </div>
                  </div>
                ));
              })()}
            </div>

            {/* Grid lines */}
            <div className="flex-1 flex flex-col justify-between h-[220px] sm:h-[300px]">
              {(() => {
                const { maxScale, step } = calculateDynamicScale();
                return Array.from(
                  { length: 6 },
                  (_, i) => maxScale - i * step
                ).map((percent) => (
                  <div key={percent} className="relative">
                    <div className="absolute top-0 w-full h-[1px] bg-gray-200"></div>
                  </div>
                ));
              })()}
            </div>
          </div>

          {/* Bars Container */}
          <div className="absolute left-10 sm:left-12 md:left-16 right-0 top-[30px] h-[140px] sm:h-[300px] flex items-stretch justify-between px-1 sm:px-2 md:px-8">
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
                  {/* Bar Container */}
                  <div className="relative w-4 sm:w-8 md:w-20 h-full">
                    {/* Target Bar */}
                    <div
                      className="absolute bottom-0 w-full rounded-md md:rounded-lg bg-gray-200/50 border border-gray-300/30 backdrop-blur-sm"
                      style={{
                        height: `${
                          (100 / calculateDynamicScale().maxScale) * 100
                        }%`,
                      }}
                    ></div>
                    {/* Progress Bar */}
                    <div
                      className={`absolute bottom-0 w-full rounded-t-md md:rounded-t-lg transition-all duration-500 ease-in-out animate-progress-grow ${
                        percentage > 100
                          ? "bg-red-500"
                          : percentage >= 80
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      } border-2 border-transparent hover:border-blue-400/80 hover:shadow-[0_0_8px_rgba(59,130,246,0.3)]`}
                      style={{
                        "--target-height": `${
                          (percentage / calculateDynamicScale().maxScale) * 100
                        }%`,
                      }}
                    >
                      {/* Shine effect */}
                      <div className="absolute inset-0 rounded-t-md md:rounded-t-lg bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"></div>
                    </div>
                  </div>

                  {/* X-axis label */}
                  <div className="absolute bottom-[-2rem] sm:bottom-[-2.5rem] left-1/2 transform -translate-x-1/2 sm:translate-x-[-50%] rotate-[-35deg] sm:rotate-[-25deg] md:rotate-0 origin-left sm:origin-center text-[8px] sm:text-[10px] md:text-sm font-semibold text-gray-700 whitespace-nowrap text-start sm:text-center">
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
                  </div>

                  {/* Tooltip */}
                  <div
                    className="absolute left-1/2 transform -translate-x-1/2 bg-gray-800/95 backdrop-blur-sm text-white px-2 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-[10px] md:text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 shadow-lg border border-gray-700/50"
                    style={{
                      bottom: `${Math.min(percentage, 100)}%`,
                      marginBottom: "8px",
                    }}
                  >
                    {/* Status Badge */}
                    <div
                      className={`text-[8px] md:text-[10px] font-medium rounded-full px-1.5 md:px-2 py-0.5 mb-1 inline-block ${
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
                    <div className="font-bold text-xs md:text-sm mb-0.5">
                      {percentage.toFixed(1)}%
                    </div>

                    {/* Values */}
                    <div className="text-gray-300 text-[8px] md:text-[10px] flex items-center gap-1">
                      <span className="font-medium">
                        {nutrient.current.toFixed(1)}
                      </span>
                      <span className="opacity-50">/</span>
                      <span>{nutrient.target.toFixed(1)}</span>
                      <span className="text-gray-400">{nutrient.unit}</span>
                    </div>

                    {/* Arrow */}
                    <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-2 md:w-3 h-2 md:h-3 bg-gray-800/95 rotate-45 border-b border-r border-gray-700/50"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyNutritionProgress;
