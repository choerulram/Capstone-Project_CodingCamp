import React from "react";

const LoginBranding = () => {
  return (
    <div className="w-full md:w-[40%] bg-main p-4 sm:p-6 md:p-12 md:rounded-r-[15px] flex flex-col justify-center relative overflow-hidden min-h-[250px] sm:min-h-[300px] md:min-h-0 shadow-[0_0_25px_rgba(0,0,0,0.4)] md:shadow-[8px_0_25px_-5px_rgba(0,0,0,0.4)]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 sm:w-96 h-72 sm:h-96 bg-highlight/50 rounded-full filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-highlight/50 rounded-full filter blur-3xl translate-x-1/2 translate-y-1/2"></div>
      </div>

      <div className="max-w-xl mx-auto relative z-10">
        {/* Logo dan Merek */}
        <div className="mb-4 sm:mb-6 md:mb-12">
          <div className="flex items-baseline space-x-2 sm:space-x-3 animate-fade-in">
            {" "}
            <h1 className="text-3xl sm:text-5xl md:text-8xl text-white font-bold tracking-tight leading-none">
              Nu<span className="text-highlight">Track</span>
            </h1>
          </div>
        </div>

        {/* Tagline */}
        <div className="overflow-hidden mb-6 sm:mb-8 md:mb-16">
          <p className="text-white/90 text-xl sm:text-2xl md:text-4xl font-medium leading-relaxed mb-1.5 sm:mb-2 md:mb-3 animate-slide-up opacity-0 [animation-delay:0.3s] [animation-fill-mode:forwards]">
            Baca Gizi Tanpa Ribet,
          </p>
          <p className="text-highlight text-xl sm:text-2xl md:text-4xl font-medium leading-relaxed animate-slide-up opacity-0 [animation-delay:0.6s] [animation-fill-mode:forwards]">
            Cuma Scan Aja!
          </p>
        </div>

        {/* Fitur Utama */}
        <div className="relative">
          <div className="absolute -left-4 sm:-left-6 -top-4 sm:-top-6 w-8 sm:w-12 h-8 sm:h-12 bg-highlight/20 rounded-full animate-ping-slow"></div>
          <div className="bg-highlight/20 px-3 sm:px-4 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full inline-block transform hover:scale-105 transition-all duration-300 cursor-default">
            <p className="text-white text-xs sm:text-sm md:text-base font-medium tracking-wide flex items-center flex-wrap gap-2 sm:gap-3 justify-center">
              <span>Pindai</span>
              <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-highlight"></span>
              <span>Analisis</span>
              <span className="w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full bg-highlight"></span>
              <span>Rekomendasi</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginBranding;
