import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
        {/* Hero Section */}
        <section className="bg-main py-20">
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
        </section>

        {/* Recent Scans Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-main mb-8">
              Riwayat Scan Terakhir
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-main">Product Name</h3>
                  <span className="text-sm text-gray-500">2 jam yang lalu</span>
                </div>
                <p className="text-gray-600">
                  Informasi gizi singkat akan ditampilkan di sini...
                </p>
                <button className="mt-4 text-main hover:text-highlight transition-colors duration-300">
                  Lihat Detail →
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
