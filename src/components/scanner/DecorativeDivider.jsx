import React from "react";

const DecorativeDivider = () => {
  return (
    <div className="relative py-6 mb-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t-2 border-dashed border-secondary/50"></div>
      </div>
      <div className="relative flex justify-center">
        <div className="bg-white px-6 py-2 rounded-full shadow-sm border border-secondary/20">
          <div className="flex items-center space-x-3">
            <div className="w-1.5 h-1.5 rounded-full bg-secondary/60"></div>
            <div className="w-2 h-2 rounded-full bg-highlight"></div>
            <div className="w-3 h-3 rounded-full bg-main"></div>
            <div className="w-2 h-2 rounded-full bg-highlight"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-secondary/60"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecorativeDivider;
