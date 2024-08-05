import React from "react";
import { Logo } from "../shared/logo/Logo";

interface HeaderProps {
  openModal: (isLoginMode: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ openModal }) => {
  return (
    <>
      <header className="flex justify-between items-center p-6 mx-auto container">
        <div className="flex items-center">
          <img src="logo.svg" alt="Logo" className="h-8 mr-2" />
        </div>
        <Link to={constRoutes.LOGIN}>
        <button className="bg-customGreen text-black py-2 px-4 rounded-lg">
          Войти
        </button>
      </header>
    </>
  );
};

export default Header;
