import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Branding */}
      <div className="w-[40%] bg-main p-12 rounded-r-[15px] flex flex-col justify-center">
        <div className="max-w-xl mx-auto">
          <h1 className="text-7xl text-white mb-8 font-bold tracking-tight leading-tight animate-fade-in">
            Pack
            <span className="text-highlight">Facts</span>
          </h1>
          <div className="overflow-hidden mb-10">
            <p className="text-highlight text-3xl font-medium leading-relaxed animate-slide-up opacity-0 [animation-delay:0.3s] [animation-fill-mode:forwards]">
              Baca Gizi Tanpa Ribet,
            </p>
            <p className="text-highlight text-3xl font-medium leading-relaxed animate-slide-up opacity-0 [animation-delay:0.6s] [animation-fill-mode:forwards]">
              Cuma Scan Aja!
            </p>
          </div>
          <div className="mt-6 bg-highlight/20 px-8 py-4 rounded-full inline-block animate-bounce-slow">
            <p className="text-white text-base font-medium tracking-wide">
              Scan • Analisis • Rekomendasi
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 bg-gray-50 p-10 flex flex-col justify-center items-center">
        <div className="w-full max-w-xl">
          <div className="bg-white p-12 rounded-3xl shadow-2xl hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-300">
            <h2 className="text-dark text-4xl mb-3 font-bold">Welcome Back!</h2>
            <p className="text-gray-500 mb-10 text-lg">
              Please sign in to your account
            </p>

            <LoginForm />

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    New to PackFacts?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/register"
                  className="w-full flex justify-center py-3 px-4 border-2 border-main text-sm font-medium rounded-xl text-main bg-white hover:bg-main hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-main transition-all duration-300"
                >
                  Create an account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
