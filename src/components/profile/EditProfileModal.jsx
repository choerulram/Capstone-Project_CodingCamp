import React, { useState } from "react";
import api from "../../utils/api";
import { useSelector } from "react-redux";

const EditProfileModal = ({ isOpen, onClose, userData, onUpdate }) => {
  const { token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    nama: userData?.nama || "",
    gender: userData?.gender || "",
    umur: userData?.umur || "",
    umur_satuan: userData?.umur_satuan || "tahun",
    tinggi: userData?.tinggi || "",
    bb: userData?.bb || "",
    hamil: userData?.hamil || false,
    usia_kandungan: userData?.usia_kandungan || "",
    menyusui: userData?.menyusui || false,
    umur_anak: userData?.umur_anak || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await api.updateProfile(token, formData);
      onUpdate();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Edit Profil</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-6 h-6"
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
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Informasi Dasar */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Informasi Dasar
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nama
                  </label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Jenis Kelamin
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
                  >
                    <option value="">Pilih Jenis Kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Usia
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      name="umur"
                      value={formData.umur}
                      onChange={handleChange}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
                    />
                    <select
                      name="umur_satuan"
                      value={formData.umur_satuan}
                      onChange={handleChange}
                      className="w-24 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
                    >
                      <option value="tahun">Tahun</option>
                      <option value="bulan">Bulan</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Pengukuran Tubuh */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Pengukuran Tubuh
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tinggi Badan (cm)
                  </label>
                  <input
                    type="number"
                    name="tinggi"
                    value={formData.tinggi}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Berat Badan (kg)
                  </label>
                  <input
                    type="number"
                    name="bb"
                    value={formData.bb}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Status Kesehatan */}
            {formData.gender === "Perempuan" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Status Kesehatan
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center mb-2">
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
                        Sedang Hamil
                      </label>
                    </div>
                    {formData.hamil && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Usia Kandungan (minggu)
                        </label>
                        <input
                          type="number"
                          name="usia_kandungan"
                          value={formData.usia_kandungan}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center mb-2">
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
                        Sedang Menyusui
                      </label>
                    </div>
                    {formData.menyusui && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Usia Anak (bulan)
                        </label>
                        <input
                          type="number"
                          name="umur_anak"
                          value={formData.umur_anak}
                          onChange={handleChange}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-main focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-4 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-white bg-main rounded-lg hover:bg-main/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
