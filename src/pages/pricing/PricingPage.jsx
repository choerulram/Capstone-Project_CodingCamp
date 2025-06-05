import React from "react";

const PricingPage = () => {
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
      name: "Premium",
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
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
            Pilih Paket yang Sesuai
          </h1>
          <p className="mt-5 text-xl text-gray-500">
            Nikmati fitur lengkap PackFacts untuk pengalaman analisis nutrisi
            yang lebih baik
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border ${
                plan.isPopular
                  ? "border-main shadow-xl scale-105"
                  : "border-gray-200"
              } bg-white p-8 shadow-sm flex flex-col`}
            >
              {plan.isPopular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex rounded-full bg-main px-4 py-1 text-sm font-semibold text-white">
                    Paling Populer
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
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Pertanyaan yang Sering Diajukan
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Apa perbedaan Basic dan Premium?
              </h3>
              <p className="mt-2 text-gray-600">
                Paket Premium memberikan akses tanpa batas ke semua fitur
                PackFacts, termasuk scan tanpa batas, analisis nutrisi lengkap,
                dan kemampuan untuk mengekspor data.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Bagaimana cara berlangganan Premium?
              </h3>
              <p className="mt-2 text-gray-600">
                Pilih paket Premium dan ikuti langkah pembayaran yang tersedia.
                Setelah pembayaran berhasil, akun Anda akan langsung diupgrade
                ke Premium.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Apakah saya bisa membatalkan langganan?
              </h3>
              <p className="mt-2 text-gray-600">
                Ya, Anda dapat membatalkan langganan kapan saja melalui
                pengaturan akun. Fitur Premium akan tetap aktif sampai akhir
                periode langganan.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
