import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../utils/api.js";
import Alert from "./Alert";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    height: "",
    weight: "",
    gender: "Male",
    is_pregnant: false,
    pregnancy_age: "",
    is_nursing: false,
    child_age: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError("Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email address");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (name === "is_pregnant" && checked) {
        // Jika memilih hamil, uncheck menyusui
        setFormData((prev) => ({
          ...prev,
          [name]: checked,
          is_nursing: false,
          child_age: "",
        }));
      } else if (name === "is_nursing" && checked) {
        // Jika memilih menyusui, uncheck hamil
        setFormData((prev) => ({
          ...prev,
          [name]: checked,
          is_pregnant: false,
          pregnancy_age: "",
        }));
      } else {
        // Untuk unchecking checkbox
        setFormData((prev) => ({
          ...prev,
          [name]: checked,
          // Reset related fields when unchecking
          ...(name === "is_pregnant" && { pregnancy_age: "" }),
          ...(name === "is_nursing" && { child_age: "" }),
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await api.register(formData);
      if (!response.error) {
        setAlertMessage(
          "Registration successful! You can now login to your account."
        );
        setShowAlert(true);
      }
    } catch (err) {
      setError(err.message || "An error occurred during registration");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
    navigate("/login");
  };

  return (
    <div className="w-full md:w-[65%] bg-gray-50 p-3 sm:p-6 md:p-10 flex flex-col justify-center items-center">
      <div className="w-full max-w-3xl">
        <div className="bg-white p-4 sm:p-8 md:p-12 rounded-lg sm:rounded-xl md:rounded-3xl shadow-lg sm:shadow-xl md:shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-300">
          {" "}
          <h2 className="text-dark text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 font-bold">
            Join NuTrack
          </h2>
          <p className="text-gray-500 mb-6 sm:mb-8 md:mb-10 text-base sm:text-lg">
            Create your account to get started
          </p>
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            {error && (
              <div
                className="p-4 mb-4 text-sm text-red-700 bg-red-50 rounded-xl border border-red-100"
                role="alert"
              >
                {error}
              </div>
            )}{" "}
            {/* Basic Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-1.5 sm:space-y-2">
                <label
                  htmlFor="name"
                  className="block text-xs sm:text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-lg sm:rounded-xl p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300"
                />
              </div>{" "}
              <div className="space-y-1.5 sm:space-y-2">
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg sm:rounded-xl p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300"
                />
              </div>
            </div>
            {/* Health Information Section */}{" "}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
              <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">
                Health Information
              </h3>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label
                    htmlFor="gender"
                    className="block text-xs sm:text-sm font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg sm:rounded-xl p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="age"
                    className="block text-xs sm:text-sm font-medium text-gray-700"
                  >
                    Age
                  </label>
                  <div className="relative">
                    <input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="Enter your age"
                      className="w-full border border-gray-300 rounded-lg sm:rounded-xl p-2.5 sm:p-3 pr-12 sm:pr-16 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      years
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label
                    htmlFor="height"
                    className="block text-xs sm:text-sm font-medium text-gray-700"
                  >
                    Height
                  </label>
                  <div className="relative">
                    <input
                      id="height"
                      name="height"
                      type="number"
                      value={formData.height}
                      onChange={handleChange}
                      placeholder="Enter your height"
                      className="w-full border border-gray-300 rounded-lg sm:rounded-xl p-2.5 sm:p-3 pr-10 sm:pr-12 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      cm
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="weight"
                    className="block text-xs sm:text-sm font-medium text-gray-700"
                  >
                    Weight
                  </label>
                  <div className="relative">
                    <input
                      id="weight"
                      name="weight"
                      type="number"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="Enter your weight"
                      className="w-full border border-gray-300 rounded-lg sm:rounded-xl p-2.5 sm:p-3 pr-10 sm:pr-12 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                      kg
                    </span>
                  </div>
                </div>
              </div>

              {formData.gender === "Female" && (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <input
                        id="is_pregnant"
                        name="is_pregnant"
                        type="checkbox"
                        checked={formData.is_pregnant}
                        onChange={handleChange}
                        className="h-4 w-4 text-main border-gray-300 rounded focus:ring-main"
                      />
                      <label
                        htmlFor="is_pregnant"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Pregnant
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="is_nursing"
                        name="is_nursing"
                        type="checkbox"
                        checked={formData.is_nursing}
                        onChange={handleChange}
                        className="h-4 w-4 text-main border-gray-300 rounded focus:ring-main"
                      />
                      <label
                        htmlFor="is_nursing"
                        className="ml-2 text-sm text-gray-700"
                      >
                        Nursing
                      </label>
                    </div>
                  </div>

                  {formData.is_pregnant && (
                    <div className="pl-6">
                      <label
                        htmlFor="pregnancy_age"
                        className="block text-sm text-gray-700"
                      >
                        Pregnancy Age (months)
                      </label>
                      <input
                        id="pregnancy_age"
                        name="pregnancy_age"
                        type="number"
                        min="1"
                        max="9"
                        value={formData.pregnancy_age}
                        onChange={handleChange}
                        className="mt-1 w-32 border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
                      />
                    </div>
                  )}

                  {formData.is_nursing && (
                    <div className="pl-6">
                      <label
                        htmlFor="child_age"
                        className="block text-sm text-gray-700"
                      >
                        Child Age (months)
                      </label>
                      <input
                        id="child_age"
                        name="child_age"
                        type="number"
                        min="0"
                        max="60"
                        value={formData.child_age}
                        onChange={handleChange}
                        className="mt-1 w-32 border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
            {/* Password Section */}
            <div className="space-y-2 pt-6 border-t border-gray-200">
              {" "}
              <label
                htmlFor="password"
                className="block text-xs sm:text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  className="w-full border border-gray-300 rounded-lg sm:rounded-xl p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? (
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
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    </svg>
                  ) : (
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
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  )}
                </button>
              </div>{" "}
              <p className="text-[10px] sm:text-xs text-gray-500 mt-1 sm:mt-1.5">
                Must be at least 8 characters long
              </p>
            </div>{" "}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-main text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main transition-all duration-300 mt-5 sm:mt-6 font-medium text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              {" "}
              <Link
                to="/login"
                className="w-full flex justify-center py-2.5 sm:py-3 px-3 sm:px-4 border-2 border-main text-xs sm:text-sm font-medium rounded-lg sm:rounded-xl text-main bg-white hover:bg-main hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main transition-all duration-300"
              >
                Sign in to your account
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Alert
        isOpen={showAlert}
        message={alertMessage}
        type="success"
        onClose={handleAlertClose}
      />
    </div>
  );
};

export default RegisterForm;
