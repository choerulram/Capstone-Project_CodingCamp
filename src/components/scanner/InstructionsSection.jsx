import React from "react";

const InstructionsSection = () => {
  const uploadSteps = [
    {
      title: "Pilih Foto",
      desc: "Klik tombol 'Upload Foto' berwarna biru untuk memilih foto dari perangkat Anda",
    },
    {
      title: "Pastikan Foto Jelas",
      desc: "Pilih foto dengan tabel nilai gizi yang jelas dan memiliki pencahayaan yang baik",
    },
    {
      title: "Periksa Hasil",
      desc: "Pastikan foto yang dipilih sudah sesuai sebelum melanjutkan ke analisis",
    },
    {
      title: "Mulai Analisis",
      desc: "Klik tombol 'Analisis Nutrisi' untuk memulai proses analisis nilai gizi",
    },
  ];

  const cameraSteps = [
    {
      title: "Aktifkan Kamera",
      desc: "Klik tombol 'Buka Kamera' untuk mengaktifkan kamera perangkat Anda",
    },
    {
      title: "Pilih Kamera",
      desc: "Jika tersedia beberapa kamera, pilih kamera yang ingin digunakan dari menu dropdown",
    },
    {
      title: "Atur Posisi",
      desc: "Arahkan kamera ke tabel nilai gizi dengan pencahayaan yang cukup",
    },
    {
      title: "Ambil Gambar",
      desc: "Klik tombol 'Ambil Foto' saat posisi dan fokus sudah tepat",
    },
    {
      title: "Verifikasi & Analisis",
      desc: "Periksa hasil foto, ambil ulang jika perlu, lalu klik 'Analisis Nutrisi'",
    },
  ];

  return (
    <div className="bg-white/90 rounded-2xl p-4 md:p-8 shadow-lg backdrop-blur-md">
      {/* Header Section */}
      <div className="mb-6 md:mb-8 text-center">
        <h2 className="text-xl md:text-2xl font-bold text-main mb-2 flex items-center justify-center gap-2 md:gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:h-8 md:w-8 text-secondary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Panduan Penggunaan
        </h2>{" "}
        <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-2">
          Ikuti langkah-langkah berikut untuk menganalisis nutrisi dari foto
          informasi nilai gizi
        </p>
      </div>
      {/* Instructions Grid */}
      <div className="grid lg:grid-cols-2 gap-4 md:gap-8">
        {/* Upload Section */}
        <div className="bg-gradient-to-br from-main/5 to-secondary/10 rounded-xl p-4 md:p-6 transform transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-secondary/10 rounded-full">
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
                  strokeWidth="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-main">Upload Foto</h3>
          </div>

          <div className="space-y-4">
            {uploadSteps.map((step, index) => (
              <div
                key={index}
                className="flex gap-4 items-start bg-white/80 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-main text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-medium text-main mb-1">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>{" "}
        {/* Camera Section */}
        <div className="bg-gradient-to-br from-main/5 to-secondary/10 rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-secondary/10 rounded-full">
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
                  strokeWidth="2"
                  d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-main">Gunakan Kamera</h3>
          </div>

          <div className="space-y-4">
            {cameraSteps.map((step, index) => (
              <div
                key={index}
                className="flex gap-4 items-start bg-white/80 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-main text-white rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-medium text-main mb-1">{step.title}</h4>
                  <p className="text-sm text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>{" "}
      {/* Tips Section */}
      <div className="mt-6 md:mt-8 p-3 md:p-4 bg-secondary/5 rounded-lg">
        <p className="text-xs md:text-sm text-main/80 text-center">
          💡 Tips: Pastikan foto yang diambil memiliki pencahayaan yang baik dan
          tabel nilai gizi terlihat jelas untuk hasil analisis yang optimal
        </p>
      </div>
    </div>
  );
};

export default InstructionsSection;
