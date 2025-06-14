import React from "react";

const DecorativeDivider = () => {
  return (
    <div className="relative py-4 sm:py-6 mb-4 sm:mb-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-dashed sm:border-t-2 border-secondary/50"></div>
      </div>
      <div className="relative flex justify-center">
        <div className="bg-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-full shadow-sm border border-secondary/20">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-secondary/60"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-highlight"></div>
            <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-main"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-highlight"></div>
            <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-secondary/60"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecorativeDivider;
