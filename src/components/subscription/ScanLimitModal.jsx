import React from "react";
import { Link } from "react-router-dom";

const ScanLimitModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-11/12 max-w-md mx-auto shadow-xl">
        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
            <svg
              className="h-8 w-8 text-yellow-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Batas Scan Tercapai
          </h3>

          <p className="text-gray-600 mb-6">
            Anda telah mencapai batas 5 scan gratis. Upgrade ke Premium untuk
            scan tanpa batas dan fitur eksklusif lainnya!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/pricing"
              className="inline-flex justify-center items-center px-6 py-2.5 border border-transparent text-base font-medium rounded-lg text-white bg-main hover:bg-main/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main transition-colors duration-200"
            >
              Upgrade ke Premium
            </Link>

            <button
              onClick={onClose}
              className="inline-flex justify-center items-center px-6 py-2.5 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main transition-colors duration-200"
            >
              Lain Kali
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanLimitModal;
