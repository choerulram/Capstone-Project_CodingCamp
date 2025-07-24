import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../states/authUser/slice.js";
import UpgradeButton from "../subscription/UpgradeButton";
import LoginRequiredModal from "../auth/LoginRequiredModal";
import SignOutConfirmation from "../auth/SignOutConfirmation";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobileMenuOpen]);

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
    navigate("/");
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
            <Link
              to="/"
              className="hover:opacity-80 transition-opacity duration-300"
            >
              <h1 className="text-2xl sm:text-3xl font-bold">
                Nu
                <span className="text-highlight">Track</span>
              </h1>
            </Link>
          </div>
          {/* Show Upgrade Button on Mobile */}
          <div className="flex md:hidden items-center space-x-3">
            {token && <UpgradeButton />}
            <button
              onClick={toggleMobileMenu}
              className="text-main hover:text-highlight transition-colors duration-300"
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
          </div>
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
              Beranda
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
              Pindai
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
              Riwayat
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
              Nutrisi Harian
            </a>
            <div className="relative group">
              <button
                className={`transition-all duration-300 px-4 py-2 rounded-lg flex items-center space-x-1 ${
                  isActive("/daily-summary") ||
                  isActive("/weekly-summary") ||
                  isActive("/monthly-summary")
                    ? "bg-highlight text-gray-900 font-medium shadow-[0_2px_4px_rgba(0,128,128,0.2)]"
                    : "text-main hover:bg-highlight/10 hover:text-highlight"
                }`}
              >
                <span>Ringkasan</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 transition-transform group-hover:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="py-1">
                  <a
                    href="/daily-summary"
                    onClick={(e) => handleProtectedLink(e, "/daily-summary")}
                    className={`block px-4 py-2 text-sm ${
                      isActive("/daily-summary")
                        ? "bg-highlight text-gray-900 font-medium"
                        : "text-main hover:bg-highlight hover:text-gray-900 hover:font-medium"
                    }`}
                  >
                    Ringkasan Harian
                  </a>
                  <a
                    href="/weekly-summary"
                    onClick={(e) => handleProtectedLink(e, "/weekly-summary")}
                    className={`block px-4 py-2 text-sm ${
                      isActive("/weekly-summary")
                        ? "bg-highlight text-gray-900 font-medium"
                        : "text-main hover:bg-highlight hover:text-gray-900 hover:font-medium"
                    }`}
                  >
                    Ringkasan Mingguan
                  </a>
                  <a
                    href="/monthly-summary"
                    onClick={(e) => handleProtectedLink(e, "/monthly-summary")}
                    className={`block px-4 py-2 text-sm ${
                      isActive("/monthly-summary")
                        ? "bg-highlight text-gray-900 font-medium"
                        : "text-main hover:bg-highlight hover:text-gray-900 hover:font-medium"
                    }`}
                  >
                    Ringkasan Bulanan
                  </a>
                </div>
              </div>
            </div>
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
                  Keluar
                </button>
                <div className="border-l border-gray-200 h-6 mx-2"></div>
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
                Masuk
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
              Beranda
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
              Pindai
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
              Riwayat
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
              Nutrisi Harian
            </a>
            <div className="space-y-2">
              <a
                href="/daily-summary"
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  handleProtectedLink(e, "/daily-summary");
                }}
                className={`block transition-all duration-300 px-4 py-3 rounded-lg ${
                  isActive("/daily-summary")
                    ? "bg-highlight text-gray-900 font-medium shadow-[0_2px_4px_rgba(0,128,128,0.2)]"
                    : "text-main hover:bg-highlight/10 hover:text-highlight"
                }`}
              >
                Ringkasan Harian
              </a>
              <a
                href="/weekly-summary"
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  handleProtectedLink(e, "/weekly-summary");
                }}
                className={`block transition-all duration-300 px-4 py-3 rounded-lg ${
                  isActive("/weekly-summary")
                    ? "bg-highlight text-gray-900 font-medium shadow-[0_2px_4px_rgba(0,128,128,0.2)]"
                    : "text-main hover:bg-highlight/10 hover:text-highlight"
                }`}
              >
                Ringkasan Mingguan
              </a>
              <a
                href="/monthly-summary"
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  handleProtectedLink(e, "/monthly-summary");
                }}
                className={`block transition-all duration-300 px-4 py-3 rounded-lg ${
                  isActive("/monthly-summary")
                    ? "bg-highlight text-gray-900 font-medium shadow-[0_2px_4px_rgba(0,128,128,0.2)]"
                    : "text-main hover:bg-highlight/10 hover:text-highlight"
                }`}
              >
                Ringkasan Bulanan
              </a>
            </div>{" "}
            {/* Mobile Auth Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              {token ? (
                <div className="flex items-center justify-between w-full">
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-main hover:text-highlight transition-colors duration-300"
                  >
                    Keluar
                  </button>
                  <div className="flex items-center">
                    <div className="border-l border-gray-200 h-6 mr-4"></div>
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
                </div>
              ) : (
                <Link
                  to="/login"
                  className="w-full text-center px-4 py-2 text-main hover:text-highlight transition-colors duration-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Masuk
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>{" "}
      {/* Modal Confirmation Sign Out */}
      <SignOutConfirmation
        isVisible={showConfirm}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
      {/* Login Required Modal */}{" "}
      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </header>
  );
};

export default Header;
