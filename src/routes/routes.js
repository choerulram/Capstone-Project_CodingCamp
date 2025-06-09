import HomePage from "../pages/HomePage.jsx";
import ScanPage from "../pages/ScanPage.jsx";
import HistoryPage from "../pages/HistoryPage.jsx";
import NutritionPage from "../pages/NutritionPage.jsx";
import DailySummaryPage from "../pages/DailySummaryPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import ProtectedRoute from "../components/auth/ProtectedRoute.jsx";

// Routes yang membutuhkan autentikasi
export const privateRoutes = [
  {
    path: "/",
    element: <HomePage />,
    title: "Beranda",
  },
  {
    path: "/scan",
    element: (
      <ProtectedRoute>
        <ScanPage />
      </ProtectedRoute>
    ),
    title: "Pindai Makanan",
  },
  {
    path: "/history",
    element: (
      <ProtectedRoute>
        <HistoryPage />
      </ProtectedRoute>
    ),
    title: "Riwayat",
  },
  {
    path: "/nutrition",
    element: (
      <ProtectedRoute>
        <NutritionPage />
      </ProtectedRoute>
    ),
    title: "Nutrisi",
  },
  {
    path: "/daily-summary",
    element: (
      <ProtectedRoute>
        <DailySummaryPage />
      </ProtectedRoute>
    ),
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
