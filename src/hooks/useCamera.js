import { useState, useEffect } from "react";

const useCamera = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getDevices = async () => {
      try {
        // Request initial permission to trigger device labels
        await navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            stream.getTracks().forEach((track) => track.stop());
          });

        const mediaDevices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = mediaDevices.filter(
          (device) => device.kind === "videoinput"
        );

        // Log devices for debugging
        console.log("Available video devices:", videoDevices);

        setDevices(videoDevices);
        if (videoDevices.length > 0) {
          setSelectedDevice(videoDevices[0].deviceId);
        }
      } catch (err) {
        setError("Gagal mendapatkan daftar kamera");
        console.error("Error getting devices:", err);
      }
    };

    getDevices();

    // Add device change listener
    navigator.mediaDevices.addEventListener("devicechange", getDevices);
    return () => {
      navigator.mediaDevices.removeEventListener("devicechange", getDevices);
    };
  }, []);
  const startCamera = async (deviceId = null) => {
    if (stream) {
      stopCamera();
    }

    try {
      const constraints = {
        video: {
          ...(deviceId ? { deviceId: { exact: deviceId } } : {}),
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      console.log("Requesting camera with constraints:", constraints);
      const mediaStream = await navigator.mediaDevices.getUserMedia(
        constraints
      );
      console.log(
        "Camera stream obtained:",
        mediaStream.getVideoTracks()[0].label
      );

      setStream(mediaStream);
      setError(null);
      return mediaStream;
    } catch (err) {
      if (err.name === "NotAllowedError") {
        setError("Mohon izinkan akses kamera untuk menggunakan fitur ini");
      } else if (err.name === "NotFoundError") {
        setError("Tidak dapat menemukan kamera. Pastikan kamera terhubung");
      } else {
        setError("Gagal memulai kamera: " + err.message);
      }
      console.error("Error starting camera:", err);
      return null;
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const switchCamera = async (deviceId) => {
    setSelectedDevice(deviceId);
    return await startCamera(deviceId);
  };

  return {
    devices,
    selectedDevice,
    stream,
    error,
    startCamera,
    stopCamera,
    switchCamera,
  };
};

export default useCamera;
