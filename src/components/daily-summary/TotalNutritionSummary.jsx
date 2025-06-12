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
        const todayScans = data?.history || [];

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
    <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border border-main/30 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 animate-slide-in-bottom scroll-mt-24">
      <h2 className="text-xl font-bold text-main mb-6 flex items-center animate-float">
        <span className="bg-main p-3 rounded-xl mr-3">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
            />
          </svg>
        </span>
        Total Nutrisi Hari Ini
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Kalori */}
        <div className="group bg-gradient-to-br from-orange-50 to-white p-4 rounded-xl border border-orange-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 animate-scaleIn animate-delay-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-orange-100 text-orange-600 group-hover:bg-orange-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </span>{" "}
            <div className="text-sm font-medium text-gray-600 group-hover:text-orange-700 transition-colors duration-300">
              Total Energi
            </div>
          </div>
          <div className="text-2xl font-bold text-orange-600 group-hover:text-orange-700 transition-all duration-300 group-hover:scale-105">
            {totalNutrition.energi.toFixed(1)}{" "}
            <span className="text-base font-medium">kkal</span>
          </div>
        </div>

        {/* Protein */}
        <div className="group bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 animate-scaleIn animate-delay-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-600 group-hover:bg-blue-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </span>
            <div className="text-sm font-medium text-gray-600 group-hover:text-blue-700">
              Total Protein
            </div>
          </div>
          <div className="text-2xl font-bold text-blue-600 group-hover:text-blue-700">
            {totalNutrition.protein.toFixed(1)}{" "}
            <span className="text-base font-medium">g</span>
          </div>
        </div>

        {/* Lemak total */}
        <div className="group bg-gradient-to-br from-yellow-50 to-white p-4 rounded-xl border border-yellow-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 animate-scaleIn animate-delay-300">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-yellow-100 text-yellow-600 group-hover:bg-yellow-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </span>
            <div className="text-sm font-medium text-gray-600 group-hover:text-yellow-700">
              Total Lemak
            </div>
          </div>
          <div className="text-2xl font-bold text-yellow-600 group-hover:text-yellow-700">
            {totalNutrition.lemak_total.toFixed(1)}{" "}
            <span className="text-base font-medium">g</span>
          </div>
        </div>

        {/* Karbohidrat */}
        <div className="group bg-gradient-to-br from-purple-50 to-white p-4 rounded-xl border border-purple-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 animate-scaleIn animate-delay-400">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-purple-100 text-purple-600 group-hover:bg-purple-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 15v4c0 1.1.9 2 2 2h4M21 9v-4c0-1.1-.9-2-2-2h-4m0 0l-4 4m4-4v12"
                />
              </svg>
            </span>
            <div className="text-sm font-medium text-gray-600 group-hover:text-purple-700">
              Total Karbohidrat
            </div>
          </div>
          <div className="text-2xl font-bold text-purple-600 group-hover:text-purple-700">
            {totalNutrition.karbohidrat.toFixed(1)}{" "}
            <span className="text-base font-medium">g</span>
          </div>
        </div>

        {/* Serat */}
        <div className="group bg-gradient-to-br from-green-50 to-white p-4 rounded-xl border border-green-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 animate-scaleIn animate-delay-500">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-green-100 text-green-600 group-hover:bg-green-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </span>
            <div className="text-sm font-medium text-gray-600 group-hover:text-green-700">
              Total Serat
            </div>
          </div>
          <div className="text-2xl font-bold text-green-600 group-hover:text-green-700">
            {totalNutrition.serat.toFixed(1)}{" "}
            <span className="text-base font-medium">g</span>
          </div>
        </div>

        {/* Gula */}
        <div className="group bg-gradient-to-br from-pink-50 to-white p-4 rounded-xl border border-pink-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 animate-scaleIn animate-delay-600">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-pink-100 text-pink-600 group-hover:bg-pink-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </span>
            <div className="text-sm font-medium text-gray-600 group-hover:text-pink-700">
              Total Gula
            </div>
          </div>
          <div className="text-2xl font-bold text-pink-600 group-hover:text-pink-700">
            {totalNutrition.gula.toFixed(1)}{" "}
            <span className="text-base font-medium">g</span>
          </div>
        </div>

        {/* Garam */}
        <div className="group bg-gradient-to-br from-cyan-50 to-white p-4 rounded-xl border border-cyan-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 animate-scaleIn animate-delay-700">
          <div className="flex items-center gap-2 mb-2">
            <span className="p-1.5 rounded-lg bg-cyan-100 text-cyan-600 group-hover:bg-cyan-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </span>
            <div className="text-sm font-medium text-gray-600 group-hover:text-cyan-700">
              Total Garam
            </div>
          </div>
          <div className="text-2xl font-bold text-cyan-600 group-hover:text-cyan-700">
            {totalNutrition.garam.toFixed(1)}{" "}
            <span className="text-base font-medium">mg</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalNutritionSummary;
