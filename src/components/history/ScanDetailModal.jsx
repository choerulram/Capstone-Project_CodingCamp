import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import { BASE_URL } from "../../utils/api";

// Logika status scan dari ScanHistoryCard
function getScanStatus(scan, dailyNeeds) {
  if (!scan.kandungan_gizi || !dailyNeeds)
    return { status: "-", details: [], persentase: {} };
  let needs = dailyNeeds;
  if (needs.kebutuhan_harian) needs = needs.kebutuhan_harian;
  const gizi = {
    energi: scan.kandungan_gizi.energi,
    gula: scan.kandungan_gizi.gula,
    garam: scan.kandungan_gizi.garam,
    lemak:
      scan.kandungan_gizi.lemak !== undefined
        ? scan.kandungan_gizi.lemak
        : scan.kandungan_gizi["lemak total"] !== undefined
        ? scan.kandungan_gizi["lemak total"]
        : 0,
    protein: scan.kandungan_gizi.protein,
    serat: scan.kandungan_gizi.serat,
  };
  const needsMap = {
    energi: needs.energi,
    gula: needs.gula,
    garam: needs.garam,
    lemak:
      needs.lemak !== undefined
        ? needs.lemak
        : needs["lemak total"] !== undefined
        ? needs["lemak total"]
        : 0,
    protein: needs.protein,
    serat: needs.serat,
  };
  const persentase = {
    energi: needsMap.energi ? (gizi.energi / needsMap.energi) * 100 : 0,
    gula: needsMap.gula ? (gizi.gula / needsMap.gula) * 100 : 0,
    garam: needsMap.garam ? (gizi.garam / needsMap.garam) * 100 : 0,
    lemak: needsMap.lemak ? (gizi.lemak / needsMap.lemak) * 100 : 0,
    protein: needsMap.protein ? (gizi.protein / needsMap.protein) * 100 : 0,
    serat: needsMap.serat ? (gizi.serat / needsMap.serat) * 100 : 0,
  };
  let status = "Baik";
  const details = [];
  if (
    persentase.energi > 100 ||
    persentase.gula > 100 ||
    persentase.garam > 100 ||
    persentase.lemak > 100
  ) {
    status = "Berlebihan";
    if (persentase.energi > 100) details.push("Kalori");
    if (persentase.gula > 100) details.push("Gula");
    if (persentase.garam > 100) details.push("Garam");
    if (persentase.lemak > 100) details.push("Lemak");
  } else if (
    persentase.energi > 80 ||
    persentase.gula > 80 ||
    persentase.garam > 80 ||
    persentase.lemak > 80
  ) {
    status = "Cukup";
    if (persentase.energi > 80) details.push("Kalori");
    if (persentase.gula > 80) details.push("Gula");
    if (persentase.garam > 80) details.push("Garam");
    if (persentase.lemak > 80) details.push("Lemak");
  } else if (
    (persentase.gula > 50 && persentase.gula <= 100) ||
    (persentase.garam > 50 && persentase.garam <= 100) ||
    (persentase.lemak > 50 && persentase.lemak <= 100)
  ) {
    status = "Perlu Dibatasi";
    if (persentase.gula > 50 && persentase.gula <= 100) details.push("Gula");
    if (persentase.garam > 50 && persentase.garam <= 100) details.push("Garam");
    if (persentase.lemak > 50 && persentase.lemak <= 100) details.push("Lemak");
  } else if (
    // 4. Kurang jika protein/serat < 20%
    persentase.protein < 20 ||
    persentase.serat < 20
  ) {
    status = "Kurang";
    if (persentase.protein < 20) details.push("Protein");
    if (persentase.serat < 20) details.push("Serat");
  }
  return { status, details, persentase };
}

