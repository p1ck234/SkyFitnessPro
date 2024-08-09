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
  const { user } = useUser();
  const loginButtonRef = useRef<HTMLButtonElement>(null);

  const handleOpenLoginModal = () => {
    if (loginButtonRef.current) {
      const buttonPosition = loginButtonRef.current.getBoundingClientRect();
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
      <div className="flex flex-col items-start gap-4">
        <Logo />
      </div>
      {user ? (
        <div>Welcome, {user.email}</div>
      ) : (
        <Button
          ref={loginButtonRef}
          color="bg-customGreen"
          width="w-auto"
          className="text-black py-2 px-6 rounded-full"
          onClick={handleOpenLoginModal}
        >
          Войти
        </Button>
      )}
    </header>
  );
};

export default Header;
