import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Scanner from "../components/Scanner";

const ScanPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-6 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-main mb-4">
            Scan Informasi Nilai Gizi
          </h1>
          <p className="text-gray-600">
            Pindai informasi nilai gizi pada kemasan untuk mengetahui kandungan
            nutrisinya
          </p>
        </div>

        <Scanner />
      </main>

      <Footer />
    </div>
  );
};

export default ScanPage;
