import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import api from "../../utils/api";

const defaultKebutuhanHarian = {
  kebutuhan_harian: {
    energi: 2000,
    protein: 60,
    "lemak total": 70,
    karbohidrat: 300,
    serat: 25,
    gula: 50,
    garam: 2000,
  },
};

const MonthlyProductRecommendation = () => {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  const getNewRecommendation = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!token) {
        throw new Error("Anda harus login terlebih dahulu.");
      }

      // Mengambil riwayat pemindaian minggu ini
      const historyData = await api.getAllScanHistory(token);

      // Filter untuk data bulan ini
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      const monthlyHistory = (historyData?.history || []).filter((item) => {
        const scanDate = new Date(item.uploaded_at);
        return scanDate >= startOfMonth && scanDate <= endOfMonth;
      });

      if (monthlyHistory.length === 0) {
        throw new Error(
          "Anda belum memiliki riwayat pemindaian bulan ini. Silakan lakukan pemindaian makanan terlebih dahulu."
        );
      }

      // Mengambil data target harian dari API
      const dailyNutritionData = await api.getDailyNutrition(token);

      // Menggunakan data dari API atau nilai default
      const kebutuhanHarian =
        dailyNutritionData?.kebutuhan_harian ||
        defaultKebutuhanHarian.kebutuhan_harian;

      // Menghitung jumlah hari dalam bulan ini
      const daysInMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0
      ).getDate();

      // Mengalikan target harian dengan jumlah hari dalam bulan untuk mendapatkan target bulanan
      const targetBulanan = {
        energy_kal: Number(kebutuhanHarian.energi) * daysInMonth,
        protein_g: Number(kebutuhanHarian.protein) * daysInMonth,
        fat_g: Number(kebutuhanHarian["lemak total"]) * daysInMonth,
        carbohydrate_g: Number(kebutuhanHarian.karbohidrat) * daysInMonth,
        fiber_g: Number(kebutuhanHarian.serat) * daysInMonth,
        sugar_g: Number(kebutuhanHarian.gula) * daysInMonth,
        sodium_mg: Number(kebutuhanHarian.garam) * daysInMonth,
      };

      // Menghitung total nutrisi bulanan
      const totalGizi = monthlyHistory.reduce((acc, item) => {
        const gizi = item.kandungan_gizi || {};
        return {
          energy_kal: (acc.energy_kal || 0) + Number(gizi.energi || 0),
          protein_g: (acc.protein_g || 0) + Number(gizi.protein || 0),
          fat_g: (acc.fat_g || 0) + Number(gizi["lemak total"] || 0),
          carbohydrate_g:
            (acc.carbohydrate_g || 0) + Number(gizi.karbohidrat || 0),
          fiber_g: (acc.fiber_g || 0) + Number(gizi.serat || 0),
          sugar_g: (acc.sugar_g || 0) + Number(gizi.gula || 0),
          sodium_mg: (acc.sodium_mg || 0) + Number(gizi.garam || 0),
        };
      }, {});

      // Log informasi nutrisi bulanan
      console.log("=== Informasi Nutrisi Bulanan ===");
      console.log("Target Bulanan:", targetBulanan);
      console.log("Total Konsumsi Bulanan:", totalGizi);

      // Menyiapkan payload sesuai format API
      const inputData = {
        konsumsi: totalGizi,
        target_harian: targetBulanan, // Menggunakan target bulanan
      };

      // Mendapatkan dan menyimpan rekomendasi baru
      const recommendationData = await api.getRecommendation(token, inputData);
      if (recommendationData) {
        await api.saveRecommendation(token, inputData);
        setRecommendation(recommendationData);
      }
    } catch (err) {
      console.error("Recommendation Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const getLastRecommendation = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (!token) {
        throw new Error("Anda harus login terlebih dahulu.");
      }

      // Mengambil riwayat rekomendasi terakhir
      const historyResponse = await api.getRecommendationHistory(token);

      if (historyResponse?.history && historyResponse.history.length > 0) {
        const lastRecommendation = historyResponse.history[0].recommendation;
        setRecommendation(lastRecommendation);
      } else {
        // Jika tidak ada history, maka generate rekomendasi baru
        await getNewRecommendation();
      }
    } catch (err) {
      console.error("History Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token, getNewRecommendation]);

  // Handle refresh button click
  const handleRefresh = () => {
    getNewRecommendation();
  };

  // Load last recommendation when component mounts
  useEffect(() => {
    if (token) {
      getLastRecommendation();
    }
  }, [token, getLastRecommendation]);

  return (
    <div
      id="weekly-nutrition-recommendation"
      className="bg-gradient-to-br from-white to-gray-50 p-4 md:p-8 rounded-xl md:rounded-2xl border border-main/30 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 animate-slide-in-bottom scroll-mt-24"
    >
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-bold text-main flex items-center animate-float">
          <span className="bg-main p-2 md:p-3 rounded-lg md:rounded-xl mr-2 md:mr-3">
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </span>
          Rekomendasi Produk Bulanan
        </h2>
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="p-2 md:p-3 rounded-lg md:rounded-xl bg-main text-secondary hover:bg-main/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          title="Perbarui rekomendasi"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 md:h-6 md:w-6 ${loading ? "animate-spin" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div>

      <div className="mb-4 md:mb-6 animate-fade-in animate-delay-100">
        <p className="text-xs md:text-sm text-gray-600">
          {loading
            ? "Memuat rekomendasi produk mingguan..."
            : "Rekomendasi produk berdasarkan konsumsi gizi bulanan Anda"}
        </p>
      </div>

      {error && (
        <div className="p-4 md:p-6 bg-red-50 text-red-800 rounded-xl md:rounded-2xl mb-4 md:mb-6 border border-red-200 shadow-sm animate-fade-in-down">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-base md:text-lg font-semibold mb-1">
                Oops! Ada masalah
              </h3>
              <p className="text-sm md:text-base text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center p-8 md:p-12 animate-pulse">
          <div className="relative">
            <div className="w-12 h-12 md:w-16 md:h-16 border-4 border-secondary border-t-main rounded-full animate-spin"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-main"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
          </div>
          <p className="mt-4 text-sm md:text-base text-main font-medium">
            Sedang memuat rekomendasi bulanan...
          </p>
        </div>
      )}

      {recommendation && !loading && (
        <div className="space-y-4 md:space-y-6">
          {/* Area Fokus Gizi */}
          {Array.isArray(recommendation.gizi_fokus) &&
            recommendation.gizi_fokus.length > 0 && (
              <div className="bg-yellow-50/80 backdrop-blur-sm p-4 md:p-6 rounded-xl md:rounded-2xl border border-yellow-200 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden">
                <div className="flex items-center mb-2 md:mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 md:h-6 md:w-6 mr-2 text-yellow-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-base md:text-lg font-bold text-yellow-800">
                    Area Fokus Gizi Bulanan
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-yellow-700 mb-4 animate-fade-in animate-delay-100">
                  Area Fokus Gizi di bawah ini adalah nutrisi yang{" "}
                  <span className="font-semibold">belum terpenuhi</span> sesuai
                  target bulanan Anda. Silakan penuhi kebutuhan gizi tersebut
                  untuk hasil yang optimal.
                </p>
                <div className="flex flex-wrap gap-3 md:gap-4 justify-start items-center">
                  {recommendation.gizi_fokus.map((nutrient, index) => (
                    <div
                      key={nutrient}
                      className="flex items-center gap-2 bg-yellow-100 border border-yellow-300 px-3 py-2 rounded-lg text-xs md:text-sm font-medium text-yellow-900 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-yellow-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {nutrient.split("_")[0].charAt(0).toUpperCase() +
                        nutrient.split("_")[0].slice(1)}
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Rekomendasi Produk */}
          {Array.isArray(recommendation.rekomendasi) &&
            recommendation.rekomendasi.length > 0 && (
              <div className="bg-white/90 backdrop-blur-sm p-4 md:p-6 rounded-xl md:rounded-2xl border border-main/20 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden">
                <div className="flex items-center mb-4 md:mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 md:h-6 md:w-6 mr-2 text-main"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <h3 className="text-lg md:text-xl font-bold text-main">
                    Rekomendasi Produk Bulanan
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-gray-600 mb-4 animate-fade-in animate-delay-100">
                  <span className="font-semibold text-main">Skor Gizi</span>{" "}
                  adalah penilaian seberapa baik produk memenuhi kebutuhan gizi
                  bulanan Anda. Semakin tinggi skor gizi, semakin sesuai produk
                  tersebut dengan kebutuhan nutrisi Anda.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {recommendation.rekomendasi.map((product, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-main/20 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col justify-between hover:-translate-y-1 hover:border-main/40"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="p-6 flex flex-col gap-4 h-full">
                        <div className="flex flex-col items-center mb-2">
                          <h4
                            className="text-lg md:text-xl font-bold text-main mb-1 text-center truncate"
                            title={product.nama_produk || product.product_name}
                          >
                            {product.nama_produk || product.product_name}
                          </h4>
                          <span
                            className={`inline-block px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold shadow ${
                              product.skor_gizi >= 8
                                ? "bg-green-100 text-green-700 border border-green-200"
                                : product.skor_gizi >= 6
                                ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                                : "bg-gray-100 text-gray-700 border border-gray-200"
                            }`}
                          >
                            Skor Gizi: {product.skor_gizi?.toFixed(1)}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries({
                            Energi: "energi",
                            Protein: "protein",
                            "Lemak total": "lemak_total",
                            Karbohidrat: "karbohidrat",
                            Serat: "serat",
                            Gula: "gula",
                            Garam: "garam",
                          }).map(([label, key]) => {
                            const value = product[label];
                            if (value) {
                              return (
                                <div
                                  key={key}
                                  className="bg-gray-50 border border-main/10 rounded-lg px-3 py-2 flex flex-col items-center"
                                >
                                  <span className="text-xs md:text-sm text-gray-500 mb-1 text-center font-medium">
                                    {label}
                                  </span>
                                  <span className="text-base md:text-lg font-bold text-main text-center">
                                    {value}
                                  </span>
                                </div>
                              );
                            }
                            return null;
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default MonthlyProductRecommendation;
