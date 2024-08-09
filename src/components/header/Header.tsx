import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useModal } from "@/context";
import { Logo } from "../shared/logo/Logo";
import { constRoutes } from "@/lib/paths";
import { useUser } from "@/context/userContext";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal, setCurrentPath } = useModal();
  const { user } = useUser();
  const loginButtonRef = useRef<HTMLButtonElement>(null);

  const handleOpenLoginModal = () => {
    setCurrentPath(constRoutes.LOGIN);
    openModal("login");
    navigate(constRoutes.LOGIN, { state: { backgroundLocation: location } });
  };

  return (
    <header className="flex justify-between items-center py-4 p-48">
      <div className="flex flex-col items-start gap-4">
        <Logo />
        <p className="text-gray-450">Онлайн-тренировки для занятий дома</p>
      </div>
      {user ? (
        <div>Welcome, {user.email}</div>
      ) : (
        <button
          ref={loginButtonRef}
          className="bg-customGreen text-black py-2 px-6 rounded-full"
          onClick={handleOpenLoginModal}
        >
          Войти
        </button>
      )}
    </header>
  );
};

export default Header;
