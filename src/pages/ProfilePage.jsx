import React from "react";
import ProfileContent from "../components/profile/ProfileContent";
import Header from "../components/layouts/Header";
import Footer from "../components/layouts/Footer";

const ProfilePage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Profile Saya
          </h1>
          <ProfileContent />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
