import React from "react";

const CameraSelector = ({ devices, selectedDevice, handleSwitchCamera }) => {
  if (devices.length <= 1) return null;

  return (
    <div className="p-3 sm:p-4 bg-highlight/5 border-b border-secondary/20">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <span className="text-xs sm:text-sm font-medium text-main">
          Pilih Kamera:
        </span>
        <select
          value={selectedDevice || ""}
          onChange={(e) => handleSwitchCamera(e.target.value)}
          className="flex-1 sm:flex-initial min-w-[120px] ml-2 sm:ml-4 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm border border-secondary/20 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-highlight/50"
        >
          {devices.map((device, index) => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Kamera ${index + 1}`}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CameraSelector;
