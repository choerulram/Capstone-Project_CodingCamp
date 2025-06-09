import React from "react";

const Footer = () => {
  return (
    <footer className="bg-main text-light">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            {" "}
            <h2 className="text-2xl font-bold mb-4">
              Nu<span className="text-highlight">Track</span>
            </h2>
            <p className="text-gray-100 mb-4">
              Aplikasi inovatif untuk memudahkan Anda membaca informasi gizi
              pada kemasan makanan.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-gray-100 hover:text-highlight transition-colors duration-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#features"
                  className="text-gray-100 hover:text-highlight transition-colors duration-300"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-gray-100 hover:text-highlight transition-colors duration-300"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-100">Email: info@nutrack.com</li>
              <li className="text-gray-100">Phone: (021) 1234-5678</li>
              <li className="text-gray-100">Address: Jakarta, Indonesia</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100/20 mt-8 pt-8 text-center">
          <p className="text-gray-100">© 2025 NuTrack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
