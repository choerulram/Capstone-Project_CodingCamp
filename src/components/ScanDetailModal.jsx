import React from "react";

const ScanDetailModal = ({ isOpen, onClose, scan }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-full overflow-hidden bg-black bg-opacity-50 z-[9999] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-main">Detail Pemindaian</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
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
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex gap-6">
            {/* Product Image */}
            <div className="w-1/3">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img
                  src={scan?.imageUrl || "/placeholder-food.jpg"}
                  alt={scan?.productName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-main mb-2">
                {scan?.productName}
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Dipindai pada:{" "}
                {new Date(scan?.timestamp).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              {/* Nutrition Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-medium text-main mb-4">
                  Informasi Nutrisi
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">Kalori</div>
                    <div className="text-xl font-semibold text-main">
                      {scan?.calories || 0}{" "}
                      <span className="text-sm">kcal</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">Protein</div>
                    <div className="text-xl font-semibold text-main">
                      {scan?.protein || 0} <span className="text-sm">g</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">Karbohidrat</div>
                    <div className="text-xl font-semibold text-main">
                      {scan?.carbs || 0} <span className="text-sm">g</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <div className="text-sm text-gray-500">Lemak</div>
                    <div className="text-xl font-semibold text-main">
                      {scan?.fat || 0} <span className="text-sm">g</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors duration-300"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanDetailModal;
