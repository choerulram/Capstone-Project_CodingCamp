import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ScrollToTop from "./components/layouts/ScrollToTop";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { privateRoutes, publicRoutes } from "./routes/routes";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-main"></div>
          </div>
        }
      >
        <Routes>
          {" "}
          {/* Public Routes */}
          {publicRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={isAuthenticated ? <Navigate to="/" replace /> : element}
            />
          ))}
          {/* Protected Routes */}
          {privateRoutes.map(({ path, element }) => (
            <Route
              key={path}
              path={path}
              element={<ProtectedRoute>{element}</ProtectedRoute>}
            />
          ))}
          {/* Not Found Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
