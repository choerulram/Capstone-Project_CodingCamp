import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";
import Scanner from "../components/scanner/Scanner";
import ScanLimitModal from "../components/subscription/ScanLimitModal";
import { setShowLimitModal } from "../states/subscription/slice";

const ScanPage = () => {
  const dispatch = useDispatch();
  const { showLimitModal } = useSelector((state) => state.subscription);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-main mb-2 sm:mb-4">
            Scan Informasi Nilai Gizi
          </h1>
          <p className="text-sm sm:text-base text-gray-600 px-2 sm:px-0">
            Pindai informasi nilai gizi pada kemasan untuk mengetahui kandungan
            nutrisinya
          </p>
        </div>

        <Scanner />
      </main>

      <Footer />

      <ScanLimitModal
        isOpen={showLimitModal}
        onClose={() => dispatch(setShowLimitModal(false))}
      />
    </div>
  );
};

export default ScanPage;
