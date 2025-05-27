import React from "react";
import { Link } from "react-router-dom";

const ScanHistoryCard = ({ scan }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-start space-x-4">
        <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={scan.imageUrl || "/placeholder-food.jpg"}
            alt="Foto Produk"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-main mb-1">
            {scan.productName || "Nama Produk"}
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            {new Date(scan.timestamp).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-500">Kalori:</span>
              <span className="ml-1 font-medium">
                {scan.calories || "0"} kcal
              </span>
            </div>
            <div>
              <span className="text-gray-500">Protein:</span>
              <span className="ml-1 font-medium">{scan.protein || "0"}g</span>
            </div>
          </div>
        </div>
        <Link
          to={`/scan/${scan.id}`}
          className="text-highlight hover:text-teal-600 font-medium text-sm"
        >
          Detail →
        </Link>
      </div>
    </div>
  );
};

export default ScanHistoryCard;
