import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="w-[60%] bg-gray-50 p-10 flex flex-col justify-center items-center">
        <div className="w-full max-w-2xl">
          <div className="bg-white p-12 rounded-3xl shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-300">
            <h2 className="text-dark text-4xl mb-3 font-bold">
              Join PackFacts
            </h2>
            <p className="text-gray-500 mb-10 text-lg">
              Create your account to get started
            </p>

            <RegisterForm />

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Already have an account?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/login"
                  className="w-full flex justify-center py-3 px-4 border-2 border-main text-sm font-medium rounded-xl text-main bg-white hover:bg-main hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main transition-all duration-300"
                >
                  Sign in to your account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Branding */}
      <div className="flex-1 bg-main p-12 rounded-l-[15px] flex flex-col justify-center">
        <div className="max-w-xl mx-auto">
          <h1 className="text-7xl text-white mb-8 font-bold tracking-tight leading-tight animate-fade-in">
            Join the
            <span className="text-highlight block mt-2">Journey</span>
          </h1>
          <div className="overflow-hidden mb-10">
            <div className="flex items-center mb-6 animate-slide-up opacity-0 [animation-delay:0.3s] [animation-fill-mode:forwards]">
              <div className="bg-highlight/20 p-3 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-highlight"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-white text-xl font-medium">
                Akses Informasi Gizi Instan
              </p>
            </div>
            <div className="flex items-center mb-6 animate-slide-up opacity-0 [animation-delay:0.5s] [animation-fill-mode:forwards]">
              <div className="bg-highlight/20 p-3 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-highlight"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <p className="text-white text-xl font-medium">
                Rekomendasi Makanan Sehat
              </p>
            </div>
            <div className="flex items-center animate-slide-up opacity-0 [animation-delay:0.7s] [animation-fill-mode:forwards]">
              <div className="bg-highlight/20 p-3 rounded-full mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-highlight"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-white text-xl font-medium">
                Analisis Gizi Real-time
              </p>
            </div>
          </div>
          <div className="mt-8 bg-highlight/20 px-8 py-4 rounded-full inline-block animate-bounce-slow">
            <p className="text-white text-base font-medium tracking-wide">
              Mulai Perjalanan Sehatmu Hari Ini
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
