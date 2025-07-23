import HomePage from "../pages/HomePage.jsx";
import ScanPage from "../pages/ScanPage.jsx";
import HistoryPage from "../pages/HistoryPage.jsx";
import NutritionPage from "../pages/NutritionPage.jsx";
import DailySummaryPage from "../pages/DailySummaryPage.jsx";
import WeeklySummaryPage from "../pages/WeeklySummaryPage.jsx";
import MonthlySummaryPage from "../pages/MonthlySummaryPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import EmailVerificationPage from "../pages/EmailVerificationPage.jsx";
import ProtectedRoute from "../components/auth/ProtectedRoute.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";

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
  {
    path: "/weekly-summary",
    element: (
      <ProtectedRoute>
        <WeeklySummaryPage />
      </ProtectedRoute>
    ),
    title: "Ringkasan Mingguan",
  },
  {
    path: "/monthly-summary",
    element: (
      <ProtectedRoute>
        <MonthlySummaryPage />
      </ProtectedRoute>
    ),
    title: "Ringkasan Bulanan",
  },
  {
    path: "/profile",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
    title: "Profil",
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
  {
    path: "/verify-email",
    element: <EmailVerificationPage />,
    title: "Verifikasi Email",
  },
];
