import React from "react";
import WeeklyScanHistory from "../components/weekly-summary/WeeklyScanHistory";
import WeeklyNutritionProgress from "../components/weekly-summary/WeeklyNutritionProgress";

const WeeklySummaryPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Ringkasan Mingguan</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Nutrition Progress */}
        <WeeklyNutritionProgress />

        {/* Weekly Scan History */}
        <WeeklyScanHistory />
      </div>
    </div>
  );
};

export default WeeklySummaryPage;
