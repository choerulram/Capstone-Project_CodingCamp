/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import api from "../../utils/api";

const DailyNutritionStats = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8,
        duration: 0.5,
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
      },
    },
  };

  const { token } = useSelector((state) => state.auth);
  const [dailyTarget, setDailyTarget] = useState({
    energi: 0,
    protein: 0,
    "lemak total": 0,
    karbohidrat: 0,
  });
  const [totalNutrition, setTotalNutrition] = useState({
    energi: 0,
    protein: 0,
    "lemak total": 0,
    karbohidrat: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get daily nutrition targets
        const dailyNutrition = await api.getDailyNutrition(token);
        if (dailyNutrition?.kebutuhan_harian) {
          setDailyTarget({
            energi: dailyNutrition.kebutuhan_harian.energi,
            protein: dailyNutrition.kebutuhan_harian.protein,
            "lemak total": dailyNutrition.kebutuhan_harian["lemak total"],
            karbohidrat: dailyNutrition.kebutuhan_harian.karbohidrat,
          });
        }

        // Get today's scan history
        const data = await api.getTodayScanHistory(token);
        const history = data.history || [];

        const total = {
          energi: 0,
          protein: 0,
          "lemak total": 0,
          karbohidrat: 0,
        };

        history.forEach((item) => {
          if (item.kandungan_gizi) {
            total.energi += Number(item.kandungan_gizi.energi || 0);
            total.protein += Number(item.kandungan_gizi.protein || 0);
            total["lemak total"] += Number(
              item.kandungan_gizi["lemak total"] || 0
            );
            total.karbohidrat += Number(item.kandungan_gizi.karbohidrat || 0);
          }
        });

        setTotalNutrition(total);
      } catch (error) {
        console.error("Error fetching nutrition data:", error);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const calculatePercentage = (current, target) => {
    if (!target || target === 0) return 0;
    const percentage = (current / target) * 100;
    return Math.round(percentage);
  };

  return (
    <motion.section
      className="py-8 md:py-16 bg-gradient-to-b from-highlight/5 to-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.h2
          className="text-xl md:text-3xl font-bold text-main mb-4 md:mb-8 flex items-center"
          variants={cardVariants}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:h-8 md:w-8 text-highlight mr-2 md:mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
          Ringkasan Gizi Harian
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          <motion.div
            className="bg-white p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="bg-blue-100 p-2 md:p-3 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 md:h-6 md:w-6 text-blue-600"
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
              <span className="text-xs md:text-sm font-medium text-blue-600 bg-blue-50 px-2 md:px-3 py-1 rounded-full">
                {calculatePercentage(totalNutrition.energi, dailyTarget.energi)}
                %
              </span>
            </div>{" "}
            <h3 className="font-semibold text-gray-800 text-base md:text-lg mb-1">
              {Number(totalNutrition.energi).toFixed(1)}kkal
            </h3>
            <p className="text-gray-600 text-xs md:text-sm">
              Energi dari {Number(dailyTarget.energi).toFixed(1)}kkal target
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="bg-green-100 p-2 md:p-3 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 md:h-6 md:w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </div>
              <span className="text-xs md:text-sm font-medium text-green-600 bg-green-50 px-2 md:px-3 py-1 rounded-full">
                {calculatePercentage(
                  totalNutrition.protein,
                  dailyTarget.protein
                )}
                %
              </span>
            </div>{" "}
            <h3 className="font-semibold text-gray-800 text-lg mb-1">
              {Number(totalNutrition.protein).toFixed(1)}g
            </h3>
            <p className="text-gray-600 text-sm">
              Protein dari {Number(dailyTarget.protein).toFixed(1)}g target
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="bg-yellow-100 p-2 md:p-3 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 md:h-6 md:w-6 text-yellow-600"
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
              <span className="text-xs md:text-sm font-medium text-yellow-600 bg-yellow-50 px-2 md:px-3 py-1 rounded-full">
                {calculatePercentage(
                  totalNutrition["lemak total"],
                  dailyTarget["lemak total"]
                )}
                %
              </span>
            </div>{" "}
            <h3 className="font-semibold text-gray-800 text-lg mb-1">
              {Number(totalNutrition["lemak total"]).toFixed(1)}g
            </h3>
            <p className="text-gray-600 text-sm">
              Lemak dari {Number(dailyTarget["lemak total"]).toFixed(1)}g target
            </p>
          </motion.div>
          <motion.div
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
            variants={cardVariants}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="bg-purple-100 p-2 md:p-3 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 md:h-6 md:w-6 text-purple-600"
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
              <span className="text-xs md:text-sm font-medium text-purple-600 bg-purple-50 px-2 md:px-3 py-1 rounded-full">
                {calculatePercentage(
                  totalNutrition.karbohidrat,
                  dailyTarget.karbohidrat
                )}
                %
              </span>
            </div>{" "}
            <h3 className="font-semibold text-gray-800 text-lg mb-1">
              {Number(totalNutrition.karbohidrat).toFixed(1)}g
            </h3>
            <p className="text-gray-600 text-sm">
              Karbohidrat dari {Number(dailyTarget.karbohidrat).toFixed(1)}g
              target
            </p>
          </motion.div>
        </div>
        <motion.div
          className="flex justify-center mt-6 md:mt-8"
          variants={buttonVariants}
          whileHover="hover"
        >
          <Link
            to="/daily-summary"
            className="inline-flex items-center px-4 md:px-6 py-2 md:py-3 bg-highlight text-white text-sm md:text-base font-medium rounded-lg hover:bg-highlight/90 transition-all duration-300 shadow-sm hover:shadow"
          >
            <span>Lihat Ringkasan Lengkap</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default DailyNutritionStats;
