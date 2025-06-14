import React, { useRef, useState, useEffect } from "react";

const healthArticles = [
  {
    title:
      "Tes DNA Ungkap Dugaan Penyebab di Balik Kematian Raja Firaun Tutankhamun",
    url: "https://health.detik.com/fotohealth/d-7942373/tes-dna-ungkap-dugaan-penyebab-di-balik-kematian-raja-firaun-tutankhamun",
    image:
      "https://akcdn.detik.net.id/community/media/visual/2022/11/05/melihat-mumi-raja-tutankhamun-di-lembah-para-raja-2_169.jpeg?w=700&q=90",
    excerpt:
      "Tim peneliti mengungkap penyebab kematian Raja Tutankhamun melalui analisis DNA. Penelitian ini memberikan wawasan baru tentang sejarah Mesir kuno.",
  },
  {
    title:
      "Wanti-wanti WHO soal Varian Baru COVID NB.1.8.1, Muncul dan Merebak di 22 Negara",
    url: "https://health.detik.com/berita-detikhealth/d-7942437/wanti-wanti-who-soal-varian-baru-covid-nb-1-8-1-muncul-dan-merebak-di-22-negara",
    image:
      "https://akcdn.detik.net.id/community/media/visual/2021/12/29/who_169.jpeg?w=700&q=90",
    excerpt:
      "WHO memperingatkan tentang varian baru COVID-19 NB.1.8.1 yang telah terdeteksi di 22 negara. Temukan informasi tentang gejala dan cara pencegahannya.",
  },
  {
    title: "Video Mitos atau Fakta: Ada Waktu Terbaik untuk Dapat Vitamin D",
    url: "https://health.detik.com/detiktv/d-7942344/video-mitos-atau-fakta-ada-waktu-terbaik-untuk-dapat-vitamin-d",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd5yrLotBmZHM35x3wQ0WgjerJnmMwVmgd-A&s",
    excerpt:
      "Benarkah ada waktu ideal untuk mendapatkan vitamin D dari sinar matahari? Simak penjelasan ahli tentang waktu terbaik berjemur untuk kesehatan optimal.",
  },
  {
    title: "Didominasi Varian MB.1.1, Begini Situasi COVID-19 di Indonesia",
    url: "https://health.detik.com/berita-detikhealth/d-7942261/didominasi-varian-mb-1-1-begini-situasi-covid-19-di-indonesia",
    image:
      "https://akcdn.detik.net.id/community/media/visual/2020/12/24/momen-penumpang-bus-jalani-rapid-test-antigen-7_169.jpeg?w=700&q=90",
    excerpt:
      "Perkembangan terkini COVID-19 di Indonesia menunjukkan dominasi varian MB.1.1. Pelajari apa yang perlu Anda ketahui tentang varian ini dan langkah pencegahannya.",
  },
  {
    title:
      "Berdebar-debar saat Bangun Tidur, Normalkah? Ini Kata Dokter Jantung",
    url: "https://health.detik.com/berita-detikhealth/d-7942254/berdebar-debar-saat-bangun-tidur-normalkah-ini-kata-dokter-jantung",
    image:
      "https://akcdn.detik.net.id/community/media/visual/2025/06/01/2150860044-1748725355444_169.jpeg?w=700&q=90",
    excerpt:
      "Mengalami jantung berdebar saat bangun tidur? Dokter spesialis jantung menjelaskan kapan kondisi ini normal dan kapan Anda perlu khawatir.",
  },
  {
    title:
      "Curhat Warga Depok ke CFD Margonda yang Penuh Sesak, Masih Bisa Olahraga?",
    url: "https://health.detik.com/berita-detikhealth/d-7942520/curhat-warga-depok-ke-cfd-margonda-yang-penuh-sesak-masih-bisa-olahraga",
    image:
      "https://akcdn.detik.net.id/community/media/visual/2025/06/01/cfd-depok-1748750731648_169.jpeg?w=700&q=90",
    excerpt:
      "Car Free Day di Margonda Depok semakin ramai. Temukan tips dan alternatif untuk tetap bisa berolahraga di tengah kepadatan pengunjung CFD.",
  },
  {
    title:
      "Kasus COVID-19 Meledak di Thailand, 65 Ribu Orang Terinfeksi dalam Sepekan",
    url: "https://health.detik.com/berita-detikhealth/d-7942325/kasus-covid-19-meledak-di-thailand-65-ribu-orang-terinfeksi-dalam-sepekan",
    image:
      "https://akcdn.detik.net.id/community/media/visual/2021/01/05/corona-melonjak-bangkok-lockdown-7_169.jpeg?w=700&q=90",
    excerpt:
      "Thailand mengalami lonjakan kasus COVID-19 dengan 65 ribu infeksi baru dalam sepekan. Pelajari situasi terkini dan langkah pencegahan yang diambil.",
  },
  {
    title:
      "Kebiasaan Sederhana yang Bisa Cegah Kanker Prostat Menurut Studi, Apa Saja?",
    url: "https://health.detik.com/berita-detikhealth/d-7939833/kebiasaan-sederhana-yang-bisa-cegah-kanker-prostat-menurut-studi-apa-saja",
    image:
      "https://akcdn.detik.net.id/community/media/visual/2021/01/19/manfaat-minum-kopi-bisa-kurangi-risiko-kanker-prostat-3_169.jpeg?w=700&q=90",
    excerpt:
      "Studi terbaru mengungkap kebiasaan sehari-hari yang dapat membantu mencegah kanker prostat. Temukan langkah-langkah pencegahan yang mudah diterapkan.",
  },
  {
    title: "Menkes Ingin Terapkan di RI, Ini Rahasia Panjang Umur Warga Swedia",
    url: "https://health.detik.com/berita-detikhealth/d-7935599/menkes-ingin-terapkan-di-ri-ini-rahasia-panjang-umur-warga-swedia",
    image:
      "https://akcdn.detik.net.id/community/media/visual/2025/03/21/menteri-kesehatan-ri-budi-gunadi-sadikin-1742544902264_169.jpeg?w=700&q=90",
    excerpt:
      "Menteri Kesehatan RI mempelajari rahasia panjang umur warga Swedia. Pelajari pola hidup sehat yang akan diadaptasi untuk masyarakat Indonesia.",
  },
  {
    title:
      "Sorotan Kemenkes Soal Minyak Babi, Dampak Serius Lemak Jahat bagi Jantung",
    url: "https://health.detik.com/berita-detikhealth/d-7942256/sorotan-kemenkes-soal-minyak-babi-dampak-serius-lemak-jahat-bagi-jantung",
    image:
      "https://akcdn.detik.net.id/community/media/visual/2025/05/31/lemak-jahat-minyak-babi-1748686170591_169.jpeg?w=700&q=90",
    excerpt:
      "Kemenkes membahas dampak serius lemak jahat bagi kesehatan jantung. Simak penjelasan lengkap dan rekomendasi pola makan sehat untuk jantung.",
  },
];

