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
          <h1 className="text-3xl font-bold text-main mb-4">Scan Kemasan</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Arahkan kamera ke informasi nilai gizi pada kemasan makanan untuk
            mendapatkan informasi nutrisi secara detail.
          </p>
        </div>

        <Scanner />

        <div className="mt-8 max-w-2xl mx-auto">
          <div className="bg-gray-50 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-main mb-4">
              Petunjuk Penggunaan:
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li>
                1. Pastikan tabel informasi nilai gizi terlihat jelas dan tidak
                terhalang
              </li>
              <li>
                2. Posisikan informasi nilai gizi dalam area kotak pemindaian
              </li>
              <li>3. Tahan ponsel Anda dengan stabil selama pemindaian</li>
              <li>
                4. Pastikan pencahayaan cukup terang dan tidak ada pantulan
                cahaya
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ScanPage;
