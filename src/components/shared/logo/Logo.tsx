import React from "react";
import { Link } from "react-router-dom";
import { constRoutes } from "../../../lib/paths";

interface LogoProps {
  showTagline?: boolean; // Пропс для управления видимостью текста
}

export const Logo: React.FC<LogoProps> = ({ showTagline = true }) => {
  return (
    <>
      <Link to={constRoutes.HOME}>
        <div className="h-8 mr-2">
          <img src="logo.svg" alt="Логотип" width={183} height={29} />
        </div>
      </Link>
      {showTagline && (
        <p className="text-gray-450 opacity-50">
          Онлайн-тренировки для занятий дома
        </p>
      )}
    </>
  );
};
