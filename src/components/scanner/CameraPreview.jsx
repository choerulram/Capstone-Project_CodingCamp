import React from "react";

const CameraPreview = ({
  isScanning,
  selectedImage,
  isLoading,
  videoRef,
  canvasRef,
  setError,
}) => {
  return (
    <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden">
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
            Mulai dengan mengambil foto atau mengunggah gambar informasi nilai
            gizi
          </p>
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        </div>
      )}
    </div>
  );
};

export default CameraPreview;
