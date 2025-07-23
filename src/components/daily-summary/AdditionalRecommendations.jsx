import React from "react";
import { useSelector } from "react-redux";
import api from "../../utils/api";

const AdditionalRecommendations = () => {
  const [recommendations, setRecommendations] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const token = useSelector((state) => state.auth.token);

  const analyzeNutrition = React.useCallback(async () => {
    if (!token) return;

    setLoading(true);
    try {
      // Mengambil data nutrisi harian
      const dailyNutritionData = await api.getDailyNutrition(token);
      const targetHarian = dailyNutritionData?.kebutuhan_harian || {};

      // Mengambil riwayat scan hari ini
      const historyData = await api.getAllScanHistory(token);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const todayHistory = (historyData?.history || []).filter((item) => {
        const scanDate = new Date(item.uploaded_at);
        return scanDate >= today;
      });

      // Menghitung total nutrisi hari ini
      const totalNutrisi = todayHistory.reduce((acc, item) => {
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

      // Menganalisis nutrisi yang berlebihan
      const recommendations = [];

      if (totalNutrisi.energi > targetHarian.energi) {
        recommendations.push({
          nutrient: "Energi",
          current: Math.round(totalNutrisi.energi),
          target: Math.round(targetHarian.energi),
          excess: Math.round(totalNutrisi.energi - targetHarian.energi),
          recommendations: [
            "Lakukan aktivitas fisik ringan",
            "Kurangi porsi makan berikutnya",
            "Pilih makanan rendah kalori",
          ],
        });
      }

      if (totalNutrisi.protein > targetHarian.protein) {
        recommendations.push({
          nutrient: "Protein",
          current: Math.round(totalNutrisi.protein),
          target: Math.round(targetHarian.protein),
          excess: Math.round(totalNutrisi.protein - targetHarian.protein),
          recommendations: [
            "Perbanyak minum air putih",
            "Ganti dengan protein nabati",
            "Kurangi konsumsi daging",
          ],
        });
      }

      if (totalNutrisi.lemak_total > targetHarian["lemak total"]) {
        recommendations.push({
          nutrient: "Lemak",
          current: Math.round(totalNutrisi.lemak_total),
          target: Math.round(targetHarian["lemak total"]),
          excess: Math.round(
            totalNutrisi.lemak_total - targetHarian["lemak total"]
          ),
          recommendations: [
            "Pilih makanan yang dikukus",
            "Hindari gorengan",
            "Tambah porsi sayuran",
          ],
        });
      }

      if (totalNutrisi.karbohidrat > targetHarian.karbohidrat) {
        recommendations.push({
          nutrient: "Karbohidrat",
          current: Math.round(totalNutrisi.karbohidrat),
          target: Math.round(targetHarian.karbohidrat),
          excess: Math.round(
            totalNutrisi.karbohidrat - targetHarian.karbohidrat
          ),
          recommendations: [
            "Kurangi porsi nasi/roti",
            "Ganti dengan sayuran",
            "Lakukan aktivitas fisik",
          ],
        });
      }

      if (totalNutrisi.gula > targetHarian.gula) {
        recommendations.push({
          nutrient: "Gula",
          current: Math.round(totalNutrisi.gula),
          target: Math.round(targetHarian.gula),
          excess: Math.round(totalNutrisi.gula - targetHarian.gula),
          recommendations: [
            "Hindari minuman manis",
            "Pilih buah segar",
            "Cek label makanan kemasan",
          ],
        });
      }

      if (totalNutrisi.garam > targetHarian.garam) {
        recommendations.push({
          nutrient: "Garam",
          current: Math.round(totalNutrisi.garam),
          target: Math.round(targetHarian.garam),
          excess: Math.round(totalNutrisi.garam - targetHarian.garam),
          recommendations: [
            "Kurangi makanan olahan",
            "Masak tanpa MSG",
            "Ganti garam dengan rempah",
          ],
        });
      }

      setRecommendations(recommendations);
    } catch (error) {
      console.error("Error analyzing nutrition:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  React.useEffect(() => {
    analyzeNutrition();
  }, [analyzeNutrition]);

  if (loading) {
    return (
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-sm animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
      </div>
    );
  }

  if (recommendations.length === 0) {
    return null; // Tidak menampilkan komponen jika tidak ada rekomendasi
  }

  return (
    <div className="bg-gradient-to-br from-red-50 to-red-100/50 p-4 md:p-6 rounded-xl border border-red-200 shadow-sm hover:shadow-lg transition-all duration-300">
      <h2 className="text-lg md:text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
        <span className="p-2 bg-red-200 rounded-lg">
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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </span>
        Rekomendasi Penyesuaian Nutrisi
      </h2>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div
            key={rec.nutrient}
            className="bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-red-200 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="bg-red-100 p-2 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <div>
                  <h3 className="text-base font-semibold text-red-800 flex items-center gap-2">
                    {rec.nutrient}
                    <span className="text-sm font-normal text-red-600">
                      (+{rec.excess} {rec.nutrient === "Energi" ? "kkal" : "g"})
                    </span>
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Konsumsi: {rec.current}{" "}
                    {rec.nutrient === "Energi" ? "kkal" : "g"}
                    <span className="mx-1">•</span>
                    Target: {rec.target}{" "}
                    {rec.nutrient === "Energi" ? "kkal" : "g"}
                  </p>
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Yang perlu dilakukan:
                    </p>
                    <ul className="space-y-1">
                      {rec.recommendations.map((tip, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <span className="text-red-400 mt-1">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdditionalRecommendations;
