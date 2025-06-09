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
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal Content */}
        <div className="relative max-w-6xl w-full bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-500"
          >
            <svg
              className="h-6 w-6"
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
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Pilih Paket yang Sesuai
            </h2>
            <p className="mt-3 text-lg text-gray-500">
              Nikmati fitur lengkap NuTrack untuk pengalaman analisis nutrisi
              yang lebih baik
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border ${
                  plan.isPopular
                    ? "border-main shadow-xl scale-105"
                    : "border-gray-200"
                } bg-white p-6 sm:p-8 shadow-sm flex flex-col`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex rounded-full bg-main px-4 py-1 text-sm font-semibold text-white">
                      Paling Populer
                    </span>
                  </div>
                )}
                {plan.saving && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex rounded-full bg-rose-500 px-4 py-1 text-sm font-semibold text-white">
                      {plan.saving}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {plan.name}
                  </h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="ml-1 text-lg text-gray-500">
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                <ul className="mb-6 space-y-4 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <svg
                        className="h-6 w-6 text-green-500 flex-shrink-0"
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
                      <span className="ml-3 text-base text-gray-700">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePlanClick(plan.name)}
                  className={`w-full rounded-lg px-4 py-3 text-center text-sm font-semibold transition-all duration-200 ${
                    plan.buttonVariant === "primary"
                      ? "bg-main text-white hover:bg-main/90"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-center mb-6">
              Pertanyaan yang Sering Diajukan
            </h3>
            <div className="grid gap-6 sm:grid-cols-3">
              <div>
                <h4 className="text-base font-semibold text-gray-900">
                  Apa perbedaan Basic dan Premium?
                </h4>
                <p className="mt-2 text-sm text-gray-600">
                  Paket Premium memberikan akses tanpa batas ke semua fitur
                  NuTrack, termasuk scan tanpa batas, analisis nutrisi lengkap,
                  dan kemampuan untuk mengekspor data.
                </p>
              </div>
              <div>
                <h4 className="text-base font-semibold text-gray-900">
                  Bagaimana cara berlangganan Premium?
                </h4>
                <p className="mt-2 text-sm text-gray-600">
                  Pilih paket Premium yang sesuai dan ikuti langkah pembayaran.
                  Setelah pembayaran berhasil, akun Anda akan langsung diupgrade
                  ke Premium.
                </p>
              </div>
              <div>
                <h4 className="text-base font-semibold text-gray-900">
                  Apa keuntungan berlangganan tahunan?
                </h4>
                <p className="mt-2 text-sm text-gray-600">
                  Dengan berlangganan tahunan, Anda bisa hemat hingga 24% dan
                  mendapatkan benefit eksklusif seperti konsultasi ahli gizi dan
                  panduan meal planning.
                </p>
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
