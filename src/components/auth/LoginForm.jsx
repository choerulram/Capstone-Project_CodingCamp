import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../states/authUser/slice.js";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.email || !formData.password) {
      setError("Email dan kata sandi wajib diisi");
      return;
    }

    try {
      const response = await dispatch(loginUser(formData));
      if (response && response.token) {
        // Login successful
        navigate("/");
      } else {
        setError("Email atau kata sandi salah");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Email atau kata sandi salah");
      } else if (err.response?.status === 404) {
        setError("Email tidak ditemukan. Silakan daftar terlebih dahulu");
      } else {
        setError("Terjadi kesalahan. Silakan coba lagi nanti");
      }
    }
  };

  return (
    <div className="flex-1 bg-gray-50 p-3 sm:p-4 md:p-10 flex flex-col justify-center items-center">
      <div className="w-full max-w-xl">
        <div className="bg-white p-5 sm:p-6 md:p-12 rounded-lg sm:rounded-xl md:rounded-3xl shadow-lg sm:shadow-xl md:shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-300">
          <h2 className="text-dark text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 font-bold">
            Selamat Datang Kembali!
          </h2>
          <p className="text-gray-500 mb-6 sm:mb-8 md:mb-10 text-base sm:text-lg">
            Silakan masuk ke akun Anda
          </p>

          <form
            onSubmit={handleSubmit}
            className="w-full space-y-4 sm:space-y-5"
          >
            {" "}
            {error && (
              <div
                className="p-3 sm:p-4 mb-3 sm:mb-4 text-xs sm:text-sm text-red-700 bg-red-50 rounded-lg sm:rounded-xl border border-red-100 flex items-center gap-2"
                role="alert"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 sm:h-5 sm:w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {error}
              </div>
            )}
            <div className="space-y-1.5 sm:space-y-2">
              <label
                htmlFor="email"
                className="block text-xs sm:text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan email Anda"
                className="w-full border border-gray-300 rounded-lg sm:rounded-xl p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300"
              />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <label
                htmlFor="password"
                className="block text-xs sm:text-sm font-medium text-gray-700"
              >
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Masukkan kata sandi Anda"
                  className="w-full border border-gray-300 rounded-lg sm:rounded-xl p-2.5 sm:p-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>{" "}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-main text-white py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main transition-all duration-300 mt-5 sm:mt-6 font-medium text-xs sm:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
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
                  </svg>{" "}
                  Sedang masuk...
                </span>
              ) : (
                "Masuk"
              )}
            </button>
          </form>

          <div className="mt-6 sm:mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>{" "}
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-3 sm:px-4 bg-white text-gray-500">
                  Belum punya akun NuTrack?
                </span>
              </div>
            </div>

            <div className="mt-5 sm:mt-6">
              <Link
                to="/register"
                className="w-full flex justify-center py-2.5 sm:py-3 px-3 sm:px-4 border-2 border-main text-xs sm:text-sm font-medium rounded-lg sm:rounded-xl text-main bg-white hover:bg-main hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main transition-all duration-300"
              >
                Daftar akun baru
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
