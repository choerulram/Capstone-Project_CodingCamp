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
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h2 className="text-xl font-semibold text-main mb-4 flex items-center">
        <span className="bg-blue-100 p-2 rounded-lg mr-2">
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
        Skor Gizi Harian
      </h2>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg mb-4">
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
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-main"></div>
        </div>
      ) : (
        score !== null &&
        !error && (
          <div className="text-center p-6">
            <div className="text-4xl font-bold mb-2 animate-fade-in">
              <span className={getScoreColor(score)}>{score.toFixed(1)}</span>
              <span className="text-gray-400 text-xl">/10</span>
            </div>
            <p className="text-gray-600">
              {score >= 8
                ? "Excellent! Asupan gizi Anda sangat baik"
                : score >= 6
                ? "Baik! Masih ada ruang untuk peningkatan"
                : "Perlu perhatian khusus pada asupan gizi Anda"}
            </p>
          </div>
        )
      )}
    </div>
  );
};

export default NutritionScore;
