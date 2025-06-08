import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCamera, FaStop, FaUpload, FaSearch, FaRedo } from "react-icons/fa";
import api from "../../utils/api";
import DecorativeDivider from "./DecorativeDivider";
import InstructionsSection from "./InstructionsSection";
import AnalysisResult from "./AnalysisResult";
import {
  startCamera,
  stopCamera,
  switchCamera,
  getDevices,
} from "../../states/camera/action.js";
import { setIsScanning } from "../../states/camera/slice.js";
import {
  incrementScanCount,
  setShowLimitModal,
} from "../../states/subscription/slice";

const Scanner = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { devices, selectedDevice, stream, isScanning } = useSelector(
    (state) => state.camera
  );
  const { isPremium, scanCount } = useSelector((state) => state.subscription);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);
  const [error, setError] = useState(null);
  const [nutritionData, setNutritionData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [imageSource, setImageSource] = useState(null); // 'upload' atau 'camera'

  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  // Handler untuk mengganti kamera
  const handleSwitchCamera = async (deviceId) => {
    await dispatch(switchCamera(deviceId));
  };
  // Handler untuk memulai kamera
  const handleStartCamera = useCallback(async () => {
    dispatch(setIsScanning(true));
    await dispatch(startCamera(selectedDevice));
  }, [dispatch, selectedDevice]);

  // Handler untuk menghentikan kamera
  const handleStopCamera = useCallback(() => {
    dispatch(setIsScanning(false));
    dispatch(stopCamera());
  }, [dispatch]);

  // Effect untuk mengambil daftar kamera saat komponen dimount
  useEffect(() => {
    dispatch(getDevices());
  }, [dispatch]);
  // Effect untuk menangani video stream
  useEffect(() => {
    if (!videoRef.current || !stream || !isScanning) {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject = null;
      }
      return;
    }

    const video = videoRef.current;
    video.srcObject = stream;

    // Cleanup function
    return () => {
      if (video.srcObject) {
        const tracks = video.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        video.srcObject = null;
      }
    };
  }, [stream, isScanning]);

  // Fungsi untuk memproses gambar dan mendapatkan data nutrisi
  const processImage = async (file) => {
    if (!file || !token) {
      setError("File atau token tidak valid");
      return;
    }

    // Cek batasan scan untuk user non-premium
    if (!isPremium && scanCount >= 5) {
      dispatch(setShowLimitModal(true));
      return;
    }

    setIsLoading(true);
    setError(null);
    setNutritionData(null);

    try {
      const result = await api.uploadImage(file, token);

      if (!result) {
        throw new Error("Gagal menganalisis gambar");
      }

      // Increment scan count setelah berhasil
      if (!isPremium) {
        dispatch(incrementScanCount());
      }

      setNutritionData({
        kandungan: result.kandungan_gizi || {},
        perbandingan: result.perbandingan || [],
        kebutuhan: result.kebutuhan_harian || {},
      });
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Terjadi kesalahan saat menganalisis gambar");
    } finally {
      setIsLoading(false);
    }
  };

  // Handler untuk upload file
  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setError(null);
      setNutritionData(null);

      // Show preview
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);

      // Store file for analysis and set image source
      setCurrentFile(file);
      setImageSource("upload");

      // Stop camera if it's running
      if (isScanning) {
        handleStopCamera();
      }
    } catch (err) {
      console.error("Error handling file:", err);
      setError("Gagal memuat file: " + err.message);
    }
  };

  // Handler untuk menangkap foto
  const handleCapture = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            throw new Error("Gagal mengambil gambar");
          }

          const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
          setSelectedImage(URL.createObjectURL(blob));
          setCurrentFile(file);
          setImageSource("camera");
          setNutritionData(null);
          handleStopCamera();
        },
        "image/jpeg",
        0.8
      );
    } catch (err) {
      console.error("Error capturing image:", err);
      setError("Gagal mengambil gambar: " + err.message);
    }
  }, [handleStopCamera]);

  // Handler untuk mengulang foto
  const handleRetakePhoto = useCallback(() => {
    setSelectedImage(null);
    setCurrentFile(null);
    handleStartCamera();
  }, [handleStartCamera]);

  const handleAnalyze = async () => {
    if (!currentFile) {
      setError("Silakan pilih atau ambil gambar terlebih dahulu");
      return;
    }
    await processImage(currentFile);
  };
  // Effect untuk menangani perubahan video stream
  useEffect(() => {
    if (!videoRef.current || !isScanning) return;

    const videoElement = videoRef.current;
    let isComponentMounted = true;

    const handleCanPlay = async () => {
      if (!isComponentMounted || !videoElement) return;

      try {
        console.log("Video dapat diputar");
        await videoElement.play();
        console.log("Video mulai berputar");
      } catch (err) {
        if (isComponentMounted) {
          console.error("Error memutar video:", err);
          setError("Gagal memulai video stream");
        }
      }
    };

    const handleError = (err) => {
      if (isComponentMounted) {
        console.error("Error video:", err);
        setError(
          "Error pada video stream: " + (err.message || "Unknown error")
        );
      }
    };

    videoElement.addEventListener("canplay", handleCanPlay);
    videoElement.addEventListener("error", handleError);

    // Coba putar video jika sudah siap
    if (videoElement.readyState >= 3) {
      handleCanPlay();
    }

    return () => {
      isComponentMounted = false;
      if (videoElement) {
        videoElement.removeEventListener("canplay", handleCanPlay);
        videoElement.removeEventListener("error", handleError);
        try {
          const stream = videoElement.srcObject;
          if (stream) {
            stream.getTracks().forEach((track) => {
              track.stop();
            });
          }
          videoElement.srcObject = null;
        } catch (err) {
          console.error("Error stopping video stream:", err);
        }
      }
    };
  }, [isScanning]);
  // Check browser support on mount
  useEffect(() => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setError("Browser Anda tidak mendukung akses kamera");
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);
  // Cleanup effect
  useEffect(() => {
    return () => {
      if (isScanning) {
        handleStopCamera();
      }
    };
  }, [isScanning, handleStopCamera]);
  return (
    <div
      className={`min-h-screen flex ${
        nutritionData
          ? "lg:flex-row flex-col gap-6"
          : "flex-col items-center justify-center"
      } animate-fade-in transition-all duration-500 w-full py-4`}
    >
      <div
        className={`${
          nutritionData ? "lg:w-1/2 w-full" : "w-full max-w-4xl"
        } flex flex-col space-y-6 transition-all duration-500 ${
          nutritionData ? "" : "items-center"
        }`}
      >
        {/* Main Scanner Container */}{" "}
        <div className="w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-secondary overflow-hidden">
          {/* Pilihan Kamera */}
          {devices.length > 1 && (
            <div className="p-4 bg-highlight/5 border-b border-secondary/20">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-main">
                  Pilih Kamera:
                </span>
                <select
                  value={selectedDevice || ""}
                  onChange={(e) => handleSwitchCamera(e.target.value)}
                  className="ml-4 px-3 py-1.5 text-sm border border-secondary/20 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-highlight/50"
                >
                  {devices.map((device, index) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Kamera ${index + 1}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          {/* Camera Preview Section */}
          <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
            {" "}
            {isScanning ? (
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
                onLoadedMetadata={() => {
                  console.log("Video metadata loaded");
                  videoRef.current.play().catch((err) => {
                    console.error("Error playing video:", err);
                    setError("Gagal memulai video stream");
                  });
                }}
                onError={(e) => {
                  console.error("Video element error:", e);
                  setError(
                    "Error saat memuat video: " + (e.message || "Unknown error")
                  );
                }}
              />
            ) : selectedImage ? (
              <img
                src={selectedImage}
                alt="Captured"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full bg-gray-100 text-main p-8">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 mb-4 text-main opacity-50"
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
                <p className="text-main text-center">
                  Mulai dengan mengambil foto atau mengunggah gambar informasi
                  nilai gizi
                </p>
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
              </div>
            )}
          </div>{" "}
          {/* Controls and Instructions Container */}
          <div className="p-6 bg-highlight/5">
            {/* Camera Controls */}
            <div className="flex justify-center gap-4 flex-wrap mb-12">
              {!isScanning ? (
                <>
                  {!selectedImage ? (
                    <>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-2 px-6 py-3 bg-main text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-md"
                        disabled={isLoading}
                      >
                        <FaUpload /> Upload Foto
                      </button>
                      <button
                        onClick={handleStartCamera}
                        className="flex items-center gap-2 px-6 py-3 bg-highlight text-main rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-md"
                        disabled={isLoading}
                      >
                        <FaCamera /> Buka Kamera
                      </button>
                    </>
                  ) : (
                    <>
                      {" "}
                      <button
                        onClick={() => {
                          setSelectedImage(null);
                          setCurrentFile(null);
                          setImageSource(null);
                        }}
                        className="flex items-center gap-2 px-6 py-3 bg-main text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-md"
                        disabled={isLoading}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
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
                          className="flex items-center gap-2 px-6 py-3 bg-highlight text-main rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-md"
                          disabled={isLoading}
                        >
                          <FaRedo /> Ambil Ulang Foto
                        </button>
                      ) : (
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-2 px-6 py-3 bg-highlight text-main rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-md"
                          disabled={isLoading}
                        >
                          <FaUpload /> Upload Ulang Foto
                        </button>
                      )}
                      <button
                        onClick={handleAnalyze}
                        className="flex items-center gap-2 px-6 py-3 bg-secondary text-main rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-md"
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
                    className="flex items-center gap-2 px-6 py-3 bg-highlight text-main rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-md"
                    disabled={isLoading}
                  >
                    <FaCamera /> Ambil Foto
                  </button>
                  <button
                    onClick={handleStopCamera}
                    className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-md"
                    disabled={isLoading}
                  >
                    <FaStop /> Tutup Kamera
                  </button>
                </>
              )}
            </div>

            {/* Decorative Divider Component */}
            <DecorativeDivider />

            {/* Instructions Section Component */}
            <InstructionsSection />
          </div>
        </div>{" "}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          capture="environment"
          onChange={handleFileUpload}
          aria-label="Upload gambar makanan"
          title="Upload gambar makanan"
        />
        {/* Hidden label for accessibility */}
        <label htmlFor="file-upload" className="sr-only">
          Upload gambar makanan
        </label>
        {/* Loading Modal */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white rounded-xl p-8 shadow-2xl transform transition-all animate-fade-in flex flex-col items-center max-w-sm w-full mx-4">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-main"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-8 rounded-full bg-white"></div>
                </div>
              </div>
              <p className="mt-4 text-lg font-medium text-main">
                Memproses gambar...
              </p>
              <p className="mt-2 text-sm text-gray-500 text-center">
                Mohon tunggu sebentar, kami sedang menganalisis nutrisi dari
                gambar Anda
              </p>
            </div>
          </div>
        )}
        {/* Error State */}
        {error && (
          <div className="w-full p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-fade-in">
            <p className="text-red-700">{error}</p>
          </div>
        )}
      </div>

      {/* Hasil Analisis - Hanya muncul saat ada data */}
      {nutritionData && (
        <AnalysisResult
          nutritionData={nutritionData}
          currentTime={currentTime}
        />
      )}
    </div>
  );
};

export default Scanner;
