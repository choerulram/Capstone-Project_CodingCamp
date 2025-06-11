/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const NutritionTips = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="py-16 bg-gradient-to-tr from-highlight/5 via-white to-gray-50">
      <motion.div
        className="container mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <motion.h2
          className="text-3xl font-bold text-main mb-8 flex items-center"
          variants={cardVariants}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-highlight mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          Tips & Fakta Gizi
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Protein Card */}
          <motion.div
            className="relative group"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-highlight to-secondary rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white p-6 rounded-xl shadow-md">
              <div className="bg-highlight/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-highlight"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-main mb-2">
                Protein: Fondasi Kesehatan
              </h3>{" "}
              <p className="text-gray-600 mb-4">
                Perhatikan kandungan protein dalam label makanan kemasan. Pilih
                produk dengan protein minimal 5g per sajian untuk camilan.
                Konsumsi harian yang dianjurkan: 0.8-1g protein per kg berat
                badan. Cek produk seperti susu, yogurt, bars protein, dan
                makanan ringan berbahan kacang.
              </p>
            </div>
          </motion.div>

          {/* Lemak Card */}
          <motion.div
            className="relative group"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-highlight to-secondary rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white p-6 rounded-xl shadow-md">
              <div className="bg-highlight/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-highlight"
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
              <h3 className="text-lg font-semibold text-main mb-2">
                Lemak yang Sehat
              </h3>{" "}
              <p className="text-gray-600 mb-4">
                Periksa jenis lemak pada kemasan: total lemak, lemak jenuh, dan
                lemak trans. Pilih produk dengan lemak jenuh kurang dari 10% per
                sajian. Hindari produk dengan kandungan lemak trans pada
                ingredient list. Perhatikan minyak yang digunakan: pilih minyak
                nabati seperti kanola atau zaitun.
              </p>
            </div>
          </motion.div>

          {/* Karbohidrat Card */}
          <motion.div
            className="relative group"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-highlight to-secondary rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white p-6 rounded-xl shadow-md">
              <div className="bg-highlight/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-highlight"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-main mb-2">
                Karbohidrat Cerdas
              </h3>{" "}
              <p className="text-gray-600 mb-4">
                Cek total karbohidrat dan serat pada label informasi nilai gizi.
                Perhatikan rasio karbohidrat dengan serat untuk pilihan lebih
                sehat. Pilih produk dengan "whole grain" sebagai bahan utama.
                Waspadai istilah seperti "modified starch" atau "corn syrup"
                pada kemasan.
              </p>
            </div>
          </motion.div>

          {/* Serat Card */}
          <motion.div
            className="relative group"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-highlight to-secondary rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white p-6 rounded-xl shadow-md">
              <div className="bg-highlight/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-highlight"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-main mb-2">
                Pentingnya Serat
              </h3>
              <p className="text-gray-600 mb-4">
                {" "}
                Perhatikan kandungan serat di label "Dietary Fiber" pada
                kemasan. Pilih produk minimal 3g serat per sajian untuk camilan
                sehat. Target harian: 25-35g serat, cek % Daily Value pada
                kemasan. Cari produk dengan biji-bijian utuh sebagai bahan
                pertama.
              </p>
            </div>
          </motion.div>

          {/* Gula Card */}
          <motion.div
            className="relative group"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-highlight to-secondary rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white p-6 rounded-xl shadow-md">
              <div className="bg-highlight/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-highlight"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-main mb-2">
                Bijak dengan Gula
              </h3>
              <p className="text-gray-600 mb-4">
                {" "}
                Cek daftar gula pada ingredient list di kemasan makanan.
                Waspadai nama lain gula: syrup, dextrose, sucrose, atau
                berakhiran -ose. Batasan gula tambahan: maksimal 25g (wanita)
                dan 36g (pria) per hari. Pilih produk "no added sugar" atau
                "less sugar" bila tersedia.
              </p>
            </div>
          </motion.div>

          {/* Garam Card */}
          <motion.div
            className="relative group"
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-highlight to-secondary rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
            <div className="relative bg-white p-6 rounded-xl shadow-md">
              <div className="bg-highlight/10 w-12 h-12 flex items-center justify-center rounded-lg mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-highlight"
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
              <h3 className="text-lg font-semibold text-main mb-2">
                Kendali Asupan Garam
              </h3>
              <p className="text-gray-600 mb-4">
                {" "}
                Perhatikan kandungan "Sodium" atau "Garam" pada label makanan.
                Pilih produk dengan sodium kurang dari 20% Daily Value per
                sajian. Batasan harian: maksimal 2000mg sodium (± 1 sendok teh
                garam). Bandingkan label produk sejenis untuk pilih yang lebih
                rendah sodium.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default NutritionTips;
