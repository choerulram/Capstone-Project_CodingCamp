import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import HeroSection from "../components/home/HeroSection";
import DailyNutritionStats from "../components/home/DailyNutritionStats";
import RecentScans from "../components/home/RecentScans";
import NutritionTips from "../components/home/NutritionTips";
import ArticlesSection from "../components/home/ArticlesSection";
import ProductRecommendations from "../components/home/ProductRecommendations";
import LoginRequiredModal from "../components/auth/LoginRequiredModal";

const HomePage = () => {
  const { token } = useSelector((state) => state.auth);
  const [showLoginModal, setShowLoginModal] = useState(false);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />{" "}
      <main className="flex-grow">
        <HeroSection />
        {token ? (
          <>
            <DailyNutritionStats />
          </>
        ) : (
          // Preview section for non-logged in users with dummy data
          <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-highlight/5 w-full">
            <div className="container mx-auto px-6">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                <h2 className="text-2xl font-bold text-main mb-4">
                  Lihat Informasi Nutrisi Anda
                </h2>
                <p className="text-gray-600 mb-4">
                  Login untuk melihat ringkasan nutrisi harian dan riwayat
                  pemindaian Anda.
                </p>
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="px-6 py-2.5 bg-main text-white rounded-xl hover:bg-opacity-90 transition-colors duration-300"
                >
                  Mulai Sekarang
                </button>
              </div>
            </div>
          </section>
        )}
        <RecentScans />
        <NutritionTips />
        <ArticlesSection />
        <ProductRecommendations />
      </main>
      <Footer />
      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
};

export default HomePage;
