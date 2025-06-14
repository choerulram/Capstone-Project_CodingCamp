import React, { useState, useEffect } from "react";

const ProductRecommendations = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("product-recommendations");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  const products = [
    {
      name: "Safiya Muesli Berry Yogurt 1 Kg",
      description: "Sereal With Almond Premium",
      image:
        "https://down-id.img.susercontent.com/file/id-11134207-7rasa-m3k1mwx3aimyc5.webp",
      price: "Rp70.700",
      link: "https://id.shp.ee/C8QEZYk",
      nutrients: [
        { label: "Energi", value: "130", unit: "kkal" },
        { label: "Protein", value: "3", unit: "g" },
        { label: "Karbohidrat", value: "19", unit: "g" },
        { label: "Serat", value: "5", unit: "g" },
      ],
    },
    {
      name: "Hao Greek Yogurt",
      description: "DARK CHOCOLATE (Live Active Probiotics Yoghurt)",
      image:
        "https://down-id.img.susercontent.com/file/9035ff89ad240cd5f1f42217478001fb.webp",
      price: "Rp59.000",
      link: "https://id.shp.ee/AA4HAqM",
      nutrients: [
        { label: "Kalori", value: "221", unit: "kkal" },
        { label: "Protein", value: "13", unit: "g" },
        { label: "Karbohidrat", value: "16", unit: "g" },
        { label: "Lemak", value: "12", unit: "g" },
      ],
    },
    {
      name: "The Dairy Alternative Co Oat Milk",
      description: "Susu Gandum Barista - 1 L",
      image:
        "https://down-id.img.susercontent.com/file/id-11134207-7rbk1-m9bg2grnrsb197.webp",
      price: "Rp47.000",
      link: "https://id.shp.ee/thX2EbS",
      nutrients: [
        { label: "Energi", value: "580", unit: "kl" },
        { label: "Protein", value: "2", unit: "g" },
        { label: "Karbohidrat", value: "15.3", unit: "g" },
        { label: "Lemak", value: "2.5", unit: "g" },
      ],
    },
    {
      name: "Safiya Trail Mix Original",
      description: "500 Gram Dried Fruit Roasted Premium",
      image:
        "https://down-id.img.susercontent.com/file/id-11134207-7rasf-m4ssiooln4480f.webp",
      price: "Rp66.899",
      link: "https://id.shp.ee/LQPR54J",
      nutrients: [
        { label: "Energi", value: "90", unit: "kkal" },
        { label: "Protein", value: "2", unit: "g" },
        { label: "Karbohidrat", value: "11", unit: "g" },
        { label: "Lemak", value: "4", unit: "g" },
      ],
    },
  ];

  return (
    <section
      id="product-recommendations"
      className="py-8 md:py-16 bg-gradient-to-bl from-gray-50 via-white to-highlight/5"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* <div className="flex items-center gap-3 mb-8"> */}
          {" "}
          <h2 className="text-xl md:text-3xl font-bold text-main mb-4 md:mb-8 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 md:w-8 md:h-8 text-highlight mr-2 md:mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
              />
            </svg>
            Rekomendasi Produk Untukmu
          </h2>
        {/* </div> */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <div
              key={index}
              className={`bg-white/80 backdrop-blur-sm p-4 md:p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group transform hover:-translate-y-1 hover:scale-[1.02] border border-secondary/30 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${(index + 2) * 100}ms` }}
            >
              <div className="relative mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 md:h-48 object-cover rounded-xl"
                />
                <div className="absolute bottom-2 left-2 bg-green-500/90 backdrop-blur-sm text-white px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                  {product.price}
                </div>
              </div>{" "}
              <h3 className="font-semibold text-main text-base md:text-lg mb-1">
                {product.name}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 mb-2 md:mb-3">
                {product.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.nutrients.map((nutrient, i) => (
                  <span
                    key={i}
                    className="text-xs bg-main/10 text-main px-2 py-1 rounded-full font-medium"
                  >
                    {nutrient.value}
                    {nutrient.unit} {nutrient.label}
                  </span>
                ))}
              </div>
              <a
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-2 md:py-2.5 text-sm md:text-base text-center text-white bg-main/90 border border-main/20 rounded-lg hover:bg-main transition-colors font-medium shadow-sm hover:shadow-md"
              >
                Beli Sekarang
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductRecommendations;
