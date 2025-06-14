import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api, { BASE_URL } from "../../utils/api";

const ProductRecommendation = () => {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const getRecommendation = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!token) {
          throw new Error("Anda harus login terlebih dahulu.");
        }

        // Mengambil riwayat pemindaian hari ini
        const historyData = await api.getTodayScanHistory(token);
        const todayHistory = historyData.history || [];

        if (todayHistory.length === 0) {
          throw new Error(
            "Anda belum memiliki riwayat pemindaian hari ini. Silakan lakukan pemindaian makanan terlebih dahulu."
          );
        }

        // Menghitung total nutrisi
        const totalGizi = todayHistory.reduce((acc, item) => {
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

        // Menyiapkan payload sesuai format API
        const inputData = {
          konsumsi: totalGizi,
          target_harian: {
            energy_kal: 2100,
            protein_g: 60,
            fat_g: 70,
            carbohydrate_g: 300,
            fiber_g: 30,
            sugar_g: 50,
            sodium_mg: 2000,
          },
        };

        // Mengambil rekomendasi
        const response = await fetch(`${BASE_URL}/recommendation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(inputData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.error ||
              data?.message ||
              "Terjadi kesalahan saat memuat rekomendasi"
          );
        }

        if (!data) {
          throw new Error("Tidak dapat memuat rekomendasi. Silakan coba lagi.");
        }

        setRecommendation(data);
      } catch (err) {
        console.error("Recommendation Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getRecommendation();
  }, [token]);
  return (
    <div
      id="nutrition-recommendation"
      className="bg-gradient-to-br from-white to-gray-50 p-4 md:p-8 rounded-xl md:rounded-2xl border border-main/30 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 animate-slide-in-bottom scroll-mt-24"
    >
      <h2 className="text-lg md:text-xl font-bold text-main mb-4 md:mb-6 flex items-center animate-float">
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
        Rekomendasi Produk
      </h2>
      <div className="mb-4 md:mb-6 animate-fade-in animate-delay-100">
        <p className="text-xs md:text-sm text-gray-600">
          {" "}
          {loading
            ? "Memuat rekomendasi produk..."
            : "Rekomendasi produk berdasarkan konsumsi gizi harian Anda"}
        </p>
      </div>{" "}
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
            {" "}
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
          </div>{" "}
          <p className="mt-4 text-sm md:text-base text-main font-medium">
            Sedang memuat rekomendasi...
          </p>
        </div>
      )}
      {recommendation && !loading && (
        <div className="space-y-4 md:space-y-6">
          {/* Area Fokus Gizi */}
          {recommendation.gizi_fokus &&
            recommendation.gizi_fokus.length > 0 && (
              <div className="bg-white/90 backdrop-blur-sm p-4 md:p-6 rounded-xl md:rounded-2xl border border-secondary shadow-sm">
                <h3 className="text-base md:text-lg font-bold text-main mb-3 md:mb-4 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5 mr-2 text-main"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Area Fokus Gizi Anda
                </h3>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
                  {recommendation.gizi_fokus.map((nutrient, index) => (
                    <div
                      key={nutrient}
                      className="bg-gradient-to-r from-highlight/20 to-secondary/30 p-2 md:p-4 rounded-lg md:rounded-xl text-xs md:text-sm font-medium text-main flex items-center gap-1 md:gap-2 shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in transform hover:-translate-y-1"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 md:h-4 md:w-4 text-main"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {nutrient.split("_")[0].charAt(0).toUpperCase() +
                        nutrient.split("_")[0].slice(1)}
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Rekomendasi Produk */}
          {recommendation.rekomendasi &&
            recommendation.rekomendasi.length > 0 && (
              <div className="space-y-4 md:space-y-6">
                <h3 className="text-lg md:text-xl font-bold text-main flex items-center">
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
                  Rekomendasi Produk untuk Anda
                </h3>
                <div className="grid gap-4 md:gap-6">
                  {recommendation.rekomendasi.map((product, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-xl md:rounded-2xl border border-secondary overflow-hidden hover:shadow-lg transition-all duration-300 animate-fade-in-right transform hover:-translate-y-1"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="p-4 md:p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4 mb-4 md:mb-6">
                          <div className="flex-1">
                            <h4 className="text-base md:text-xl font-bold text-main mb-2">
                              {product.product_name}
                            </h4>
                            <div className="flex items-center gap-2">
                              <span
                                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-semibold ${
                                  product.skor_gizi >= 8
                                    ? "bg-highlight/40 text-main"
                                    : product.skor_gizi >= 6
                                    ? "bg-secondary/50 text-main"
                                    : "bg-gray-100 text-main"
                                }`}
                              >
                                Skor Gizi: {product.skor_gizi.toFixed(1)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
                          {{
                            ["Energi"]: "⚡",
                            ["Protein"]: "🥩",
                            ["Lemak total"]: "🥑",
                            ["Karbohidrat"]: "🌾",
                            ["Serat"]: "🌿",
                            ["Gula"]: "🍯",
                            ["Garam"]: "🧂",
                          }.map(
                            ([key, emoji]) =>
                              product[key] && (
                                <div
                                  key={key}
                                  className="bg-gradient-to-br from-highlight/20 to-white p-3 md:p-4 rounded-lg md:rounded-xl shadow-sm"
                                >
                                  <div className="text-xs md:text-sm text-main font-medium flex items-center gap-1 md:gap-2 mb-1">
                                    <span>{emoji}</span>
                                    {key}
                                  </div>
                                  <div className="text-sm md:text-base font-bold text-main">
                                    {product[key]}
                                  </div>
                                </div>
                              )
                          )}
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

export default ProductRecommendation;
