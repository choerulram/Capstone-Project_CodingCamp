import React from "react";
import LoginForm from "../../components/auth/LoginForm";
import LoginBranding from "../../components/auth/LoginBranding";

const LoginPage = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row min-h-screen">
      <LoginBranding />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
