import React, { useState, forwardRef } from "react";
import { useSelector } from "react-redux";
import api from "../../utils/api";

const AnalysisResult = forwardRef(({ nutritionData, onUpdateSuccess }, ref) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedValues, setUpdatedValues] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const token = useSelector((state) => state.auth.token);

  // Helper untuk mendapatkan satuan nutrisi yang sesuai
  const getNutritionUnit = (label) => {
    const key = label.toLowerCase();
    if (key === "energi") return "kkal";
    if (key === "garam") return "mg";
    return "g";
  };
  // Helper untuk memformat nilai nutrisi sesuai satuannya
  const formatNutritionValue = (value) => {
    return value;
  };

  // Inisialisasi nilai yang bisa diedit
  const initializeEditValues = () => {
    const values = {};
    Object.entries(nutritionData.kandungan).forEach(([key, value]) => {
      values[key] = value;
    });
    setUpdatedValues(values);
    setIsEditing(true);
    setError(null);
    setSuccessMessage(null);
  }; // Handle perubahan nilai input
  const handleInputChange = (key, value) => {
    // Jika input kosong, izinkan untuk dihapus
    if (value === "") {
      setUpdatedValues((prev) => ({
        ...prev,
        [key]: "",
      }));
      return;
    }

    // Validasi input: tidak boleh negatif dan maksimal sesuai satuan
    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue < 0) return;

    const maxValue = 999.9;
    if (numValue > maxValue) return;

    setUpdatedValues((prev) => ({
      ...prev,
      [key]: numValue,
    }));
  };
  // Validasi semua nilai sebelum submit
  const validateValues = () => {
    for (const [key, value] of Object.entries(updatedValues)) {
      // Validasi untuk nilai kosong
      if (value === "" || value === null || value === undefined) {
        setError(`Nilai ${key} tidak boleh kosong`);
        return false;
      }
      // Validasi untuk nilai tidak valid
      if (value < 0 || value > 999.9 || isNaN(value)) {
        setError(`Nilai ${key} tidak valid. Pastikan antara 0 dan 999.9`);
        return false;
      }
    }
    return true;
  };
  // Handle submit update nutrisi
  const handleSubmitUpdate = async () => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (!validateValues()) {
      setLoading(false);
      return;
    }

    try {
      // Periksa apakah ID ada di dalam objek nutritionData
      if (!nutritionData.id) {
        console.error(
          "ID pemindaian tidak ditemukan dalam nutritionData:",
          nutritionData
        );
        throw new Error(
          "ID pemindaian tidak ditemukan - Pastikan data yang dikirim dari parent component memiliki ID"
        );
      }

      const response = await api.updateNutrition(
        token,
        nutritionData.id,
        updatedValues
      );
      if (response?.message) {
        setSuccessMessage("Berhasil memperbarui kandungan gizi!");
        // Update local state dengan nilai baru
        const normalize = (str) =>
          str
            .toLowerCase()
            .replace(/\s+/g, "_")
            .replace(/[^a-z0-9_]/g, "");
        const updatedNutritionData = {
          ...nutritionData,
          kandungan: updatedValues,
          perbandingan: nutritionData.perbandingan.map((row) => {
            // Normalisasi label ke key
            const key = normalize(row.label);
            // Ambil nilai hasil OCR terbaru
            const ocrValue =
              updatedValues[key] !== undefined
                ? updatedValues[key]
                : row.hasil_ocr;
            // Ambil kebutuhan harian (support kebutuhan_harian/kebutuhan)
            let kebutuhanValue =
              row.kebutuhan_harian !== undefined
                ? row.kebutuhan_harian
                : row.kebutuhan;
            const ocrNum = parseFloat(ocrValue);
            const kebutuhanNum = parseFloat(kebutuhanValue);
            let status = "Aman";
            if (
              !isNaN(ocrNum) &&
              !isNaN(kebutuhanNum) &&
              ocrNum > kebutuhanNum
            ) {
              status = "Melebihi";
            }
            return {
              ...row,
              hasil_ocr: ocrValue,
              status,
            };
          }),
        };
        setIsEditing(false);
        if (onUpdateSuccess) {
          onUpdateSuccess(updatedNutritionData);
        }
      }
    } catch (err) {
      setError(err.message || "Gagal memperbarui nutrisi");
    } finally {
      setLoading(false);
    }
  };

  // Handle batal edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <div className="lg:w-1/2 w-full animate-slide-up px-4" ref={ref}>
      <div className="bg-white p-4 lg:p-6 rounded-xl shadow-md border border-gray-100">
        {/* Header dengan tombol edit */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 lg:mb-6 pb-4 border-b border-gray-100 gap-4">
          {" "}
          <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-main">
            Hasil Analisis Nutrisi
          </h2>
          {!isEditing ? (
            <button
              onClick={initializeEditValues}
              className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 bg-main text-white hover:bg-main/90 rounded-lg transition-all duration-200 flex items-center gap-1.5 sm:gap-2 shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
              title="Edit nutrisi"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 sm:h-5 w-4 sm:w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
              <span className="font-medium">Edit Nutrisi</span>
            </button>
          ) : null}
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            {successMessage}
          </div>
        )}

        <div className="space-y-8">
          {/* Kandungan Gizi */}
          <div className="bg-gray-50 p-4 lg:p-6 rounded-xl border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              {" "}
              <h3 className="text-base sm:text-lg font-semibold text-main flex items-center">
                <span className="bg-secondary p-1.5 sm:p-2 rounded-lg mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 sm:h-5 w-4 sm:w-5"
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
              {isEditing && (
                <div className="flex gap-2">
                  <button
                    onClick={handleCancelEdit}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors"
                    disabled={loading}
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSubmitUpdate}
                    disabled={loading}
                    className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm bg-main hover:bg-main/90 text-white rounded-lg transition-colors flex items-center gap-1"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          ></path>
                        </svg>
                        <span>Menyimpan...</span>
                      </>
                    ) : (
                      <>
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
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>Simpan</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-3">
              {Object.entries(
                isEditing ? updatedValues : nutritionData.kandungan
              ).map(([key, value]) => (
                <div
                  key={key}
                  className={
                    isEditing
                      ? "flex flex-col gap-1 p-2.5 lg:p-4 bg-white rounded-xl border-2 border-main/30 shadow-md animate-pulse-slow"
                      : "flex flex-col gap-1 p-2 lg:p-3 bg-white rounded-lg hover:bg-gray-100 transition-colors border border-gray-100 shadow-sm"
                  }
                >
                  <label
                    className={
                      isEditing
                        ? "text-main text-xs sm:text-base lg:text-sm font-bold mb-1 capitalize tracking-wide"
                        : "text-gray-600 text-xs sm:text-sm font-medium mb-1 capitalize tracking-wide"
                    }
                    style={{ fontSize: isEditing ? "1rem" : undefined }}
                  >
                    {key
                      .replace("_", " ")
                      .replace(/\b\w/g, (c) => c.toUpperCase())}
                  </label>
                  {isEditing ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={value}
                        onChange={(e) => handleInputChange(key, e.target.value)}
                        className="w-full text-right border-2 border-main focus:border-main/80 rounded-xl px-3 py-3 sm:py-2 text-lg sm:text-base font-semibold focus:outline-none transition-all duration-200 shadow focus:shadow-lg bg-main/5 focus:bg-main/10 ring-2 ring-main/10"
                        step="0.1"
                        min="0"
                        max="999.9"
                        placeholder={`Masukkan ${key.replace("_", " ")}`}
                        aria-label={`Input ${key}`}
                        autoFocus={false}
                        style={{
                          fontSize: "1.1rem",
                          paddingTop: "0.7rem",
                          paddingBottom: "0.7rem",
                        }}
                      />
                      <span className="text-xs sm:text-sm text-main font-bold">
                        {getNutritionUnit(key)}
                      </span>
                    </div>
                  ) : (
                    <span className="font-medium text-main text-base">
                      {formatNutritionValue(value, getNutritionUnit(key))}{" "}
                      {getNutritionUnit(key)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Perbandingan Kebutuhan Harian */}
          {nutritionData.perbandingan.length > 0 && (
            <div className="bg-gray-50 p-4 lg:p-6 rounded-xl border border-gray-100">
              {" "}
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-main flex items-center">
                <span className="bg-secondary p-1.5 sm:p-2 rounded-lg mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 sm:h-5 w-4 sm:w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h2a2 2 0 002-2z"
                    />
                  </svg>
                </span>
                Perbandingan dengan Kebutuhan Harian
              </h3>
              {/* Peringatan jika ada yang melebihi */}
              {(() => {
                // Periksa status terkini berdasarkan perbandingan nilai aktual
                const hasExceedingNutrients = nutritionData.perbandingan.some(
                  (row) => {
                    const normalize = (str) =>
                      str.toLowerCase().replace(/ /g, "_");
                    const ocrKey = normalize(row.label);
                    let ocrValue;

                    // Ambil nilai terkini (dari form edit atau data asli)
                    if (isEditing && updatedValues[ocrKey] !== undefined) {
                      ocrValue = updatedValues[ocrKey];
                    } else {
                      ocrValue = nutritionData.kandungan[ocrKey];
                    }

                    // Ambil kebutuhan harian
                    const normalizeKey = (str) => {
                      let norm = str.toLowerCase();
                      if (norm === "lemak total") return "lemak total";
                      return norm.replace(/ /g, "");
                    };

                    const kebutuhanKey = normalizeKey(row.label);
                    const kebutuhanValue =
                      nutritionData.kebutuhan[kebutuhanKey];

                    // Bandingkan nilai
                    return (
                      !isNaN(ocrValue) &&
                      !isNaN(kebutuhanValue) &&
                      parseFloat(ocrValue) > parseFloat(kebutuhanValue)
                    );
                  }
                );

                if (hasExceedingNutrients) {
                  return (
                    <div className="mb-4 bg-red-50 border border-red-200 p-4 rounded-lg">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
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
                  );
                }
                return null;
              })()}
              <div className="overflow-x-auto -mx-4 lg:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden rounded-lg border border-gray-100">
                    <table className="min-w-full divide-y divide-gray-100 bg-white">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Gizi
                          </th>
                          <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Hasil OCR
                          </th>
                          <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kebutuhan
                          </th>
                          <th className="px-3 lg:px-6 py-3 lg:py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-100">
                        {(() => {
                          // Urutan nutrisi yang diinginkan
                          const order = [
                            "Energi",
                            "Protein",
                            "Lemak Total",
                            "Karbohidrat",
                            "Serat",
                            "Gula",
                            "Garam",
                          ];
                          // Sort perbandingan sesuai urutan di atas
                          const sorted = [...nutritionData.perbandingan].sort(
                            (a, b) =>
                              order.indexOf(a.label) - order.indexOf(b.label)
                          );
                          return sorted.map((row, index) => (
                            <tr
                              key={index}
                              className="hover:bg-gray-50 transition-colors"
                            >
                              <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-xs lg:text-sm font-medium text-main">
                                {row.label}
                              </td>
                              <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-xs lg:text-sm text-gray-600">
                                {(() => {
                                  // Normalisasi label ke key
                                  const normalize = (str) => {
                                    let norm = str
                                      .toLowerCase()
                                      .replace(/\s+/g, "_")
                                      .replace(/[^a-z0-9_]/g, "");
                                    if (
                                      norm === "lemak_total" ||
                                      norm === "lemak total" ||
                                      norm === "lemaktotal" ||
                                      norm === "lemak__total"
                                    )
                                      return "lemak total";
                                    return norm;
                                  };
                                  const key = normalize(row.label);
                                  let value;
                                  if (isEditing) {
                                    value =
                                      updatedValues[key] !== undefined &&
                                      updatedValues[key] !== ""
                                        ? updatedValues[key]
                                        : "-";
                                  } else {
                                    value =
                                      nutritionData.kandungan[key] !==
                                        undefined &&
                                      nutritionData.kandungan[key] !== ""
                                        ? nutritionData.kandungan[key]
                                        : "-";
                                  }
                                  return `${value} ${getNutritionUnit(
                                    row.label
                                  )}`;
                                })()}
                              </td>
                              <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-xs lg:text-sm text-gray-600">
                                {(() => {
                                  // Default values untuk kebutuhan harian
                                  const defaultKebutuhan = {
                                    energi: 2000,
                                    protein: 60,
                                    "lemak total": 70,
                                    karbohidrat: 300,
                                    serat: 25,
                                    gula: 50,
                                    garam: 2000,
                                  };

                                  const normalize = (str) => {
                                    let norm = str.toLowerCase();
                                    if (norm === "lemak total")
                                      return "lemak total";
                                    return norm.replace(/ /g, "");
                                  };

                                  // Mendapatkan key yang sesuai dari objek kebutuhan
                                  const key = normalize(row.label);

                                  // Mengambil nilai dari nutritionData.kebutuhan, jika null gunakan default
                                  const value =
                                    nutritionData.kebutuhan[key] !==
                                      undefined &&
                                    nutritionData.kebutuhan[key] !== null
                                      ? nutritionData.kebutuhan[key]
                                      : defaultKebutuhan[key.toLowerCase()] ||
                                        0;

                                  return `${value} ${getNutritionUnit(
                                    row.label
                                  )}`;
                                })()}
                              </td>
                              <td className="px-3 lg:px-6 py-3 lg:py-4 whitespace-nowrap text-xs lg:text-sm">
                                {(() => {
                                  // Normalisasi label ke key
                                  const normalize = (str) => {
                                    let norm = str
                                      .toLowerCase()
                                      .replace(/\s+/g, "_")
                                      .replace(/[^a-z0-9_]/g, "");
                                    // Khusus untuk lemak total
                                    if (norm === "lemak total") {
                                      return "lemak total";
                                    }
                                    return norm;
                                  };
                                  const ocrKey = normalize(row.label);
                                  // Ambil nilai hasil OCR terbaru
                                  let ocrValue;
                                  if (
                                    isEditing &&
                                    updatedValues[ocrKey] !== undefined
                                  ) {
                                    ocrValue = updatedValues[ocrKey];
                                  } else {
                                    // Ambil angka dari hasil_ocr
                                    const match =
                                      typeof row.hasil_ocr === "string"
                                        ? row.hasil_ocr.match(/([\d.]+)/)
                                        : null;
                                    ocrValue = match
                                      ? parseFloat(match[1])
                                      : row.hasil_ocr;
                                  }
                                  // Default values untuk kebutuhan harian
                                  const defaultKebutuhan = {
                                    energi: 2000,
                                    protein: 60,
                                    "lemak total": 70,
                                    karbohidrat: 300,
                                    serat: 25,
                                    gula: 50,
                                    garam: 2000,
                                  };

                                  const normalizeKey = (str) => {
                                    let norm = str.toLowerCase();
                                    if (norm === "lemak total")
                                      return "lemak total";
                                    return norm.replace(/ /g, "");
                                  };

                                  // Mengambil kebutuhan dari nutritionData.kebutuhan, gunakan default jika null
                                  const kebutuhanKey = normalizeKey(row.label);
                                  const kebutuhanValue =
                                    nutritionData.kebutuhan[kebutuhanKey] !==
                                      undefined &&
                                    nutritionData.kebutuhan[kebutuhanKey] !==
                                      null
                                      ? nutritionData.kebutuhan[kebutuhanKey]
                                      : defaultKebutuhan[
                                          kebutuhanKey.toLowerCase()
                                        ] || 0;
                                  const kebutuhanNum =
                                    parseFloat(kebutuhanValue);

                                  // Hitung status baru
                                  let status = "Aman";
                                  if (
                                    !isNaN(ocrValue) &&
                                    !isNaN(kebutuhanNum) &&
                                    ocrValue > kebutuhanNum
                                  ) {
                                    status = "Melebihi";
                                  }
                                  return (
                                    <span
                                      className={
                                        "inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium " +
                                        (status === "Melebihi"
                                          ? "bg-red-50 text-red-700 border border-red-200"
                                          : "bg-green-50 text-green-700 border border-green-200")
                                      }
                                    >
                                      {status === "Melebihi" ? (
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
                                      {status}
                                    </span>
                                  );
                                })()}
                              </td>
                            </tr>
                          ));
                        })()}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default AnalysisResult;
