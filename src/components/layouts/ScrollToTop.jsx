import React, { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to given distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Smooth scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 sm:bottom-10 sm:right-10 bg-main/90 hover:bg-main text-white w-12 h-12 sm:w-14 sm:h-14 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center backdrop-blur-sm group"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6 sm:w-7 sm:h-7 group-hover:scale-110 transition-transform duration-300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M12 5L5 12M12 5L19 12" />
          </svg>
        </button>
      )}
    </>
  );
};

export default ScrollToTop;
