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
      </h2>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="flex items-center gap-2 bg-red-50 p-3 rounded-lg border border-red-100 hover:bg-red-100 transition-colors">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="text-sm">
            <span className="font-medium text-red-700">Berlebih</span>
            <span className="text-red-600 text-xs"> (&gt;100%)</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-green-50 p-3 rounded-lg border border-green-100 hover:bg-green-100 transition-colors">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <div className="text-sm">
            <span className="font-medium text-green-700">Ideal</span>
            <span className="text-green-600 text-xs"> (80-100%)</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-yellow-50 p-3 rounded-lg border border-yellow-100 hover:bg-yellow-100 transition-colors">
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="text-sm">
            <span className="font-medium text-yellow-700">Kurang</span>
            <span className="text-yellow-600 text-xs"> (&lt;80%)</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {nutrients.map((nutrient) => (
          <div
            key={nutrient.id}
            className="bg-white p-4 rounded-lg border border-gray-100"
          >
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">{nutrient.label}</span>{" "}
              <span className="text-sm font-medium text-main">
                {nutrient.current.toFixed(1)}/
                {Number(nutrient.target).toFixed(1)} {nutrient.unit}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              {" "}
              <div
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  calculatePercentage(nutrient.current, nutrient.target) > 100
                    ? "bg-red-500"
                    : calculatePercentage(nutrient.current, nutrient.target) >=
                      80
                    ? "bg-green-500"
                    : "bg-yellow-500"
                }`}
                style={{
                  width: `${calculateProgressWidth(
                    nutrient.current,
                    nutrient.target
                  )}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NutritionProgress;
