import React, { useRef } from "react";
import "../../index.css";
// import { useNavigate } from "react-router-dom";
import { useModal } from "@/context";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const loginButtonRef = useRef<HTMLButtonElement>(null);
  const { openModal } = useModal();

  const handleOpenModal = () => {
    if (loginButtonRef.current) {
      const buttonPosition = loginButtonRef.current.getBoundingClientRect();
      openModal("exit");
    }
  };

  // const toggleMyProfile = () => {
  //   if (loginButtonRef.current) {
  //     const buttonPosition = loginButtonRef.current.getBoundingClientRect();
  //     navigate("/exit", { state: { buttonPosition } });
  //   }
  // };
  return (
    <>
      <header className="flex justify-between items-center py-4 p-48">
        <div className="flex flex-col items-start gap-4">
          <img src="logo.svg" alt="Logo" className="h-8 mr-2" />
          <p className="text-gray-450">Онлайн-тренировки для занятий дома</p>
        </div>
        <button
          ref={loginButtonRef} // Добавляем привязку ref к кнопке
          className="bg-customGreen text-black py-2 px-6 rounded-full"
          onClick={handleOpenModal}
        >
          Войти
        </button>
      </header>
    </>
  );
};

export default Header;
