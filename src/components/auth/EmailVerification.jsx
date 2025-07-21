import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmailVerification = () => {
  const [message] = useState("Email berhasil diverifikasi!");
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect ke halaman login setelah 3 detik
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Verifikasi Email</h2>
          <div className="mt-4 p-4 rounded-lg bg-green-50 text-green-700">
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
            <p className="mt-2">{message}</p>
            <p className="mt-2 text-sm text-gray-600">
              Anda akan diarahkan ke halaman login dalam beberapa detik...
            </p>
            <button
              onClick={() => navigate("/login")}
              className="mt-4 text-main hover:text-teal-700 font-medium"
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
