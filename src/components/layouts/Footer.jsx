import React from "react";

const Footer = () => {
  return (
    <footer className="bg-main text-light">
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-2 md:col-span-2">
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
              Nu<span className="text-highlight">Track</span>
            </h2>
            <p className="text-gray-100 text-sm sm:text-base mb-3 sm:mb-4">
              Aplikasi inovatif untuk memudahkan Anda membaca informasi gizi
              pada kemasan makanan.
            </p>
          </div>
          <div className="col-span-1">
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">
              Tautan
            </h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-sm sm:text-base text-gray-100 hover:text-highlight transition-colors duration-300"
                >
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-sm sm:text-base text-gray-100 hover:text-highlight transition-colors duration-300"
                >
                  Fitur
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-sm sm:text-base text-gray-100 hover:text-highlight transition-colors duration-300"
                >
                  Kontak
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-1">
            <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-4">
              Kontak
            </h3>
            <ul className="space-y-1.5 sm:space-y-2">
              <li className="text-sm sm:text-base text-gray-100">
                Email: info@nutrack.com
              </li>
              <li className="text-sm sm:text-base text-gray-100">
                Telepon: (021) 1234-5678
              </li>
              <li className="text-sm sm:text-base text-gray-100">
                Alamat: Jakarta, Indonesia
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100/20 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center">
          <p className="text-sm sm:text-base text-gray-100">
            © 2025 NuTrack. Hak cipta dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
