import React from "react";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import HeroSection from "../../components/home/HeroSection";
import DailyNutritionStats from "../../components/home/DailyNutritionStats";
import RecentScans from "../../components/home/RecentScans";
import NutritionTips from "../../components/home/NutritionTips";
import ArticlesSection from "../../components/home/ArticlesSection";
import ProductRecommendations from "../../components/home/ProductRecommendations";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <DailyNutritionStats />
        <RecentScans />
        <NutritionTips />
        <ArticlesSection />
        <ProductRecommendations />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
