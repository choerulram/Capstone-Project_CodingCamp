import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../states/authUser/slice.js";
import UpgradeButton from "../subscription/UpgradeButton";
import LoginRequiredModal from "../auth/LoginRequiredModal";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleProtectedLink = (e, path) => {
    if (e) e.preventDefault();
    if (!token) {
      setShowLoginModal(true);
    } else {
      navigate(path);
    }
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    setShowConfirm(true);
  };

  const confirmLogout = () => {
    dispatch(logout());
    navigate("/login");
    setShowConfirm(false);
  };

  const cancelLogout = () => {
    setShowConfirm(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white border-b border-gray-100 shadow-md relative">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {" "}
          <div className="flex items-center">
            <h1 className="text-3xl font-bold">
              Nu
              <span className="text-highlight">Track</span>
            </h1>
          </div>
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-main hover:text-highlight transition-colors duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`transition-all duration-300 px-4 py-2 rounded-lg ${
                isActive("/")
                  ? "bg-highlight text-gray-900 font-medium shadow-[0_2px_4px_rgba(0,128,128,0.2)]"
                  : "text-main hover:bg-highlight/10 hover:text-highlight"
              }`}
            >
              Home
            </Link>
            {/* Protected Routes */}
            <a
              href="/scan"
              onClick={(e) => handleProtectedLink(e, "/scan")}
              className={`transition-all duration-300 px-4 py-2 rounded-lg ${
                isActive("/scan")
                  ? "bg-highlight text-gray-900 font-medium shadow-[0_2px_4px_rgba(0,128,128,0.2)]"
                  : "text-main hover:bg-highlight/10 hover:text-highlight"
              }`}
            >
              Scan
            </a>
            <a
              href="/history"
              onClick={(e) => handleProtectedLink(e, "/history")}
              className={`transition-all duration-300 px-4 py-2 rounded-lg ${
                isActive("/history")
                  ? "bg-highlight text-gray-900 font-medium shadow-[0_2px_4px_rgba(0,128,128,0.2)]"
                  : "text-main hover:bg-highlight/10 hover:text-highlight"
              }`}
            >
              History
            </a>
            <a
              href="/nutrition"
              onClick={(e) => handleProtectedLink(e, "/nutrition")}
              className={`transition-all duration-300 px-4 py-2 rounded-lg ${
                isActive("/nutrition")
                  ? "bg-highlight text-gray-900 font-medium shadow-[0_2px_4px_rgba(0,128,128,0.2)]"
                  : "text-main hover:bg-highlight/10 hover:text-highlight"
              }`}
            >
              Daily Nutrition
            </a>
            <a
              href="/daily-summary"
              onClick={(e) => handleProtectedLink(e, "/daily-summary")}
              className={`transition-all duration-300 px-4 py-2 rounded-lg ${
                isActive("/daily-summary")
                  ? "bg-highlight text-gray-900 font-medium shadow-[0_2px_4px_rgba(0,128,128,0.2)]"
                  : "text-main hover:bg-highlight/10 hover:text-highlight"
              }`}
            >
              Daily Summary
            </a>
          </nav>
          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {token ? (
              <>
                <UpgradeButton />
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-main hover:text-highlight transition-colors duration-300"
                >
                  Sign Out
                </button>{" "}
                <div className="border-l border-gray-200 h-6 mx-2"></div>{" "}
                <button
                  onClick={() => handleProtectedLink(null, "/profile")}
                  className={`p-2 transition-all duration-300 rounded-full ${
                    isActive("/profile")
                      ? "bg-highlight text-gray-900 shadow-[0_2px_4px_rgba(0,128,128,0.2)]"
                      : "text-main hover:text-highlight hover:bg-gray-100"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-main hover:text-highlight transition-colors duration-300"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden fixed inset-x-0 bg-white border-b border-gray-100 shadow-lg transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full pointer-events-none"
          }`}
          style={{ top: "72px", zIndex: 40 }}
        >
          <nav className="container mx-auto px-6 py-4 flex flex-col space-y-4">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`transition-all duration-300 px-4 py-3 rounded-lg ${
                isActive("/")
                  ? "bg-highlight text-gray-900 font-medium shadow-[0_2px_4px_rgba(0,128,128,0.2)]"
                  : "text-main hover:bg-highlight/10 hover:text-highlight"
              }`}
            >
              Home
            </Link>
            {/* Protected Mobile Routes */}
            <a
              href="/scan"
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                handleProtectedLink(e, "/scan");
              }}
              className={`transition-all duration-300 px-4 py-3 rounded-lg ${
                isActive("/scan")
                  ? "bg-highlight text-gray-900 font-medium shadow-[0_2px_4px_rgba(0,128,128,0.2)]"
                  : "text-main hover:bg-highlight/10 hover:text-highlight"
              }`}
            >
              Scan
            </a>
            <a
              href="/history"
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                handleProtectedLink(e, "/history");
              }}
              className={`transition-all duration-300 px-4 py-3 rounded-lg ${
                isActive("/history")
                  ? "bg-highlight text-gray-900 font-medium shadow-[0_2px_4px_rgba(0,128,128,0.2)]"
                  : "text-main hover:bg-highlight/10 hover:text-highlight"
              }`}
            >
              History
            </a>
            <a
              href="/nutrition"
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                handleProtectedLink(e, "/nutrition");
              }}
              className={`transition-all duration-300 px-4 py-3 rounded-lg ${
                isActive("/nutrition")
                  ? "bg-highlight text-gray-900 font-medium shadow-[0_2px_4px_rgba(0,128,128,0.2)]"
                  : "text-main hover:bg-highlight/10 hover:text-highlight"
              }`}
            >
              Daily Nutrition
            </a>
            <a
              href="/daily-summary"
              onClick={(e) => {
                setIsMobileMenuOpen(false);
                handleProtectedLink(e, "/daily-summary");
              }}
              className={`transition-all duration-300 px-4 py-3 rounded-lg ${
                isActive("/daily-summary")
                  ? "bg-highlight text-gray-900 font-medium shadow-[0_2px_4px_rgba(0,128,128,0.2)]"
                  : "text-main hover:bg-highlight/10 hover:text-highlight"
              }`}
            >
              Daily Summary
            </a>

            {/* Mobile Auth Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              {" "}
              {token ? (
                <>
                  <UpgradeButton />
                  <div className="flex items-center space-x-4">
                    {" "}
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-main hover:text-highlight transition-colors duration-300"
                    >
                      Sign Out
                    </button>
                    <div className="border-l border-gray-200 h-6 mx-2"></div>{" "}
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleProtectedLink(null, "/profile");
                      }}
                      className={`p-2 transition-all duration-300 rounded-full ${
                        isActive("/profile")
                          ? "bg-highlight text-gray-900 shadow-[0_2px_4px_rgba(0,128,128,0.2)]"
                          : "text-main hover:text-highlight hover:bg-gray-100"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </button>
                  </div>
                </>
              ) : (
                <Link
                  to="/login"
                  className="w-full text-center px-4 py-2 text-main hover:text-highlight transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fade-in">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full mx-4 animate-scale-in">
            <h2 className="text-xl font-bold text-main mb-4 animate-fade-in-down">
              Konfirmasi Sign Out
            </h2>{" "}
            <p
              className="text-gray-600 mb-6 animate-fade-in"
              style={{ animationDelay: "100ms" }}
            >
              Apakah Anda yakin ingin keluar dari aplikasi?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={confirmLogout}
                className="flex-1 bg-main text-white py-2 rounded-xl hover:bg-teal-700 transition-all duration-300 hover:scale-105 hover:shadow-lg group animate-fade-in"
                style={{ animationDelay: "200ms" }}
              >
                <span className="inline-flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                  Ya, Sign Out
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </button>
              <button
                onClick={cancelLogout}
                className="flex-1 border border-main text-main py-2 rounded-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: "300ms" }}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Login Required Modal */}{" "}
      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </header>
  );
};

export default Header;
