import React from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "@/context/modalContext";
import { Logo } from "../shared/logo/Logo";

export const PasswordResetConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const { modalData, closeModal } = useModal(); 

  const email = modalData?.email; 

  const handleBackgroundClick = () => {
    closeModal(); 
    navigate("/");
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
      onClick={handleBackgroundClick}
    >
      <div
        className="bg-white rounded-3xl shadow-lg p-8 max-w-sm w-full text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Logo />
        <p className="mt-4 text-lg">
          Ссылка для восстановления пароля отправлена на {email}
        </p>
      </div>
    </div>
  );
};
