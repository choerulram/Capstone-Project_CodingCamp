import React from "react";

const LoadingModal = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div
      className="fixed inset-0 min-h-[100vh] w-screen bg-black/50 backdrop-blur-sm z-[9999] overflow-hidden flex items-center justify-center"
      style={{ margin: 0, padding: 0 }}
    >
      {" "}
      <div className="bg-white rounded-xl p-6 sm:p-8 shadow-2xl transform transition-all animate-fade-in flex flex-col items-center max-w-sm w-[90%] sm:w-full mx-4">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-b-2 border-main"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-white"></div>
          </div>
        </div>
        <p className="mt-3 sm:mt-4 text-base sm:text-lg font-medium text-main">
          Memproses gambar...
        </p>
        <p className="mt-2 text-xs sm:text-sm text-gray-500 text-center px-2 sm:px-0">
          Mohon tunggu sebentar, kami sedang menganalisis nutrisi dari gambar
          Anda
        </p>
      </div>
    </div>
  );
};

export default LoadingModal;
