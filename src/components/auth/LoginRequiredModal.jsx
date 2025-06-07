import React from "react";
import { useNavigate } from "react-router-dom";

const LoginRequiredModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal Content */}
        <div className="relative transform overflow-hidden rounded-2xl bg-white px-8 py-12 text-center shadow-xl transition-all sm:w-full sm:max-w-md">
          {/* Decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-highlight/10 rounded-full"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-highlight/10 rounded-full"></div>
          </div>

          {/* Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-highlight/20">
            <svg
              className="h-8 w-8 text-highlight"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="mt-6">
            <h3 className="text-2xl font-bold text-gray-900">
              Login Diperlukan
            </h3>
            <p className="mt-4 text-gray-500">
              Untuk mengakses fitur ini, Anda perlu login terlebih dahulu. Login
              sekarang untuk menikmati semua fitur yang tersedia!
            </p>
          </div>

          {/* Buttons */}
          <div className="mt-8 space-y-3">
            <button
              onClick={() => {
                navigate("/login");
                onClose();
              }}
              className="w-full rounded-lg bg-main px-4 py-2.5 text-center text-sm font-semibold text-white hover:bg-main/90 focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2"
            >
              Login Sekarang
            </button>
            <button
              onClick={onClose}
              className="w-full rounded-lg border border-main px-4 py-2.5 text-sm font-semibold text-main hover:bg-main/5 focus:outline-none focus:ring-2 focus:ring-main focus:ring-offset-2"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRequiredModal;
