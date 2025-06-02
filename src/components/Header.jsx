import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../states/authUser/slice.js";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  // Dummy function untuk demo notifikasi - nantinya bisa diganti dengan data real
  useEffect(() => {
    // Simulasi pengecekan nutrisi
    const checkNutrition = () => {
      const dailyIntake = {
        sugar: 50, // batas gula harian (gram)
        currentSugar: 65, // simulasi gula yang dikonsumsi hari ini
      };

      if (dailyIntake.currentSugar > dailyIntake.sugar) {
        setNotifications([
          {
            id: Date.now(),
            type: "warning",
            message: `Peringatan: Konsumsi gula Anda hari ini (${dailyIntake.currentSugar}g) telah melebihi batas harian (${dailyIntake.sugar}g)`,
          },
        ]);
      }
    };

    checkNutrition();
  }, []);

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

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
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
            <Link
              to="/"
              className="text-main hover:text-highlight transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to="/scan"
              className="text-main hover:text-highlight transition-colors duration-300"
            >
              Scan
            </Link>
            <Link
              to="/history"
              className="text-main hover:text-highlight transition-colors duration-300"
            >
              History
            </Link>
            <Link
              to="/profile"
              className="text-main hover:text-highlight transition-colors duration-300"
            >
              Profile
            </Link>
            <Link
              to="/nutrition"
              className="text-main hover:text-highlight transition-colors duration-300"
            >
              Daily Nutrition
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={toggleNotifications}
                className="p-2 text-main hover:text-highlight transition-colors duration-300 relative"
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
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && notifications.length > 0 && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg z-50 border border-gray-100">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-main mb-2">
                      Notifikasi
                    </h3>
                    <div className="space-y-3">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 rounded-lg ${
                            notification.type === "warning"
                              ? "bg-yellow-50 border-l-4 border-yellow-400"
                              : "bg-white"
                          }`}
                        >
                          <p className="text-sm text-gray-600">
                            {notification.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

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
