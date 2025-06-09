import React, { useState } from "react";
import { useSelector } from "react-redux";
import api, { BASE_URL } from "../../utils/api";

const NutritionRecommendation = () => {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  // Helper function to parse JWT token
  const parseJwt = (token) => {
    if (!token) {
      throw new Error("Token tidak valid");
    }

    try {
      const base64Url = token.split(".")[1];
      if (!base64Url) {
        throw new Error("Format token tidak valid");
      }

      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );

      const parsed = JSON.parse(jsonPayload);
      if (!parsed || typeof parsed !== "object") {
        throw new Error("Data user tidak valid");
      }

      if (!parsed.umur || !parsed.gender) {
        throw new Error(
          "Data profil tidak lengkap. Pastikan Anda sudah mengisi data profil dengan lengkap."
        );
      }

      return parsed;
    } catch (error) {
      console.error("Error parsing JWT:", error);
      throw new Error("Gagal memproses data pengguna: " + error.message);
    }
  };

  const handleGetRecommendation = async () => {
    setLoading(true);
    setError(null);
    try {
      if (!token) {
        throw new Error("Anda harus login terlebih dahulu.");
      }

      // Get today's scan history
      const historyData = await api.getTodayScanHistory(token);
      const todayHistory = historyData.history || [];

      if (todayHistory.length === 0) {
        throw new Error(
          "Anda belum memiliki riwayat pemindaian hari ini. Silakan lakukan pemindaian makanan terlebih dahulu."
        );
      }

      // Calculate total nutrition
      const giziUtama = [
        "energi",
        "protein",
        "lemak total",
        "karbohidrat",
        "serat",
        "gula",
        "garam",
      ];
      const totalGizi = {
        energi: 0,
        protein: 0,
        "lemak total": 0,
        karbohidrat: 0,
        serat: 0,
        gula: 0,
        garam: 0,
      };

      todayHistory.forEach((item) => {
        giziUtama.forEach((k) => {
          totalGizi[k] += Number(item.kandungan_gizi?.[k] || 0);
        });
      });

      // Get and validate user data
      const userData = parseJwt(token);

      // Prepare payload
      const inputData = {
        umur: userData.umur,
        jenis_kelamin: userData.gender || userData.jenis_kelamin,
        hamil: userData.hamil || false,
        usia_kandungan: userData.usia_kandungan || null,
        menyusui: userData.menyusui || false,
        umur_anak: userData.umur_anak || null,
        konsumsi: {
          energy_kal: totalGizi["energi"],
          protein_g: totalGizi["protein"],
          fat_g: totalGizi["lemak total"],
          carbohydrate_g: totalGizi["karbohidrat"],
          sodium_mg: totalGizi["garam"],
          sugar_g: totalGizi["gula"],
        },
      };

      // Get recommendation
      try {
        const response = await fetch(`${BASE_URL}/recommendation`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(inputData),
        });

        let data;
        try {
          data = await response.json();
        } catch (jsonError) {
          console.error("JSON Parse Error:", jsonError);
          throw new Error(
            "Maaf, fitur rekomendasi sedang dalam tahap pengembangan. Silakan coba beberapa saat lagi."
          );
        }

        if (!response.ok) {
          throw new Error(
            data?.error ||
              data?.message ||
              "Fitur rekomendasi sedang dalam perbaikan. Mohon tunggu beberapa saat lagi."
          );
        }

        if (!data) {
          throw new Error(
            "Mohon maaf, layanan rekomendasi belum tersedia untuk sementara waktu."
          );
        }

        setRecommendation(data);
      } catch (apiError) {
        console.error("API Error:", apiError);
        throw new Error(
          "Fitur rekomendasi sedang dalam pengembangan dan akan segera hadir. Mohon tunggu pembaruan selanjutnya."
        );
      }
    } catch (err) {
      console.error("Recommendation Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            Rekomendasi Gizi
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            *Fitur dalam tahap pengembangan
          </p>
        </div>
        <button
          onClick={handleGetRecommendation}
          disabled={loading}
          className="px-4 py-2 bg-main text-white rounded-lg hover:bg-main-600 transition-colors disabled:opacity-50"
        >
          {loading ? "Memuat..." : "Cek Rekomendasi Gizi"}
        </button>
      </div>
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-4">
          {error}
        </div>
      )}
      {recommendation && (
        <div className="space-y-4">
          <div className="bg-gray-50 rounded-lg p-4">
            {recommendation.message ? (
              <div className="text-gray-800">{recommendation.message}</div>
            ) : (
              <div className="grid gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <h3 className="font-semibold mb-2">Rekomendasi Nutrisi:</h3>
                  <div className="space-y-2">
                    {Object.entries(recommendation).map(([key, value]) => (
                      <div key={key} className="text-sm">
                        <span className="font-medium">{key}: </span>
                        <span>
                          {typeof value === "object"
                            ? JSON.stringify(value)
                            : value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NutritionRecommendation;
