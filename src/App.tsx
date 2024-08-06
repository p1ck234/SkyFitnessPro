import React, { useState } from "react";
import Header from "./components/header/Header";
import { LogInPage } from "./components/auth/loginPage/LogInPage";
import { RegistrationPage } from "./components/auth/registrationPage/RegistrationPage";
import { AppRoutes } from "./Routes";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const openModal = (isLoginMode: boolean) => {
    setIsLogin(isLoginMode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header openModal={openModal} />
      <AppRoutes openModal={openModal} />
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-3xl shadow-lg relative w-96">
            <button
              onClick={closeModal}
              className="absolute top-0 right-0 m-4 text-gray-700"
            >
              &times;
            </button>
            {isLogin ? (
              <LogInPage switchToRegister={() => openModal(false)} />
            ) : (
              <RegistrationPage switchToLogin={() => openModal(true)} />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default App;
