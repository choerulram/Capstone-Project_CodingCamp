import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import LoginRequiredModal from "./LoginRequiredModal";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [showLoginModal, setShowLoginModal] = useState(!isAuthenticated);
  const location = useLocation();

  // Jika user sudah login, tampilkan konten
  if (isAuthenticated) {
    return children;
  }

  // Jika user belum login dan ini bukan halaman home, tampilkan modal login
  if (location.pathname !== "/") {
    return (
      <>
        {children}
        <LoginRequiredModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      </>
    );
  }
  // Untuk halaman home, biarkan parent component yang handle
  return children;
};

export default ProtectedRoute;
