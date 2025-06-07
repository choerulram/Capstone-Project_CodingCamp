import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ScanPage from "./pages/ScanPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import NutritionPage from "./pages/NutritionPage.jsx";
import DailySummaryPage from "./pages/DailySummaryPage.jsx";
import PricingPage from "./pages/PricingPage.jsx";
import ScrollToTop from "./components/layouts/ScrollToTop";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />}
        />{" "}
        <Route
          path="/scan"
          element={isAuthenticated ? <ScanPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/history"
          element={isAuthenticated ? <HistoryPage /> : <Navigate to="/login" />}
        />{" "}
        <Route
          path="/nutrition"
          element={
            isAuthenticated ? <NutritionPage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/daily-summary"
          element={
            isAuthenticated ? <DailySummaryPage /> : <Navigate to="/login" />
          }
        />
        <Route path="/pricing" element={<PricingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
