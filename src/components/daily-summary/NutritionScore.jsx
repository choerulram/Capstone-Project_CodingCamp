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
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 animate-fade-in shadow-sm hover:shadow-md transition-all duration-300">
      <h2 className="text-xl font-semibold text-main mb-6 flex items-center animate-fade-in-down">
        <span className="bg-blue-100 p-2 rounded-lg mr-3 transform transition-transform hover:scale-110 animate-bounce-slow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-600"
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
        <div>
          <div className="text-xl font-semibold text-main">
            Skor Gizi Harian
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Kualitas asupan nutrisi Anda
          </div>
        </div>
      </h2>
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg mb-4 animate-fade-in">
          <div className="flex items-center gap-2">
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
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-main mb-3"></div>
            <p className="text-gray-500 text-sm">Menghitung skor...</p>
          </div>
        </div>
      ) : (
        score !== null &&
        !error && (
          <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-lg animate-fade-in">
            <div className="flex flex-col items-center">
              {" "}
              <div className="relative mb-4">
                <svg className="w-32 h-32" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#E5E7EB"
                    strokeWidth="3"
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
                    strokeWidth="3"
                    strokeDasharray={`${score * 10}, 100`}
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
                    {score.toFixed(1)}
                  </div>
                  <div className="text-gray-400 text-sm text-center">
                    dari 10
                  </div>
                </div>
              </div>
              <div
                className={`text-lg font-semibold mb-2 ${getScoreColor(score)}`}
              >
                {score >= 8
                  ? "Excellent!"
                  : score >= 6
                  ? "Baik"
                  : "Perlu Perhatian"}
              </div>
              <p className="text-gray-600 text-center max-w-xs">
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
                  className="mt-4 text-blue-600 text-sm hover:text-blue-700 focus:outline-none flex items-center gap-1 transition-all duration-300 hover:translate-y-[-2px]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
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
