import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useModal } from "@/context";
import { Logo } from "../shared/logo/Logo";
import { Button } from "../Button";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const loginButtonRef = useRef<HTMLButtonElement>(null);
  const { openModal: contextOpenModal } = useModal();

  const handleOpenModal = () => {
    if (loginButtonRef.current) {
      const buttonPosition = loginButtonRef.current.getBoundingClientRect();
      navigate(location.pathname, {
        state: { ...location.state, buttonPosition },
      });
      contextOpenModal("exit");
    }
  };

  return (
    <header className="flex justify-between items-center">
      <div className="flex flex-col items-start gap-4">
        <Logo />
      </div>
      <Button
        ref={loginButtonRef}
        color="bg-customGreen"
        width="w-auto"
        className="text-black py-2 px-6 rounded-full"
        onClick={handleOpenModal}
      >
        Войти
      </Button>
    </header>
  );
};

export default Header;
