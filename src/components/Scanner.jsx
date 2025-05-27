import React, { useState, useRef } from "react";
import { FaCamera, FaStop } from "react-icons/fa";

const Scanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef(null);

  const startCamera = async () => {
    setIsLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsScanning(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Tidak dapat mengakses kamera. Mohon berikan izin akses kamera.");
    }
    setIsLoading(false);
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  const handleStartScan = () => {
    startCamera();
  };

  const handleStopScan = () => {
    stopCamera();
  };
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
      <div className="aspect-video bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
        {isScanning ? (
          <div className="relative w-full h-full">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-64 h-64 border-2 border-highlight rounded-lg">
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-highlight"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-highlight"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-highlight"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-highlight"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-gray-500 flex flex-col items-center">
            <FaCamera className="text-4xl mb-2" />
            <p>Klik tombol "Mulai Scan" untuk memulai pemindaian</p>
          </div>
        )}
      </div>
      <div className="flex justify-center space-x-4">
        {!isScanning ? (
          <button
            onClick={handleStartScan}
            disabled={isLoading}
            className="px-6 py-2 bg-main text-white rounded-xl hover:bg-teal-700 transition-colors duration-300 flex items-center space-x-2"
          >
            <FaCamera className="text-lg" />
            <span>{isLoading ? "Memuat..." : "Mulai Scan"}</span>
          </button>
        ) : (
          <button
            onClick={handleStopScan}
            className="px-6 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-300 flex items-center space-x-2"
          >
            <FaStop className="text-lg" />
            <span>Berhenti</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Scanner;
