import {
  setDevices,
  setSelectedDevice,
  setStream,
  setError,
  setHasPermission,
  setIsScanning,
} from "./slice.js";

export const requestCameraPermission = () => async (dispatch) => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    stream.getTracks().forEach((track) => track.stop());
    dispatch(setHasPermission(true));
    dispatch(setError(null));
    return true;
  } catch (err) {
    console.error("Error requesting camera permission:", err);
    dispatch(
      setError("Mohon izinkan akses kamera untuk menggunakan fitur ini")
    );
    dispatch(setHasPermission(false));
    return false;
  }
};

export const getDevices = () => async (dispatch, getState) => {
  try {
    const { hasPermission } = getState().camera;

    if (!hasPermission) {
      const permitted = await dispatch(requestCameraPermission());
      if (!permitted) return [];
    }

    const mediaDevices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = mediaDevices.filter(
      (device) => device.kind === "videoinput" && device.deviceId
    );

    if (videoDevices.length === 0) {
      dispatch(setError("Tidak ada kamera yang terdeteksi"));
      return [];
    }

    // Hanya simpan data yang bisa di-serialize
    const serializedDevices = videoDevices.map((device) => ({
      deviceId: device.deviceId,
      label: device.label || `Camera ${videoDevices.indexOf(device) + 1}`,
    }));

    dispatch(setDevices(serializedDevices));

    const { selectedDevice } = getState().camera;
    if (videoDevices.length > 0 && !selectedDevice) {
      dispatch(setSelectedDevice(videoDevices[0].deviceId));
    }

    return videoDevices;
  } catch (err) {
    dispatch(setError("Gagal mendapatkan daftar kamera"));
    console.error("Error getting devices:", err);
    return [];
  }
};

export const startCamera =
  (deviceId = null) =>
  async (dispatch, getState) => {
    const { stream } = getState().camera;

    // Pastikan stream lama berhenti sebelum memulai yang baru
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      dispatch(setStream(null));
    }

    dispatch(setIsScanning(true));

    try {
      const constraints = {
        video: {
          deviceId: deviceId ? { exact: deviceId } : undefined,
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: deviceId ? undefined : "environment",
        },
        audio: false,
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(
        constraints
      );
      const videoTrack = mediaStream.getVideoTracks()[0];
      const settings = videoTrack.getSettings();

      const actualDeviceId = settings.deviceId;
      if (actualDeviceId) {
        dispatch(setSelectedDevice(actualDeviceId));
      }

      dispatch(setStream(mediaStream));
      dispatch(setError(null));

      await dispatch(getDevices());
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
        dispatch(setSelectedDevice(null));
      }

      dispatch(setError(errorMessage));
      console.error("Error starting camera:", err);
      return null;
    }
  };

export const stopCamera = () => (dispatch, getState) => {
  const { stream } = getState().camera;
  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    dispatch(setStream(null));
    dispatch(setIsScanning(false));
  }
};

export const switchCamera = (deviceId) => async (dispatch, getState) => {
  try {
    const { stream } = getState().camera;

    // Hentikan stream yang sedang berjalan
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      dispatch(setStream(null));
    }

    // Set device baru dan mulai camera
    dispatch(setSelectedDevice(deviceId));
    const newStream = await dispatch(startCamera(deviceId));

    return newStream;
  } catch (error) {
    console.error("Error switching camera:", error);
    dispatch(setError("Gagal mengganti kamera"));
    return null;
  }
};
