import React from "react";
import LoginForm from "../../components/auth/LoginForm";
import BrandingSection from "../../components/auth/BrandingSection";

const LoginPage = () => {
  return (
    <div className="flex min-h-screen">
      <BrandingSection />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
