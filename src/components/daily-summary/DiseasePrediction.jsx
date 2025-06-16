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
        gradientFrom: "from-green-600",
        gradientTo: "to-emerald-500",
        iconBg: "bg-green-100/50",
        riskText: "Risiko Rendah",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
        gradientFrom: "from-yellow-500",
        gradientTo: "to-orange-400",
        iconBg: "bg-yellow-100/50",
        riskText: "Risiko Sedang",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
        gradientFrom: "from-red-600",
        gradientTo: "to-rose-500",
        iconBg: "bg-red-100/50",
        riskText: "Risiko Tinggi",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
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
    <div className="bg-gradient-to-br from-white to-gray-50 p-3 sm:p-4 md:p-8 rounded-xl md:rounded-2xl border border-main/30 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 animate-slide-in-bottom scroll-mt-24">
      <h2 className="text-base sm:text-lg md:text-xl font-bold text-main mb-4 sm:mb-6 md:mb-8 flex items-center animate-float">
        <span className="bg-main p-2 sm:p-2 md:p-3 rounded-lg md:rounded-xl mr-2 md:mr-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-secondary"
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
          <div className="text-base sm:text-lg md:text-xl font-bold text-main">
            Prediksi Risiko Penyakit
          </div>
          <div className="text-xs sm:text-xs md:text-sm text-gray-500 mt-0.5 sm:mt-1">
            Berdasarkan pola makan hari ini
          </div>
        </div>
      </h2>

      {error && (
        <div className="p-3 sm:p-4 md:p-5 bg-red-50 text-red-700 rounded-lg mb-4 sm:mb-6 animate-fade-in">
          <div className="flex items-center gap-2 sm:gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 shrink-0"
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
            <span className="text-sm sm:text-sm md:text-base font-medium">
              {error}
            </span>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-40 sm:h-48 md:h-56">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 border-2 border-main border-l-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 rounded-full bg-main/10"></div>
              </div>
            </div>
            <p className="text-sm sm:text-sm md:text-base text-gray-600 font-medium mt-3 sm:mt-4">
              Menganalisis data...
            </p>
          </div>
        </div>
      ) : (
        predictions.length > 0 &&
        !error &&
        userData &&
        totalGizi && (
          <div className="animate-fade-in space-y-4 sm:space-y-6 md:space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
              {predictions.map((prediction, index) => {
                const riskInfo = getRiskLevel(prediction.probabilitas);
                const probability = Math.round(prediction.probabilitas * 100);
                return (
                  <div
                    key={index}
                    className="bg-white rounded-xl sm:rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden hover:-translate-y-1"
                  >
                    <div className="p-4 sm:p-5 md:p-6">
                      {/* Icon and Disease Name */}
                      <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                        <div
                          className={`${riskInfo.iconBg} p-2 sm:p-3 rounded-lg sm:rounded-xl`}
                        >
                          <div className={`${riskInfo.color}`}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 sm:h-6 sm:w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              {riskInfo.icon.props.children}
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-800 text-base sm:text-lg md:text-xl leading-tight">
                            {prediction["Label terprediksi"]}
                          </h4>
                          <span
                            className={`text-xs sm:text-sm ${riskInfo.color} font-semibold mt-0.5 sm:mt-1 block`}
                          >
                            {riskInfo.riskText}
                          </span>
                        </div>
                      </div>

                      {/* Probability Circle */}
                      <div className="flex items-center justify-between mt-3 sm:mt-4">
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16">
                          <svg className="w-full h-full transform -rotate-90">
                            <circle
                              cx="28"
                              cy="28"
                              r="24"
                              stroke="currentColor"
                              strokeWidth="3"
                              fill="none"
                              className="text-gray-200"
                            />
                            <circle
                              cx="28"
                              cy="28"
                              r="24"
                              stroke="currentColor"
                              strokeWidth="3"
                              fill="none"
                              strokeDasharray={`${probability * 1.51} 151`}
                              className={`${riskInfo.color}`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span
                              className={`text-xs sm:text-sm font-bold ${riskInfo.color}`}
                            >
                              {probability}%
                            </span>
                          </div>
                        </div>

                        {/* Risk Label with Gradient */}
                        <div
                          className={`bg-gradient-to-r ${riskInfo.gradientFrom} ${riskInfo.gradientTo} text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ml-2`}
                        >
                          Level {Math.ceil(probability / 33)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white/90 backdrop-blur p-4 sm:p-5 md:p-6 border border-gray-200/80 rounded-lg sm:rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="bg-main p-2 sm:p-2.5 rounded-lg sm:rounded-xl shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6 text-secondary"
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
                <div className="flex-1">
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 leading-relaxed">
                    Prediksi ini berdasarkan analisis nutrisi dari makanan yang
                    Anda konsumsi hari ini. Hasil dapat berubah sesuai dengan
                    pola makan Anda.
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-500 mt-1.5 sm:mt-2">
                    Konsultasikan dengan profesional kesehatan untuk informasi
                    lebih lanjut.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default DiseasePrediction;