const ScanDetailModal = ({ isOpen, onClose, scan, dailyNeeds }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const formatNutritionValue = (value, key) => {
    const val = value || "0";
    // Tambahkan satuan yang sesuai
    if (key.includes("energi")) return `${val} kkal`;
    if (
      key.includes("protein") ||
      key.includes("lemak") ||
      key.includes("karbohidrat")
    )
      return `${val} g`;
    if (key.includes("gula")) return `${val} g`;
    if (key.includes("garam") || key.includes("natrium")) return `${val} mg`;
    return val;
  };

  // State untuk modal zoom gambar
  const [showImageModal, setShowImageModal] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const lastOffset = useRef({ x: 0, y: 0 });

  const handleImageClick = (e) => {
    e.stopPropagation();
    setShowImageModal(true);
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.2, 5));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.2, 1));
  const handleCloseImageModal = () => setShowImageModal(false);

  // Drag logic
  const handleMouseDown = (e) => {
    e.preventDefault();
    setDragging(true);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
    };
    lastOffset.current = { ...offset };
  };
  const handleMouseMove = (e) => {
    if (!dragging) return;
    setOffset({
      x: lastOffset.current.x + (e.clientX - dragStart.current.x),
      y: lastOffset.current.y + (e.clientY - dragStart.current.y),
    });
  };
  const handleMouseUp = () => setDragging(false);

  // Touch events for mobile
  const handleTouchStart = (e) => {
    if (e.touches.length !== 1) return;
    setDragging(true);
    dragStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
    lastOffset.current = { ...offset };
  };
  const handleTouchMove = (e) => {
    if (!dragging || e.touches.length !== 1) return;
    setOffset({
      x: lastOffset.current.x + (e.touches[0].clientX - dragStart.current.x),
      y: lastOffset.current.y + (e.touches[0].clientY - dragStart.current.y),
    });
  };
  const handleTouchEnd = () => setDragging(false);

  React.useEffect(() => {
    if (showImageModal) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleTouchEnd);
    } else {
      setDragging(false);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
    // eslint-disable-next-line
  }, [showImageModal, dragging]);

  // Hitung status scan
  const { status, details } = getScanStatus(scan, dailyNeeds || {});
  if (!isOpen) return null;

  // Render modal dalam Portal
  return createPortal(
    <>
      {/* Modal Zoom Gambar */}
      {showImageModal && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in"
          onClick={handleCloseImageModal}
        >
          <div
            className="relative max-w-3xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`${BASE_URL}/images/${scan.filename}`}
              alt="Zoom Foto Produk"
              style={{
                transform: `scale(${zoom}) translate(${offset.x / zoom}px, ${
                  offset.y / zoom
                }px)`,
                transition: dragging ? "none" : "transform 0.2s",
                cursor: dragging ? "grabbing" : "grab",
                maxHeight: "80vh",
                maxWidth: "100%",
                userSelect: "none",
              }}
              draggable={false}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
            />
            {/* Kontrol Zoom */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 bg-white/80 rounded-full px-4 py-2 shadow-lg">
              <button
                onClick={handleZoomOut}
                className="text-2xl font-bold px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                aria-label="Zoom Out"
                disabled={zoom <= 1}
              >
                –
              </button>
              <span className="px-2 text-lg font-medium select-none">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="text-2xl font-bold px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                aria-label="Zoom In"
                disabled={zoom >= 5}
              >
                +
              </button>
            </div>
            {/* Tombol Tutup */}
            <button
              onClick={handleCloseImageModal}
              className="absolute top-4 right-4 bg-white/80 hover:bg-white text-gray-700 rounded-full p-2 shadow"
              aria-label="Tutup"
            >
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
      {/* Overlay */}{" "}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-[2px] z-[9998] animate-fade-in transition-opacity duration-300"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="fixed inset-0 z-[9999] overflow-y-auto">
        <div className="min-h-screen flex items-center justify-center p-4">
          {" "}
          <div className="bg-white rounded-xl md:rounded-2xl w-full max-w-5xl overflow-hidden max-h-[95vh] flex flex-col shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100 animate-scale-in transition-all duration-300">
            {/* Header */}
            <div className="p-4 md:p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <h2 className="text-lg md:text-2xl font-bold text-main">
                  Detail Pemindaian
                </h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-main transition-colors p-2 hover:bg-gray-100 rounded-lg"
                >
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* Content - Scrollable */}{" "}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                {/* Product Image */}
                <div className="md:col-span-1">
                  <div
                    className="rounded-lg md:rounded-xl overflow-hidden bg-gray-50 shadow-md border border-gray-100 group flex items-center justify-center cursor-zoom-in"
                    onClick={handleImageClick}
                    title="Klik untuk perbesar dan zoom"
                  >
                    <img
                      src={`${BASE_URL}/images/${scan.filename}`}
                      alt="Foto Produk"
                      className="w-full h-auto max-h-100 object-contain transition-transform duration-300 group-hover:scale-105 select-none"
                      draggable={false}
                    />
                  </div>{" "}
                  <div className="mt-4 md:mt-5 bg-gray-50 rounded-lg md:rounded-xl p-3 md:p-4 border border-gray-100">
                    <h3 className="text-base md:text-lg font-bold text-main mb-1.5 md:mb-2 flex items-center gap-1.5 md:gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 md:h-5 md:w-5 text-highlight"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      Dipindai pada:
                    </h3>{" "}
                    <p className="text-gray-600 text-sm md:text-lg">
                      {new Date(scan?.timestamp).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                {/* Nutrition Details */}
                <div className="md:col-span-1 space-y-6">
                  {/* Kandungan Gizi */}
                  <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    <h3 className="text-lg md:text-xl font-bold text-main mb-3 md:mb-5 flex items-center gap-1.5 md:gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 md:h-6 md:w-6 text-highlight"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      Kandungan Gizi
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {scan?.kandungan_gizi &&
                        Object.entries(scan.kandungan_gizi).map(
                          ([key, value]) => (
                            <div
                              key={key}
                              className="bg-gray-50 p-3 md:p-5 rounded-lg md:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-highlight group"
                            >
                              <div className="text-sm md:text-base font-medium text-gray-600 mb-1 md:mb-2 group-hover:text-main">
                                {key
                                  .replace(/_/g, " ")
                                  .replace(/\b\w/g, (l) => l.toUpperCase())}
                              </div>
                              <div className="text-lg md:text-2xl font-bold text-main group-hover:text-highlight transition-colors">
                                {formatNutritionValue(value, key)}
                              </div>
                            </div>
                          )
                        )}
                    </div>
                  </div>
                  {/* Status Pindai Gizi */}
                  <div className="mb-2">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex items-center gap-1 px-3 py-1 rounded-lg shadow text-base font-bold border select-none transition-all duration-200
                          ${
                            status === "Baik"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : status === "Cukup"
                              ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                              : status === "Berlebihan"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : status === "Perlu Dibatasi"
                              ? "bg-orange-50 text-orange-700 border-orange-200"
                              : status === "Kurang"
                              ? "bg-blue-50 text-blue-700 border-blue-200"
                              : "bg-gray-50 text-gray-700 border-gray-200"
                          }
                        `}
                        style={{ minWidth: 110, justifyContent: "center" }}
                        title={
                          details.length > 0
                            ? `Nutrisi: ${details.join(", ")}`
                            : ""
                        }
                      >
                        Status Gizi: {status}
                        {details.length > 0 && (
                          <span className="ml-2 font-normal text-sm opacity-80">
                            ({details.join(", ")})
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                  {/* Perbandingan dengan Kebutuhan Harian */}
                  {scan?.perbandingan && scan.perbandingan.length > 0 && (
                    <div className="bg-gray-50/70 backdrop-blur-sm rounded-xl p-6 border border-gray-100/80 shadow-sm hover:shadow-md transition-all duration-300">
                      <h3 className="text-xl font-bold text-main mb-5 flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-highlight"
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
                        Perbandingan dengan Kebutuhan Harian
                      </h3>
                      <div className="overflow-hidden rounded-xl border border-gray-200/80 bg-white shadow-sm">
                        <table className="min-w-full divide-y divide-gray-200/80">
                          <thead className="bg-gray-50/50">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Nutrisi
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Nilai
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Kebutuhan
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200/80">
                            {scan.perbandingan.map((item, index) => (
                              <tr
                                key={index}
                                className={`${
                                  index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                                } hover:bg-gray-50/80 transition-colors`}
                              >
                                <td className="px-6 py-4 text-base font-medium text-main">
                                  {item.label}
                                </td>
                                <td className="px-6 py-4 text-base text-gray-600">
                                  {item.hasil_ocr}
                                </td>
                                <td className="px-6 py-4 text-base text-gray-600">
                                  {item.kebutuhan_harian}
                                </td>
                                <td className="px-6 py-4">
                                  <span
                                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                      item.status === "Melebihi"
                                        ? "bg-red-100 text-red-700 ring-1 ring-red-600/10"
                                        : "bg-green-100 text-green-700 ring-1 ring-green-600/10"
                                    }`}
                                  >
                                    {item.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {/* Peringatan jika ada nutrisi yang melebihi batas */}
                  {scan?.perbandingan &&
                    scan.perbandingan.some(
                      (item) => item.status === "Melebihi"
                    ) && (
                      <div className="bg-red-50/80 backdrop-blur-sm rounded-xl p-6 border border-red-100/80 ring-1 ring-red-100">
                        <h3 className="text-xl font-bold text-red-800 mb-3 flex items-center gap-2">
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
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                          Catatan Penting
                        </h3>
                        <p className="text-red-700 text-base mb-3">
                          Beberapa kandungan gizi dalam produk ini melebihi
                          kebutuhan harian yang direkomendasikan. Pertimbangkan
                          untuk:
                        </p>
                        <ul className="list-disc list-inside text-base text-red-700 space-y-2">
                          <li>Membagi porsi makan menjadi beberapa bagian</li>
                          <li>
                            Mengimbangi dengan makanan lain yang lebih rendah
                            kandungan gizinya
                          </li>
                          <li>
                            Melakukan aktivitas fisik untuk mengimbangi asupan
                            kalori
                          </li>
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </div>{" "}
            {/* Footer */}
            <div className="p-4 md:p-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-white sticky bottom-0 z-10">
              <button
                onClick={onClose}
                className="w-full px-4 md:px-6 py-2.5 md:py-3.5 bg-main text-white rounded-lg md:rounded-xl hover:bg-main/90 transition-all duration-300 font-medium text-base md:text-lg shadow-sm hover:shadow-md active:scale-[0.98]"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body // Render modal langsung ke body
  );
};

export default ScanDetailModal;
