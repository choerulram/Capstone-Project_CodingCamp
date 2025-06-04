import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import ArticlesSection from "../../components/home/ArticlesSection";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleScanClick = () => {
    navigate("/scan");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}{" "}
        <section className="bg-gradient-to-r from-main via-main to-main/90 py-20">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-5xl font-bold text-light mb-6 animate-fade-in">
                  {user ? `Welcome back, ${user.name}!` : "Welcome to"}
                  <span className="text-highlight block mt-2">PackFacts</span>
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
                  <h2 className="text-2xl font-bold text-main mb-6">
                    Fitur Utama
                  </h2>
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>{" "}
        {/* Daily Nutrition Stats Section */}{" "}
        <section className="py-16 bg-gradient-to-b from-highlight/5 to-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-main mb-8 flex items-center">
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
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              Ringkasan Gizi Harian
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
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
                  <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    80%
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 text-lg mb-1">
                  1,600
                </h3>
                <p className="text-gray-600 text-sm">
                  Kalori dari 2,000 target
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600"
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
                  <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    65%
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 text-lg mb-1">
                  42g
                </h3>
                <p className="text-gray-600 text-sm">Protein dari 65g target</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-yellow-100 p-3 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-yellow-600"
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
                  <span className="text-sm font-medium text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full">
                    45%
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 text-lg mb-1">
                  25g
                </h3>
                <p className="text-gray-600 text-sm">Lemak dari 55g target</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-100 p-3 rounded-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-purple-600"
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
                  <span className="text-sm font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                    70%
                  </span>
                </div>
                <h3 className="font-semibold text-gray-800 text-lg mb-1">
                  180g
                </h3>
                <p className="text-gray-600 text-sm">
                  Karbohidrat dari 250g target
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Recent Scans Section */}{" "}
        <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-highlight/5">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-main mb-8 flex items-center">
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              Riwayat Scan Terakhir
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-main">Mie Instan Goreng</h3>
                  <span className="text-sm text-gray-500">2 jam yang lalu</span>
                </div>
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?ixlib=rb-4.0.3"
                    alt="Mie Goreng"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Kalori: 380 kkal
                    </p>
                    <div className="flex gap-2">
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                        Karbohidrat: 56g
                      </span>
                      <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
                        Protein: 8g
                      </span>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-2 text-center py-2 text-highlight hover:text-highlight/80 transition-colors duration-300 border border-highlight/20 rounded-lg hover:bg-highlight/5">
                  Lihat Detail →
                </button>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-main">Roti Gandum</h3>
                  <span className="text-sm text-gray-500">5 jam yang lalu</span>
                </div>
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3"
                    alt="Roti Gandum"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Kalori: 180 kkal
                    </p>
                    <div className="flex gap-2">
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                        Karbohidrat: 35g
                      </span>
                      <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
                        Protein: 6g
                      </span>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-2 text-center py-2 text-highlight hover:text-highlight/80 transition-colors duration-300 border border-highlight/20 rounded-lg hover:bg-highlight/5">
                  Lihat Detail →
                </button>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-main">Yogurt Greek</h3>
                  <span className="text-sm text-gray-500">8 jam yang lalu</span>
                </div>
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1488477181946-6428a0291777?ixlib=rb-4.0.3"
                    alt="Yogurt Greek"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <p className="text-sm text-gray-600 mb-2">
                      Kalori: 120 kkal
                    </p>
                    <div className="flex gap-2">
                      <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                        Karbohidrat: 9g
                      </span>
                      <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
                        Protein: 15g
                      </span>
                    </div>
                  </div>
                </div>
                <button className="w-full mt-2 text-center py-2 text-highlight hover:text-highlight/80 transition-colors duration-300 border border-highlight/20 rounded-lg hover:bg-highlight/5">
                  Lihat Detail →
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* Nutrition Tips Section */}{" "}
        <section className="py-16 bg-gradient-to-tr from-highlight/5 via-white to-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-main mb-8 flex items-center">
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
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="relative group">
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
                    Makanan Tinggi Protein
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Konsumsi makanan tinggi protein seperti telur, dada ayam,
                    dan ikan dapat membantu mempertahankan massa otot dan
                    memberikan rasa kenyang lebih lama.
                  </p>
                  <a
                    href="#"
                    className="text-highlight hover:text-highlight/80 font-medium flex items-center"
                  >
                    Pelajari lebih lanjut
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="relative group">
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
                    Manfaat Serat untuk Pencernaan
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Serat membantu menjaga kesehatan pencernaan dan memberikan
                    rasa kenyang lebih lama. Konsumsi buah, sayur, dan
                    biji-bijian untuk asupan serat yang cukup.
                  </p>
                  <a
                    href="#"
                    className="text-highlight hover:text-highlight/80 font-medium flex items-center"
                  >
                    Pelajari lebih lanjut
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              <div className="relative group">
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
                    Pentingnya Vitamin D
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Vitamin D penting untuk kesehatan tulang dan sistem imun.
                    Dapatkan dari sinar matahari pagi dan makanan seperti ikan
                    berlemak dan telur.
                  </p>
                  <a
                    href="#"
                    className="text-highlight hover:text-highlight/80 font-medium flex items-center"
                  >
                    Pelajari lebih lanjut
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>{" "}
        {/* Health Articles Section */}
        <ArticlesSection />
        {/* Product Recommendations Section */}{" "}
        <section className="py-16 bg-gradient-to-bl from-gray-50 via-white to-highlight/5">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-main mb-8 flex items-center">
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              Produk Rekomendasi untuk Anda
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group">
                <div className="relative mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1576186726115-4d51596775d1"
                    alt="Granola Bar"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                    Sehat
                  </span>
                </div>
                <h3 className="font-semibold text-main mb-2">
                  Granola Bar Oatmeal
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Camilan sehat kaya serat dan protein
                </p>
                <div className="flex gap-2 mb-4">
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                    180 kkal
                  </span>
                  <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
                    5g protein
                  </span>
                </div>
                <button className="w-full py-2 text-highlight border border-highlight/20 rounded-lg hover:bg-highlight/5 transition-colors">
                  Lihat Detail
                </button>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group">
                <div className="relative mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1563636619-e9143da7973b"
                    alt="Greek Yogurt"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                    Protein Tinggi
                  </span>
                </div>
                <h3 className="font-semibold text-main mb-2">
                  Greek Yogurt Original
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Yogurt tinggi protein rendah lemak
                </p>
                <div className="flex gap-2 mb-4">
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                    120 kkal
                  </span>
                  <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
                    15g protein
                  </span>
                </div>
                <button className="w-full py-2 text-highlight border border-highlight/20 rounded-lg hover:bg-highlight/5 transition-colors">
                  Lihat Detail
                </button>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group">
                <div className="relative mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f"
                    alt="Almond Milk"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                    Rendah Kalori
                  </span>
                </div>
                <h3 className="font-semibold text-main mb-2">
                  Susu Almond Original
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Alternatif susu rendah kalori
                </p>
                <div className="flex gap-2 mb-4">
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                    30 kkal
                  </span>
                  <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
                    1g protein
                  </span>
                </div>
                <button className="w-full py-2 text-highlight border border-highlight/20 rounded-lg hover:bg-highlight/5 transition-colors">
                  Lihat Detail
                </button>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group">
                <div className="relative mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1604431696980-094b6012d1b3"
                    alt="Mixed Nuts"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                    Omega 3
                  </span>
                </div>
                <h3 className="font-semibold text-main mb-2">
                  Mix Nuts Premium
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Camilan sehat kaya nutrisi
                </p>
                <div className="flex gap-2 mb-4">
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                    160 kkal
                  </span>
                  <span className="text-xs bg-green-50 text-green-600 px-2 py-1 rounded-full">
                    6g protein
                  </span>
                </div>
                <button className="w-full py-2 text-highlight border border-highlight/20 rounded-lg hover:bg-highlight/5 transition-colors">
                  Lihat Detail
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* Community Insights Section */}{" "}
        <section className="py-16 bg-gradient-to-tl from-highlight/5 via-gray-50 to-white">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-main mb-8 flex items-center">
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
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
              Insight dari Komunitas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-main">Sarah Wilson</h3>
                    <p className="text-sm text-gray-500">Food Enthusiast</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "Aplikasi ini sangat membantu saya dalam memantau asupan gizi
                  harian. Rekomendasi produknya juga sangat relevan dengan
                  kebutuhan saya!"
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="text-sm text-gray-500">5.0</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-main">David Chen</h3>
                    <p className="text-sm text-gray-500">Fitness Trainer</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "Sebagai trainer, saya sering merekomendasikan aplikasi ini ke
                  klien saya. Fitur scan produk sangat akurat dan informatif!"
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="text-sm text-gray-500">4.9</span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-main">Amanda Lee</h3>
                    <p className="text-sm text-gray-500">Nutrition Expert</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "Data nutrisi yang detail dan tips kesehatan yang diberikan
                  sangat bermanfaat. Interface-nya juga sangat user-friendly!"
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">★★★★★</span>
                  <span className="text-sm text-gray-500">4.8</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default HomePage;
