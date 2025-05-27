import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../states/authUser/slice.js";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

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

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold">
              Pack
              <span className="text-highlight">Facts</span>
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-main hover:text-highlight transition-colors duration-300"
            >
              Home
            </a>
            <a
              href="#scan"
              className="text-main hover:text-highlight transition-colors duration-300"
            >
              Scan
            </a>
            <a
              href="#history"
              className="text-main hover:text-highlight transition-colors duration-300"
            >
              History
            </a>
            <a
              href="#profile"
              className="text-main hover:text-highlight transition-colors duration-300"
            >
              Profile
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-main hover:text-highlight transition-colors duration-300"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full mx-4">
            <h2 className="text-xl font-bold text-main mb-4">
              Konfirmasi Sign Out
            </h2>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin keluar dari aplikasi?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={confirmLogout}
                className="flex-1 bg-main text-white py-2 rounded-xl hover:bg-teal-700 transition-colors duration-300"
              >
                Ya, Sign Out
              </button>
              <button
                onClick={cancelLogout}
                className="flex-1 border border-main text-main py-2 rounded-xl hover:bg-gray-50 transition-colors duration-300"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
