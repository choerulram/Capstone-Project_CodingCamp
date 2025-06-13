import React from "react";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import TotalNutritionSummary from "../components/daily-summary/TotalNutritionSummary";
import DailyScanHistory from "../components/daily-summary/DailyScanHistory";
import NutritionProgress from "../components/daily-summary/NutritionProgress";
import ProductRecommendation from "../components/daily-summary/ProductRecommendation";
import NutritionScore from "../components/daily-summary/NutritionScore";
import DiseasePrediction from "../components/daily-summary/DiseasePrediction";

const DailySummaryPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />{" "}
      <main className="flex-grow container mx-auto px-4 py-8 animate-fadeIn">
        <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl animate-slideUp">
          {" "}
          <h1 className="text-3xl font-bold text-main mb-6 flex items-center gap-3 animate-fadeInDown">
            <div>
              <div className="text-3xl font-bold text-main">
                Ringkasan Nutrisi Harian
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Pantau asupan nutrisi harian Anda
              </div>
            </div>
          </h1>
          <div className="space-y-8">
            <div
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
            >
              <NutritionProgress />
            </div>
            <div
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <NutritionScore />
                <DiseasePrediction />
              </div>
            </div>
            <div
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
            >
              <TotalNutritionSummary />
            </div>
            <div
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: "800ms", animationFillMode: "forwards" }}
            >
              <DailyScanHistory />
            </div>
            <div
              className="opacity-0 animate-fade-in"
              style={{
                animationDelay: "1000ms",
                animationFillMode: "forwards",
              }}
            >
              <ProductRecommendation />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DailySummaryPage;
