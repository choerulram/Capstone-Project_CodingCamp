import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api, { BASE_URL } from "../../utils/api";

const NutritionScore = () => {
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const calculateScore = async () => {
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
            energi: (acc.energi || 0) + Number(gizi.energi || 0),
            protein: (acc.protein || 0) + Number(gizi.protein || 0),
            lemak_total:
              (acc.lemak_total || 0) + Number(gizi["lemak total"] || 0),
            karbohidrat: (acc.karbohidrat || 0) + Number(gizi.karbohidrat || 0),
            serat: (acc.serat || 0) + Number(gizi.serat || 0),
            gula: (acc.gula || 0) + Number(gizi.gula || 0),
            garam: (acc.garam || 0) + Number(gizi.garam || 0),
          };
        }, {});

        // Menyiapkan payload sesuai format API
        const inputData = {
          ...totalGizi,
          target_energi: 2000,
          target_protein: 60,
          target_lemak_total: 70,
          target_karbohidrat: 350,
          target_serat: 30,
          target_gula: 50,
          target_garam: 5,
        };

        // Menghitung skor gizi
        const response = await fetch(`${BASE_URL}/health-scoring`, {
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
              "Terjadi kesalahan saat menghitung skor gizi"
          );
        }

        setScore(data.score);
      } catch (err) {
        console.error("Score Calculation Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    calculateScore();
  }, [token]);

  // Fungsi untuk menentukan warna berdasarkan skor
  const getScoreColor = (score) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    return "text-red-600";
  };
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-4 md:p-8 rounded-xl md:rounded-2xl border border-main/30 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 animate-slide-in-bottom scroll-mt-24">
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
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        </span>
        <div>
          <div className="text-lg md:text-xl font-bold text-main">
            Skor Gizi Harian
          </div>
          <div className="text-xs md:text-sm text-gray-500 mt-1">
            Kualitas asupan nutrisi Anda
          </div>
        </div>
      </h2>{" "}
      {error ? (
        <div className="bg-white/90 backdrop-blur-sm p-4 md:p-6 rounded-xl md:rounded-2xl border border-secondary/30 shadow-sm">
          <div className="flex items-center justify-center h-full">
            <div className="p-3 md:p-4 bg-red-50 text-red-700 rounded-lg animate-fade-in w-full">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 md:h-5 md:w-5"
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
                <span className="text-sm md:text-base">{error}</span>
              </div>
            </div>
          </div>
        </div>
      ) : loading ? (
        <div className="bg-white/90 backdrop-blur-sm p-4 md:p-6 rounded-xl md:rounded-2xl border border-secondary/30 shadow-sm min-h-[320px] md:min-h-[420px]">
          <div className="flex justify-center items-center h-full">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-8 w-8 md:h-10 md:w-10 border-b-2 border-main mb-2 md:mb-3"></div>
              <p className="text-xs md:text-sm text-gray-500">
                Menghitung skor...
              </p>
            </div>
          </div>
        </div>
      ) : (
        score !== null &&
        !error && (
          <div className="bg-white/90 backdrop-blur-sm p-4 md:p-6 rounded-xl md:rounded-2xl border border-secondary/30 shadow-sm min-h-[320px] md:min-h-[420px] flex items-center justify-center">
            <div className="flex flex-col items-center">
              <div className="relative mb-4 md:mb-6">
                <svg className="w-32 h-32 md:w-40 md:h-40" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="2.5"
                    className="opacity-20"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={
                      score >= 8
                        ? "#059669"
                        : score >= 6
                        ? "#D97706"
                        : "#DC2626"
                    }
                    strokeWidth="2.5"
                    strokeDasharray={`${score * 10}, 100`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div
                    className={`text-4xl md:text-5xl font-bold ${getScoreColor(
                      score
                    )} mb-1 animate-fade-in`}
                  >
                    {score.toFixed(1)}
                  </div>
                  <div className="text-xs md:text-sm text-gray-400 font-medium">
                    dari 10
                  </div>
                </div>
              </div>
              <div
                className={`text-lg md:text-xl font-bold mb-2 md:mb-3 ${getScoreColor(
                  score
                )} animate-fade-in`}
              >
                {score >= 8
                  ? "Excellent!"
                  : score >= 6
                  ? "Baik"
                  : "Perlu Perhatian"}
              </div>
              <p className="text-sm md:text-base text-gray-600 text-center max-w-sm font-medium px-2 md:px-0">
                {score >= 8
                  ? "Asupan gizi Anda sangat seimbang dan ideal"
                  : score >= 6
                  ? "Asupan gizi cukup baik, masih bisa ditingkatkan"
                  : "Perlu perbaikan dalam pola makan Anda"}
              </p>{" "}
              {score < 8 && (
                <button
                  onClick={() => {
                    const recommendationSection = document.getElementById(
                      "nutrition-recommendation"
                    );
                    if (recommendationSection) {
                      recommendationSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }
                  }}
                  className="mt-4 md:mt-6 px-3 md:px-4 py-1.5 md:py-2 bg-main/10 hover:bg-main/15 text-main rounded-lg md:rounded-xl font-medium text-xs md:text-sm focus:outline-none flex items-center gap-1.5 md:gap-2 transition-all duration-300 hover:-translate-y-1 group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5 transition-transform duration-300 group-hover:translate-y-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 13l-7 7-7-7m14-8l-7 7-7-7"
                    />
                  </svg>
                  Lihat rekomendasi perbaikan
                </button>
              )}
            </div>
          </div>
        )
      )}{" "}
    </div>
  );
};

export default NutritionScore;
