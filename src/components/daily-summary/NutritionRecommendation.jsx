import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    const getRecommendation = async () => {
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
            fiber_g: totalGizi["serat"],
            sodium_mg: totalGizi["garam"],
            sugar_g: totalGizi["gula"],
          },
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

        // Get recommendation
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
    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 animate-fade-in">
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
      </h2>{" "}
      <div className="mb-6 animate-fade-in animate-delay-100">
        <p className="text-sm text-gray-600">
          {loading
            ? "Memuat rekomendasi nutrisi..."
            : "Rekomendasi nutrisi berdasarkan konsumsi harian Anda"}
        </p>
      </div>{" "}
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
        <div className="space-y-4">
          {" "}
          {recommendation.message ? (
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border border-gray-100/50 text-gray-800 animate-fade-in animate-delay-100">
              {recommendation.message}
            </div>
          ) : (
            <div className="grid gap-4">
              {Object.entries(recommendation).map(([key, value], index) => (
                <div
                  key={key}
                  className="bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100/50 overflow-hidden hover:shadow-md transition-all duration-300 hover:scale-[1.01] animate-fade-in-right"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {" "}
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="bg-highlight/20 p-2 rounded-lg transform transition-transform duration-300 hover:scale-110">
                        {key.includes("energi") || key.includes("energy") ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-highlight"
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
                        ) : key.includes("protein") ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-highlight"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-highlight"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                          </svg>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-main capitalize">
                        {key.split("_").join(" ")}
                      </h3>
                    </div>

                    {typeof value === "object" && Array.isArray(value) ? (
                      <div className="space-y-3">
                        <p className="text-sm text-gray-600 font-medium">
                          Rekomendasi Produk:
                        </p>
                        <div className="space-y-2">
                          {value.map((item, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-gray-50/80 rounded-lg hover:bg-gray-100/80 transition-colors hover:scale-[1.02] transform duration-300 animate-fade-in"
                              style={{ animationDelay: `${index * 150}ms` }}
                            >
                              <span className="text-gray-700">
                                {item.product_name}
                              </span>
                              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                Skor: {item.skor_gizi}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center p-3 bg-gray-50/80 rounded-lg">
                        <span className="text-gray-600">Nilai rekomendasi</span>
                        <span className="text-main font-semibold">{value}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NutritionRecommendation;
