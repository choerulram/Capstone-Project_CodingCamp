import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LoginRequiredModal from "./LoginRequiredModal";

const ProtectedRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!token && location.pathname !== "/") {
      navigate("/");
      setShowLoginModal(true);
    }
  }, [token, navigate, location]);
  return (
    <>
      {location.pathname === "/" ? children : token ? children : null}
      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
        }}
      />
    </>
  );
};

export default ProtectedRoute;
