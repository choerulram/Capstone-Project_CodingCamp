import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginRequiredModal from "../auth/LoginRequiredModal";

const HeroSection = () => {
  const navigate = useNavigate();
  const { token, user } = useSelector((state) => state.auth);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleScanClick = () => {
    if (!token) {
      setShowLoginModal(true);
    } else {
      navigate("/scan");
    }
  };

  return (
    <section className="bg-gradient-to-r from-main via-main to-main/90 py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            {" "}
            <h1 className="text-5xl font-bold text-light mb-6 animate-fade-in">
              {user ? `Welcome back, ${user.name}!` : "Welcome to"}
              <span className="text-highlight block mt-2">NuTrack</span>
            </h1>
            <p className="text-xl text-gray-100 mb-8 animate-slide-up opacity-0 [animation-delay:0.3s] [animation-fill-mode:forwards]">
              Scan kemasan makanan Anda dan dapatkan informasi gizi secara
              instan
            </p>
            <button
              onClick={handleScanClick}
              className="bg-highlight text-main px-8 py-3 rounded-xl font-medium hover:bg-secondary transition-colors duration-300 animate-slide-up opacity-0 [animation-delay:0.5s] [animation-fill-mode:forwards]"
            >
              Mulai Scan
            </button>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white p-8 rounded-3xl shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-300">
              <h2 className="text-2xl font-bold text-main mb-6">Fitur Utama</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-highlight/20 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-main"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-main">Scan Instan</h3>
                    <p className="text-gray-600">
                      Informasi gizi dalam hitungan detik
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-highlight/20 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-main"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-main">
                      Rekomendasi Pintar
                    </h3>
                    <p className="text-gray-600">
                      Saran makanan sehat sesuai kebutuhan
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-highlight/20 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-main"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-main">
                      Riwayat & Analisis
                    </h3>
                    <p className="text-gray-600">Pantau pola makan Anda</p>
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>
        </div>
      </div>

      {/* Login Required Modal */}
      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </section>
  );
};

export default HeroSection;
