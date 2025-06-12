import React, { useState } from "react";
import api from "../../utils/api";
import { useSelector } from "react-redux";

const EditProfileModal = ({ isOpen, onClose, userData, onUpdate }) => {
  const { token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    nama: userData?.nama || "",
    gender: userData?.gender || "",
    umur: userData?.umur || "",
    tinggi: userData?.tinggi || "",
    bb: userData?.bb || "",
    hamil: userData?.hamil || false,
    usia_kandungan: userData?.usia_kandungan || "",
    menyusui: userData?.menyusui || false,
    umur_anak: userData?.umur_anak || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    // Validate required fields
    if (!formData.nama.trim()) errors.nama = "Full name is required";
    if (!formData.gender) errors.gender = "Gender is required";
    if (!formData.umur) errors.umur = "Age is required";
    if (!formData.tinggi) errors.tinggi = "Height is required";
    if (!formData.bb) errors.bb = "Weight is required";

    // Validate specific conditions for female users
    if (formData.gender === "Female") {
      if (formData.hamil && !formData.usia_kandungan) {
        errors.usia_kandungan = "Pregnancy age is required";
      }
      if (formData.menyusui && !formData.umur_anak) {
        errors.umur_anak = "Child age is required";
      }
    }

    // Validate numeric fields
    if (formData.umur && (formData.umur < 0 || formData.umur > 150)) {
      errors.umur = "Please enter a valid age (0-150 years)";
    }
    if (formData.tinggi && (formData.tinggi < 0 || formData.tinggi > 300)) {
      errors.tinggi = "Please enter a valid height (0-300 cm)";
    }
    if (formData.bb && (formData.bb < 0 || formData.bb > 500)) {
      errors.bb = "Please enter a valid weight (0-500 kg)";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "hamil") {
        // When changing pregnancy status
        setFormData((prev) => ({
          ...prev,
          hamil: checked,
          // If checking pregnant, clear nursing
          menyusui: false,
          usia_kandungan: checked ? prev.usia_kandungan : "",
          umur_anak: "",
        }));
      } else if (name === "menyusui") {
        // When changing nursing status
        setFormData((prev) => ({
          ...prev,
          menyusui: checked,
          // If checking nursing, clear pregnant
          hamil: false,
          umur_anak: checked ? prev.umur_anak : "",
          usia_kandungan: "",
        }));
      }
    } else if (name === "gender") {
      // Ketika gender berubah
      setFormData((prev) => ({
        ...prev,
        gender: value,
        // Reset status kesehatan jika gender berubah menjadi Male
        ...(value === "Male" && {
          hamil: false,
          menyusui: false,
          usia_kandungan: "",
          umur_anak: "",
        }),
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
    setError(null);
    setValidationErrors({});

    if (!validateForm()) {
      setError("Please fill in all required fields correctly");
      return;
    }

    setIsSubmitting(true);

    try {
      const updatedProfile = await api.updateProfile(token, {
        nama: formData.nama,
        bb: formData.bb,
        tinggi: formData.tinggi,
        gender: formData.gender,
        umur: formData.umur,
        hamil: formData.hamil,
        usia_kandungan: formData.hamil ? formData.usia_kandungan : null,
        menyusui: formData.menyusui,
        umur_anak: formData.menyusui ? formData.umur_anak : null,
      });

      if (updatedProfile) {
        onUpdate(); // Refresh profile data
        onClose(); // Close the modal
      }
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity animate-fade-in"
          onClick={onClose}
        ></div>{" "}
        {/* Modal Content */}
        <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl transform transition-all">
          {/* Decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-main/5 rounded-full"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-main/5 rounded-full"></div>
          </div>

          <div className="relative p-6 sm:p-8">
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-main/10 rounded-xl">
                  <svg
                    className="w-6 h-6 text-main"
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
                  <h2 className="text-2xl font-bold text-gray-800">
                    Edit Profile
                  </h2>
                  <p className="text-gray-500">
                    Update your profile information
                  </p>
                </div>
              </div>{" "}
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors group"
              >
                <svg
                  className="w-6 h-6 text-gray-400 group-hover:text-gray-600"
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
              <div className="p-4 mb-6 text-sm text-red-700 bg-red-50 rounded-xl border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Informasi Dasar */}{" "}
              <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <svg
                      className="w-5 h-5 text-blue-500"
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
                  <h3 className="text-lg font-semibold text-gray-900">
                    Basic Information
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>{" "}
                    <input
                      type="text"
                      name="nama"
                      value={formData.nama}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={`w-full border ${
                        validationErrors.nama
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300`}
                    />
                    {validationErrors.nama && (
                      <p className="mt-1 text-sm text-red-500">
                        {validationErrors.nama}
                      </p>
                    )}
                    {validationErrors.nama && (
                      <p className="text-sm text-red-600">
                        {validationErrors.nama}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    {" "}
                    <label className="block text-sm font-medium text-gray-700">
                      Gender
                    </label>{" "}
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className={`w-full border ${
                        validationErrors.gender
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300`}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    {validationErrors.gender && (
                      <p className="mt-1 text-sm text-red-500">
                        {validationErrors.gender}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    {" "}
                    <label className="block text-sm font-medium text-gray-700">
                      Age
                    </label>{" "}
                    <div className="relative">
                      <input
                        type="number"
                        name="umur"
                        value={formData.umur}
                        onChange={handleChange}
                        placeholder="Enter your age"
                        className={`w-full border ${
                          validationErrors.umur
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-xl p-3 pr-16 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300`}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        years
                      </span>
                    </div>
                    {validationErrors.umur && (
                      <p className="mt-1 text-sm text-red-500">
                        {validationErrors.umur}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              {/* Pengukuran Tubuh */}{" "}
              <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <svg
                      className="w-5 h-5 text-green-500"
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
                  <h3 className="text-lg font-semibold text-gray-900">
                    Body Measurements
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Height
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="tinggi"
                        value={formData.tinggi}
                        onChange={handleChange}
                        placeholder="Enter your height"
                        className={`w-full border ${
                          validationErrors.tinggi
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-xl p-3 pr-16 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300`}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        cm
                      </span>
                    </div>
                    {validationErrors.tinggi && (
                      <p className="mt-1 text-sm text-red-500">
                        {validationErrors.tinggi}
                      </p>
                    )}
                  </div>{" "}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Weight
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        name="bb"
                        value={formData.bb}
                        onChange={handleChange}
                        placeholder="Enter your weight"
                        className={`w-full border ${
                          validationErrors.bb
                            ? "border-red-500"
                            : "border-gray-300"
                        } rounded-xl p-3 pr-16 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300`}
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                        kg
                      </span>
                    </div>
                    {validationErrors.bb && (
                      <p className="mt-1 text-sm text-red-500">
                        {validationErrors.bb}
                      </p>
                    )}
                  </div>
                </div>
              </div>{" "}
              {/* Status Kesehatan */}{" "}
              {formData.gender === "Female" && (
                <div className="bg-gray-50/50 p-6 rounded-xl border border-gray-100">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <svg
                        className="w-5 h-5 text-purple-500"
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
                    <h3 className="text-lg font-semibold text-gray-900">
                      Health Status
                    </h3>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-6">
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
                          Pregnant
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
                          Nursing
                        </label>
                      </div>
                    </div>

                    {formData.hamil && (
                      <div className="pl-6">
                        {" "}
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Pregnancy Age (months)
                        </label>
                        <input
                          type="number"
                          name="usia_kandungan"
                          value={formData.usia_kandungan}
                          onChange={handleChange}
                          min="1"
                          max="9"
                          placeholder="1-9 months"
                          className={`w-32 border ${
                            validationErrors.usia_kandungan
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300`}
                        />
                        {validationErrors.usia_kandungan && (
                          <p className="mt-1 text-sm text-red-500">
                            {validationErrors.usia_kandungan}
                          </p>
                        )}
                      </div>
                    )}

                    {formData.menyusui && (
                      <div className="pl-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Child Age (months)
                        </label>
                        <input
                          type="number"
                          name="umur_anak"
                          value={formData.umur_anak}
                          onChange={handleChange}
                          min="0"
                          max="60"
                          placeholder="0-60 months"
                          className={`w-32 border ${
                            validationErrors.umur_anak
                              ? "border-red-500"
                              : "border-gray-300"
                          } rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300`}
                        />
                        {validationErrors.umur_anak && (
                          <p className="mt-1 text-sm text-red-500">
                            {validationErrors.umur_anak}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 text-white bg-main rounded-xl hover:bg-main/90 transition-colors disabled:opacity-50 font-medium"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
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
