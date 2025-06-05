import React from "react";
import RegisterForm from "../../components/auth/RegisterForm";
import RegisterBranding from "../../components/auth/RegisterBranding";

const RegisterPage = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <RegisterForm />
      <RegisterBranding />
    </div>
  );
};

export default RegisterPage;
