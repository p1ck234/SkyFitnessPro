import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useModal } from "@/context";
import { Logo } from "../shared/logo/Logo";

interface HeaderProps {
  openModal: (isLoginMode: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ openModal }) => {
  const navigate = useNavigate();
  const loginButtonRef = useRef<HTMLButtonElement>(null);
  const { openModal: contextOpenModal } = useModal();

  const handleOpenModal = () => {
    if (loginButtonRef.current) {
      const buttonPosition = loginButtonRef.current.getBoundingClientRect();
      contextOpenModal("exit");
      navigate("", { state: { buttonPosition } });
    }
  };

  return (
    <header className="flex justify-between items-center py-4 p-48">
      <div className="flex flex-col items-start gap-4">
        <Logo />
        <p className="text-gray-450">Онлайн-тренировки для занятий дома</p>
      </div>
      <button
        ref={loginButtonRef}
        className="bg-customGreen text-black py-2 px-6 rounded-full"
        onClick={handleOpenModal}
      >
        Войти
      </button>
    </header>
  );
};

export default Header;
