import HomePage from "../pages/HomePage.jsx";
import ScanPage from "../pages/ScanPage.jsx";
import HistoryPage from "../pages/HistoryPage.jsx";
import NutritionPage from "../pages/NutritionPage.jsx";
import DailySummaryPage from "../pages/DailySummaryPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import PricingPage from "../pages/PricingPage.jsx";

// Routes yang membutuhkan autentikasi
export const privateRoutes = [
  {
    path: "/",
    element: <HomePage />,
    title: "Beranda",
  },
  {
    path: "/scan",
    element: <ScanPage />,
    title: "Pindai Makanan",
  },
  {
    path: "/history",
    element: <HistoryPage />,
    title: "Riwayat",
  },
  {
    path: "/nutrition",
    element: <NutritionPage />,
    title: "Nutrisi",
  },
  {
    path: "/daily-summary",
    element: <DailySummaryPage />,
    title: "Ringkasan Harian",
  },
];

// Routes yang hanya bisa diakses saat tidak login
export const publicRoutes = [
  {
    path: "/login",
    element: <LoginPage />,
    title: "Masuk",
  },
  {
    path: "/register",
    element: <RegisterPage />,
    title: "Daftar",
  },
];

// Routes yang bisa diakses baik saat login maupun tidak
export const sharedRoutes = [
  {
    path: "/pricing",
    element: <PricingPage />,
    title: "Harga",
  },
];