const ArticlesSection = () => {
  const articleContainerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const scrollArticles = (direction) => {
    if (articleContainerRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      articleContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollToIndex = (index) => {
    if (articleContainerRef.current) {
      const cardWidth = 280; // Width of each card
      const gap = 32; // Gap between cards (8 * 4 = 32px)
      const scrollPosition = index * (cardWidth + gap);
      articleContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (articleContainerRef.current) {
      const scrollPosition = articleContainerRef.current.scrollLeft;
      const cardWidth = 280; // Width of each card
      const gap = 32; // Gap between cards
      const newIndex = Math.round(scrollPosition / (cardWidth + gap));
      setActiveIndex(
        Math.max(0, Math.min(newIndex, healthArticles.length - 1))
      );
    }
  };
  // Auto-scroll effect dengan infinite loop
  useEffect(() => {
    let interval;

    if (!isHovered) {
      interval = setInterval(() => {
        const nextIndex = (activeIndex + 1) % healthArticles.length;
        const isLastCard = activeIndex === healthArticles.length - 1;

        if (isLastCard) {
          // Ketika di card terakhir, kembali ke awal dengan smooth
          setActiveIndex(0);
          scrollToIndex(0);
        } else {
          // Geser ke card berikutnya
          setActiveIndex(nextIndex);
          scrollToIndex(nextIndex);
        }
      }, 3000); // Dipercepat menjadi 3 detik untuk pengalaman yang lebih dinamis
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [activeIndex, isHovered]);

  useEffect(() => {
    const container = articleContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <section className="py-8 md:py-16 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {" "}
        <h2 className="text-xl md:text-3xl font-bold text-main mb-4 md:mb-8 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:h-8 md:w-8 text-highlight mr-2 md:mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
          Artikel Kesehatan Terkini
        </h2>{" "}
        <div
          className="relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            ref={articleContainerRef}
            className="flex gap-8 overflow-x-auto overflow-y-visible scroll-smooth no-scrollbar pb-2 mb-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {healthArticles.map((article, index) => (
              <a
                key={index}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-none w-[260px] md:w-[280px] bg-white rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1 group/card animate-fade-in [transform-style:preserve-3d]"
                style={{
                  animation: `fadeIn 0.5s ease-out`,
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-xl">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110 rounded-t-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 rounded-t-xl"></div>
                </div>{" "}
                <div className="p-4 md:p-5 bg-gradient-to-b from-white to-gray-50/50">
                  <h3 className="text-base md:text-lg font-semibold text-main mb-2 md:mb-3 line-clamp-2 group-hover/card:text-highlight transition-colors min-h-[3rem] md:min-h-[3.25rem]">
                    {article.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4 line-clamp-4 min-h-[4.5rem] md:min-h-[5rem] leading-relaxed">
                    {article.excerpt ||
                      "Baca artikel lengkap untuk informasi lebih detail tentang kesehatan dan gizi terkini."}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <p className="text-sm text-highlight font-medium flex items-center group-hover/card:text-highlight/80 transition-colors">
                      Baca selengkapnya
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1 transform transition-transform duration-300 group-hover/card:translate-x-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </p>
                    <span className="text-xs text-gray-400 flex items-center bg-gray-50 px-2 py-1 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      4 Juni 2025
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Scroll Indicators */}
          <div className="flex justify-center items-center gap-2 mt-2">
            {healthArticles.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none ${
                  index === activeIndex
                    ? "bg-highlight w-4"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Scroll to article ${index + 1}`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={() => scrollArticles("left")}
            className="absolute -left-2 md:-left-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-full p-2.5 md:p-3.5 shadow-lg opacity-0 group-hover:opacity-100 hover:bg-gray-50 disabled:opacity-0 transition-all duration-300 disabled:cursor-not-allowed z-20 border border-gray-100 hover:border-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() => scrollArticles("right")}
            className="absolute -right-2 md:-right-4 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-full p-2.5 md:p-3.5 shadow-lg opacity-0 group-hover:opacity-100 hover:bg-gray-50 disabled:opacity-0 transition-all duration-300 disabled:cursor-not-allowed z-20 border border-gray-100 hover:border-gray-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
