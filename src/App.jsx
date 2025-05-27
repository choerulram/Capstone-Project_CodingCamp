import React, { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleNavigateToRegister = () => {
    setIsLogin(false);
  };

  const handleNavigateToLogin = () => {
    setIsLogin(true);
  };

  const handleLogin = (loginResult) => {
    console.log("Login successful:", loginResult);
    // Add your navigation logic here after successful login
  };

  return isLogin ? (
    <LoginPage
      onLogin={handleLogin}
      onNavigateToRegister={handleNavigateToRegister}
    />
  ) : (
    <RegisterPage onNavigateToLogin={handleNavigateToLogin} />
  );
};

export default App;
