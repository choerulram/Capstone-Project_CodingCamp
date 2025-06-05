import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "../../components/layouts/Header";
import Footer from "../../components/layouts/Footer";
import Scanner from "../../components/scanner/Scanner";
import ScanLimitModal from "../../components/subscription/ScanLimitModal";
import { setShowLimitModal } from "../../states/subscription/slice";

const ScanPage = () => {
  const dispatch = useDispatch();
  const { showLimitModal } = useSelector((state) => state.subscription);

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

      <ScanLimitModal
        isOpen={showLimitModal}
        onClose={() => dispatch(setShowLimitModal(false))}
      />
    </div>
  );
};

export default ScanPage;
