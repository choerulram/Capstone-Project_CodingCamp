import React from "react";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import WeeklyScanHistory from "../components/weekly-summary/WeeklyScanHistory";
import MonthlyNutritionProgress from "../components/monthly-summary/MonthlyNutritionProgress";
import MonthlyNutritionScore from "../components/monthly-summary/MonthlyNutritionScore";
import WeeklyDiseasePrediction from "../components/weekly-summary/WeeklyDiseasePrediction";
import MonthlyTotalNutritionSummary from "../components/monthly-summary/MonthlyTotalNutritionSummary";
import WeeklyProductRecommendation from "../components/weekly-summary/WeeklyProductRecommendation";

const MonthlySummaryPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-3 md:px-4 py-4 md:py-8 animate-fadeIn">
        <div className="bg-white rounded-lg md:rounded-xl shadow-lg p-4 md:p-6 transition-all duration-300 hover:shadow-xl animate-slideUp">
          <h1 className="text-2xl md:text-3xl font-bold text-main mb-4 md:mb-6 flex items-center gap-2 md:gap-3 animate-fadeInDown">
            <div>
              <div className="text-2xl md:text-3xl font-bold text-main">
                Ringkasan Nutrisi Bulanan
              </div>
              <div className="text-xs md:text-sm text-gray-500 mt-0.5 md:mt-1">
                Pantau asupan nutrisi bulanan Anda
              </div>
            </div>
          </h1>
          <div className="space-y-4 md:space-y-8">
            <div
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: "200ms", animationFillMode: "forwards" }}
            >
              <MonthlyNutritionProgress />
            </div>
            <div
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: "400ms", animationFillMode: "forwards" }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <MonthlyNutritionScore />
                <MonthlyTotalNutritionSummary />
              </div>
            </div>
            <div
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: "600ms", animationFillMode: "forwards" }}
            >
              <WeeklyDiseasePrediction />
            </div>
            <div
              className="opacity-0 animate-fade-in"
              style={{ animationDelay: "800ms", animationFillMode: "forwards" }}
            >
              <WeeklyScanHistory />
            </div>
            <div
              className="opacity-0 animate-fade-in"
              style={{
                animationDelay: "1000ms",
                animationFillMode: "forwards",
              }}
            >
              <WeeklyProductRecommendation />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MonthlySummaryPage;
