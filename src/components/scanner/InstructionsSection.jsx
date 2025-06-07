import React from "react";

const InstructionsSection = () => {
  return (
    <div className="bg-gradient-to-br from-highlight/20 to-secondary/20 rounded-xl p-6 backdrop-blur-sm">
      <h2 className="text-xl font-semibold text-main mb-6 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Petunjuk Penggunaan
      </h2>

      <div className="space-y-6">
        {/* Upload Foto Instructions */}
        <div>
          <h3 className="text-main font-medium mb-3 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Upload Foto
          </h3>
          <div className="space-y-3">
            {/* Step 1 */}
            <div className="group bg-white/60 hover:bg-white/80 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-secondary flex items-center gap-4 animate-fade-in cursor-default transform hover:-translate-y-0.5">
              <div className="p-3 bg-highlight/20 rounded-xl group-hover:bg-highlight/30 transition-colors flex items-center justify-center w-12 h-12">
                <span className="text-xl font-bold text-main">1</span>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-main">
                  Klik tombol "Upload Foto"
                </p>
                <p className="text-xs text-gray-600">
                  Tombol berwarna biru di bagian atas untuk memilih foto dari
                  perangkat Anda
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group bg-white/60 hover:bg-white/80 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-secondary flex items-center gap-4 animate-fade-in [animation-delay:150ms] cursor-default transform hover:-translate-y-0.5">
              <div className="p-3 bg-highlight/20 rounded-xl group-hover:bg-highlight/30 transition-colors flex items-center justify-center w-12 h-12">
                <span className="text-xl font-bold text-main">2</span>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-main">
                  Pilih file foto yang akan dianalisis
                </p>
                <p className="text-xs text-gray-600">
                  Pilih file foto dengan tabel nilai gizi yang jelas dan
                  memiliki pencahayaan yang baik
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group bg-white/60 hover:bg-white/80 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-secondary flex items-center gap-4 animate-fade-in [animation-delay:300ms] cursor-default transform hover:-translate-y-0.5">
              <div className="p-3 bg-highlight/20 rounded-xl group-hover:bg-highlight/30 transition-colors flex items-center justify-center w-12 h-12">
                <span className="text-xl font-bold text-main">3</span>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-main">
                  Klik tombol "Analisis Nutrisi"
                </p>
                <p className="text-xs text-gray-600">
                  Setelah foto berhasil diunggah, tombol akan muncul untuk
                  memulai proses analisis
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Kamera Instructions */}
        <div>
          <h3 className="text-main font-medium mb-3 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Penggunaan Kamera
          </h3>
          <div className="space-y-3">
            {/* Step 1 */}
            <div className="group bg-white/60 hover:bg-white/80 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-secondary flex items-center gap-4 animate-fade-in cursor-default transform hover:-translate-y-0.5">
              <div className="p-3 bg-highlight/20 rounded-xl group-hover:bg-highlight/30 transition-colors flex items-center justify-center w-12 h-12">
                <span className="text-xl font-bold text-main">1</span>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-main">
                  Klik tombol "Buka Kamera"
                </p>
                <p className="text-xs text-gray-600">
                  Tombol ini akan mengaktifkan kamera pada perangkat Anda
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group bg-white/60 hover:bg-white/80 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-secondary flex items-center gap-4 animate-fade-in [animation-delay:150ms] cursor-default transform hover:-translate-y-0.5">
              <div className="p-3 bg-highlight/20 rounded-xl group-hover:bg-highlight/30 transition-colors flex items-center justify-center w-12 h-12">
                <span className="text-xl font-bold text-main">2</span>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-main">
                  Pilih kamera (jika tersedia lebih dari satu)
                </p>
                <p className="text-xs text-gray-600">
                  Gunakan menu dropdown di bagian atas untuk memilih kamera yang
                  ingin digunakan
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group bg-white/60 hover:bg-white/80 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-secondary flex items-center gap-4 animate-fade-in [animation-delay:300ms] cursor-default transform hover:-translate-y-0.5">
              <div className="p-3 bg-highlight/20 rounded-xl group-hover:bg-highlight/30 transition-colors flex items-center justify-center w-12 h-12">
                <span className="text-xl font-bold text-main">3</span>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-main">
                  Klik tombol "Ambil Foto"
                </p>
                <p className="text-xs text-gray-600">
                  Arahkan kamera ke tabel nilai gizi dan pastikan gambar
                  terlihat jelas sebelum mengambil foto
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="group bg-white/60 hover:bg-white/80 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-secondary flex items-center gap-4 animate-fade-in [animation-delay:450ms] cursor-default transform hover:-translate-y-0.5">
              <div className="p-3 bg-highlight/20 rounded-xl group-hover:bg-highlight/30 transition-colors flex items-center justify-center w-12 h-12">
                <span className="text-xl font-bold text-main">4</span>
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-main">
                  Klik tombol "Analisis Nutrisi"
                </p>
                <p className="text-xs text-gray-600">
                  Setelah foto terambil, klik tombol ini untuk memulai proses
                  analisis nutrisi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsSection;
