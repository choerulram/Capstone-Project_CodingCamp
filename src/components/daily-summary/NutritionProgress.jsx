import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../../utils/api";

const NutritionProgress = () => {
  const { token } = useSelector((state) => state.auth);
  const [dailyTarget, setDailyTarget] = useState({
    energi: 2000,
    protein: 60,
    karbohidrat: 300,
    lemak: 70
  });
  const [totalNutrition, setTotalNutrition] = useState({
    energi: 0,
    protein: 0,
    lemak_total: 0,
    karbohidrat: 0
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
              lemak_total: acc.lemak_total + Number(gizi["lemak total"] || 0),
              karbohidrat: acc.karbohidrat + Number(gizi.karbohidrat || 0),
            };
          },
          {
            energi: 0,
            protein: 0,
            lemak_total: 0,
            karbohidrat: 0,
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
  return (
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
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
      <div className="space-y-4">
        {/* Progress Bar Kalori */}
        <div className="bg-white p-4 rounded-lg border border-gray-100">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Kalori</span>
            <span className="text-sm font-medium text-main">0/2000 kkal</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-highlight h-2.5 rounded-full"
              style={{ width: "0%" }}
            ></div>
          </div>
        </div>

        {/* Progress Bar Protein */}
        <div className="bg-white p-4 rounded-lg border border-gray-100">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Protein</span>
            <span className="text-sm font-medium text-main">0/60 g</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-highlight h-2.5 rounded-full"
              style={{ width: "0%" }}
            ></div>
          </div>
        </div>

        {/* Progress Bar Karbohidrat */}
        <div className="bg-white p-4 rounded-lg border border-gray-100">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Karbohidrat</span>
            <span className="text-sm font-medium text-main">0/300 g</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-highlight h-2.5 rounded-full"
              style={{ width: "0%" }}
            ></div>
          </div>
        </div>

        {/* Progress Bar Lemak */}
        <div className="bg-white p-4 rounded-lg border border-gray-100">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-gray-600">Lemak</span>
            <span className="text-sm font-medium text-main">0/70 g</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-highlight h-2.5 rounded-full"
              style={{ width: "0%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutritionProgress;
