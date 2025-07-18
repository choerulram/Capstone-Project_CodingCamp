import React from "react";
import { FaCamera, FaStop, FaUpload, FaSearch, FaRedo } from "react-icons/fa";

const CameraControls = ({
  isScanning,
  isLoading,
  selectedImage,
  imageSource,
  handleStartCamera,
  handleStopCamera,
  handleCapture,
  handleRetakePhoto,
  handleAnalyze,
  setSelectedImage,
  setCurrentFile,
  setImageSource,
  fileInputRef,
}) => {
  return (
    <div className="flex justify-center gap-2 sm:gap-4 flex-wrap mb-8 sm:mb-12">
      {!isScanning ? (
        <>
          {!selectedImage ? (
            <>
              <div className="flex flex-col w-full items-center">
                <div className="flex flex-row w-full justify-center gap-2 sm:gap-4">
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-main text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-md text-sm sm:text-base"
                    disabled={isLoading}
                  >
                    <FaUpload className="text-base sm:text-lg" /> Upload Foto
                  </button>
                  <button
                    onClick={handleStartCamera}
                    className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-highlight text-main rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-md text-sm sm:text-base"
                    disabled={isLoading}
                  >
                    <FaCamera className="text-base sm:text-lg" /> Buka Kamera
                  </button>
                </div>
                <div className="text-xs text-gray-500 mt-2 text-center w-full">
                  Maksimal ukuran foto{" "}
                  <span className="font-semibold text-main">2MB</span>{" "}
                  <span className="hidden sm:inline">(JPG, JPEG, PNG)</span>
                  <span className="sm:hidden">(JPG/JPEG/PNG)</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setSelectedImage(null);
                  setCurrentFile(null);
                  setImageSource(null);
                }}
                className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-main text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-md text-sm sm:text-base"
                disabled={isLoading}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Kembali
              </button>
              {imageSource === "camera" ? (
                <button
                  onClick={handleRetakePhoto}
                  className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-highlight text-main rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-md text-sm sm:text-base"
                  disabled={isLoading}
                >
                  <FaRedo className="text-base sm:text-lg" /> Ambil Ulang Foto
                </button>
              ) : (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-highlight text-main rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-md text-sm sm:text-base"
                  disabled={isLoading}
                >
                  <FaUpload className="text-base sm:text-lg" /> Upload Ulang
                  Foto
                </button>
              )}
              <button
                onClick={handleAnalyze}
                className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-secondary text-main rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-md text-sm sm:text-base"
                disabled={isLoading}
              >
                <FaSearch /> Analisis Nutrisi
              </button>
            </>
          )}
        </>
      ) : (
        <>
          <button
            onClick={handleCapture}
            className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-highlight text-main rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-md text-sm sm:text-base"
            disabled={isLoading}
          >
            <FaCamera className="text-base sm:text-lg" /> Ambil Foto
          </button>
          <button
            onClick={handleStopCamera}
            className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-red-500 text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-md text-sm sm:text-base"
            disabled={isLoading}
          >
            <FaStop /> Tutup Kamera
          </button>
        </>
      )}
    </div>
  );
};

export default CameraControls;
