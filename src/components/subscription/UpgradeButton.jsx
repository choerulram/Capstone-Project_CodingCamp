import React, { useState } from "react";
import PricingModal from "./PricingModal";
import { Link } from "react-router-dom";

const UpgradeButton = () => {
  const [showPricingModal, setShowPricingModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowPricingModal(true)}
        className="inline-flex items-center px-2 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium rounded-md md:rounded-lg text-white bg-gradient-to-r from-yellow-500 to-yellow-400 shadow-md hover:shadow-lg hover:from-yellow-400 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition-all duration-300 transform hover:scale-105 group"
      >
        <svg
          className="h-3.5 w-3.5 md:h-4 md:w-4 mr-1 md:mr-1.5 text-yellow-100 group-hover:scale-110 transition-transform duration-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
        Upgrade
      </button>

      <PricingModal
        isOpen={showPricingModal}
        onClose={() => setShowPricingModal(false)}
      />
    </>
  );
};

export default UpgradeButton;
