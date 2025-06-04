import React from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import TotalNutritionSummary from "../../components/daily-summary/TotalNutritionSummary";
import DailyScanHistory from "../../components/daily-summary/DailyScanHistory";
import NutritionProgress from "../../components/daily-summary/NutritionProgress";

const DailySummaryPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-main mb-6">
            Ringkasan Nutrisi Harian
          </h1>
          <div className="space-y-8">
            <TotalNutritionSummary />
            <DailyScanHistory />
            <NutritionProgress />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DailySummaryPage;
