import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api.js";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";

const NutritionPage = () => {
  const navigate = useNavigate();
  const [nutritionData, setNutritionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNutritionData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await api.getDailyNutrition(token);
        setNutritionData(response.kebutuhan_harian || {});
      } catch (err) {
        setError(err.message || "Failed to fetch nutrition data");
      } finally {
        setLoading(false);
      }
    };

    fetchNutritionData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-100">
          {error}
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
            <div className="bg-main text-white py-6 px-8">
              <h1 className="text-2xl font-bold">Kebutuhan Gizi Harian</h1>
              <p className="text-sm mt-2 text-teal-100">
                Rekomendasi asupan gizi harian berdasarkan profil Anda
              </p>
            </div>
            <div className="p-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-main/20">
                      <th className="text-left py-3 px-4 text-main font-semibold">
                        Nutrisi
                      </th>
                      <th className="text-right py-3 px-4 text-main font-semibold">
                        Kebutuhan
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(nutritionData || {}).map(
                      ([key, value], index) => (
                        <tr
                          key={key}
                          className={`border-b border-gray-100 hover:bg-teal-50 transition-colors ${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          }`}
                        >
                          <td className="py-4 px-4 text-gray-700 font-medium">
                            {key
                              .split("_")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </td>
                          <td className="py-4 px-4 text-right text-gray-800 font-semibold">
                            {typeof value === "number"
                              ? value.toFixed(1)
                              : value}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>{" "}
              <div className="mt-8 p-6 bg-teal-50 rounded-xl border border-teal-100">
                <h3 className="text-main font-semibold mb-3">
                  Informasi Perhitungan
                </h3>
                <div className="text-sm text-gray-600">
                  <p className="mb-3 text-gray-700">
                    Kebutuhan gizi harian ini dihitung berdasarkan data profil
                    Anda dengan mempertimbangkan faktor-faktor berikut:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-main mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>
                        Profil dasar (usia, gender, tinggi badan, dan berat
                        badan)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-main mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Aktivitas fisik dan kebutuhan energi harian</span>
                    </li>
                    <li className="flex items-start">
                      <svg
                        className="h-5 w-5 text-main mr-2 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Kondisi khusus (kehamilan/menyusui) jika ada</span>
                    </li>
                  </ul>
                  <p className="mt-4 text-sm text-teal-600 bg-teal-50 p-3 rounded-lg border border-teal-100">
                    <span className="font-semibold">Tip:</span> Gunakan
                    informasi ini sebagai panduan untuk menyesuaikan pola makan
                    Anda sehari-hari.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NutritionPage;
