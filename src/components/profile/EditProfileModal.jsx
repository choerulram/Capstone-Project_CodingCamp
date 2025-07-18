import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { useSelector } from "react-redux";

const NUTRITION_UPDATE_EVENT = "nutritionUpdate";

const EditProfileModal = ({ isOpen, onClose, userData, onUpdate }) => {
  const { token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    nama: userData?.nama || "",
    gender: userData?.gender || "",
    umur: userData?.umur || "",
    umur_satuan: userData?.umur_satuan || "tahun", // default ke tahun jika tidak ada
    tinggi: userData?.tinggi || "",
    bb: userData?.bb || "",
    hamil: userData?.hamil || false,
    usia_kandungan: userData?.usia_kandungan || "",
    menyusui: userData?.menyusui || false,
    umur_anak: userData?.umur_anak || "",
    timezone:
      userData?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
  });

  // Effect untuk memperbarui form data ketika userData berubah
  useEffect(() => {
    if (userData) {
      setFormData((prevData) => ({
        ...prevData,
        nama: userData.nama || "",
        gender: userData.gender || "",
        umur: userData.umur || "",
        umur_satuan: userData.umur_satuan || "tahun",
        tinggi: userData.tinggi || "",
        bb: userData.bb || "",
        hamil: userData.hamil || false,
        usia_kandungan: userData.usia_kandungan || "",
        menyusui: userData.menyusui || false,
        umur_anak: userData.umur_anak || "",
        timezone:
          userData.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      }));
    }
  }, [userData]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    // Validate required fields
    if (!formData.nama.trim()) errors.nama = "Nama lengkap wajib diisi";
    if (!formData.gender) errors.gender = "Jenis kelamin wajib diisi";
    if (!formData.umur) errors.umur = "Umur wajib diisi";
    if (!formData.tinggi) errors.tinggi = "Tinggi badan wajib diisi";
    if (!formData.bb) errors.bb = "Berat badan wajib diisi";

    // Validate specific conditions for perempuan users
    if (formData.gender === "Perempuan") {
      if (formData.hamil && !formData.usia_kandungan) {
        errors.usia_kandungan = "Usia kandungan wajib diisi";
      }
      if (formData.menyusui && !formData.umur_anak) {
        errors.umur_anak = "Usia anak wajib diisi";
      }
    } // Validate numeric fields
    if (formData.umur) {
      if (formData.umur_satuan === "bulan") {
        if (formData.umur < 1 || formData.umur > 12) {
          errors.umur = "Untuk bayi, masukkan umur 1-12 bulan";
        }
      } else {
        if (formData.umur < 1 || formData.umur > 150) {
          errors.umur = "Masukkan umur yang valid (1-150 tahun)";
        }
      }
    }
    if (formData.tinggi && (formData.tinggi < 0 || formData.tinggi > 300)) {
      errors.tinggi = "Masukkan tinggi badan yang valid (0-300 cm)";
    }
    if (formData.bb && (formData.bb < 0 || formData.bb > 500)) {
      errors.bb = "Masukkan berat badan yang valid (0-500 kg)";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "hamil") {
        setFormData((prev) => ({
          ...prev,
          hamil: checked,
          menyusui: false,
          usia_kandungan: checked ? prev.usia_kandungan : "",
          umur_anak: "",
        }));
      } else if (name === "menyusui") {
        setFormData((prev) => ({
          ...prev,
          menyusui: checked,
          hamil: false,
          umur_anak: checked ? prev.umur_anak : "",
          usia_kandungan: "",
        }));
      }
    } else if (name === "gender") {
      setFormData((prev) => ({
        ...prev,
        gender: value,
        ...(value === "Laki-laki" && {
          hamil: false,
          menyusui: false,
          usia_kandungan: "",
          umur_anak: "",
        }),
      }));
    } else if (name === "umur_satuan") {
      // Ketika satuan berubah
      setFormData((prev) => ({
        ...prev,
        umur_satuan: value,
        umur: "", // Reset nilai umur untuk menghindari nilai yang tidak valid
      }));
    } else if (name === "umur") {
      // Validasi nilai umur sesuai satuan
      let newValue = value;
      if (formData.umur_satuan === "bulan") {
        if (value > 12) newValue = "12";
        if (value < 1) newValue = "1";
      } else {
        if (value > 150) newValue = "150";
        if (value < 1) newValue = "1";
      }
      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      setError(null);
      setValidationErrors({});

      if (!validateForm()) {
        setError("Mohon isi semua field yang diperlukan dengan benar");
        return;
      }

      const dataToUpdate = {
        nama: formData.nama,
        email: userData.email,
        bb: formData.bb ? Number(formData.bb) : null,
        tinggi: formData.tinggi ? Number(formData.tinggi) : null,
        gender: formData.gender,
        umur: formData.umur ? Number(formData.umur) : null,
        umur_satuan: formData.umur_satuan,
        hamil: formData.hamil ? 1 : 0,
        usia_kandungan: formData.hamil ? Number(formData.usia_kandungan) : null,
        menyusui: formData.menyusui ? 1 : 0,
        umur_anak: formData.menyusui ? Number(formData.umur_anak) : null,
        timezone: formData.timezone,
      };

      console.log(
        "[EditProfileModal] Data yang akan dikirim ke API:",
        dataToUpdate
      );

      // Update profil
      const updatedProfile = await api.updateProfile(token, dataToUpdate);
      console.log(
        "[EditProfileModal] Profile berhasil diupdate:",
        updatedProfile
      );

      // Tunggu sebentar untuk memastikan backend selesai memproses
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Memicu event update nutrisi
      window.dispatchEvent(new CustomEvent(NUTRITION_UPDATE_EVENT));
      console.log("[EditProfileModal] Event nutrition update telah dipicu");

      // Update parent component
      onUpdate(updatedProfile);
      onClose();
    } catch (error) {
      console.error("[EditProfileModal] Error updating profile:", error);
      setError(error.message || "Terjadi kesalahan saat memperbarui profil");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60]">
      <div className="fixed inset-0 flex items-center justify-center">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity animate-fade-in"
          onClick={onClose}
        ></div>
        {/* Modal Content */}
        <div className="fixed max-h-[90vh] w-[95%] sm:w-auto max-w-2xl bg-white rounded-xl sm:rounded-2xl overflow-y-auto shadow-2xl transform transition-all mx-auto my-4 sm:my-8">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-10 -right-10 w-32 sm:w-40 h-32 sm:h-40 bg-main/5 rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-32 sm:w-40 h-32 sm:h-40 bg-main/5 rounded-full"></div>
          </div>

          <div className="relative p-4 sm:p-6 md:p-8">
            <div className="flex justify-between items-center mb-6 sm:mb-8 pb-4 sm:pb-6 border-b border-gray-100">
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="p-2 sm:p-3 bg-main/10 rounded-lg sm:rounded-xl">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-main"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Edit Profil
                  </h2>
                  <p className="text-sm sm:text-base text-gray-500">
                    Perbarui informasi profil Anda
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-lg sm:rounded-xl transition-colors group"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
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

            {error && (
              <div className="p-3 sm:p-4 mb-4 sm:mb-6 text-sm text-red-700 bg-red-50 rounded-lg sm:rounded-xl border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              {/* Basic Information */}
              <div className="bg-gray-50/50 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-gray-100">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-4">
                  <div className="p-1.5 sm:p-2 bg-blue-50 rounded-lg">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    Informasi Dasar
                  </h3>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      name="nama"
                      value={formData.nama}
                      onChange={handleChange}
                      placeholder="Masukkan nama lengkap"
                      className={`w-full border ${
                        validationErrors.nama
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg sm:rounded-xl p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300`}
                    />
                    {validationErrors.nama && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500">
                        {validationErrors.nama}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Jenis Kelamin
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`w-full border ${
                        validationErrors.gender
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg sm:rounded-xl p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300`}
                    >
                      <option value="">Pilih Jenis Kelamin</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                    {validationErrors.gender && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500">
                        {validationErrors.gender}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Umur
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input
                          type="number"
                          name="umur"
                          value={formData.umur}
                          onChange={handleChange}
                          min={formData.umur_satuan === "bulan" ? 1 : 1}
                          max={formData.umur_satuan === "bulan" ? 12 : 150}
                          placeholder={
                            formData.umur_satuan === "bulan" ? "1-12" : "1-150"
                          }
                          className={`w-full border ${
                            validationErrors.umur
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-lg sm:rounded-xl p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300`}
                        />
                      </div>
                      <select
                        name="umur_satuan"
                        value={formData.umur_satuan}
                        onChange={handleChange}
                        className="w-28 border border-gray-300 rounded-lg sm:rounded-xl p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300"
                      >
                        <option value="tahun">Tahun</option>
                        <option value="bulan">Bulan</option>
                      </select>
                    </div>
                    {validationErrors.umur && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500">
                        {validationErrors.umur}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Zona Waktu
                    </label>
                    <select
                      name="timezone"
                      value={formData.timezone}
                      onChange={handleChange}
                      className={`w-full border border-gray-300 rounded-lg sm:rounded-xl p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300`}
                    >
                      <option value="Asia/Jakarta">WIB - Jakarta</option>
                      <option value="Asia/Makassar">WITA - Makassar</option>
                      <option value="Asia/Jayapura">WIT - Jayapura</option>
                    </select>
                  </div>
                </div>
              </div>
              {/* Pengukuran Tubuh */}{" "}
              <div className="bg-gray-50/50 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-gray-100">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-4">
                  <div className="p-1.5 sm:p-2 bg-green-50 rounded-lg">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-green-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                    Pengukuran Tubuh
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Tinggi Badan
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="tinggi"
                        value={formData.tinggi}
                        onChange={handleChange}
                        placeholder="Masukkan tinggi badan Anda"
                        className={`w-full border ${
                          validationErrors.tinggi
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg sm:rounded-xl p-2.5 sm:p-3 pr-12 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300`}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                        cm
                      </span>
                    </div>
                    {validationErrors.tinggi && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500">
                        {validationErrors.tinggi}
                      </p>
                    )}
                  </div>{" "}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Berat Badan
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="bb"
                        value={formData.bb}
                        onChange={handleChange}
                        placeholder="Masukkan berat badan Anda"
                        className={`w-full border ${
                          validationErrors.bb
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-lg sm:rounded-xl p-2.5 sm:p-3 pr-12 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300`}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                        kg
                      </span>
                    </div>
                    {validationErrors.bb && (
                      <p className="mt-1 text-xs sm:text-sm text-red-500">
                        {validationErrors.bb}
                      </p>
                    )}
                  </div>
                </div>
              </div>{" "}
              {/* Status Kesehatan */}{" "}
              {formData.gender === "Perempuan" && (
                <div className="bg-gray-50/50 p-4 sm:p-6 rounded-lg sm:rounded-xl border border-gray-100">
                  <div className="flex items-center space-x-2 sm:space-x-3 mb-4">
                    <div className="p-1.5 sm:p-2 bg-purple-50 rounded-lg">
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                      Status Kesehatan
                    </h3>
                  </div>
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="hamil"
                          name="hamil"
                          checked={formData.hamil}
                          onChange={handleChange}
                          className="w-4 h-4 text-main border-gray-300 rounded focus:ring-main"
                        />
                        <label
                          htmlFor="hamil"
                          className="ml-2 text-sm font-medium text-gray-700"
                        >
                          Hamil
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="menyusui"
                          name="menyusui"
                          checked={formData.menyusui}
                          onChange={handleChange}
                          className="w-4 h-4 text-main border-gray-300 rounded focus:ring-main"
                        />
                        <label
                          htmlFor="menyusui"
                          className="ml-2 text-sm font-medium text-gray-700"
                        >
                          Menyusui
                        </label>
                      </div>
                    </div>

                    {formData.hamil && (
                      <div className="pl-4 sm:pl-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                          Usia Kehamilan (Trimester)
                        </label>
                        <select
                          name="usia_kandungan"
                          value={formData.usia_kandungan}
                          onChange={handleChange}
                          className={`w-full sm:w-48 border ${
                            validationErrors.usia_kandungan
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-lg sm:rounded-xl p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300`}
                        >
                          <option value="">Pilih Trimester</option>
                          <option value="1">Trimester 1</option>
                          <option value="2">Trimester 2</option>
                          <option value="3">Trimester 3</option>
                        </select>
                        {validationErrors.usia_kandungan && (
                          <p className="mt-1 text-xs sm:text-sm text-red-500">
                            {validationErrors.usia_kandungan}
                          </p>
                        )}
                      </div>
                    )}

                    {formData.menyusui && (
                      <div className="pl-4 sm:pl-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                          Usia Bayi (bulan)
                        </label>
                        <div className="relative">
                          <input
                            type="number"
                            name="umur_anak"
                            value={formData.umur_anak}
                            onChange={handleChange}
                            min="1"
                            max="12"
                            placeholder="1-12 bulan"
                            className={`w-full sm:w-32 border ${
                              validationErrors.umur_anak
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-lg sm:rounded-xl p-2.5 sm:p-3 pr-16 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300`}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                            bulan
                          </span>
                        </div>
                        {validationErrors.umur_anak && (
                          <p className="mt-1 text-xs sm:text-sm text-red-500">
                            {validationErrors.umur_anak}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}{" "}
              <div className="flex justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-gray-700 bg-gray-100 rounded-lg sm:rounded-xl hover:bg-gray-200 transition-colors font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-white bg-main rounded-lg sm:rounded-xl hover:bg-main/90 transition-colors disabled:opacity-50 font-medium"
                >
                  {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
