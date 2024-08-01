import React from "react";

interface HeaderProps {
  openModal: (isLoginMode: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ openModal }) => {
  return (
    <>
      <header className="flex justify-between items-center py-4 px-48">
        <div className="flex items-center">
          <img src="logo.svg" alt="Logo" className="h-8 mr-2" />
        </div>
        <button
          onClick={() => openModal(true)}
          className="bg-customGreen text-black py-2 px-4 rounded-lg"
        >
          Войти
        </button>
      </header>
    </>
  );
};

export default Header;
