import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api from "../../utils/api";

const TotalNutritionSummary = () => {
  const { token } = useSelector((state) => state.auth);
  const [totalNutrition, setTotalNutrition] = useState({
    energi: 0,
    protein: 0,
    lemak_total: 0,
    karbohidrat: 0,
    serat: 0,
    gula: 0,
    garam: 0,
  });

  useEffect(() => {
    const fetchAndCalculateTotal = async () => {
      try {
        const data = await api.getTodayScanHistory(token);
        const today = new Date().toISOString().slice(0, 10);
        const todayScans = (data?.history || []).filter(
          (item) => (item.uploaded_at || "").slice(0, 10) === today
        );

        // Menghitung total nutrisi
        const totals = todayScans.reduce(
          (acc, scan) => {
            const gizi = scan.kandungan_gizi || {};
            return {
              energi: acc.energi + Number(gizi.energi || 0),
              protein: acc.protein + Number(gizi.protein || 0),
              lemak_total: acc.lemak_total + Number(gizi["lemak total"] || 0),
              karbohidrat: acc.karbohidrat + Number(gizi.karbohidrat || 0),
              serat: acc.serat + Number(gizi.serat || 0),
              gula: acc.gula + Number(gizi.gula || 0),
              garam: acc.garam + Number(gizi.garam || 0),
            };
          },
          {
            energi: 0,
            protein: 0,
            lemak_total: 0,
            karbohidrat: 0,
            serat: 0,
            gula: 0,
            garam: 0,
          }
        );

        setTotalNutrition(totals);
      } catch (error) {
        console.error("Error calculating total nutrition:", error);
      }
    };

    if (token) {
      fetchAndCalculateTotal();
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
        Total Nutrisi Hari Ini
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Kalori */}
        <div className="bg-white p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-600 mb-1">Total Energi</div>{" "}
          <div className="text-2xl font-bold text-main">
            {totalNutrition.energi.toFixed(1)} kkal
          </div>
        </div>

        {/* Protein */}
        <div className="bg-white p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-600 mb-1">Total Protein</div>
          <div className="text-2xl font-bold text-main">
            {totalNutrition.protein.toFixed(1)} g
          </div>
        </div>

        {/* Lemak total */}
        <div className="bg-white p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-600 mb-1">Total Lemak</div>
          <div className="text-2xl font-bold text-main">
            {totalNutrition.lemak_total.toFixed(1)} g
          </div>
        </div>

        {/* Karbohidrat */}
        <div className="bg-white p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-600 mb-1">Total Karbohidrat</div>
          <div className="text-2xl font-bold text-main">
            {totalNutrition.karbohidrat.toFixed(1)} g
          </div>
        </div>

        {/* Serat */}
        <div className="bg-white p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-600 mb-1">Total Serat</div>
          <div className="text-2xl font-bold text-main">
            {totalNutrition.serat.toFixed(1)} g
          </div>
        </div>

        {/* Gula */}
        <div className="bg-white p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-600 mb-1">Total Gula</div>
          <div className="text-2xl font-bold text-main">
            {totalNutrition.gula.toFixed(1)} g
          </div>
        </div>

        {/* Garam */}
        <div className="bg-white p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
          <div className="text-sm text-gray-600 mb-1">Total Garam</div>
          <div className="text-2xl font-bold text-main">
            {totalNutrition.garam.toFixed(1)} mg
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalNutritionSummary;
