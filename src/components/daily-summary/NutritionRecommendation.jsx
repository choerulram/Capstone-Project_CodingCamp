import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api, { BASE_URL } from "../../utils/api";

const NutritionRecommendation = () => {
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
      className="bg-gray-50 p-6 rounded-xl border border-gray-100 animate-fade-in scroll-mt-24"
    >
      <h2 className="text-xl font-semibold text-main mb-6 flex items-center animate-fade-in-down">
        <span className="bg-highlight/20 p-2 rounded-lg mr-2 animate-bounce-slow">
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
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        </span>
        Rekomendasi Gizi
      </h2>

      <div className="mb-6 animate-fade-in animate-delay-100">
        <p className="text-sm text-gray-600">
          {loading
            ? "Memuat rekomendasi nutrisi..."
            : "Rekomendasi nutrisi berdasarkan konsumsi harian Anda"}
        </p>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg mb-6 border border-red-100 animate-fade-in-down">
          <div className="flex items-center gap-3">
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-main"></div>
        </div>
      )}

      {recommendation && !loading && (
        <div className="space-y-6">
          {/* Area Fokus Gizi */}
          {recommendation.gizi_fokus &&
            recommendation.gizi_fokus.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-100/50">
                <h3 className="text-lg font-semibold text-main mb-4">
                  Area Fokus Gizi
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {recommendation.gizi_fokus.map((nutrient, index) => (
                    <div
                      key={nutrient}
                      className="bg-highlight/10 p-3 rounded-lg text-sm font-medium text-highlight animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
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
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-main">
                  Rekomendasi Produk
                </h3>
                <div className="grid gap-4">
                  {recommendation.rekomendasi.map((product, index) => (
                    <div
                      key={index}
                      className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100/50 overflow-hidden hover:shadow-md transition-all duration-300 animate-fade-in-right"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-lg font-semibold text-main">
                            {product.product_name}
                          </h4>
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                            Skor: {product.skor_gizi.toFixed(1)}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            "Energi",
                            "Protein",
                            "Lemak total",
                            "Karbohidrat",
                            "Serat",
                            "Gula",
                            "Garam",
                          ].map(
                            (key) =>
                              product[key] && (
                                <div
                                  key={key}
                                  className="bg-gray-50/80 p-3 rounded-lg"
                                >
                                  <div className="text-sm text-gray-600">
                                    {key}
                                  </div>
                                  <div className="font-medium text-main">
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

export default NutritionRecommendation;
