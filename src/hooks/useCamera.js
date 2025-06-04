import { useState, useEffect, useCallback } from "react";

const useCamera = () => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);
  const [hasPermission, setHasPermission] = useState(false);

  // Fungsi untuk meminta izin kamera
  const requestCameraPermission = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop()); // Stop stream setelah dapat izin
      setHasPermission(true);
      return true;
    } catch (err) {
      console.error("Error requesting camera permission:", err);
      setError("Mohon izinkan akses kamera untuk menggunakan fitur ini");
      setHasPermission(false);
      return false;
    }
  }, []);

  // Memindahkan getDevices ke useCallback untuk menghindari infinite loop
  const getDevices = useCallback(async () => {
    try {
      console.log("Memulai enumerasi devices...");

      // Minta izin kamera terlebih dahulu jika belum
      if (!hasPermission) {
        const permitted = await requestCameraPermission();
        if (!permitted) return [];
      }

      const mediaDevices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = mediaDevices.filter(
        (device) => device.kind === "videoinput" && device.deviceId
      );

      console.log("Device kamera yang ditemukan:", videoDevices);

      if (videoDevices.length === 0) {
        setError("Tidak ada kamera yang terdeteksi");
        return [];
      }

      // Update devices list
      setDevices(videoDevices);

      // Pilih device pertama jika belum ada yang dipilih
      if (videoDevices.length > 0 && !selectedDevice) {
        const defaultDevice = videoDevices[0].deviceId;
        console.log("Memilih device default:", defaultDevice);
        setSelectedDevice(defaultDevice);
      }

      return videoDevices;
    } catch (err) {
      setError("Gagal mendapatkan daftar kamera");
      console.error("Error getting devices:", err);
      return [];
    }
  }, [hasPermission, selectedDevice, requestCameraPermission]);

  // Effect untuk menangani perubahan device
  useEffect(() => {
    console.log("Device effect running...");
    const handleDeviceChange = async () => {
      console.log(
        "Device change detected, stream:",
        stream ? "active" : "none"
      );
      if (stream) {
        await getDevices();
      }
    };

    if (navigator.mediaDevices?.addEventListener) {
      navigator.mediaDevices.addEventListener(
        "devicechange",
        handleDeviceChange
      );

      // Initial device enumeration
      if (!devices.length) {
        console.log("No devices listed, attempting initial enumeration");
        getDevices().catch(console.error);
      }
    } else {
      console.warn("mediaDevices API not supported");
    }

    return () => {
      if (navigator.mediaDevices?.removeEventListener) {
        navigator.mediaDevices.removeEventListener(
          "devicechange",
          handleDeviceChange
        );
      }
    };
  }, [stream, getDevices, devices.length]);

  const startCamera = async (deviceId = null) => {
    console.log("Starting camera with device:", deviceId);

    // Stop existing stream if any
    if (stream) {
      console.log("Stopping existing stream");
      stopCamera();
    }

    try {
      // Request permission and get video stream
      const constraints = {
        video: {
          deviceId: deviceId ? { exact: deviceId } : undefined,
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: deviceId ? undefined : "environment", // Prefer back camera if no device specified
        },
        audio: false,
      };

      console.log("Requesting media with constraints:", constraints);
      const mediaStream = await navigator.mediaDevices.getUserMedia(
        constraints
      );

      const videoTrack = mediaStream.getVideoTracks()[0];
      const settings = videoTrack.getSettings();

      console.log("Camera stream obtained:", {
        label: videoTrack.label,
        settings,
        active: videoTrack.ready,
        muted: videoTrack.muted,
      });

      // Update selected device to match the actually selected camera
      const actualDeviceId = settings.deviceId;
      if (actualDeviceId && actualDeviceId !== selectedDevice) {
        console.log("Updating selected device to:", actualDeviceId);
        setSelectedDevice(actualDeviceId);
      }

      setStream(mediaStream);
      setError(null);

      // Update device list after getting access
      await getDevices();

      return mediaStream;
    } catch (err) {
      let errorMessage = "Gagal memulai kamera";

      if (err.name === "NotAllowedError") {
        errorMessage = "Mohon izinkan akses kamera untuk menggunakan fitur ini";
      } else if (err.name === "NotFoundError") {
        errorMessage =
          "Tidak dapat menemukan kamera. Pastikan kamera terhubung";
      } else if (err.name === "NotReadableError") {
        errorMessage = "Kamera sedang digunakan oleh aplikasi lain";
      } else if (err.name === "OverconstrainedError") {
        errorMessage = "Kamera yang dipilih tidak tersedia";
        // Reset selected device
        setSelectedDevice(null);
      }

      setError(errorMessage);
      console.error("Error starting camera:", {
        name: err.name,
        message: err.message,
        constraints: err.constraint,
      });
      return null;
    }
  };

  const stopCamera = useCallback(() => {
    if (stream) {
      console.log("Stopping camera stream...");
      stream.getTracks().forEach((track) => {
        track.stop();
        console.log(`Stopped track: ${track.label}`);
      });
      setStream(null);
    }
  }, [stream]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stopCamera();
      }
    };
  }, [stream, stopCamera]);

  const switchCamera = async (deviceId) => {
    console.log("Switching to camera:", deviceId);
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
