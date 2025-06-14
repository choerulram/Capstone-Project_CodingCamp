import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ComingSoonModal from "./ComingSoonModal";

const PricingModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [showComingSoon, setShowComingSoon] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const handlePlanClick = (planName) => {
    if (planName === "Basic") {
      onClose();
      navigate("/scan");
    } else {
      setSelectedPlan(planName);
      setShowComingSoon(true);
    }
  };

  const plans = [
    {
      name: "Basic",
      price: "Gratis",
      features: [
        "5 scan per hari",
        "Analisis nutrisi dasar",
        "Riwayat scan 7 hari terakhir",
        "Tips nutrisi harian",
      ],
      isPopular: false,
      buttonText: "Pakai Sekarang",
      buttonVariant: "secondary",
    },
    {
      name: "Premium Bulanan",
      price: "Rp 49.000",
      period: "/bulan",
      features: [
        "Scan tanpa batas",
        "Analisis nutrisi lengkap",
        "Riwayat scan tak terbatas",
        "Export data nutrisi",
        "Tips nutrisi personal",
        "Rekomendasi produk",
        "Prioritas dukungan",
      ],
      isPopular: true,
      buttonText: "Upgrade Sekarang",
      buttonVariant: "primary",
      saving: "",
    },
    {
      name: "Premium Tahunan",
      price: "Rp 449.000",
      period: "/tahun",
      features: [
        "Semua fitur Premium Bulanan",
        "Hemat Rp 139.000/tahun",
        "Konsultasi ahli gizi 2x",
        "Panduan meal planning",
        "Akses webinar nutrisi",
        "Laporan analisis nutrisi bulanan",
        "Reward points 2x lipat",
      ],
      isPopular: false,
      buttonText: "Upgrade & Hemat",
      buttonVariant: "primary",
      saving: "Hemat 24%",
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen py-8">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity animate-fade-in"
          onClick={onClose}
        ></div>

        {/* Modal Content */}
        <div className="relative w-full max-w-6xl mx-auto px-4 md:px-6">
          <div className="relative w-full bg-white rounded-xl md:rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 animate-scale-in">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 md:right-4 md:top-4 text-gray-400 hover:text-gray-500"
            >
              <svg
                className="h-5 w-5 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-6 md:mb-8 animate-fade-in-down">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Pilih Paket yang Sesuai
              </h2>
              <p className="mt-2 md:mt-3 text-base md:text-lg text-gray-500">
                Nikmati fitur lengkap NuTrack untuk pengalaman analisis nutrisi
                yang lebih baik
              </p>
            </div>

            {/* Pricing Cards */}
            <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan, planIndex) => (
                <div
                  key={plan.name}
                  className={`relative rounded-xl md:rounded-2xl border transform hover:scale-[1.02] hover:shadow-xl transition-all duration-300 ${
                    plan.isPopular
                      ? "border-main shadow-xl md:scale-105"
                      : "border-gray-200"
                  } bg-white p-4 sm:p-6 md:p-8 shadow-sm flex flex-col animate-fade-in`}
                  style={{
                    animationDelay: `${planIndex * 200}ms`,
                  }}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-4 md:-top-5 left-1/2 -translate-x-1/2 animate-float">
                      <span className="inline-flex rounded-full bg-main px-3 py-1 md:px-4 text-xs md:text-sm font-semibold text-white shadow-lg">
                        Paling Populer
                      </span>
                    </div>
                  )}
                  {plan.saving && (
                    <div className="absolute -top-4 md:-top-5 left-1/2 -translate-x-1/2 animate-float">
                      <span className="inline-flex rounded-full bg-rose-500 px-3 py-1 md:px-4 text-xs md:text-sm font-semibold text-white shadow-lg">
                        {plan.saving}
                      </span>
                    </div>
                  )}

                  <div className="mb-4 md:mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 group-hover:text-main transition-colors duration-300">
                      {plan.name}
                    </h3>
                    <div className="mt-3 md:mt-4 flex items-baseline">
                      <span className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="ml-1 text-base md:text-lg text-gray-500">
                          {plan.period}
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="mb-4 md:mb-6 space-y-3 md:space-y-4 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={feature}
                        className="flex items-start opacity-0 animate-fade-in"
                        style={{
                          animationDelay: `${planIndex * 200 + idx * 100}ms`,
                          animationFillMode: "forwards",
                        }}
                      >
                        <svg
                          className="h-5 w-5 md:h-6 md:w-6 text-green-500 flex-shrink-0 transform transition-transform duration-300 hover:scale-110"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="ml-2 md:ml-3 text-sm md:text-base text-gray-700">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => handlePlanClick(plan.name)}
                    className={`w-full rounded-lg px-3 py-2.5 md:px-4 md:py-3 text-center text-sm font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg group ${
                      plan.buttonVariant === "primary"
                        ? "bg-main text-white hover:bg-main/90"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <span className="inline-flex items-center group-hover:translate-x-1 transition-transform duration-300">
                      {plan.buttonText}
                      <svg
                        className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div
              className="mt-8 md:mt-12 opacity-0 animate-fade-in"
              style={{ animationDelay: "800ms", animationFillMode: "forwards" }}
            >
              <h3 className="text-lg md:text-xl font-bold text-center mb-4 md:mb-6">
                Pertanyaan yang Sering Diajukan
              </h3>
              <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-3">
                {/* FAQ items with staggered animations */}
                <div
                  className="opacity-0 animate-fade-in"
                  style={{
                    animationDelay: "900ms",
                    animationFillMode: "forwards",
                  }}
                >
                  <h4 className="text-sm md:text-base font-semibold text-gray-900">
                    Apa perbedaan Basic dan Premium?
                  </h4>
                  <p className="mt-1.5 md:mt-2 text-xs md:text-sm text-gray-600">
                    Paket Premium memberikan akses tanpa batas ke semua fitur
                    NuTrack, termasuk scan tanpa batas, analisis nutrisi
                    lengkap, dan kemampuan untuk mengekspor data.
                  </p>
                </div>
                <div
                  className="opacity-0 animate-fade-in"
                  style={{
                    animationDelay: "1000ms",
                    animationFillMode: "forwards",
                  }}
                >
                  <h4 className="text-sm md:text-base font-semibold text-gray-900">
                    Bagaimana cara berlangganan Premium?
                  </h4>
                  <p className="mt-1.5 md:mt-2 text-xs md:text-sm text-gray-600">
                    Pilih paket Premium yang sesuai dan ikuti langkah
                    pembayaran. Setelah pembayaran berhasil, akun Anda akan
                    langsung diupgrade ke Premium.
                  </p>
                </div>
                <div
                  className="opacity-0 animate-fade-in"
                  style={{
                    animationDelay: "1100ms",
                    animationFillMode: "forwards",
                  }}
                >
                  <h4 className="text-sm md:text-base font-semibold text-gray-900">
                    Apa keuntungan berlangganan tahunan?
                  </h4>
                  <p className="mt-1.5 md:mt-2 text-xs md:text-sm text-gray-600">
                    Dengan berlangganan tahunan, Anda bisa hemat hingga 24% dan
                    mendapatkan benefit eksklusif seperti konsultasi ahli gizi
                    dan panduan meal planning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Modal */}
      <ComingSoonModal
        isOpen={showComingSoon}
        onClose={() => setShowComingSoon(false)}
        planName={selectedPlan}
      />
    </div>
  );
};

export default PricingModal;
