import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  LoginPage,
  RegisterPage,
  HomePage,
  ScanPage,
  HistoryPage,
  NutritionPage,
  DailySummaryPage,
} from "./pages";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
