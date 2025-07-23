import React from "react";
import { useSelector } from "react-redux";
import api from "../../utils/api";

const WeeklyAdditionalRecommendations = () => {
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

      // Mengambil riwayat scan minggu ini
      const historyData = await api.getAllScanHistory(token);

      // Filter untuk data 7 hari terakhir
      const startOfWeek = new Date();
      startOfWeek.setHours(0, 0, 0, 0);
      startOfWeek.setDate(startOfWeek.getDate() - 6);

      const weeklyHistory = (historyData?.history || []).filter((item) => {
        const scanDate = new Date(item.uploaded_at);
        return scanDate >= startOfWeek;
      });

      // Menghitung total nutrisi mingguan
      const totalNutrisi = weeklyHistory.reduce((acc, item) => {
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

      // Menghitung target mingguan (7 hari)
      const targetMingguan = {
        energi: targetHarian.energi * 7,
        protein: targetHarian.protein * 7,
        lemak_total: targetHarian["lemak total"] * 7,
        karbohidrat: targetHarian.karbohidrat * 7,
        serat: targetHarian.serat * 7,
        gula: targetHarian.gula * 7,
        garam: targetHarian.garam * 7,
      };

      // Menganalisis nutrisi yang berlebihan
      const recommendations = [];

      if (totalNutrisi.energi > targetMingguan.energi) {
        recommendations.push({
          nutrient: "Energi",
          excess: Math.round(totalNutrisi.energi - targetMingguan.energi),
          recommendations: [
            "Pertimbangkan untuk meningkatkan aktivitas fisik minggu depan",
            "Atur porsi makan harian dengan lebih ketat",
            "Pilih makanan rendah kalori untuk menu minggu depan",
          ],
        });
      }

      if (totalNutrisi.protein > targetMingguan.protein) {
        recommendations.push({
          nutrient: "Protein",
          excess: Math.round(totalNutrisi.protein - targetMingguan.protein),
          recommendations: [
            "Seimbangkan asupan protein dengan sayuran dan buah",
            "Kurangi konsumsi daging merah minggu depan",
            "Ganti sebagian protein hewani dengan protein nabati",
          ],
        });
      }

      if (totalNutrisi.lemak_total > targetMingguan.lemak_total) {
        recommendations.push({
          nutrient: "Lemak",
          excess: Math.round(
            totalNutrisi.lemak_total - targetMingguan.lemak_total
          ),
          recommendations: [
            "Rencanakan menu dengan metode memasak yang lebih sehat",
            "Batasi makanan yang digoreng minggu depan",
            "Pilih sumber lemak sehat seperti kacang-kacangan dan alpukat",
          ],
        });
      }

      if (totalNutrisi.karbohidrat > targetMingguan.karbohidrat) {
        recommendations.push({
          nutrient: "Karbohidrat",
          excess: Math.round(
            totalNutrisi.karbohidrat - targetMingguan.karbohidrat
          ),
          recommendations: [
            "Tingkatkan aktivitas fisik mingguan Anda",
            "Ganti nasi putih dengan nasi merah atau quinoa",
            "Batasi konsumsi roti dan pasta minggu depan",
          ],
        });
      }

      if (totalNutrisi.gula > targetMingguan.gula) {
        recommendations.push({
          nutrient: "Gula",
          excess: Math.round(totalNutrisi.gula - targetMingguan.gula),
          recommendations: [
            "Kurangi frekuensi konsumsi makanan manis",
            "Ganti minuman manis dengan air putih atau teh tanpa gula",
            "Baca label makanan dengan teliti sebelum membeli",
          ],
        });
      }

      if (totalNutrisi.garam > targetMingguan.garam) {
        recommendations.push({
          nutrient: "Garam",
          excess: Math.round(totalNutrisi.garam - targetMingguan.garam),
          recommendations: [
            "Kurangi konsumsi makanan olahan dan fast food",
            "Masak sendiri agar bisa mengontrol jumlah garam",
            "Gunakan bumbu herbal sebagai pengganti garam",
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
    return null;
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
        Rekomendasi Penyesuaian Nutrisi Mingguan
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
                    Konsumsi: {rec.current} {rec.nutrient === "Energi" ? "kkal" : "g"} 
                    <span className="mx-1">•</span>
                    Target: {rec.target} {rec.nutrient === "Energi" ? "kkal" : "g"}
                  </p>
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Yang perlu dilakukan:</p>
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

export default WeeklyAdditionalRecommendations;
