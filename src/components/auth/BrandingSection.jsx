import React from "react";

const BrandingSection = () => {
  return (
    <div className="w-[40%] bg-main p-12 rounded-r-[15px] flex flex-col justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-highlight/50 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-highlight/50 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-xl mx-auto relative z-10">
        {/* Logo and Brand */}
        <div className="mb-12">
          <div className="flex items-baseline space-x-3 animate-fade-in">
            <h1 className="text-8xl text-white font-bold tracking-tight leading-none">
              Pack<span className="text-highlight">Facts</span>
            </h1>
          </div>
        </div>

        {/* Tagline */}
        <div className="overflow-hidden mb-16">
          <p className="text-white/90 text-4xl font-medium leading-relaxed mb-3 animate-slide-up opacity-0 [animation-delay:0.3s] [animation-fill-mode:forwards]">
            Baca Gizi Tanpa Ribet,
          </p>
          <p className="text-highlight text-4xl font-medium leading-relaxed animate-slide-up opacity-0 [animation-delay:0.6s] [animation-fill-mode:forwards]">
            Cuma Scan Aja!
          </p>
        </div>

        {/* Features Badge */}
        <div className="relative">
          <div className="absolute -left-6 -top-6 w-12 h-12 bg-highlight/20 rounded-full animate-ping-slow"></div>
          <div className="bg-highlight/20 px-8 py-4 rounded-full inline-block transform hover:scale-105 transition-all duration-300 cursor-default">
            <p className="text-white text-base font-medium tracking-wide flex items-center space-x-3">
              <span>Scan</span>
              <span className="w-1.5 h-1.5 rounded-full bg-highlight"></span>
              <span>Analisis</span>
              <span className="w-1.5 h-1.5 rounded-full bg-highlight"></span>
              <span>Rekomendasi</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingSection;
