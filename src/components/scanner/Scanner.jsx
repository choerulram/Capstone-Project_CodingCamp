import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaCamera, FaStop, FaUpload, FaSearch } from "react-icons/fa";
import api from "../../utils/api";
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

      // Store file for analysis
      setCurrentFile(file);

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
          ? "flex-row gap-6"
          : "flex-col items-center justify-center"
      } animate-fade-in transition-all duration-500 w-full py-4`}
    >
      <div
        className={`${
          nutritionData ? "w-1/2" : "w-full max-w-4xl"
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
            {" "}
            {/* Camera Controls */}
            <div className="flex justify-center gap-4 flex-wrap mb-12">
              {!isScanning ? (
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
                  {selectedImage && (
                    <button
                      onClick={handleAnalyze}
                      className="flex items-center gap-2 px-6 py-3 bg-secondary text-main rounded-lg hover:bg-opacity-90 transition-all duration-200 shadow-md"
                      disabled={isLoading}
                    >
                      <FaSearch /> Analisis Nutrisi
                    </button>
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
              )}{" "}
            </div>
            {/* Decorative Divider */}
            <div className="relative py-6 mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-dashed border-secondary/50"></div>
              </div>
              <div className="relative flex justify-center">
                <div className="bg-white px-6 py-2 rounded-full shadow-sm border border-secondary/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary/60"></div>
                    <div className="w-2 h-2 rounded-full bg-highlight"></div>
                    <div className="w-3 h-3 rounded-full bg-main"></div>
                    <div className="w-2 h-2 rounded-full bg-highlight"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary/60"></div>
                  </div>
                </div>
              </div>
            </div>
            {/* Instructions Section */}
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
              <div className="space-y-3">
                <div className="group bg-white/60 hover:bg-white/80 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-secondary flex items-center gap-4 animate-fade-in cursor-default transform hover:-translate-y-0.5">
                  <div className="p-3 bg-highlight/20 rounded-xl group-hover:bg-highlight/30 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-main group-hover:text-highlight transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 group-hover:text-main flex-1 transition-colors">
                    Pastikan tabel informasi nilai gizi terlihat jelas dan tidak
                    terhalang
                  </p>
                </div>

                <div className="group bg-white/60 hover:bg-white/80 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-secondary flex items-center gap-4 animate-fade-in [animation-delay:150ms] cursor-default transform hover:-translate-y-0.5">
                  <div className="p-3 bg-highlight/20 rounded-xl group-hover:bg-highlight/30 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-main group-hover:text-highlight transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 group-hover:text-main flex-1 transition-colors">
                    Posisikan informasi nilai gizi dalam area kotak pemindaian
                  </p>
                </div>

                <div className="group bg-white/60 hover:bg-white/80 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-secondary flex items-center gap-4 animate-fade-in [animation-delay:300ms] cursor-default transform hover:-translate-y-0.5">
                  <div className="p-3 bg-highlight/20 rounded-xl group-hover:bg-highlight/30 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-main group-hover:text-highlight transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 group-hover:text-main flex-1 transition-colors">
                    Tahan ponsel Anda dengan stabil selama pemindaian
                  </p>
                </div>

                <div className="group bg-white/60 hover:bg-white/80 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-secondary flex items-center gap-4 animate-fade-in [animation-delay:450ms] cursor-default transform hover:-translate-y-0.5">
                  <div className="p-3 bg-highlight/20 rounded-xl group-hover:bg-highlight/30 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-main group-hover:text-highlight transition-colors"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-600 group-hover:text-main flex-1 transition-colors">
                    Pastikan pencahayaan cukup terang dan tidak ada pantulan
                    cahaya
                  </p>
                </div>
              </div>
            </div>
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
        <div className="w-1/2 animate-slide-up overflow-y-auto max-h-screen px-4">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 sticky top-4">
            {/* Header dengan tanggal dan waktu yang diperbarui */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 pb-4 border-b border-gray-100 gap-4">
              <h2 className="text-2xl font-bold text-main">
                Hasil Analisis Nutrisi
              </h2>
              <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                <span className="px-4 py-2 bg-highlight text-main rounded-lg text-sm font-medium flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  {currentTime.toLocaleDateString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            <div className="space-y-8">
              {/* Kandungan Gizi */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="text-lg font-semibold mb-4 text-main flex items-center">
                  <span className="bg-secondary p-2 rounded-lg mr-2">
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
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </span>
                  Kandungan Gizi per Sajian
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(nutritionData.kandungan).map(
                    ([key, value]) => (
                      <div
                        key={key}
                        className="flex justify-between p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors border border-gray-100"
                      >
                        <span className="text-gray-600">
                          {key
                            .replace("_", " ")
                            .replace(/\b\w/g, (c) => c.toUpperCase())}
                        </span>
                        <span className="font-medium text-main">
                          {value ?? 0}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Perbandingan Kebutuhan Harian */}
              {nutritionData.perbandingan.length > 0 && (
                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                  <h3 className="text-lg font-semibold mb-4 text-main flex items-center">
                    <span className="bg-secondary p-2 rounded-lg mr-2">
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
                          d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </span>
                    Perbandingan dengan Kebutuhan Harian
                  </h3>

                  {/* Peringatan jika ada yang melebihi - Dipindah ke sini */}
                  {nutritionData.perbandingan.some(
                    (row) => row.status === "Melebihi"
                  ) && (
                    <div className="mb-4 bg-red-50 border border-red-200 p-4 rounded-lg">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          {" "}
                          <svg
                            className="h-5 w-5 text-red-600"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-semibold text-red-800">
                            Peringatan Nutrisi
                          </h4>
                          <div className="mt-1">
                            <p className="text-sm text-red-700">
                              Beberapa kandungan gizi{" "}
                              <b>
                                melebihi kebutuhan harian yang direkomendasikan
                              </b>
                            </p>
                            <p className="text-xs text-red-600 mt-1">
                              Saran: Pertimbangkan untuk mengurangi konsumsi
                              atau mengimbangi dengan aktivitas fisik yang
                              sesuai
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="overflow-hidden rounded-lg border border-gray-100">
                    <table className="min-w-full divide-y divide-gray-100 bg-white">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Gizi
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Hasil OCR
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kebutuhan
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {nutritionData.perbandingan.map((row, index) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-50 transition-colors"
                          >
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-main">
                              {row.label}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {row.hasil_ocr}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                              {row.kebutuhan_harian}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <span
                                className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                                  row.status === "Melebihi"
                                    ? "bg-red-50 text-red-700 border border-red-200"
                                    : "bg-green-50 text-green-700 border border-green-200"
                                }`}
                              >
                                {row.status === "Melebihi" ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-3.5 w-3.5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M5 13l4 4L19 7"
                                    />
                                  </svg>
                                )}
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scanner;
