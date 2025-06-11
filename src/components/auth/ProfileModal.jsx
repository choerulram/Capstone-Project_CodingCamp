import React, { useState } from "react";
import { useSelector } from "react-redux";

const ProfileModal = ({ isOpen, onClose }) => {
  const { token } = useSelector((state) => state.auth);
  const userData = token ? JSON.parse(atob(token.split(".")[1])) : {};
  const [isFlipped, setIsFlipped] = useState(false);

  if (!isOpen) return null;

  const handleFlip = (e) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with blur effect */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Card Container with 3D perspective */}
      <div className="relative" style={{ perspective: "2000px" }}>
        {/* Flippable Card */}
        <div
          className={`w-full max-w-[800px] transform-gpu transition-all duration-700 cursor-pointer ${
            isFlipped ? "rotate-y-180" : ""
          }`}
          onClick={handleFlip}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front of Card */}
          <div
            className="relative w-full bg-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] overflow-hidden backdrop-blur-xl border border-white/20 transition-all duration-300 hover:shadow-teal-500/20"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Top Curved Design with Gradient */}{" "}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-main via-[#0A5F45] to-highlight opacity-90" />
              <div className="relative p-8">
                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                  }}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Profile Header */}
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    {" "}
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-xl text-white rounded-2xl flex items-center justify-center text-4xl font-bold shadow-lg transform group-hover:scale-105 transition-all duration-300 animate-fade-in border border-white/30">
                      {(userData?.name || userData?.nama)?.[0] || "?"}
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-main to-highlight w-6 h-6 rounded-full border-2 border-white flex items-center justify-center">
                      <span className="text-white text-xs">
                        {userData?.isPremium ? "P" : "F"}
                      </span>
                    </div>
                  </div>
                  <div className="text-white">
                    <h2 className="text-2xl font-bold mb-1 animate-fade-in-right">
                      {userData?.name || userData?.nama || "-"}
                    </h2>
                    <p className="text-teal-100 animate-fade-in-right delay-100">
                      {userData?.email || "-"}
                    </p>
                    {userData?.role && (
                      <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-sm animate-fade-in-right delay-200">
                        {userData.role}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Content Grid with Glassmorphism Cards */}
            <div className="p-8 grid grid-cols-4 gap-4 max-h-[calc(100vh-400px)] overflow-y-auto">
              {/* Gender */}
              {(userData?.gender || userData?.jenisKelamin) && (
                <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="p-2 bg-teal-500/20 backdrop-blur-sm rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-teal-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </span>
                    <p className="text-sm text-white/70">Jenis Kelamin</p>
                  </div>
                  <p className="font-medium text-white pl-11">
                    {userData.gender || userData.jenisKelamin}
                  </p>
                </div>
              )}
              {/* Age */}
              {(userData?.age || userData?.umur) && (
                <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="p-2 bg-purple-500/20 backdrop-blur-sm rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-purple-300"
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
                    </span>
                    <p className="text-sm text-white/70">Umur</p>
                  </div>
                  <p className="font-medium text-white pl-11">
                    {userData.age || userData.umur} tahun
                  </p>
                </div>
              )}
              {/* Weight */}
              {(userData?.weight || userData?.berat) && (
                <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="p-2 bg-blue-500/20 backdrop-blur-sm rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                        />
                      </svg>
                    </span>
                    <p className="text-sm text-white/70">Berat Badan</p>
                  </div>
                  <p className="font-medium text-white pl-11">
                    {userData.weight || userData.berat} kg
                  </p>
                </div>
              )}
              {/* Height */}
              {(userData?.height || userData?.tinggi) && (
                <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="p-2 bg-green-500/20 backdrop-blur-sm rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                        />
                      </svg>
                    </span>
                    <p className="text-sm text-white/70">Tinggi Badan</p>
                  </div>
                  <p className="font-medium text-white pl-11">
                    {userData.height || userData.tinggi} cm
                  </p>
                </div>
              )}{" "}
              {/* Membership Status */}
              <div className="col-span-4 mt-2">
                <div
                  className={`p-6 rounded-xl backdrop-blur-md border border-white/20 transition-all duration-300 ${
                    userData?.isPremium
                      ? "bg-gradient-to-r from-amber-500/20 to-yellow-500/20"
                      : "bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`p-2 rounded-lg backdrop-blur-sm ${
                          userData?.isPremium
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-white/10 text-white/70"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                          />
                        </svg>
                      </span>
                      <div>
                        <p className="text-sm text-white/70">
                          Status Membership
                        </p>
                        <p className="font-medium text-white">
                          {userData?.isPremium
                            ? "Premium Member"
                            : "Free Member"}
                        </p>
                      </div>
                    </div>
                    {userData?.isPremium && (
                      <span className="animate-pulse">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-yellow-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back of Card */}
          <div
            className="absolute inset-0 w-full h-full bg-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] overflow-hidden backdrop-blur-xl border border-white/20 transition-all duration-300 rotate-y-180"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="h-full flex flex-col items-center justify-center p-8 text-center">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-xl text-white rounded-full flex items-center justify-center text-6xl font-bold mb-6 animate-bounce-slow">
                🌟
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">
                Click to Flip Back!
              </h3>
              <p className="text-white/70">Your health journey starts here.</p>
              <div className="mt-8 grid grid-cols-2 gap-4 w-full max-w-md">
                <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                  <p className="text-white/70 text-sm">Total Scans</p>
                  <p className="text-white text-2xl font-bold">24</p>
                </div>
                <div className="p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                  <p className="text-white/70 text-sm">Health Score</p>
                  <p className="text-white text-2xl font-bold">85%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
