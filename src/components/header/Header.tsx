import React from "react";
import "../../index.css";
import { Link } from "react-router-dom";
import { constRoutes } from "../../lib/paths";
const Header = () => {
  return (
    <>
      <header className="flex justify-between items-center py-4 p-48">
        <div className="flex items-center">
          <img src="logo.svg" alt="Logo" className="h-8 mr-2" />
        </div>
        <Link to={constRoutes.LOGIN}>
        <button className="bg-customGreen text-black py-2 px-4 rounded-lg">
          Войти
        </button>
        </Link>
      </header>
    </>
  );
};

export default Header;
