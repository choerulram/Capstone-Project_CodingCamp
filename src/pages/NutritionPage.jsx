import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../utils/api.js";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import NutritionHeader from "../components/nutrition/NutritionHeader";
import NutritionDataCard from "../components/nutrition/NutritionDataCard";
import CalculationInfoCard from "../components/nutrition/CalculationInfoCard";
import NutritionTipsCard from "../components/nutrition/NutritionTipsCard";
import AdditionalRecommendations from "../components/nutrition/AdditionalRecommendations";

// Event bus sederhana untuk komunikasi antar komponen
const NUTRITION_UPDATE_EVENT = "nutritionUpdate";

const NutritionPage = () => {
  const navigate = useNavigate();
  const [nutritionData, setNutritionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Handler untuk update nutrisi
  const handleNutritionUpdate = React.useCallback(() => {
    console.log("[NutritionPage] Memulai refresh data nutrisi...");
    setRefreshTrigger((prev) => prev + 1);
  }, []);

  useEffect(() => {
    // Menambahkan event listener
    window.addEventListener(NUTRITION_UPDATE_EVENT, handleNutritionUpdate);

    // Cleanup event listener
    return () => {
      window.removeEventListener(NUTRITION_UPDATE_EVENT, handleNutritionUpdate);
    };
  }, [handleNutritionUpdate]);

  useEffect(() => {
    const fetchNutritionData = async () => {
      try {
        if (!token) {
          navigate("/login");
          return;
        }

        console.log("[NutritionPage] Memulai fetch data nutrisi...");
        const response = await api.getDailyNutrition(token);
        console.log("[NutritionPage] Data nutrisi diterima:", response);
        setNutritionData(response.kebutuhan_harian || {});
      } catch (err) {
        console.error("[NutritionPage] Error saat fetch data nutrisi:", err);
        setError(err.message || "Failed to fetch nutrition data");
      } finally {
        setLoading(false);
      }
    };

    fetchNutritionData();
  }, [navigate, token, refreshTrigger]);

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
          <div className="max-w-6xl mx-auto">
            <div className="animate-fade-in-down">
              <NutritionHeader />
            </div>
            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-5 animate-fade-in-left">
                <NutritionDataCard nutritionData={nutritionData} />
              </div>
              <div className="md:col-span-7 space-y-8 animate-fade-in-right">
                <CalculationInfoCard />
                <NutritionTipsCard />
                <AdditionalRecommendations />
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
