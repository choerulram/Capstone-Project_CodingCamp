import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/api";
import DecorativeDivider from "./DecorativeDivider";
import InstructionsSection from "./InstructionsSection";
import AnalysisResult from "./AnalysisResult";
import CameraControls from "./CameraControls";
import LoadingModal from "./LoadingModal";
import ErrorMessage from "./ErrorMessage";
import CameraSelector from "./CameraSelector";
import CameraPreview from "./CameraPreview";
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
  const [isErrorVisible, setIsErrorVisible] = useState(false);
  const [nutritionData, setNutritionData] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [imageSource, setImageSource] = useState(null);

  const videoRef = useRef(null);
  const analysisResultRef = useRef(null);
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

      // Mengambil data target harian dari API
      const dailyNutritionData = await api.getDailyNutrition(token);
      if (!dailyNutritionData) {
        throw new Error("Gagal mengambil data target harian");
      }

      // Mengambil riwayat scan hari ini untuk menghitung total nutrisi
      const historyData = await api.getTodayScanHistory(token);
      const todayHistory = historyData?.history || [];

      // Mengambil target harian dari response API dengan pengecekan
      const kebutuhanHarian = dailyNutritionData.kebutuhan_harian || {};

      const targetHarian = {
        energy_kal: Number(kebutuhanHarian.energi || 0),
        protein_g: Number(kebutuhanHarian.protein || 0),
        fat_g: Number(kebutuhanHarian["lemak total"] || 0),
        carbohydrate_g: Number(kebutuhanHarian.karbohidrat || 0),
        fiber_g: Number(kebutuhanHarian.serat || 0),
        sugar_g: Number(kebutuhanHarian.gula || 0),
        sodium_mg: Number(kebutuhanHarian.garam || 0),
      };

      // Menghitung total nutrisi termasuk hasil scan terbaru
      const totalGizi = todayHistory.reduce((acc, item) => {
        const gizi = item.kandungan_gizi || {};
        return {
          energy_kal: (acc.energy_kal || 0) + Number(gizi.energi || 0),
          protein_g: (acc.protein_g || 0) + Number(gizi.protein || 0),
          fat_g: (acc.fat_g || 0) + Number(gizi["lemak total"] || 0),
          carbohydrate_g:
            (acc.carbohydrate_g || 0) + Number(gizi.karbohidrat || 0),
          fiber_g: (acc.fiber_g || 0) + Number(gizi.serat || 0),
          sugar_g: (acc.sugar_g || 0) + Number(gizi.gula || 0),
          sodium_mg: (acc.sodium_mg || 0) + Number(gizi.garam || 0),
        };
      }, {});

      // Menyimpan data nutrisi untuk tampilan
      const nutritionDataToSave = {
        id: result.id,
        kandungan: result.kandungan_gizi || {},
        perbandingan: result.perbandingan || [],
        kebutuhan: result.kebutuhan_harian || {},
      };
      setNutritionData(nutritionDataToSave);

      // Set loading false sebelum menyimpan rekomendasi
      setIsLoading(false);

      // Scroll ke hasil analisis setelah data tersedia
      scrollToResult();

      // Menyimpan rekomendasi dengan data lengkap di background
      try {
        const inputData = {
          konsumsi: totalGizi,
          target_harian: targetHarian,
        };
        await api.saveRecommendation(token, inputData);
      } catch (saveError) {
        console.error("Error saat menyimpan rekomendasi:", saveError);
        // Tidak menghentikan proses meski gagal menyimpan rekomendasi
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "Terjadi kesalahan saat menganalisis gambar");
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
  useEffect(() => {
    if (error) {
      setIsErrorVisible(true);
    }
  }, [error]);

  // Fungsi untuk scroll ke hasil analisis
  const scrollToResult = useCallback(() => {
    // Tambah sedikit delay untuk memastikan hasil analisis sudah di-render
    setTimeout(() => {
      if (analysisResultRef.current) {
        analysisResultRef.current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 100);
  }, []);

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
        <div className="w-full bg-white/95 backdrop-blur-sm rounded-lg sm:rounded-2xl shadow-md sm:shadow-xl border sm:border-2 border-secondary/80 sm:border-secondary overflow-hidden">
          {/* Pilihan Kamera */}
          <CameraSelector
            devices={devices}
            selectedDevice={selectedDevice}
            handleSwitchCamera={handleSwitchCamera}
          />
          {/* Camera Preview Section */}
          <CameraPreview
            isScanning={isScanning}
            selectedImage={selectedImage}
            isLoading={isLoading}
            videoRef={videoRef}
            canvasRef={canvasRef}
            setError={setError}
          />

          {/* Error Message */}
          <ErrorMessage
            error={error}
            isErrorVisible={isErrorVisible}
            setIsErrorVisible={setIsErrorVisible}
          />

          {/* Controls and Instructions Container */}
          <div className="p-6 bg-highlight/5">
            {/* Camera Controls */}
            <CameraControls
              isScanning={isScanning}
              isLoading={isLoading}
              selectedImage={selectedImage}
              imageSource={imageSource}
              handleStartCamera={handleStartCamera}
              handleStopCamera={handleStopCamera}
              handleCapture={handleCapture}
              handleRetakePhoto={handleRetakePhoto}
              handleAnalyze={handleAnalyze}
              setSelectedImage={setSelectedImage}
              setCurrentFile={setCurrentFile}
              setImageSource={setImageSource}
              fileInputRef={fileInputRef}
            />

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
        </label>{" "}
        {/* Loading Modal */}
        <LoadingModal isLoading={isLoading} />
      </div>{" "}
      {/* Hasil Analisis - Hanya muncul saat ada data */}{" "}
      {nutritionData && (
        <AnalysisResult
          ref={analysisResultRef}
          nutritionData={nutritionData}
          currentTime={currentTime}
          onUpdateSuccess={async (updatedData) => {
            // Update state dengan data terbaru langsung
            setNutritionData(updatedData);
            setIsLoading(false);

            // Proses update rekomendasi di background
            try {
              // Mengambil data target harian dari API
              const dailyNutritionData = await api.getDailyNutrition(token);
              if (!dailyNutritionData) {
                throw new Error("Gagal mengambil data target harian");
              }

              // Mengambil riwayat scan hari ini untuk menghitung total nutrisi
              const historyData = await api.getTodayScanHistory(token);
              const todayHistory = historyData?.history || [];

              // Mengambil target harian dari response API dengan pengecekan
              const kebutuhanHarian = dailyNutritionData.kebutuhan_harian || {};

              const targetHarian = {
                energy_kal: Number(kebutuhanHarian.energi || 0),
                protein_g: Number(kebutuhanHarian.protein || 0),
                fat_g: Number(kebutuhanHarian["lemak total"] || 0),
                carbohydrate_g: Number(kebutuhanHarian.karbohidrat || 0),
                fiber_g: Number(kebutuhanHarian.serat || 0),
                sugar_g: Number(kebutuhanHarian.gula || 0),
                sodium_mg: Number(kebutuhanHarian.garam || 0),
              }; // Menghitung total nutrisi termasuk hasil update terbaru
              const totalGizi = todayHistory.reduce((acc, item) => {
                // Gunakan data terbaru jika item ini adalah yang diupdate
                const gizi =
                  item.id === updatedData.id
                    ? updatedData.kandungan
                    : item.kandungan_gizi || {};
                return {
                  energy_kal: (acc.energy_kal || 0) + Number(gizi.energi || 0),
                  protein_g: (acc.protein_g || 0) + Number(gizi.protein || 0),
                  fat_g: (acc.fat_g || 0) + Number(gizi["lemak total"] || 0),
                  carbohydrate_g:
                    (acc.carbohydrate_g || 0) + Number(gizi.karbohidrat || 0),
                  fiber_g: (acc.fiber_g || 0) + Number(gizi.serat || 0),
                  sugar_g: (acc.sugar_g || 0) + Number(gizi.gula || 0),
                  sodium_mg: (acc.sodium_mg || 0) + Number(gizi.garam || 0),
                };
              }, {});

              // Log informasi nutrisi setelah update
              console.log("=== Informasi Nutrisi Harian Setelah Update ===");
              console.log("Target Harian:", targetHarian);
              console.log("Total Konsumsi Setelah Update:", totalGizi);

              // Menyimpan rekomendasi dengan data lengkap
              const inputData = {
                konsumsi: totalGizi,
                target_harian: targetHarian,
              };

              await api.saveRecommendation(token, inputData);
              console.log("Rekomendasi berhasil disimpan setelah update");
            } catch (saveError) {
              console.error(
                "Error saat menyimpan rekomendasi setelah update:",
                saveError
              );
              // Tidak menghentikan proses meski gagal menyimpan rekomendasi
            }
          }}
        />
      )}
    </div>
  );
};

export default Scanner;
