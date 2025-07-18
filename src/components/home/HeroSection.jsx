/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
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
    <motion.section
      className="bg-gradient-to-r from-main via-main to-main/90 py-12 sm:py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            className="md:w-1/2 mb-8 md:mb-0 text-center md:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-light mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {user
                ? `Selamat datang kembali, ${user.name}!`
                : "Selamat datang di"}
              <motion.span
                className="text-highlight block mt-1 sm:mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                NuTrack
              </motion.span>
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl text-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Pindai kemasan makanan Anda dan dapatkan informasi gizi secara
              instan.
            </motion.p>
            <motion.p
              className="text-base sm:text-lg md:text-xl text-gray-100 mb-8 max-w-xl md:max-w-2xl mx-auto md:mx-0 text-center md:text-left"
              style={{ wordBreak: "break-word" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Data yang dipindai adalah informasi gizi dari kemasan makanan yang
              Anda konsumsi hari ini, dihitung per sajian.
            </motion.p>
            <motion.button
              onClick={handleScanClick}
              className="bg-highlight text-main px-6 sm:px-8 py-3 rounded-xl font-medium text-base sm:text-lg shadow-lg hover:shadow-highlight/50 hover:bg-secondary transition-all duration-300 animate-pulse hover:animate-none"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.4, delay: 1 }}
            >
              Mulai Pindai
            </motion.button>
          </motion.div>{" "}
          <motion.div
            className="md:w-1/2 w-full"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-300"
              whileHover={{ y: -10 }}
            >
              <h2 className="text-xl sm:text-2xl font-bold text-main mb-4 sm:mb-6">
                Fitur Utama
              </h2>
              <div className="space-y-4 sm:space-y-6">
                {/* Fitur Items */}{" "}
                <motion.div
                  className="flex items-center space-x-3 sm:space-x-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ x: 10 }}
                >
                  <div className="bg-highlight/20 p-2 sm:p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 sm:h-6 sm:w-6 text-main"
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
                    <h3 className="font-semibold text-main text-sm sm:text-base">
                      Pindai Instan
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Informasi gizi dalam hitungan detik
                    </p>
                  </div>
                </motion.div>{" "}
                <motion.div
                  className="flex items-center space-x-3 sm:space-x-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ x: 10 }}
                >
                  <div className="bg-highlight/20 p-2 sm:p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 sm:h-6 sm:w-6 text-main"
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
                    <h3 className="font-semibold text-main text-sm sm:text-base">
                      Rekomendasi Pintar
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Saran makanan sehat sesuai kebutuhan
                    </p>
                  </div>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-3 sm:space-x-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ x: 10 }}
                >
                  <div className="bg-highlight/20 p-2 sm:p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 sm:h-6 sm:w-6 text-main"
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
                    <h3 className="font-semibold text-main text-sm sm:text-base">
                      Riwayat & Analisis
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm">
                      Pantau pola makan Anda
                    </p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <LoginRequiredModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </motion.section>
  );
};

export default HeroSection;
