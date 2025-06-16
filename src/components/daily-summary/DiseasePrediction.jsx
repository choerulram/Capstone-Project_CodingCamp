import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import api, { BASE_URL } from "../../utils/api";

const DiseasePrediction = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [totalGizi, setTotalGizi] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const predictDiseaseRisk = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!token) {
          throw new Error("Anda harus login terlebih dahulu.");
        }

        // Mendapatkan data user dari token
        const tokenData = JSON.parse(atob(token.split(".")[1]));
        const userDataFromToken = {
          umur: parseFloat(tokenData.age || tokenData.umur) || 0,
          gender: tokenData.gender?.toLowerCase() || "female",
          tinggi: parseFloat(tokenData.height || tokenData.tinggi) || 0,
          berat: parseFloat(tokenData.weight || tokenData.berat) || 0,
        };
        setUserData(userDataFromToken);

        // Mengambil riwayat pemindaian hari ini
        const historyData = await api.getTodayScanHistory(token);
        const todayHistory = historyData.history || [];

        if (todayHistory.length === 0) {
          throw new Error(
            "Anda belum memiliki riwayat pemindaian hari ini. Silakan lakukan pemindaian makanan terlebih dahulu."
          );
        }

        // Menghitung total nutrisi dengan explicit type conversion
        const totalNutrisi = todayHistory.reduce((acc, item) => {
          const gizi = item.kandungan_gizi || {};
          return {
            Calories: (acc.Calories || 0) + parseFloat(gizi.energi || 0),
            Protein: (acc.Protein || 0) + parseFloat(gizi.protein || 0),
            Fat: (acc.Fat || 0) + parseFloat(gizi["lemak total"] || 0),
            Carbohydrates:
              (acc.Carbohydrates || 0) + parseFloat(gizi.karbohidrat || 0),
            Fiber: (acc.Fiber || 0) + parseFloat(gizi.serat || 0),
            Sugar: (acc.Sugar || 0) + parseFloat(gizi.gula || 0),
            Sodium: (acc.Sodium || 0) + parseFloat(gizi.garam || 0),
          };
        }, {});
        setTotalGizi(totalNutrisi);

        // Menyiapkan payload sesuai format API dengan explicit arrays dan default values
        const inputData = {
          Ages: [Math.max(1, userDataFromToken.umur)],
          Gender: [userDataFromToken.gender === "male" ? "Male" : "Female"],
          Height: [Math.max(1, userDataFromToken.tinggi)],
          Weight: [Math.max(1, userDataFromToken.berat)],
          Calories: [Math.max(0, totalNutrisi.Calories || 0)],
          Protein: [Math.max(0, totalNutrisi.Protein || 0)],
          Fat: [Math.max(0, totalNutrisi.Fat || 0)],
          Carbohydrates: [Math.max(0, totalNutrisi.Carbohydrates || 0)],
          Fiber: [Math.max(0, totalNutrisi.Fiber || 0)],
          Sugar: [Math.max(0, totalNutrisi.Sugar || 0)],
          Sodium: [Math.max(0, totalNutrisi.Sodium || 0)],
        };

        // Melakukan prediksi risiko penyakit
        const response = await fetch(`${BASE_URL}/predict`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(inputData),
        });
        const data = await response.json();
        console.log("=== Disease Prediction Response ===");
        console.log("Full response data:", data);
        console.log("Hasil array:", data.hasil);

        if (!response.ok) {
          throw new Error(
            data?.error ||
              data?.message ||
              "Terjadi kesalahan saat memprediksi risiko penyakit"
          );
        }

        console.log("=== Setting Predictions State ===");
        console.log("Predictions before setting:", data.hasil);
        setPredictions(data.hasil || []);
        console.log("State updated with predictions");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    predictDiseaseRisk();
  }, [token]);
  // Fungsi untuk menentukan warna dan ikon berdasarkan probabilitas
  const getRiskLevel = (probability) => {
    if (probability < 0.4) {
      return {
        color: "text-green-600",
        bgColor: "bg-green-100",
        riskText: "Risiko Rendah",
        icon: (
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ),
      };
    } else if (probability < 0.7) {
      return {
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
        riskText: "Risiko Sedang",
        icon: (
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
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        ),
      };
    } else {
      return {
        color: "text-red-600",
        bgColor: "bg-red-100",
        riskText: "Risiko Tinggi",
        icon: (
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
        ),
      };
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 p-4 md:p-8 rounded-xl md:rounded-2xl border border-main/30 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 animate-slide-in-bottom scroll-mt-24">
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
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        </span>
        <div>
          <div className="text-lg md:text-xl font-bold text-main">
            Prediksi Risiko Penyakit
          </div>
          <div className="text-xs md:text-sm text-gray-500 mt-1">
            Berdasarkan pola makan hari ini
          </div>
        </div>
      </h2>
      {error && (
        <div className="p-3 md:p-4 bg-red-50 text-red-700 rounded-lg mb-4 animate-fade-in">
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
      )}{" "}
      {loading ? (
        <div className="flex justify-center items-center h-32 md:h-40">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 md:h-10 md:w-10 border-b-2 border-main mb-2 md:mb-3"></div>
            <p className="text-xs md:text-sm text-gray-500">
              Menganalisis data...
            </p>
          </div>
        </div>
      ) : (
        predictions.length > 0 &&
        !error &&
        userData &&
        totalGizi && (
          <div className="animate-fade-in space-y-4 md:space-y-6">
            <div className="bg-white/90 backdrop-blur-sm p-4 md:p-8 rounded-xl md:rounded-2xl border border-secondary/30 shadow-sm">
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl font-semibold text-main mb-4">
                  Hasil Analisis Risiko Penyakit:
                </h3>
                <div className="grid gap-4">
                  {predictions.map((prediction, index) => {
                    const riskInfo = getRiskLevel(prediction.probabilitas);
                    return (
                      <div
                        key={index}
                        className={`${riskInfo.bgColor} bg-opacity-10 p-4 rounded-lg border border-${riskInfo.color} flex items-center justify-between`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span
                              className={`${riskInfo.color} p-1 rounded-md`}
                            >
                              {riskInfo.icon}
                            </span>
                            <h4 className="font-medium text-gray-800">
                              {prediction["Label terprediksi"]}
                            </h4>
                          </div>
                          <div className="mt-2">
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-sm ${riskInfo.color} font-medium`}
                              >
                                {riskInfo.riskText}
                              </span>
                              <span className="text-sm font-medium text-gray-600">
                                {Math.round(prediction.probabilitas * 100)}%
                              </span>
                            </div>
                            <div className="mt-1 w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${riskInfo.color.replace(
                                  "text-",
                                  "bg-"
                                )}`}
                                style={{
                                  width: `${prediction.probabilitas * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="bg-white/90 backdrop-blur-sm p-3 md:p-4 rounded-lg md:rounded-xl border border-secondary/30 shadow-sm">
              <div className="flex items-center gap-2 md:gap-3">
                <div className="bg-red-100 p-1.5 md:p-2 rounded-md md:rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-xs md:text-sm font-medium text-gray-600">
                  Prediksi ini berdasarkan analisis nutrisi dari makanan yang
                  Anda konsumsi hari ini
                </span>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default DiseasePrediction;
