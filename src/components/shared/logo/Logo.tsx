import React from "react";
import { Link } from "react-router-dom";
import { constRoutes } from "../../../lib/paths";

export const Logo = () => {
  return (
    <Link to={constRoutes.HOME}>
      <div className="h-8 mr-2">
        <img src="logo.svg" alt="Логотип" width={183} height={29} />
      </div>
    </Link>
  );
};
