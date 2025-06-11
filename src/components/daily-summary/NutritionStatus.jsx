import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api, { BASE_URL } from "../../utils/api";

const NutritionStatus = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const predictStatus = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!token) {
          throw new Error("Anda harus login terlebih dahulu.");
        }

        // Mengambil data user (umur, tinggi, berat, dll)
        const userData = await api.getUserProfile(token);

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
            Calories: (acc.Calories || 0) + Number(gizi.energi || 0),
            Protein: (acc.Protein || 0) + Number(gizi.protein || 0),
            Fat: (acc.Fat || 0) + Number(gizi["lemak total"] || 0),
            Carbohydrates:
              (acc.Carbohydrates || 0) + Number(gizi.karbohidrat || 0),
            Fiber: (acc.Fiber || 0) + Number(gizi.serat || 0),
            Sugar: (acc.Sugar || 0) + Number(gizi.gula || 0),
            Sodium: (acc.Sodium || 0) + Number(gizi.garam || 0),
          };
        }, {});

        // Menyiapkan payload sesuai format API
        const inputData = {
          Ages: [userData.umur],
          Gender: [userData.gender === "male" ? "Male" : "Female"],
          Height: [userData.tinggi],
          Weight: [userData.berat],
          ...totalGizi,
        };

        // Memprediksi status gizi
        const response = await fetch(`${BASE_URL}/predict-status`, {
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
              "Terjadi kesalahan saat memprediksi status gizi"
          );
        }

        setStatus(data.labels[0][0]);
      } catch (err) {
        console.error("Status Prediction Error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    predictStatus();
  }, [token]);

  // Fungsi untuk menentukan warna dan ikon berdasarkan status
  const getStatusInfo = (status) => {
    switch (status) {
      case "Normal":
        return {
          color: "text-green-600",
          bgColor: "bg-green-100",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          ),
        };
      case "Overweight":
        return {
          color: "text-yellow-600",
          bgColor: "bg-yellow-100",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          ),
        };
      default:
        return {
          color: "text-red-600",
          bgColor: "bg-red-100",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
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
          ),
        };
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <h2 className="text-xl font-semibold text-main mb-4 flex items-center">
        <span className="bg-purple-100 p-2 rounded-lg mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-purple-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </span>
        Status Gizi
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
        status &&
        !error && (
          <div className="flex items-center justify-center gap-4 p-6 animate-fade-in">
            <div
              className={`${getStatusInfo(status).bgColor} p-3 rounded-full`}
            >
              <div className={getStatusInfo(status).color}>
                {getStatusInfo(status).icon}
              </div>
            </div>
            <div>
              <div
                className={`text-2xl font-bold ${getStatusInfo(status).color}`}
              >
                {status}
              </div>
              <p className="text-gray-600 mt-1">
                {status === "Normal"
                  ? "Pertahankan pola makan sehat Anda!"
                  : "Konsultasikan dengan ahli gizi untuk saran lebih lanjut"}
              </p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default NutritionStatus;
