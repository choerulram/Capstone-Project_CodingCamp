import React from "react";

const CameraSelector = ({ devices, selectedDevice, handleSwitchCamera }) => {
  if (devices.length <= 1) return null;

  return (
    <div className="p-4 bg-highlight/5 border-b border-secondary/20">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-main">Pilih Kamera:</span>
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
  );
};

export default CameraSelector;
