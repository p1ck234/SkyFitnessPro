import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useModal } from "@/context";
import { Logo } from "../shared/logo/Logo";
import { constRoutes } from "@/lib/paths";
import { useUser } from "@/context/userContext";
import { Button } from "../Button";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { openModal, setCurrentPath } = useModal();
  const { user, userData } = useUser(); // Достаем user и userData из контекста
  const profileButtonRef = useRef<HTMLButtonElement>(null);

  const handleOpenProfileModal = () => {
    if (profileButtonRef.current) {
      const buttonPosition = profileButtonRef.current.getBoundingClientRect();
      navigate(location.pathname, {
        state: { ...location.state, buttonPosition },
      });
      openModal("exit"); // Открываем PopExit
    }
  };

  const handleOpenLoginModal = () => {
    if (profileButtonRef.current) {
      const buttonPosition = profileButtonRef.current.getBoundingClientRect();
      navigate(location.pathname, {
        state: { ...location.state, buttonPosition },
      });
      setCurrentPath(constRoutes.LOGIN);
      openModal("login");
      navigate(constRoutes.LOGIN, { state: { backgroundLocation: location } });
    }
  };

  return (
    <header className="flex justify-between items-center">
      <div className="flex flex-col items-start">
        <Logo />
      </div>
      {user ? (
        <button
          ref={profileButtonRef}
          className="flex items-center cursor-pointer"
          onClick={handleOpenProfileModal}
        >
          <img
            src={user.photoURL || "./img/icon/user.svg"}
            alt="avatar"
            className="w-10 h-10 rounded-full"
          />
          <span className="ml-2 text-lg font-medium hidden sm:inline">
          {userData?.username || user.email}
          </span>
          <svg
            className="ml-2 w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      ) : (
        <Button
          ref={profileButtonRef}
          color="bg-customGreen"
          width="w-auto"
          className="text-black px-6 rounded-full text-xl"
          onClick={handleOpenLoginModal}
        >
          Войти
        </Button>
      )}
    </header>
  );
};

export default Header;
