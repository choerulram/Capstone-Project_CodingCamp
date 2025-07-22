import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../utils/api";

const EmailVerification = () => {
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyEmail = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get("token");

      if (token) {
        try {
          const response = await api.verifyEmail(token);
          if (response.status === 200) {
            setIsSuccess(true);
            setMessage("Email berhasil diverifikasi!");
            // Redirect ke halaman login setelah 3 detik
            setTimeout(() => {
              navigate("/login");
            }, 3000);
          } else {
            setIsSuccess(false);
            setMessage(response.data.detail || "Verifikasi email gagal.");
          }
        } catch {
          setIsSuccess(false);
          setMessage("Terjadi kesalahan saat verifikasi email.");
        }
      } else {
        setIsSuccess(false);
        setMessage("Token verifikasi tidak ditemukan.");
      }
    };

    verifyEmail();
  }, [navigate, location]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Verifikasi Email</h2>
          <div
            className={`mt-4 p-4 rounded-lg ${
              isSuccess
                ? "bg-green-50 text-green-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {isSuccess ? (
              <svg
                className="mx-auto h-12 w-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="mx-auto h-12 w-12 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
            <p className="mt-2">{message}</p>
            {isSuccess && (
              <p className="mt-2 text-sm text-gray-600">
                Anda akan diarahkan ke halaman login dalam beberapa detik...
              </p>
            )}
            <button
              onClick={() => navigate("/login")}
              className={`mt-4 font-medium ${
                isSuccess
                  ? "text-main hover:text-teal-700"
                  : "text-red-600 hover:text-red-800"
              }`}
            >
              Kembali ke halaman login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
